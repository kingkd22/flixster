import MovieCard from "./MovieCard";

function Favorites( {movies}) {
    if (!movies) return <p>You have no watched movies...</p>

    const watchedMovies = movies.filter(movie => movie.watched)

    return (
        <div className="grid">
            {watchedMovies.map((movie) => (
                <MovieCard 
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    vote={movie.vote_average}
                    releaseDate={movie.release_date}
                    overview={movie.overview} />
            ))}
        </div>
    )
}

export default Favorites