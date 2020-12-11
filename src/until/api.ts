import HttpClient from './request'
export function getUserList(data: any, cancel?: any) { // 发送图片
  let url = `user/list/1`
  return HttpClient.get(url, data)
}
export function addSignUser(data: any, cancel?: any) {
  let url = 'user/modify'
  return HttpClient.post(url, data)
}
export function uploadImg(data: any, cancel?: any) {
  let url = 'user/fileUpload'
  return HttpClient.post(url, data)
}
export function deleteFaceData(userId: any, cancel?: any) {
  let url = `user/delUsers/${userId}`
  return HttpClient.post(url)
}
export function clearUsers(actId: any, cancel?: any) {
  let url = `user/clearUsers/${actId}`
  return HttpClient.post(url)
}
export default {
  getUserList, // 获取签到列表
  addSignUser, // 新增签到人员
  uploadImg, // 上传图片
  clearUsers
}