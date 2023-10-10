import { Navigate } from "react-router-dom";
import { useIsAuth } from "../../utilities/useIsAuth";
import { useState } from "react";

export const Profile = () => {
  const { userLogged, user } = useIsAuth();
  if(!userLogged){
    return <Navigate to={'/'} />
  }
  return(
    <div className="profile">
      <h1>Profile</h1>
      <div className="profileHeader">
        <img src={
          user.profilePicture && user.profilePicture.length > 0
          ? `http://localhost:8080/uploads/profile-pictures/${user.id}-profilepic.jpg`
          : 'http://localhost:8080/uploads/profile-pictures/null-profilepic.jpg'
          } className="profilePic" />
        <h2>{user.name}</h2>
      </div>
      <hr />
      <div className="profileContent">
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </div>
    </div>
  );
}