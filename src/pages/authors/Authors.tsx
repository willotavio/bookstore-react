import { useQuery } from "@tanstack/react-query";
import Axios from 'axios';
import { AuthorsList } from "./AuthorsList";
import { useIsAuth } from "../../utilities/useIsAuth";
import { AuthorAddForm } from "./AuthorAddForm";
import { Dispatch, createContext, useState } from "react";
import { AuthorUpdateForm } from "./AuthorUpdateForm";

export interface Author{
  id: string,
  name: string,
  biography: string,
  birthDate: string
}

interface AuthorContextTypes{
  authors: Author[];
  addAuthor: (data: Author) => Promise<boolean>;
  editAuthor: (id: string) => void;
  updateAuthor: (id: string, data: Author) => Promise<boolean>;
  selectedAuthor: Author;
  setSelectedAuthor: Dispatch<React.SetStateAction<Author>>;
  deleteAuthor: (id: string) => Promise<boolean>
}

export const AuthorContext = createContext<AuthorContextTypes>(
  {
    authors: [],
    addAuthor: async (): Promise<boolean> => {return false},
    editAuthor: () => {},
    updateAuthor: async (): Promise<boolean> => {return false},
    selectedAuthor: {} as Author,
    setSelectedAuthor: () => {},
    deleteAuthor: async (): Promise<boolean> => {return false}
  }
);

export const Authors = () => {
  const { userLogged, user } = useIsAuth();
  const { data: authors, refetch: refetchAuthors } = useQuery(['authors'], async () => {
    return await Axios.get('http://localhost:8080/author').then((res) => {
      res.data.authors.forEach((author: Author) => author.birthDate = author.birthDate.split("T")[0]);
      return res.data.authors;
    }).catch((err) => console.log(err));
  });

  const addAuthor = async (data: Author) => {
    try{
      await Axios.post('http://localhost:8080/author', data, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
      refetchAuthors();
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  const [selectedAuthor, setSelectedAuthor] = useState<Author>({} as Author);
  const editAuthor = (id: string) => {
    const result: Author = authors.filter((author: Author) => author.id === id)[0];
    setSelectedAuthor(result);
  }
  const updateAuthor = async (id: string, data: Author) => {
    try{
      await Axios.put(`http://localhost:8080/author/${id}`, data, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
      refetchAuthors();
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  const deleteAuthor = async (id: string) => {
    try{
      await Axios.delete(`http://localhost:8080/author/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
      refetchAuthors();
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  return(
    <div>
      <AuthorContext.Provider value={{authors, addAuthor, editAuthor, updateAuthor, selectedAuthor, setSelectedAuthor, deleteAuthor}}>
        <h1>Authors</h1>
        <AuthorsList />
        {
          userLogged && user.role >= 2 &&
          <>
            <AuthorAddForm />
            {selectedAuthor.id && <AuthorUpdateForm />}
          </>
        }
      </AuthorContext.Provider>
    </div>
  );
}