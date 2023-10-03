import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { BooksList } from "./BooksList";
import { Book } from "./BooksList";
import { Author } from "../authors/AuthorsList";

export const Books = () => {
  const { data: books, refetch: refecthBooks } = useQuery(['books'], () => {
    return Axios.get('http://localhost:8080/book').then((res) => {
      res.data.forEach((book: Book) => book.releaseDate = book.releaseDate.split("T")[0]);
      return res.data;
    }).catch((err) => console.log(err));
  });
  const { data: authors, refetch: refetchAuthors } = useQuery(['authors'], () => {
    return Axios.get('http://localhost:8080/author').then((res) => {
      res.data.forEach((author: Author) => author.birthDate = author.birthDate.split("T")[0]);
      return res.data;
    }).catch((err) => console.log(err));
  });
  
  return(
    <div>
      <h1>Books</h1>
      {books && <BooksList books={books} authors={authors}/>}
    </div>
  );
}