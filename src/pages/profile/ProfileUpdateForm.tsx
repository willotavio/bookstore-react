import '../../App.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { User } from '../users/Users'; 
import { handleFileSelect } from '../users/Users';
import Axios from 'axios';
import { useIsAuth } from '../../utilities/useIsAuth';
import { useEffect } from 'react';

export const ProfileUpdateForm = () => {

  const { user } = useIsAuth();

  const updateProfile = async (id: string, data: User) => {
    try{
      const result = await Axios.put(`http://localhost:8080/user/update/${id}`, data, {withCredentials: true});
      localStorage.setItem('user', JSON.stringify(result.data.user));
      window.dispatchEvent(new Event('login'));
      return true;
    }catch(err){
      console.error(err);
      return false;
    }
  }

  const schema = yup.object({
    name: yup.string(),
    email: yup.string().email(),
    profilePicture: yup.mixed()
  });

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit( async (data) => {
    const updatedUser: User = {} as User;
    if(data.name && data.name.length > 0){
      updatedUser.name = data.name;
    }
    if(data.email && data.email.length > 0){
      updatedUser.email = data.email;
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
    await updateProfile(user.id, updatedUser);
  });
  
  useEffect(() => {
    setValue("name", user.name || "");
    setValue("email", user.email || "");
  }, [user]);

  return(
    <div>
      <form className='defaultForm' onSubmit={onSubmit}>
        <h2>Update profile</h2>
        <div className='setImageDiv'>
          <label className='setImage' htmlFor='profilePicture'>Profile Picture</label>
          <input type="file" id='profilePicture' {...register('profilePicture')} accept='image/*' />  
        </div>
        <input type="text" {...register('name')} placeholder="Name" autoComplete='off' />
        <input type="email" {...register('email')} placeholder="Email" autoComplete='off' />
        <input type="submit" value="Update"/>
      </form>
    </div>
  );
}