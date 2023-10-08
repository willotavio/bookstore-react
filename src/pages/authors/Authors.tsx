import { useQuery } from "@tanstack/react-query";
import Axios from 'axios';
import { AuthorsList, Author } from "./AuthorsList";
import { useIsAuth } from "../../utilities/useIsAuth";
import { AuthorAddForm } from "./AuthorAddForm";
import { createContext } from "react";

interface AuthorContextTypes{
  authors: Author[];
  addAuthor: (data: Author) => Promise<boolean>;
}

export const AuthorContext = createContext<AuthorContextTypes>(
  {
    authors: [],
    addAuthor: async (): Promise<boolean> => {return false}
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

  return(
    <div>
      <AuthorContext.Provider value={{authors, addAuthor}}>
        <h1>Authors</h1>
        <AuthorsList />
        {
          userLogged &&
          <>
          <AuthorAddForm /> 
          </>
        }
      </AuthorContext.Provider>
    </div>
  );
}