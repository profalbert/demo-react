import React from 'react';
import Preloader from '../components/common/Preloader/Preloader';
import s from '../components/Users/Users.module.css';


let withSuspense = (Component) => (props) =>{
  let preloader = <div className={s.suspensePreloaderBlock}>
                    <div className={s.suspensePreloader}>
                      <Preloader />
                    </div>
                  </div>;
  return (
    <React.Suspense fallback={preloader}>
      <Component {...props} />      
    </React.Suspense>
  );
}


export default withSuspense;