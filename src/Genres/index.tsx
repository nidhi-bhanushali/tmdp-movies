import styled from "styled-components";
import { Genre } from "./types";

interface GenreListProps {
  genres: Genre[];
  genreIds: number[];
  setGenreArray: React.Dispatch<React.SetStateAction<Genre[]>>;
}

const GenreContainer = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  position: sticky;
  top: 0;
  background-color: #2c2c2c;
  padding: 0px 12px;
  div {
    display: flex;
    align-items: center;
    align-self: center;
    padding: 8px;
    margin: 5px;
    color: #fff;
    border: 1px solid rgb(60, 62, 68);
    border-radius: 4px;
    cursor: pointer;
    background-color: rgb(60, 62, 68);
    &:hover {
      background-color: #e50914;
    }
    &.selected {
      background-color: #e50914;
    }
  }
`;

const GenreList = (props: GenreListProps) => {
  const { genres, genreIds, setGenreArray } = props;
  return (
    <GenreContainer>
      {genres?.map((genre) => {
        return (
          <div
            className={genreIds?.includes(genre.id) ? "selected" : ""}
            key={genre.id}
            onClick={() => setGenreArray((prev) => [...prev, genre])}
          >
            {genre.name}
          </div>
        );
      })}
    </GenreContainer>
  );
};

export default GenreList;
