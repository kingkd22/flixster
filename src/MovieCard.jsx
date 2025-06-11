import MovieModal from "./MovieModal"
import "./MovieCard.css"
import { useState } from "react"

function MovieCard({ id, title, image, vote, releaseDate, overview }) {

    const[isOpen, setIsOpen] = useState(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    return (
        <>
            <div className="card" onClick={handleOpen}>
                <img src={image} alt={`${title} Poster`} />
                <h2 className="cardName">{title}</h2>
                <p className="cardVote">🎥{vote}</p>
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