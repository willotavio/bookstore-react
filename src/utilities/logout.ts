export const logout = () => {
  localStorage.setItem('token', "");
  localStorage.setItem('user', "");
  window.dispatchEvent(new Event('logout'));
}