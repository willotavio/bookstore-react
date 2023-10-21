import '../../App.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { User, UserContext } from './Users';
import { handleFileSelect } from './Users';

export const UserUpdateForm = () => {

  const { updateUser, selectedUser, setSelectedUser } = useContext(UserContext);

  const schema = yup.object({
    name: yup.string(),
    email: yup.string().email(),
    role: yup.number(),
    password: yup.string(),
    profilePicture: yup.mixed()
  });

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit( async (data) => {
    const updatedUser: User = {} as User;
    if(data.name && data.name.length > 0){
      updatedUser.name = data.name;
    }
    if(data.email && data.email.length > 0){
      updatedUser.email = data.email;
    }
    if(data.role && data.role > -1){
      updatedUser.role = data.role;
    }
    if(data.password && data.password.length >= 8){
      updatedUser.password = data.password;
    }
    if(data.profilePicture.length > 0){
      try{
        const profilePictureBase64 = await handleFileSelect(data.profilePicture as FileList);
        updatedUser.profilePicture = profilePictureBase64;
      }
      catch(err){
        console.log(err);
      }
    }
    if(await updateUser(selectedUser.id, updatedUser)){
      reset();
    }
  });
  
  useEffect(() => {
    setValue("name", selectedUser.name || "");
    setValue("email", selectedUser.email || "");
    setValue("role", selectedUser.role || 0);
  }, [selectedUser]);

  return(
    <div>
      <form className='defaultForm' onSubmit={onSubmit}>
        <h2>Update user <button className='closeUpdateForm' onClick={() => setSelectedUser({} as User)}>X</button></h2>
        {selectedUser.email && <span>Editing user: {selectedUser.email}</span>}
        <img className='profilePic' src={`http://localhost:8080/uploads/profile-pictures/${selectedUser.profilePicture ? selectedUser.id : 'null'}-profilepic.jpg`}/>
        <div className='setImageDiv'>
          <label className='setImage' htmlFor='profilePictureUpdate'>Profile Picture</label>
          <input type="file" id='profilePictureUpdate' {...register('profilePicture')} accept='image/*' />  
        </div>
        <input type="text" {...register('name')} placeholder="Name" autoComplete='off' />
        <input type="email" {...register('email')} placeholder="Email" autoComplete='off' />
        <select {...register('role')}>
          <option value={0}>Select a role</option>
          <option value={1}>User</option>
          <option value={2}>Admin</option>
          <option value={3}>Main Admin</option>
        </select>
        <input type="password" {...register('password')} placeholder="Password" autoComplete='off' />
        <input type="submit" value="Update"/>
      </form>
    </div>
  );
}