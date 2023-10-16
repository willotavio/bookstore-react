import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useIsAuth } from '../../utilities/useIsAuth';
import Axios from 'axios';
import { logout } from '../../utilities/logout';

export const ProfileDeleteForm = () => {

  const { user } = useIsAuth();

  const deleteProfile = async (id: string, password: string, confirmPassword: string) => {
    try{
      await Axios.delete(`http://localhost:8080/auth/${id}`, {
        data: {
          password,
          confirmPassword
        }, 
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  const schema = yup.object({
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required()
  });

  const { register, handleSubmit, reset, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit( async (data) => {
    if(await deleteProfile(user.id, data.password, data.confirmPassword)){
      reset();
      logout();
    }
  })

  return(
    <div>
      <form className="defaultForm" onSubmit={onSubmit}>
        <h2>Delete Account</h2>
        <input type="password" {...register('password')} placeholder="Password" />
        <input type="password" {...register('confirmPassword')} placeholder="Confirm Password "/>
        <input type="submit" value="Update"/>
      </form>
    </div>
  );
}