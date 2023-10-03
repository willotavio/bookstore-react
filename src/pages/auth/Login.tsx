import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const Login = () => {

  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(8).required()
  })

  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = handleSubmit( async (data) => {
    console.log(data);
  });

  return(
    <div className='login'>
      <form onSubmit={onSubmit} className='loginForm'>
        <input type='text' {...register('email')} placeholder='Email' autoComplete='off'/>
        <input type='password' {...register('password')} placeholder='Password' />
        <input type='submit' value='Login' />
      </form>
    </div>
  );
}