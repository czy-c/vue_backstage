export function setCookie(key: string, value: string) {
  document.cookie = key + "=" + value;
}
export function getCookie(key: string) {
  const reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
  const arr = document.cookie.match(reg);
  if (arr) return unescape(arr[2]);
  else return "";
}
export function clearCookie(key:string){
  document.cookie = key+"=0;expires=" + new Date().toUTCString();
}