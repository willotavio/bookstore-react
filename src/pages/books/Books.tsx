import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { BooksList } from "./BooksList";
import { Book } from "./BooksList";
import { Author } from "../authors/AuthorsList";
import { createContext } from "react";
import { BookAddForm } from "./BookAddForm";
import { useIsAuth } from "../../utilities/useIsAuth";

interface BookContextTypes{
  books: Book[];
  refetchBooks: () => void;
  authors: Author[];
  refetchAuthors: () => void;
  addBook: (data: Book) => Promise<boolean>;
}
export const BookContext = createContext<BookContextTypes>({
  books: [], 
  refetchBooks: () => {}, 
  authors: [], 
  refetchAuthors: () => {},
  addBook: async (): Promise<boolean> => {return false}
});

export const Books = () => {
  const { userLogged } = useIsAuth();

  const { data: books, refetch: refetchBooks } = useQuery(['books'], async () => {
    return await Axios.get('http://localhost:8080/book').then((res) => {
      res.data.forEach((book: Book) => book.releaseDate = book.releaseDate.split("T")[0]);
      return res.data;
    }).catch((err) => console.log(err));
  });
  const { data: authors, refetch: refetchAuthors } = useQuery(['authors'], async () => {
    return await Axios.get('http://localhost:8080/author').then((res) => {
      res.data.forEach((author: Author) => author.birthDate = author.birthDate.split("T")[0]);
      return res.data;
    }).catch((err) => console.log(err));
  });

  const addBook = async (data: Book) => {
    try{
      await Axios.post('http://localhost:8080/book', data, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
      refetchBooks();
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }
  
  return(
    <div>
      <BookContext.Provider value={{books, refetchBooks, authors, refetchAuthors, addBook}}>
        <h1>Books</h1>
        <BooksList />
        {
          userLogged &&
          <BookAddForm />
        }
      </BookContext.Provider>
    </div>
  );
}