import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext } from 'react';
import { AuthorContext } from './Authors';
import { Author } from './AuthorsList';
export const AuthorAddForm = () => {

  const { addAuthor } = useContext(AuthorContext);

  const schema = yup.object({
    name: yup.string().required(),
    biography: yup.string().required(),
    birthDate: yup.string().required()
  });

  const { register, handleSubmit, reset, setValue, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit(  async (data) => {
    if(await addAuthor(data as Author)){
      reset();
    }
  });

  return(
    <div>
      <h2>Register new author</h2>
      <form onSubmit={onSubmit} className='defaultForm'>
        <input type='text' {...register('name')} placeholder='Name' autoComplete='off' />
        <textarea {...register('biography')} placeholder='Biography' autoComplete='off' />
        <input type='date' {...register('birthDate')} />
        <input type='submit' value='Register'/>
      </form>
    </div>
  );
}