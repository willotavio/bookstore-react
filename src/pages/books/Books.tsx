import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { BooksList } from "./BooksList";
import { Author } from "../authors/Authors";
import { Dispatch, SetStateAction, createContext, useState } from "react";
import { BookAddForm } from "./BookAddForm";
import { useIsAuth } from "../../utilities/useIsAuth";
import { BookUpdateForm } from "./BookUpdateForm";

export interface Book{
  id: string,
  title?: string,
  synopsis?: string,
  releaseDate?: string,
  price?: number,
  authorId?: string
}

interface BookContextTypes{
  books: Book[];
  refetchBooks: () => void;
  authors: Author[];
  refetchAuthors: () => void;
  addBook: (data: Book) => Promise<boolean>;
  editBook: (id: string) => void;
  updateBook: (id: string, data: Book) => Promise<boolean>;
  selectedBook: Book;
  setSelectedBook: Dispatch<SetStateAction<{ id: string; }>>;
  deleteBook: (id: string) => Promise<boolean>
}
export const BookContext = createContext<BookContextTypes>({
  books: [], 
  refetchBooks: () => {},
  authors: [], 
  refetchAuthors: () => {},
  addBook: async (): Promise<boolean> => {return false},
  editBook: () => {},
  updateBook: async (): Promise<boolean> => {return false},
  selectedBook: {} as Book,
  setSelectedBook: () => {},
  deleteBook: async (): Promise<boolean> => {return false}
});

export const Books = () => {
  const { userLogged, user } = useIsAuth();

  const { data: books, refetch: refetchBooks } = useQuery(['books'], async () => {
    return await Axios.get('http://localhost:8080/book').then((res) => {
      res.data.forEach((book: Book) => book.releaseDate ? book.releaseDate = book.releaseDate.split("T")[0] : "");
      return res.data;
    }).catch((err) => console.log(err));
  });
  const { data: authors, refetch: refetchAuthors } = useQuery(['authors'], async () => {
    return await Axios.get('http://localhost:8080/author').then((res) => {
      res.data.forEach((author: Author) => author.birthDate ? author.birthDate = author.birthDate.split("T")[0] : "");
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

  const [selectedBook, setSelectedBook] = useState<Book>({id: ''});
  const editBook = (id: string) => {
    const result = books.filter((book: Book) => book.id === id)[0];
    setSelectedBook(result);
  }

  const updateBook = async (id: string, data: Book) => {
    try{
      await Axios.put(`http://localhost:8080/book/${id}`, data, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
      refetchBooks();
      setSelectedBook({id: ''});
      return true;
    }
    catch(err){
      console.log(err);
      return false;
    }
  }

  const deleteBook = async (id: string) => {
    try{
      await Axios.delete(`http://localhost:8080/book/${id}`, {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
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
      <BookContext.Provider value={{books, refetchBooks, authors, refetchAuthors, addBook, editBook, updateBook, selectedBook, setSelectedBook, deleteBook}}>
        <h1>Books</h1>
        <BooksList />
        {
          userLogged && user.role >= 2 &&
          <>
            <BookAddForm />
            {selectedBook.id && <BookUpdateForm />}
          </>
        }
      </BookContext.Provider>
    </div>
  );
}