import React from 'react'
import Preloader from '../components/common/Preloader/Preloader'
import s from '../components/Users/Users.module.css'

const withSuspense = (WrappedComponent: React.ComponentType): React.FC => (
  props,
) => {
  const preloader = (
    <div className={s.suspensePreloaderBlock}>
      <div className={s.suspensePreloader}>
        <Preloader />
      </div>
    </div>
  )
  return (
    <React.Suspense fallback={preloader}>
      <WrappedComponent {...props} />
    </React.Suspense>
  )
}

export default withSuspense
