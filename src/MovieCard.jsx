import MovieModal from "./MovieModal"
import "./MovieCard.css"
import { useState } from "react"

function MovieCard({ id, title, image, vote, releaseDate, overview, updateMovieStatus }) {

    const[isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const [liked, setLiked] = useState(false);
    const [watched, setWatched] = useState(false);

    const toggleLiked = () => {
        setLiked(!liked);
        updateMovieStatus(id, { liked: !liked });
    }

    const toggleWatched = () => {
        setWatched(!watched);
        updateMovieStatus(id, { watched: !watched})
    }

    return (
        <>
            <div className="card">
                <img src={image} alt={`${title} Poster`} onClick={handleOpen} />
                <h2 className="cardName">{title}</h2>
                <p className="cardVote">⭐️{vote}</p>

                <div className="cardButtons">
                    <button 
                        className={`likebutton ${liked ? 'active' : ''} `}
                        onClick={toggleLiked}
                    >
                        ❤️
                    </button>
                    <button className={`watchedbutton ${watched ? 'active' : ''}`}
                    onClick={toggleWatched}>
                        🎥
                    </button>
                </div>
                
            </div>

            {isOpen && (
                <MovieModal
                    keyId={id}
                    title={title}
                    image={image}
                    releaseDate={releaseDate}
                    overview={overview}
                    onClose={handleClose}
                />
            )}
            
        </>
        
    )
}

export default MovieCard