// выносим все url в приложении в единый объект
const RouterManager = {
  home: {
    path: '/',
  },
  profile: {
    path: '/profile',
    userId: {
      path: '/profile/:userId?',
    },
    // делаем метод, для динамического url
    getUrl(userId: number) {
      return `/profile/${userId}`
    },
  },
  dialogs: {
    path: '/dialogs',
    userId: {
      path: '/dialogs/:userId?',
    },
    // делаем метод, для динамического url
    getUrl(userId: number) {
      return `/dialogs/${userId}`
    },
  },
  users: {
    path: '/users',
  },
  login: {
    path: '/login',
  },
  error: {
    path: '/error',
  },
  all: {
    path: '*',
  },
  news: {
    path: '/news',
  },
  music: {
    path: '/music',
  },
  settings: {
    path: '/settings',
  },
}

export const RM = RouterManager

// const Router = {
//   home: {
//     path: '/',
//   },
//   profile: {
//     path: '/profile',
//     userId: {
//       path: '/:userId?',
//     },
//   },
//   dialogs: {
//     path: '/dialogs',
//     userId: {
//       path: '/:userId?',
//     },
//   },
//   users: {
//     path: '/users',
//   },
//   login: {
//     path: '/login',
//   },
//   error: {
//     path: '/error',
//   },
//   all: {
//     path: '*',
//   },
//   news: {
//     path: '/news',
//   },
//   music: {
//     path: '/music',
//   },
//   settings: {
//     path: '/settings',
//   },
// }

// class RouterManager {
//   router: any = {}

//   constructor(router: any) {
//     this.router = router
//   }

//   get home() {
//     const home = { path: `${this.router.home.path}` }
//     return home
//   }

//   get profile() {
//     const profile = {
//       path: `${this.router.profile.path}`,
//       userId: {
//         path: `${this.router.profile.path}${this.router.profile.userId.path}`,
//       },
//       getUrl: (userId: number) => {
//         return `${this.router.profile.path}/${userId}`
//       },
//     }
//     return profile
//   }

//   get dialogs() {
//     const dialogs = {
//       path: `${this.router.dialogs.path}`,
//       userId: {
//         path: `${this.router.dialogs.path}${this.router.dialogs.userId.path}`,
//       },
//       getUrl: (userId: number) => {
//         return `${this.router.dialogs.path}/${userId}`
//       },
//     }
//     return dialogs
//   }

//   get users() {
//     const users = { path: `${this.router.users.path}` }
//     return users
//   }

//   get login() {
//     const login = { path: `${this.router.login.path}` }
//     return login
//   }

//   get error() {
//     const error = { path: `${this.router.error.path}` }
//     return error
//   }

//   get all() {
//     const all = { path: `${this.router.all.path}` }
//     return all
//   }

//   get news() {
//     const news = { path: `${this.router.news.path}` }
//     return news
//   }

//   get music() {
//     const music = { path: `${this.router.music.path}` }
//     return music
//   }

//   get settings() {
//     const settings = { path: `${this.router.settings.path}` }
//     return settings
//   }
// }

// export const RM = new RouterManager(Router)
