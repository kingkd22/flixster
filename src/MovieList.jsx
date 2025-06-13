import MovieCard from "./MovieCard";
import SearchForm from "./SearchForm";
import { useEffect, useState } from "react";
import "./MovieList.css"

function MovieList({ global }) {

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
                Authorization: `Bearer ${apiKey}`
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
                    const updated = uniqueMovies.map((m) => ({
                        ...m,
                        liked: m.liked ?? false,
                        watched: m.watched ?? false,
                    }));
                    setSortedMovies(updated)
                    return updated;

                })
                    
            })
            .catch(err => console.error(err));

    }
    
    useEffect(() => {
        fetchFunction()
    }, [page, searchQuery]);

    useEffect(() => {
        sortMovies(movies, sortOption)
    }, [movies, sortOption])

    useEffect(() => {
        global(sortedMovies)
    }, [sortedMovies]);

    function handleSearch(query) {
        setSearchQuery(query);
        setPageNumber(1)
    }

    function loadMore() {
        const nextPage = page + 1;
        setPageNumber(nextPage);
        fetchFunction();
    }

    function resetPage() {
        setPageNumber(1);
        setSearchQuery('');
    }

    function sortMovies(movies, option) {
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

    function updateMovieStatus(id, updates) {
        setSortedMovies((prev) =>
            prev.map((movie) =>
            movie.id === id ? { ...movie, ...updates } : movie))
    }
    return (
        <div className="MovieList">
            <div className="searchContainer">
                <div className="sort">
                    <select onChange={(e) => setSortOption(e.target.value)}>
                        <option value="">Now Playing</option>
                        <option value="title">Title (A-Z)</option>
                        <option value="release_date">Release Date (Newest to Oldest)</option>
                        <option value="vote_average">Vote Average (High to Low)</option>
                    </select>
                </div>
                <div className="search">
                    <SearchForm onSearch={handleSearch} />
                    <button onClick={resetPage} className="resetButton">Clear</button>
                </div>
            </div>

            <main className="grid">
                <div className="grid">
                    {sortedMovies.length > 0 ? (
                        sortedMovies.map((movie) => (
                            <MovieCard
                                key={movie.id}
                                id={movie.id}
                                title={movie.title}
                                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                vote={movie.vote_average}
                                releaseDate={movie.release_date}
                                overview={movie.overview}
                                liked={movie.liked}
                                watched={movie.watched}
                                updateMovieStatus={updateMovieStatus}
                            />
                        ))
                    ) : (<p className="noResults">No Results Found.</p>

                    )}
                </div>
                <button type="button" onClick={loadMore} className="loadMore">Load More!</button>
            </main>
        </div>
    )
}

export default MovieList