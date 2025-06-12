import MovieCard from "./MovieCard";
import SearchForm from "./SearchForm";
import { useEffect, useState } from "react";
import "./MovieList.css"

function MovieList() {

    const [movies, setMovies] = useState([])
    const [page, setPageNumber] = useState(1)
    const [sortedMovies, setSortedMovies] = useState([])
    const [sortOption, setSortOption] = useState("")
    const [searchQuery, setSearchQuery] = useState('')

    
    const apiKey = import.meta.env.VITE_APP_API_KEY;

    
    function fetchFunction(customPage = page) {

        const url = searchQuery
            ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${customPage}`
            : `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${customPage}`;
        
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTRhNmZlNWVhZjM0YzliMWMyZjU1OTVkM2E5NjM0ZSIsIm5iZiI6MTc0OTUxMDExMi44MzMsInN1YiI6IjY4NDc2N2UwYjJjNGIyYTNjYTI5MzNiMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FeYMhPJ4tSfYRFRfKWNgfOC3LLum71gyOzfVUWxvBXw`
                }
        };
        
        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                setMovies(prevMovies => {
                    const combined = customPage > 1 
                        ? [...prevMovies, ...data.results] 
                        : data.results;
                    
                    const uniqueMovies = Array.from(
                        new Map(combined.map(movie => [movie.id, movie])).values()
                    );
                    return uniqueMovies;
                    
                });
            })
            .catch(err => console.error(err));

    }
    
    useEffect(() => {
        fetchFunction()
    }, [page, searchQuery]);

    useEffect(() => {
        sortMovies(movies, sortOption)
    }, [movies, sortOption])

    function handleSearch(query) {
        setSearchQuery(query);
        setPageNumber(1)
    }

    function loadMore() {
        const nextPage = page + 1;
        setPageNumber(nextPage);
    }

    function resetPage() {
        setPageNumber(1);
        setSearchQuery('');
    }

    function sortMovies(movieList, option) {
        let sorted = [...movies];

        if (option === "title") {
            sorted.sort((a, b) => a.title.localeCompare(b.title))
        } else if (option === "release_date") {
            sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        } else if (option === "vote_average") {
            sorted.sort((a, b) => b.vote_average - a.vote_average);
        }

        setSortedMovies(sorted);
    }

    return (
        <div className="MovieList">
            <header>
                <button onClick={resetPage} className="resetButton">Home</button>
                <SearchForm onSearch={handleSearch} />
                <div className="sort">
                    <select onChange={(e) => setSortOption(e.target.value)}>
                        <option value="">Sort By...</option>
                        <option value="title">Title (A-Z)</option>
                        <option value="release_date">Release Date (Newest to Oldest)</option>
                        <option value="vote_average">Vote Average (High to Low)</option>
                    </select>
                </div>
            </header>

            <main className="grid">
                <div className="grid">
                    {sortedMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            vote={movie.vote_average}
                            releaseDate={movie.release_date}
                            overview={movie.overview}
                        />
                    ))}
                </div>
                <button type="button" onClick={loadMore} className="loadMore">Load More!</button>
            </main>

        </div>
    )
}

export default MovieList