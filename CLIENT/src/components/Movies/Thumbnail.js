import React, {useState} from "react";
import { Link } from 'react-router-dom';
import { AiFillEye } from 'react-icons/ai';



const Thumbnail = ({id, picture, year, rating, vue }) => {


    const [thumbnailZoom, setThumbnailZoom] = useState(false);
    const handleZoom = () => { setThumbnailZoom(true); }
    const handleZoomOut = () => { setThumbnailZoom(false); }


    return(
        <div className={`thumbnail-container ${thumbnailZoom ? "zoom" : ""}`} onMouseOver={handleZoom} onMouseOut={handleZoomOut} >
            <Link to={id}>
                <div className='thumbnail-picture-content'>
                    <img src={picture} alt='user' className={`thumbnail-picture ${thumbnailZoom ? "zoom" : ""}`}/>
                </div>
                {vue &&
                <div className="vue-movie-content">
                    <AiFillEye className="vue-movie-logo" />
                </div>}
                {thumbnailZoom &&
                <div className="year-rating-content">
                    <div className="year">{year}</div>
                    <div className="rating">{`${rating}`}</div>
                </div>}
            </Link>
        </div>
    )
}

export default Thumbnail;