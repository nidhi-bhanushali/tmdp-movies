import styled from "styled-components";
import { Movie } from "./types";

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 12px 0px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  @media (max-width: 650px) and (min-width: 430px) {
    width: 100%;
  }
`;

const StyledImage = styled.img`
  width: 100%;
  margin: 0px;
  opacity: 1;
  transition: opacity 0.5s ease 0s;
  object-position: center center;
`;

export const InfoCard = styled.div`
  padding: 20px;
  color: #ffff;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  p {
    margin: 0px;
  }
  .text-gray {
    color: rgb(158, 158, 158);
  }
`;

const MovieItem = (props: Movie) => {
  const { title, poster_path, overview } = props;
  return (
    <MovieCard>
      <StyledImage
        src={`https://image.tmdb.org/t/p/w200${poster_path}`}
        alt={title}
      />

      <InfoCard>
        <div>
          <h2>{title}</h2>
          <p>{overview}</p>
        </div>
      </InfoCard>
    </MovieCard>
  );
};

export default MovieItem;
