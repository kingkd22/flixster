import MovieCard from "./MovieCard";
import SearchForm from "./SearchForm";
import { useEffect, useState } from "react";
import "./MovieList.css"

function MovieList() {

    let [movies, setMovies] = useState([])
    let [page, setPageNumber] = useState(1)
    const apiKey = import.meta.env.VITE_APP_API_KEY;
    const [searchQuery, setSearchQuery] = useState('')

    
    function fetchFunction() {

        const url = searchQuery
            ? `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&page=${page}`
            : `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
        
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
                setMovies(prevMovies => (page > 1 ? [...prevMovies, ...data.results] : data.results));
                console.log(movies)
            })
            .catch(err => console.error(err));

    }
    
    useEffect(() => {
        fetchFunction()
    }, [page, searchQuery]);

    function handleSearch(query) {
        setSearchQuery(query);
        setPageNumber(1)
    }

    function loadMore() {
        const nextPage = page + 1;
        setPageNumber(nextPage)
        fetchFunction();
    }

    return (
        <div className="MovieList">
            <header>
                <SearchForm onSearch={handleSearch} />
            </header>

            <main className="grid">
                <div className="grid">
                    {movies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            title={movie.title}
                            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            vote={movie.vote_average}
                        />
                    ))}
                </div>
                <button type="button" onClick={loadMore} className="loadMore">Load More!</button>
            </main>

        </div>
    )
}

export default MovieList