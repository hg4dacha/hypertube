import React, { Fragment, useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import { useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import { useTranslation } from "react-i18next";
import {ImYoutube2} from 'react-icons/im';
import {VscStarEmpty} from 'react-icons/vsc';
import Cookies from 'js-cookie';
import axios from "axios";

import Header from "../Header/Header";



// const commentsList = [
//   {
//     userId: Math.random(),
//     userImage: 'https://avatars.dicebear.com/api/bottts/655352758863402.svg?backgroundColor=%23FFFF99',
//     userName: "user-432423",
//     userComment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//   },
//   {
//     userId: Math.random(),
//     userImage: 'https://avatars.dicebear.com/api/bottts/666200122851125.svg?backgroundColor=%23E6B333',
//     userName: "user-432423",
//     userComment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//   },
//   {
//     userId: Math.random(),
//     userImage: 'https://avatars.dicebear.com/api/bottts/156410818583639.svg?backgroundColor=%23B34D4D',
//     userName: "user-432423",
//     userComment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//   },
//   {
//     userId: Math.random(),
//     userImage: 'https://avatars.dicebear.com/api/bottts/17628617998533.svg?backgroundColor=%2366991A',
//     userName: "user-432423",
//     userComment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//   },
//   {
//     userId: Math.random(),
//     userImage: 'https://avatars.dicebear.com/api/bottts/561648701770521.svg?backgroundColor=%23FF1A66',
//     userName: "user-432423",
//     userComment: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//   }
// ]


const Movie = () => {

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user])

  const { t } = useTranslation();

  const [reactLoading, setReactLoading] = useState(false);

  const [movie, setMovie] = useState(null);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState('');

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  const handleNewComment = (e) => {
    e.preventDefault();

    if(comment !== '' && comment.length <= 1000)
    {
      setComments(prevState => [...prevState, {
        userId: Math.random(),
        userImage: 'https://avatars.dicebear.com/api/bottts/816383102966448.svg?backgroundColor=%23E666FF',
        userName: "user-432423",
        userComment: comment
      }]);
      setComment('');
    }
  }


  useEffect( () => {

    setReactLoading(true);
    axios.get(`https://imdb-api.com/${Cookies.get('i18next')}/API/Title/k_ds0uq7l5/${params.movieId}/FullCast`)
    .then( (response) => {
      setMovie(response.data);
      setReactLoading(false);
    })
    .catch( (error) => {
      navigate('/not-found');
    })

    return () => {
      setMovie([]);
    }
  
  }, [navigate, params.movieId])



    return(
        <Fragment>
            {reactLoading &&
            <ReactLoading className="react-loading" type='bars' color='#E50914' height={100} width={100} />}
          <Header />
          <div className="movie-content">
            {movie &&
            <div className="all-movie-data-content">
              <div className="movie-tittle-content">
                <h1 className="movie-tittle">{movie.title}</h1>
                <a href={`https://www.youtube.com/watch?v=${params.movieId}`} className="movie-yt-link"><ImYoutube2 className="movie-yt" /></a>
              </div>
              <div className="movie-info">
                {movie.image && <img src={movie.image} alt='movie' className="movie-image" />}
                <div className="movie-description">
                  <div>{movie.runtimeMins && `${movie.runtimeMins} min`}</div>
                  <div>{movie.genres && movie.genres}</div>
                  <div>{movie.year && movie.year}</div>
                  <div>{movie.imDbRating && `${movie.imDbRating}`}</div>
                  <p>
                    {Cookies.get('i18next') === 'en' ?
                    movie.plot :
                    movie.plotLocal}
                  </p>
                  <div>{movie.directors && `${t('director')}: ${movie.directors}`}</div>
                  <div>{movie.writers && `${t('producer')}: ${movie.writers}`}</div>
                  <div>{movie.stars && `${t('main_actors')}: ${movie.stars}`}</div>
                </div>
              </div>
            </div>}
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
                    <div className="write-comment">{t('write_comment')}</div>
                    <textarea
                        value={comment}
                        onChange={handleComment}
                        className='comment-textarea'
                        autoComplete='off'
                        minLength='1'
                        maxLength='1000'
                        autoCapitalize='on'
                        placeholder="..."
                    />
                  </div>
                  <button type='submit'className='send-comment-button' >
                    {t('button_confirm')}
                  </button>
                </div>
              </form>
              <div className="users-comments-content">
                {
                  comments.length < 1 ?
                  <div className="no-comments"><VscStarEmpty style={{marginRight: '3px'}}/>{t('no_comments')}</div> :
                  comments.slice(0).reverse().map( (comment) => {
                    return (
                      <div key={comment.userId} className="comment-container">
                        <div className="user-comment-info">
                          <div className='navbar-pp-content'>
                              <img src={comment.userImage} alt='user' className='navbar-pp-img'/>
                          </div>
                          <div className="user-comment-username">
                            {comment.userName}
                          </div>
                        </div>
                        <div className="user-comment">
                          {comment.userComment}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </Fragment>
    )
}

export default Movie;