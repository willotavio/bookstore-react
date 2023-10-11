import '../../App.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { User, handleFileSelect } from '../users/Users';
import Axios from 'axios';
import { useIsAuth } from '../../utilities/useIsAuth';
import { useNavigate, Navigate } from 'react-router-dom';

export const Register = () => {

  const { userLogged } = useIsAuth();
  const navigate = useNavigate();

  const registerAccount = async (data: User) => {
    try{
      await Axios.post('http://localhost:8080/user/register', data);
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required(),
    profilePicture: yup.mixed()
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = handleSubmit( async (data) => {
    const newUser: User = { id: "", role: 1, ...data};
    if(data.profilePicture){
      try{
        const profilePictureBase64 = await handleFileSelect(data.profilePicture);
        newUser.profilePicture = profilePictureBase64;
      }
      catch(err){
        console.log(err);
      }
    }
    if(await registerAccount(newUser)){
      reset();
      navigate('/login');
    }
  });

  if(userLogged){
    return <Navigate to={'/'}/>
  }

  return(
    <div>
      <h2>Create new account</h2>
      <form className='defaultForm' onSubmit={onSubmit}>
        <input type="file" accept="image/*" {...register('profilePicture')}/>
        <input type="text" {...register('name')} placeholder="Name" autoComplete='off' />
        <input type="email" {...register('email')} placeholder="Email" autoComplete='off' />
        <input type="password" {...register('password')} placeholder="Password" autoComplete='off' />
        <input type="password" {...register('confirmPassword')} placeholder="Confirm Password" autoComplete='off' />
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}