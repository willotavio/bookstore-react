import '../../App.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from './Users';

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
        const profilePictureBase64 = await handleFileSelect(data.profilePicture as FileList);
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

  const handleFileSelect = (fileList: FileList): Promise<string> => {
    return new Promise((resolve, reject) => {
      const files = Array.from(fileList); // Convert FileList to an array
  
      if (files.length === 0) {
        reject(new Error('No files selected.'));
      }
  
      const reader = new FileReader();
      const base64Strings: string[] = [];
  
      reader.onload = function () {
        if (typeof reader.result === 'string') {
          const base64String = reader.result.split(',')[1]; // Extract base64 string (remove data URL prefix)
          if (base64String) {
            base64Strings.push(base64String);
          }
          if (base64Strings.length === files.length) {
            // Resolve the promise with the array of base64 strings
            resolve(base64Strings[0]);
          }
        }
      };
  
      reader.onerror = function (error) {
        // Reject the promise if there's an error reading the file
        reject(error);
      };
  
      // Read each file as a data URL (base64)
      files.forEach(file => {
        reader.readAsDataURL(file);
      });
    });
  }

  return(
    <div>
      <h2>Register new user</h2>
      <form className='defaultForm' onSubmit={onSubmit}>
        <input type="file" {...register('profilePicture')} accept='image/*'/>
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