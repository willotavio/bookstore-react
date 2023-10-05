export const logout = () => {
  localStorage.setItem('token', "");
  window.dispatchEvent(new Event('storage'));
}