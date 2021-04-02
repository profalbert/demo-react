import { ProfileType, PhotosType, UserType } from './../types/types'
import axios from 'axios'

const setInstance = (apiKey: string | null = null) => {
  return {
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
      'API-KEY': `${apiKey}`,
    },
  }
}
let instance = axios.create(setInstance())
export const setKeyApi = (apiKey: string | null) => {
  return (instance = axios.create(setInstance(apiKey)))
}

export enum ResultStandartCodes { // делаем enum, чтобы не вспоминать, что ознает то или иное число.
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  Captcha = 10,
}

type UsersApiTypes = {
  getUsers: {
    items: Array<UserType>
    totalCount: number
  }
  follow: {
    resultCode: ResultStandartCodes
    messages: string[]
  }
  unfollow: {
    resultCode: ResultStandartCodes
    messages: string[]
  }
}
export const usersAPI = {
  async getUsers(currentPage: number = 1, pageSize: number = 10) {
    return instance
      .get<UsersApiTypes['getUsers']>(
        `users?page=${currentPage}&count=${pageSize}`,
      )
      .then((res) => res.data)
  },
  async follow(userId: number) {
    return instance
      .post<UsersApiTypes['follow']>(`follow/${userId}`)
      .then((res) => res.data)
  },
  async unfollow(userId: number) {
    return instance
      .delete<UsersApiTypes['unfollow']>(`follow/${userId}`)
      .then((res) => res.data)
  },
}

type AuthApiTypes = {
  me: {
    data: {
      id: number
      email: string
      login: string
    }
    resultCode: ResultStandartCodes
    messages: string[]
  }
  login: {
    data: {
      userId: number
    }
    resultCode: ResultStandartCodes | ResultCodeForCaptcha
    messages: string[]
  }
  photoMe: {
    photos: {
      large: string
      small: string
    }
  }
  logout: {
    resultCode: ResultStandartCodes
    messages: string[]
  }
}
export const authAPI = {
  async me() {
    return instance.get<AuthApiTypes['me']>(`auth/me`).then((res) => res.data)
  },
  async photoMe(myId: number) {
    return instance
      .get<AuthApiTypes['photoMe']>(`/profile/${myId}`)
      .then((res) => res.data)
  },
  async login(
    email: string,
    password: string,
    rememberMe: boolean = false,
    captcha: string | null = null,
  ) {
    return instance
      .post<AuthApiTypes['login']>(`auth/login`, {
        email,
        password,
        rememberMe,
        captcha,
      })
      .then((res) => res.data)
  },
  async logout() {
    return instance
      .delete<AuthApiTypes['logout']>(`auth/login`)
      .then((res) => res.data)
  },
}

type ProfileApiTypes = {
  getProfile: ProfileType
  getStatus: string
  updateStatus: {
    resultCode: ResultStandartCodes
    messages: string[]
  }
  savePhoto: {
    resultCode: ResultStandartCodes
    data: {
      photos: PhotosType
    }
  }
  saveProfile: {
    resultCode: ResultStandartCodes
    messages: string[]
  }
}
export const profileAPI = {
  async getProfile(userId: number) {
    return instance
      .get<ProfileApiTypes['getProfile']>(`profile/${userId}`)
      .then((res) => res.data)
  },
  async getStatus(userId: number) {
    return instance
      .get<ProfileApiTypes['getStatus']>(`profile/status/${userId}`)
      .then((res) => res.data)
  },
  async updateStatus(status: string) {
    return instance
      .put<ProfileApiTypes['updateStatus']>(`profile/status/`, {
        status: status,
      })
      .then((res) => res.data)
  },
  async savePhoto(photoFile: File) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance
      .put<ProfileApiTypes['savePhoto']>(`profile/photo/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => res.data)
  },
  async saveProfile(profile: ProfileType) {
    return instance
      .put<ProfileApiTypes['saveProfile']>(`profile/`, profile)
      .then((res) => res.data)
  },
}

type SecurityApiTypes = {
  getCaptchaUrl: {
    url: string | null
  }
}
export const securityAPI = {
  async getCaptchaUrl() {
    return instance
      .get<SecurityApiTypes['getCaptchaUrl']>(`security/get-captcha-url`)
      .then((res) => res.data)
  },
}
