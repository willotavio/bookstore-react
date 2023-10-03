import { useQuery } from "@tanstack/react-query";
import Axios from "axios";
import { BooksList } from "./BooksList";
import { Book } from "./BooksList";

export const Books = () => {
  const { data: books, refetch: refecthBooks } = useQuery(['books'], () => {
    return Axios.get('http://localhost:8080/book').then((res) => {
      res.data.forEach((book: Book) => book.releaseDate = book.releaseDate.split("T")[0]);
      return res.data;
    }).catch((err) => console.log(err));
  });
  
  return(
    <div>
      <h1>Books</h1>
      {books && <BooksList books={books}/>}
    </div>
  );
}