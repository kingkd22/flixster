import MovieCard from "./MovieCard";
import "./MovieList.css"
import "./MovieCard.css"

function Favorites( {movies}) {
    if (!movies) return <p>You have no favorites...</p>

    const likedMovies = movies.filter(movie => movie.liked)

    return (
        <div className="grid">
            {likedMovies.map((movie) => (
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