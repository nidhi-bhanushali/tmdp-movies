import { Genre } from "../Genres/types";

export interface MovieObject {
  [key: string]: Array<Movie>;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  year: string;
  genre: Genre[];
  overview: string;
}
