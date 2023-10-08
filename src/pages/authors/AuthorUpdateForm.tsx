import { useContext, useEffect } from "react";
import { AuthorContext } from "./Authors";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Author } from "./AuthorsList";

export const AuthorUpdateForm = () => {
  const { updateAuthor, selectedAuthor, setSelectedAuthor } = useContext(AuthorContext);

  const schema = yup.object({
    name: yup.string(),
    biography: yup.string(),
    birthDate: yup.string()
  });

  const { register, handleSubmit, reset, setValue, formState: {errors} } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = handleSubmit( async(data) => {
    const updatedAuthor: Author = {} as Author;
    if(data.name && data.name?.length > 0){
      updatedAuthor.name = data.name;
    }
    if(data.biography && data.biography?.length > 0){
      updatedAuthor.biography = data.biography;
    }
    if(data.birthDate && data.birthDate?.length > 0){
      updatedAuthor.birthDate = data.birthDate;
    }
    if(await updateAuthor(selectedAuthor.id, updatedAuthor)){
      reset();
    }
  });

  useEffect(() => {
    setValue('name', selectedAuthor.name);
    setValue('biography', selectedAuthor.biography);
    setValue('birthDate', selectedAuthor.birthDate);
  }, [selectedAuthor]);

  return(
    <div>
      <h2>Update author <button className='closeUpdateForm' onClick={() => setSelectedAuthor({id: ''} as Author)}>X</button></h2>
      <form onSubmit={onSubmit} className='defaultForm'>
        <input type='text' {...register('name')} placeholder='Name' autoComplete='off' />
        <textarea {...register('biography')} placeholder='Biography' autoComplete='off' />
        <input type='date' {...register('birthDate')} />
        <input type='submit' value='Register'/>
      </form>
    </div>
  );
}