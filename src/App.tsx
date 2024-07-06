import { useCallback, useEffect, useRef, useState } from "react";
import { Movie, MovieObject } from "./MovieList/types";
import MovieList from "./MovieList";
import { Genre } from "./Genres/types";
import GenreList from "./Genres";
import styled from "styled-components";
import useIntersectionObserver from "./hooks/useIntersectionObserver";
import SearchInput from "./components/SearchInput";
import SearchResults from "./MovieList/SearchResults";
import { debounce } from "./helpers";
import { StyledMovieList } from "./commonStyles";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  > .logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 24px;
    background: #2c2c2c;
    h1 {
      color: #e50914;
      text-align: center;
    }
  }
`;

function App() {
  const [genreArray, setGenreArray] = useState<Genre[]>([]); // Default to Action genre
  const [fetchedGenres, setFetchedGenres] = useState<Genre[]>([]); // This will be a function that fetches genres from the API
  const [loading, setLoading] = useState(false);
  const genreIds = genreArray.map((genre) => genre.id);
  const genreQuery = genreIds.join("|");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const [years, setYears] = useState<number[]>([2012]);
  const [movies, setMovies] = useState<MovieObject>({}); // This will be an object of array of movie objects [{title: string, poster: string, year: string, genre: string}

  const fetchGenres = useCallback(async () => {
    const genreApiUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d&language=en`;
    const response = await fetch(genreApiUrl);
    const data = await response.json();
    setFetchedGenres(data.genres);
  }, []);

  const fetchMovies = useCallback(
    async (year: number) => {
      const movieApiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100&with_genres=${genreQuery}`;
      const response = await fetch(movieApiUrl);
      const data = await response.json();
      return data.results as Array<Movie>;
    },
    [genreQuery]
  );

  const fetchSearchResults = useCallback(async () => {
    const searchApiUrl = `https://api.themoviedb.org/3/search/movie?api_key=2dca580c2a14b55200e784d157207b4d&query=${search}&page=${pageNumber}`;
    setLoading(true);
    const res = await fetch(searchApiUrl);
    const data = await res.json();
    setSearchResults((prev) => [...prev, ...data.results]);
    setLoading(false);
  }, [pageNumber, search]);

  const loadMovies = useCallback(
    async (year: number) => {
      setLoading(true);
      const movies = await fetchMovies(year);
      setMovies((prev) => {
        return { ...prev, [year]: movies };
      });
      setLoading(false);
    },
    [fetchMovies]
  );

  const handleOnChange = debounce((e) => {
    setSearch(e.target.value);
  }, 500);

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    loadMovies(2012);
  }, [loadMovies]);

  useEffect(() => {
    if (genreQuery) {
      setYears([2012]);
      setMovies({});
      loadMovies(2012);
    }
  }, [genreQuery, loadMovies]);

  const handleScroll = useCallback(
    debounce(() => {
      if (loading) return;
      if (!containerRef.current) return;
      const container = containerRef.current;
      if (container.scrollTop === 0) {
        const firstYear = Math.min(...years);
        const newYear = firstYear - 1;
        setYears((prev) => [newYear, ...prev]);
        loadMovies(newYear);
        container.scrollTop = 200;
      }
    }, 200),
    [loading, loadMovies, years]
  );

  const [setObserver] = useIntersectionObserver(
    () => {
      if (!loading) {
        const lastYear = Math.max(...years);
        const newYear = lastYear + 1;
        if (!years.includes(newYear)) {
          setYears((prev) => [...prev, newYear]);
          loadMovies(newYear);
        }
      }
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    }
  );

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (search) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [fetchSearchResults, search]);

  return (
    <>
      <MainContainer>
        <div className="logo">
          <h1>Moviefix</h1>
          <SearchInput onChange={handleOnChange} type="text" width="320px" />
        </div>
        {search ? (
          <SearchResults
            searchResults={searchResults}
            fetchSearchResults={fetchSearchResults}
            loading={loading}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        ) : (
          <>
            <GenreList
              genres={fetchedGenres}
              setGenreArray={setGenreArray}
              genreIds={genreIds}
            />
            <StyledMovieList
              className="movie-list-container"
              ref={containerRef}
            >
              {years?.map((year) => (
                <MovieList key={year} year={year} movies={movies?.[year]} />
              ))}
              <div ref={setObserver} className="sentinel"></div>
            </StyledMovieList>
          </>
        )}
      </MainContainer>
    </>
  );
}

export default App;
