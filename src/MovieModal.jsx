import { useEffect, useState } from "react";
import "./MovieModal.css"

const MovieModal =({ keyId, title, image, releaseDate, overview, onClose}) => {

    const [runtime, setRuntime] = useState(null)
    const [genres, setGenres] = useState([])
    const [trailer, setTrailer] = useState(null)

    const apiKey = import.meta.env.VITE_APP_API_KEY;

    const url = `https://api.themoviedb.org/3/movie/${keyId}?language=en-US`;
    const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
        }
    };

    const trailerUrl = `https://api.themoviedb.org/3/movie/${keyId}/videos?language=en-US`;

    useEffect(() => {
        if (!keyId) return;

        fetch(url, options)
            .then(res => res.json())
            .then(data => {
                console.log('Fetched Data:')
                setRuntime(data.runtime);
                setGenres(data.genres || []);
            })
            .catch(err => console.error('Movie API Error:', err));

        fetch(trailerUrl, options)
            .then(res => res.json())
            .then(data => {
                const trailerData = data.results?.find(
                    vid => vid.site === "YouTube" && vid.type === "Trailer"
                );
                setTrailer(trailerData?.key || null);
            })
            .catch(err => console.error("Trailer API Error", err))
    }, [keyId]);

    const runtimeHours = (minutes) => {
        if (!minutes) return "N/A"
        return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
    }
    return (
        <div className="modal" onClick={onClose}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                <h2>{title}</h2>
                <img src={image} alt={`${title} Poster`} />
                <p><strong>Release Date:</strong> {releaseDate}</p>
                <p><strong>Overview:</strong> {overview}</p>
                <p><strong>Genres:</strong> {genres.map(g => g.name).join(". ")}</p>
                <p><strong>Runtime:</strong> {runtimeHours(runtime)}</p>
                {trailer && (
                    <div className="trailer">
                        <iframe width="75%" 
                            height="315" 
                            src={`https://www.youtube.com/embed/${trailer}`} 
                            title="Movie Trailer" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </div>
                )}
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default MovieModal