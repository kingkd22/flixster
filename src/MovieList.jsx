import MovieCard from "./MovieCard";
import { useEffect, useState } from "react";
import "./MovieList.css"

function MovieList() {

    let [movies, setMovies] = useState([])
    let [page, setPageNumber] = useState(1)
    const apiKey = import.meta.env.VITE_APP_API_KEY;

    
    function fetchFunction () {

        const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
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
                setMovies(prevMovies => [...prevMovies, ...data.results]);
                console.log(movies)
            })
            .catch(err => console.error(err));



    }
    
    useEffect(() => {
        fetchFunction()
    }, []);

    function loadMore() {
        console.log("inside load more")
        const nextPage = page + 1;
        setPageNumber(nextPage)
        console.log(nextPage)
        fetchFunction();
    }



    return (
        <div className="MovieList">
            <header>
                <h1>Flixster</h1>
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