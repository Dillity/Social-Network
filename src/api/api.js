import axios from "axios";

const instance = axios.create({
   withCredentials: true,
   headers: {'API-KEY' : '64b37183-33b1-45c4-9df7-856996f46422'},
   baseURL: `https://social-network.samuraijs.com/api/1.0/`
})

export const userAPI = {
   getUsers(currentPage, pageSize) {
      return instance.get(`users?page=${currentPage}&count=${pageSize}`);
   }
}

export const follow_unfollow_API = {
   follow(userId) {
      return instance.post(`follow/${userId}`);
   },
   unfollow(userId) {
      return instance.delete(`follow/${userId}`);
   }
}

export const authAPI = {
   authMe() {
      return instance.get(`/auth/me`);
   },
   logIn(email, password, rememberMe = false, captcha) {
      return instance.post(`/auth/login`, {email, password, rememberMe, captcha});
   },
   logOut() {
      return instance.delete(`auth/login`);
   },
   captcha() {
      return instance.get(`/security/get-captcha-url`);
   }
}


export const profileAPI = {
   setUserProfile(userId) {
      return instance.get(`profile/${userId}`);
   },
   getStatus(userId) {
      return instance.get(`/profile/status/${userId}`);
   },
   updateStatus(newStatus) {
      return instance.put(`/profile/status`, {status: newStatus});
   },
   mainPhotoChange(file) {
      const formData = new FormData();
      formData.append('image', file);
      return instance.put(`/profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
   },
   saveProfile(data) {
      return instance.put(`profile`, data);
   }
}

