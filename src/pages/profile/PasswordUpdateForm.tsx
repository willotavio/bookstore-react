import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useIsAuth } from '../../utilities/useIsAuth';
import Axios from 'axios';

export const PasswordUpdateForm = () => {
  const { user } = useIsAuth();
  const changePassword = async (id: string, newPassword: string, confirmNewPassword: string, currentPassword: string) => {
    try{
      const result = await Axios.post(`http://localhost:8080/auth/change-password/${id}`, {newPassword, confirmNewPassword, currentPassword}, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  const schema = yup.object({
    newPassword: yup.string().min(8).required(),
    confirmNewPassword: yup.string().oneOf([yup.ref('newPassword')]).required(),
    currentPassword: yup.string().min(8).required()
  });

  const { register, handleSubmit, reset, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit( async (data) => {
    console.log(data);
    if(data.newPassword.length >= 8 && data.newPassword === data.confirmNewPassword){
      if(await changePassword(user.id, data.newPassword, data.confirmNewPassword, data.currentPassword)){
        reset();
      }
    }
  });

  return(
    <div>
      <h2>Change Password</h2>
      <form className="defaultForm" onSubmit={onSubmit}>
        <input type="password" {...register('newPassword')} placeholder="Password" />
        <input type="password" {...register('confirmNewPassword')} placeholder="Confirm Password "/>
        <input type="password" {...register('currentPassword')} placeholder="Current Password "/>
        <input type="submit" value="Update"/>
      </form>
    </div>
  );
}