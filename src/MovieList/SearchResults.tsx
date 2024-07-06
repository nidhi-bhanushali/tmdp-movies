import { Movie } from "./types";
import MovieItem from "./Movie";
import spinningGif from "../assets/spinner.gif";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import { StyledGrid } from ".";
import { StyledMovieList } from "../commonStyles";

interface SearchResultsProps {
  searchResults: Array<Movie>;
  fetchSearchResults: () => Promise<void>;
  loading: boolean;
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}

const SearchResults = (props: SearchResultsProps) => {
  const { searchResults, loading, setPageNumber } = props;

  const [setObserver] = useIntersectionObserver(
    () => {
      if (!loading) {
        setPageNumber((prev) => prev + 1);
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  return (
    <StyledMovieList height="calc(100vh - 75px)">
      <h2>Search Results</h2>
      <StyledGrid className="movies">
        {searchResults?.length > 0 ? (
          searchResults.map((movie) => <MovieItem key={movie.id} {...movie} />)
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
      <div ref={setObserver} className="sentinel"></div>
    </StyledMovieList>
  );
};

export default SearchResults;
