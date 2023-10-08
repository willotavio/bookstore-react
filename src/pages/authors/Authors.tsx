import { useQuery } from "@tanstack/react-query";
import Axios from 'axios';
import { AuthorsList, Author } from "./AuthorsList";
import { useIsAuth } from "../../utilities/useIsAuth";
import { AuthorAddForm } from "./AuthorAddForm";
import { Dispatch, createContext, useState } from "react";
import { AuthorUpdateForm } from "./AuthorUpdateForm";

interface AuthorContextTypes{
  authors: Author[];
  addAuthor: (data: Author) => Promise<boolean>;
  editAuthor: (id: string) => void;
  updateAuthor: (id: string, data: Author) => Promise<boolean>;
  selectedAuthor: Author;
  setSelectedAuthor: Dispatch<React.SetStateAction<Author>>;
}

export const AuthorContext = createContext<AuthorContextTypes>(
  {
    authors: [],
    addAuthor: async (): Promise<boolean> => {return false},
    editAuthor: () => {},
    updateAuthor: async (): Promise<boolean> => {return false},
    selectedAuthor: {} as Author,
    setSelectedAuthor: () => {}
  }
);

export const Authors = () => {
  const { userLogged } = useIsAuth();
  const { data: authors, refetch: refetchAuthors } = useQuery(['authors'], () => {
    return Axios.get('http://localhost:8080/author').then((res) => {
      res.data.forEach((author: Author) => author.birthDate = author.birthDate.split("T")[0]);
      return res.data;
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

  return(
    <div>
      <AuthorContext.Provider value={{authors, addAuthor, editAuthor, updateAuthor, selectedAuthor, setSelectedAuthor}}>
        <h1>Authors</h1>
        <AuthorsList />
        {
          userLogged &&
          <>
            <AuthorAddForm />
            {selectedAuthor.id && <AuthorUpdateForm />}
          </>
        }
      </AuthorContext.Provider>
    </div>
  );
}