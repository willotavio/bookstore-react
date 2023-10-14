import '../../App.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { BookContext } from './Books';

export const BookAddForm = () => {

  const { books, authors, addBook, selectedBook } = useContext(BookContext);

  const schema = yup.object({
    title: yup.string().required(),
    synopsis: yup.string().required(),
    releaseDate: yup.string().required(),
    price:  yup.number().required(),
    authorId: yup.string().required()
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = handleSubmit( async (data) => {
    if(await addBook({id: '', ...data})){
      reset();
    }
  });

  return(
    <div>
      <form className='defaultForm' onSubmit={onSubmit}>
        <h2>Register new book</h2>
        <input type="text" {...register('title')} placeholder="Title" autoComplete='off' />
        <textarea {...register('synopsis')} placeholder="Synopsis" autoComplete='off' />
        <input type="date" {...register('releaseDate')} placeholder="Release Date" autoComplete='off' />
        <input type="number" {...register('price')} placeholder="Price" autoComplete='off' />
        <select {...register('authorId')}>
          <option value=''>Select an author</option>
          {
            authors?.map((author) => (
              <option value={author.id} key={author.id}>{author.name}</option>
            ))
          }
        </select>
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}