import '../../App.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { UserContext } from './Users';

export const UserUpdateForm = () => {

  const { updateUser, selectedUser } = useContext(UserContext);

  const schema = yup.object({
    name: yup.string(),
    email: yup.string().email(),
    role: yup.number(),
    password: yup.string()
  });

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = handleSubmit( async (data) => {
    if(await updateUser(selectedUser.id, {id: "", ...data})){
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
      <h2>Update user</h2>
      <form className='defaultForm' onSubmit={onSubmit}>
        {selectedUser.email && <span>Editing user: {selectedUser.email}</span>}
        <input type="text" {...register('name')} placeholder="Name" autoComplete='off' />
        <input type="email" {...register('email')} placeholder="Email" autoComplete='off' />
        <input type="number" {...register('role')} placeholder="Role" autoComplete='off' />
        <input type="password" {...register('password')} placeholder="Password" autoComplete='off' />
        <input type="submit" value="Update"/>
      </form>
    </div>
  );
}