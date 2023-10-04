import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import Axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../App';

export const Login = () => {
  const { userLogged } = useContext(AppContext);

  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })
  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = handleSubmit( async (data) => {
    return await Axios.post('http://localhost:8080/auth', data).then((res) => {
      console.log(res.data.token);
      localStorage.getItem('token') && localStorage.removeItem('token');
      localStorage.setItem('token', res.data.token);
      navigate('/');
    })
    .catch((err) => console.log(err));
  });
  
  if(userLogged){
    navigate('/');
  }

  return(
    <div>
      <form onSubmit={onSubmit} className='loginForm'>
        <input type='text' {...register('email')} placeholder='Email' autoComplete='off'/>
        <input type='password' {...register('password')} placeholder='Password' />
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}