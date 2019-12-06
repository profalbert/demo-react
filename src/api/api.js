import * as axios from 'axios';


const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  withCredentials: true,
  headers: {
    'API-KEY': '2f32f390-ae96-4e22-896c-29147e6b5143'
  }
});

export const usersAPI = {
  getUsers (currentPage = 1, pageSize = 10, withCredentials = true) {
    return (
     instance.get(`users?page=${currentPage}&count=${pageSize}`, {
       withCredentials: withCredentials
     }).then(response => response.data)
    );
  },
  follow(userId) {
    return instance.post(`follow/${userId}`);
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`);
  }
}

export const authAPI = {
  me(withCredentials) {
    return instance.get(`auth/me`, {
      withCredentials: withCredentials
    });
  },
  photoMe(myId, withCredentials) {
    return instance.get(`/profile/${myId}`, {
      withCredentials: withCredentials
    });
  },
  login(email, password, rememberMe = false, withCredentials, captcha = null) {
    return instance.post(`auth/login`, {
      email, password, rememberMe, withCredentials, captcha
    });
  },
  logout() {
    return instance.delete(`auth/login`);
  },
}

export const profileAPI  = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`);
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`);    
  },
  updateStatus(status) {
    return instance.put(`profile/status/`, {status: status});    
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });    
  },
  saveProfile(profile) {
    return instance.put(`profile/`, profile);
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`);
  }
}







