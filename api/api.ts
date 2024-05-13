import { apiRequest } from "./requestCreator";

export const api = {
  checkToken: async () => await apiRequest('/auth/checkToken/', 'get', {}, true),
  register: async (name: string, password: string) => await apiRequest('/auth/register/', 'post', { name, password }),
  login: async (name: string, password: string) => await apiRequest('/auth/login/', 'post', { name, password }),

  search: async (prompt: string) => await apiRequest('/search/', 'post', { prompt }, true),
  upload: async (name: string, author: string, file: any) => await apiRequest('/song/', 'put', { name, author, file }, true),

  uploadYoutube: async (code: string) => await apiRequest('/song/yt/?code=' + code, 'put', {}, true),

  profile: async (name: string, detailed: boolean = false) => await apiRequest('/user/' + name + '/?detailed=' + detailed, 'get', {}, true),
  profileLikes: async (name: string) => await apiRequest('/user/' + name + '/likes/', 'get', {}, true),
  profileUploads: async (name: string) => await apiRequest('/user/' + name + '/uploads/', 'get', {}, true),

  author: async (name: string, detailed: boolean = false) => await apiRequest('/author/' + name + '/?detailed=' + detailed, 'get', {}, true),
  like: async (id: string) => await apiRequest('/like/' + id + '/', 'put', {}, true),
  unlike: async (id: string) => await apiRequest('/like/' + id + '/', 'delete', {}, true),

  connectToLobby: async (code: string) => await apiRequest('/lobby/connect/?code=' + code, 'get', {}, true),
  createLobby: async () => await apiRequest('/lobby/connect/', 'get', {}, true),
  disconnectLobby: async () => await apiRequest('/lobby/disconnect/', 'get', {}, true),

  queueAdd: async (id: number) => await apiRequest('/queue/?id=' + id, 'put', {}, true),
  queueRemove: async (id: number) => await apiRequest('/queue/?id=' + id, 'delete', {}, true),
}