import styled from "styled-components";
import spinningGif from "../assets/spinner.gif";
import MovieItem from "./Movie";
import { Movie } from "./types";

interface MovieListProps {
  movies: Movie[] | undefined;
  year: number;
}

export const StyledGrid = styled.div`
  padding: 20px 0px 50px 0px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  column-gap: 12px;
  justify-content: center;
  > h2 {
    color: #fff;
    text-align: center;
  }
`;

const MovieList = (props: MovieListProps) => {
  const { movies, year } = props;
  return (
    <>
      <h2>{year}</h2>
      <StyledGrid className="movies">
        {movies ? (
          movies.map((movie) => <MovieItem key={movie.id} {...movie} />)
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "80vh",
            }}
          >
            <img alt="Saving" src={spinningGif} height={120} width={120} />
          </div>
        )}
      </StyledGrid>
    </>
  );
};

export default MovieList;
