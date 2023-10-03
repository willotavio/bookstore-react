import { useQuery } from "@tanstack/react-query";
import Axios from 'axios';
import { AuthorsList, Author } from "./AuthorsList";

export const Authors = () => {
  const { data: authors, refetch: refetchAuthors } = useQuery(['authors'], () => {
    return Axios.get('http://localhost:8080/author').then((res) => {
      res.data.forEach((author: Author) => author.birthDate = author.birthDate.split("T")[0]);
      return res.data;
    }).catch((err) => console.log(err));
  });
  return(
    <div>
      <h1>Authors</h1>
      {authors && <AuthorsList authors={authors}/>}
    </div>
  );
}