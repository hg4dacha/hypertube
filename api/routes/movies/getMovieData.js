const createError = require("http-errors");
const axios = require("axios");
const Comment = require("../../schemas/comment");
const User = require("../../schemas/user");
const mongoose = require("mongoose");




async function getMovieData(req, res, next) {

    try {
        
        if(req.query.movieId) {
            
            const movieId = req.query.movieId;
            const userLanguage = req.user.language;


            // *-*-*-*-*-*-*
            // movie infos *

            let infos;

            const infoResponse = await axios.get(
                `https://imdb-api.com/${userLanguage}/API/Title/${process.env.IMDB_KEY}/${movieId}/FullCast`
            );

            if (infoResponse.status === 200 && !infoResponse.data.errorMessage) {
                infos = {
                    title: infoResponse.data.title,
                    image: infoResponse.data.image,
                    runtimeMins: infoResponse.data.runtimeMins,
                    genres: infoResponse.data.genres,
                    year: infoResponse.data.year,
                    imDbRating: infoResponse.data.imDbRating,
                    plot: userLanguage === 'en' ? infoResponse.data.plot : infoResponse.data.plotLocal,
                    directors: infoResponse.data.directors,
                    writers: infoResponse.data.writers,
                    stars: infoResponse.data.stars
                }
            }
            else {
                return next(createError(404, "INVALID_MOVIE_ID"));
            }


            // *-*-*-*-*-*
            // torrents  *

            // YTS
            const ytsResponse = await axios.get(
                `https://yts.torrentbay.to/api/v2/movie_details.json?imdb_id=${movieId}`
            );

            let ytsTorrent = [];
            
            if(ytsResponse.status === 200) {
                
                const ytsTorrentsResponse = ytsResponse.data.data.movie.torrents || [];
                
                if (ytsTorrentsResponse.length > 0) {

                    const currentTorrent = {
                        name: ytsResponse.data.data.movie.title,
                        url: ytsTorrentsResponse[0].url,
                        magnet: ytsTorrentsResponse[0].hash,
                        quality: ytsTorrentsResponse[0].quality,
                        language: "en",
                        seed: ytsTorrentsResponse[0].seeds,
                        peer: ytsTorrentsResponse[0].peers,
                        bytes: ytsTorrentsResponse[0].size_bytes,
                        fileSize: ytsTorrentsResponse[0].size,
                        source: "yts"
                    }
                    ytsTorrent.push(currentTorrent);
                }
            }



            // TORRENT PROJECT
            const torrentProjectResponse = await axios.get(
                `https://torrents-api.ryukme.repl.co/api/torrentproject/${movieId}`
            );

            let torrentProjectTorrent = [];

            if(torrentProjectResponse.status === 200) {

                const torrentProjectTorrentsResponse = torrentProjectResponse.data || [];

                if (torrentProjectTorrentsResponse.length > 0) {

                    const currentTorrent = {
                        name: torrentProjectTorrentsResponse[0].Name,
                        url: torrentProjectTorrentsResponse[0].Url,
                        magnet: torrentProjectTorrentsResponse[0].Magnet,
                        quality: null,
                        language: "en",
                        seed: torrentProjectTorrentsResponse[0].Seeders,
                        peer: torrentProjectTorrentsResponse[0].Leechers,
                        bytes: null,
                        fileSize: torrentProjectTorrentsResponse[0].Size,
                        source: "torrentProject"
                    }
                    torrentProjectTorrent.push(currentTorrent);
                }
            }


            
            // TORRENT GALAXY
            // const tgxResponse = await axios.get(
            //     `https://torrents-api.ryukme.repl.co/api/tgx/${movieId}`
            // );

            // let tgxTorrent = [];

            // if (tgxResponse.status === 200 && !tgxResponse.data.error) {
            //     if(tgxResponse.data.torrents) {
            //         tgxTorrent.push(tgxResponse.data.torrents);
            //     }
            // }


            // *-*-*-*-*-*
            // comments  *
            const comments = [];
            
            const movieComments = await Comment.find({movieId: movieId});

            for (const [index, comment] of movieComments.entries()) {

                const id = mongoose.Types.ObjectId(comment.userId);

                const user = await User.findOne({_id: id}, {_id: 0, image: 1, username: 1});

                if (user) {
                    const currentComment = {
                        id: movieComments[index]._id,
                        userId: movieComments[index].userId,
                        userImage: user.image,
                        username: user.username,
                        movieId: movieComments[index].movieId,
                        comment: movieComments[index].comment
                    }
    
                    comments.push(currentComment);
                }
            }


            
            return res.status(200).json({
                infos: infos,
                torrents: {
                    yts: ytsTorrent,
                    torrentProject: torrentProjectTorrent
                },
                comments: comments
            });
        
        
        }
    }
    catch (e) {
        return next(createError(400, e.message));
    }

}


module.exports = getMovieData;