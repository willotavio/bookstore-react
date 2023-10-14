import '../../App.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext, handleFileSelect } from './Users';

export const UserAddForm = () => {

  const { addUser } = useContext(UserContext);

  const schema = yup.object({
    profilePicture: yup.mixed(),
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
    if(data.profilePicture.length > 0){
      try{
        const profilePictureBase64 = await handleFileSelect(data.profilePicture);
        data.profilePicture = profilePictureBase64;
      }
      catch(err){
        console.log(err);
      }
    }
    if(await addUser({id: "", ...data})){
      reset();
    }
  });

  return(
    <div>
      <form className='defaultForm' onSubmit={onSubmit}>
        <h2>Register new user</h2>
        <div className='profilePictureDiv'>
          <label className='profilePictureLabel' htmlFor='profilePicture'>Profile Picture</label>
          <input type="file" id='profilePicture' {...register('profilePicture')} accept='image/*' />  
        </div>
        <input type="text" {...register('name')} placeholder="Name" autoComplete='off' />
        <input type="email" {...register('email')} placeholder="Email" autoComplete='off' />
        <select {...register('role')}>
          <option>Select a role</option>
          <option value={1}>User</option>
          <option value={2}>Admin</option>
          <option value={3}>Main Admin</option>
        </select>
        <input type="password" {...register('password')} placeholder="Password" autoComplete='off' />
        <input type="password" {...register('confirmPassword')} placeholder="Confirm Password" autoComplete='off' />
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}