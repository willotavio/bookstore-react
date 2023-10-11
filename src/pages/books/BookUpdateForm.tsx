import '../../App.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { BookContext } from './Books';
import { Book } from './Books';

export const BookUpdateForm = () => {

  const { authors, updateBook, selectedBook, setSelectedBook } = useContext(BookContext);

  const schema = yup.object({
    title: yup.string(),
    synopsis: yup.string(),
    releaseDate: yup.string(),
    price:  yup.number(),
    authorId: yup.string()
  });

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = handleSubmit( async (data) => {
    const updatedBook: Book = {id: ''};
    if(data.title && data.title.length > 0){
      updatedBook.title = data.title;
    }
    if(data.synopsis && data.synopsis.length > 0){
      updatedBook.synopsis = data.synopsis;
    }
    if(data.releaseDate && data.releaseDate.length > 0){
      updatedBook.releaseDate = data.releaseDate;
    }
    if(data.price && data.price >= 0){
      updatedBook.price = data.price;
    }
    if(data.authorId && data.authorId.length > 0){
      updatedBook.authorId = data.authorId;
    }
    if(await updateBook(selectedBook.id, updatedBook)){
      reset();
    }
  });
  
  useEffect(() => {
    setValue("title", selectedBook.title || "");
    setValue("synopsis", selectedBook.synopsis || "");
    setValue("releaseDate", selectedBook.releaseDate || "");
    setValue("price", selectedBook.price || 0);
    setValue("authorId", selectedBook.authorId || "");
  }, [selectedBook]);

  return(
    <div>
      <h2>Update book <button className='closeUpdateForm' onClick={() => setSelectedBook({id: ''})}>X</button></h2>
      <form className='defaultForm' onSubmit={onSubmit}>
        {selectedBook.title && <span>Editing book: {selectedBook.title}</span>}
        <input type="text" {...register('title')} placeholder="Title" autoComplete='off' />
        <textarea {...register('synopsis')} placeholder="Synopsis" autoComplete='off' />
        <input type="date" {...register('releaseDate')} placeholder="Release Date" autoComplete='off' />
        <input type="number" {...register('price')} placeholder="Price" autoComplete='off' />
        <select {...register('authorId')}>
          <option value=''>Select an author</option>
          {
            authors?.map((author) => (
              <option value={author.id}>{author.name}</option>
            ))
          }
        </select>
        <input type="submit" value="Register"/>
      </form>
    </div>
  );
}