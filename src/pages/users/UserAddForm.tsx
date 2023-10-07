import '../../App.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from './Users';

export const UserAddForm = () => {

  const { addUser } = useContext(UserContext);

  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    role: yup.number().required(),
    password: yup.string().min(8).required(),
    confirmPassword: yup.string().oneOf([yup.ref('password')]).required()
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = handleSubmit( async (data) => {
    if(await addUser({id: "", ...data})){
      reset();
    }
  });

  return(
    <div>
      <h2>Register new user</h2>
      <form className='defaultForm' onSubmit={onSubmit}>
        <input type="text" {...register('name')} placeholder="Name" autoComplete='off' />
        <input type="email" {...register('email')} placeholder="Email" autoComplete='off' />
        <input type="number" {...register('role')} placeholder="Role" autoComplete='off' />
        <input type="password" {...register('password')} placeholder="Password" autoComplete='off' />
        <input type="password" {...register('confirmPassword')} placeholder="Confirm Password" autoComplete='off' />
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}