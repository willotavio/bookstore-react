export const logout = () => {
  localStorage.setItem('user', "");
  window.dispatchEvent(new Event('logout'));
  document.cookie = "clientToken=false; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}