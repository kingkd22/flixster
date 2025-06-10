import "./MovieCard.css"


function MovieCard({ title, image, vote }) {

    return (
        <div className="MovieCard">
            <img src={image} alt={`${title} Poster`} />
            <h2 className="cardName">{title}</h2>
            <p className="cardVote">🎥{vote}</p>

        </div>
        
        


        
    )
}

export default MovieCard