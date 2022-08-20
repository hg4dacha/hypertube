import React, { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import {useParams, useNavigate} from 'react-router-dom';
import {ImYoutube2} from 'react-icons/im';
import axios from "axios";

import defaultUser from '../../../src/images/defaultUser.jpg';



const Movie = () => {

  const params = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState();
  const [comment, setComment] = useState();

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  const handleNewComment = (e) => {
    e.preventDefault();

    setComment('');
  }

  useEffect( () => {
    axios.get(`http://www.omdbapi.com/?apikey=44c0c1d5&i=${params.movieId}`)
    .then( (response) => {
      setMovie(response.data);
  })
  .catch( (error) => {
    navigate('/not-found');
  })
  }, [])

    return(
        <div className="movie-content">
          <div className="movie-tittle-content">
            <h1 className="movie-tittle">FILM TITTLE</h1>
            <a href={`https://www.youtube.com/watch?v=${params.movieId}`} className="movie-yt-link"><ImYoutube2 className="movie-yt" /></a>
          </div>
          <div className="movie-info">
            <img src="https://yts.torrentbay.to/assets/images/movies/inside_the_mind_of_a_cat_2022/large-cover.jpg" alt='movie' className="movie-image" />
            <div className="movie-description">
              <div>{movie && movie.Runtime}</div>
              <div>Drama, Thriller</div>
              <div>1995</div>
              <div>6.5/10</div>
              <p>After a breakup, Wes ends up at a remote rest stop. He finds himself locked inside the bathroom with a mysterious figure speaking from an adjacent stall. Soon Wes realizes he is involved in a situation more terrible than he could imagine.","synopsis":"After a breakup, Wes ends up at a remote rest stop. He finds himself locked inside the bathroom with a mysterious figure speaking from an adjacent stall. Soon Wes realizes he is involved in a situation more terrible than he could imagine.</p>
          </div>
          </div>
          <div className="video-source-content">
            <video
              className="video-source"
              controls
              preload="auto"
              onPlay={() => console.log("PLAY!")}
            >
              <source src='' type="video/webm" />
            </video>
          </div>
          <div className="comments-content">
            <form className='form-comment' onSubmit={handleNewComment}>
              <div className="text-and-button-content">
                <div style={{position: 'relative'}}>
                  <div className="write-comment">Ecrire un commentaire</div>
                  <textarea
                      value={comment}
                      onChange={handleComment}
                      className='comment-textarea'
                      autoComplete='off'
                      minLength='1'
                      maxLength='500'
                      autoCapitalize='on'
                      placeholder="..."
                  />
                </div>
                <button type='submit'className='send-comment-button' >
                  send
                </button>
              </div>
            </form>
            <div className="users-comments-content">
              <div className="comment-container">
                <div className="user-comment-info">
                  <div className='navbar-pp-content'>
                      <img src={defaultUser} alt='user' className='navbar-pp-img'/>
                  </div>
                  <div className="user-comment-username">
                    user-2889
                  </div>
                </div>
                <div className="user-comment">
                  Super Film !
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Movie;