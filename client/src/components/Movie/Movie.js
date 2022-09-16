import React, { Fragment, useEffect, useState } from "react";
import {useParams, useNavigate} from 'react-router-dom';
import Player from "./Player";
import { useSelector } from "react-redux";
import ReactLoading from 'react-loading';
import { useTranslation } from "react-i18next";
import {ImYoutube2} from 'react-icons/im';
import {VscStarEmpty} from 'react-icons/vsc';
import {BsPlayFill} from 'react-icons/bs';
import {BiBlock} from 'react-icons/bi';
import axios from "axios";

import Header from "../Header/Header";



const Movie = () => {

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [navigate, user])

  const headers = {
    'x-access-token': user && user.token
  }

  const { t } = useTranslation();

  const [reactLoading, setReactLoading] = useState(false);

  const [movie, setMovie] = useState(null);
  const [torrents, setTorrents] = useState(null)
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(null);
  const [download, setDownload] = useState(false);
  const [stream, setStream] = useState(false);






                              // torrents
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  const handleDownload = () => {

    if (torrents.yts || torrents.torrentProject) {
      const torrent = torrents.yts || torrents.torrentProject;
      setStream(`http://localhost:5000/movies/${params.movieId}/${user.id}/${torrent[0].source}?magnet=${torrent[0].magnet}`);
      setDownload(true);
    }
  
  }
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*





                            // COMMENTS
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*
  const handleComment = (e) => {
    setComment(e.target.value);
  }

  const handleNewComment = (e) => {
    e.preventDefault();

    if(comment !== '' && comment.length <= 1000)
    {
      axios.post('comments', {
        movieId: params.movieId,
        comment: comment
      } , { headers: headers })
      .then( (response) => {

        setComments(prevState => [...prevState, {
          userId: user.id,
          userImage: user.image,
          username: user.username,
          comment: comment
        }]);
        setComment('');

      })
      .catch( (error) => {

      })
    }
  }
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*




  useEffect( () => {

    setReactLoading(true);

    axios.get(`movies/data?movieId=${params.movieId}`, { headers: headers })
    .then( (response) => {
      setMovie(response.data.infos);
      setTorrents(response.data.torrents);
      setComments(response.data.comments);
      setReactLoading(false);
    })
    .catch( error => {
      navigate('/not-found');
    })

    return () => {
      setMovie([]);
    }

  // eslint-disable-next-line
  }, [])



    return(
        <Fragment>
            {reactLoading &&
            <ReactLoading className="react-loading" type='bars' color='#E50914' height={100} width={100} />}
          <Header />
          {/* ↓↓↓ MOVIE INFOS ↓↓↓ */}
          <div className="movie-content">
            { movie &&
              <div className="all-movie-data-content">
                <div className="movie-tittle-content">
                  <h1 className="movie-tittle">{movie.title && movie.title}</h1>
                  {movie.title && <a href={`https://www.youtube.com/watch?v=${params.movieId}`} className="movie-yt-link"><ImYoutube2 className="movie-yt" /></a>}
                </div>
                <div className="movie-info">
                  {movie.image && <img src={movie.image} alt='movie' className="movie-image" />}
                  <div className="movie-description">
                    <div>{movie.runtimeMins && `${movie.runtimeMins} min`}</div>
                    <div>{movie.genres && movie.genres}</div>
                    <div>{movie.year && movie.year}</div>
                    <div>{movie.imDbRating && `${movie.imDbRating}`}</div>
                    <p>{movie.plot}</p>
                    <div>{movie.directors && `${t('director')}: ${movie.directors}`}</div>
                    <div>{movie.writers && `${t('producer')}: ${movie.writers}`}</div>
                    <div>{movie.stars && `${t('main_actors')}: ${movie.stars}`}</div>
                  </div>
                </div>
              </div> }
            {/* ↓↓↓ TORRENT DOWNLOAD ↓↓↓ */}
            {
              torrents === null || download ? null :
              <div className="torrents-content">
                {
                  torrents.yts.length > 0 || torrents.torrentProject.length > 0 ?
                    <button
                      onClick={handleDownload}
                      className="button-play"
                    >
                      {t('watch')}
                      <BsPlayFill className="icon-play" />
                    </button> :
                  <div className="unavailable-movie"><BiBlock />{t('unavailable_movie')}</div>
                }
              </div>
            }
            {/* ↓↓↓ VIDEO PLAYER ↓↓↓ */}
            {
              (download && stream) &&
              <Player
                headers={headers}
                download={download}
                movieId={params.movieId}
                stream={stream}
              />
            }
            {/* ↓↓↓ COMMENT FROM ↓↓↓ */}
            {
            comments === null ? null :
            <div className="comments-content">
              <form className='form-comment' onSubmit={handleNewComment}>
                <div className="text-and-button-content">
                  <div className="text-and-button-content-children">
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
              {/* ↓↓↓ DISPLAYING COMMENTS ↓↓↓ */}
              {
                comments.length < 1 ?
                <div className="users-comments-content">
                  <div className="no-comments">
                    <VscStarEmpty style={{marginRight: '3px'}}/>
                    {t('no_comments')}
                  </div>
                </div> :
                <div className="users-comments-content">
                  {comments.slice(0).reverse().map( (comment, index) => {
                    return (
                      <div key={index} className="comment-container">
                        <div className="user-comment-info">
                          <div className='navbar-pp-content'>
                              <img src={comment.userImage} alt='user' className='navbar-pp-img'/>
                          </div>
                          <div className="user-comment-username">
                            {comment.username}
                          </div>
                        </div>
                        <div className="user-comment">
                          {comment.comment}
                        </div>
                      </div>
                      
                    )
                  })}
                </div>
              }
            </div>}


          </div>
        </Fragment>
    )
}

export default Movie;