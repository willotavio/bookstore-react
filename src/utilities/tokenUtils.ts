export const isTokenValid = (token: string | null) => {
  if(!token){
    return false;
  }

  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const expirationTime = decodedToken.exp * 1000;
  const currentTime = Date.now();
  console.log(decodedToken, expirationTime, currentTime)

  return expirationTime > currentTime;
}