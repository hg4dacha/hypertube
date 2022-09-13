const createError = require("http-errors");
const Comment = require("../../schemas/comment");
const User = require("../../schemas/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const axios = require("axios");






async function getMovieDataViaUrl(req, res, next) {

    try {

        if (req.cookies.accessKey) {

            const accessKey = req.cookies.accessKey;
            const checkAccessKeyValidity = await bcrypt.compare(process.env.ACCESS_KEY, accessKey);
            
            if (checkAccessKeyValidity) {

                if (req.params.id) {
        
                    const movieId = req.params.id;
        
                    //----------------
                    let infos;

                    const infoResponse = await axios.get(
                        `https://imdb-api.com/en/API/Title/${process.env.IMDB_KEY}/${movieId}/FullCast`
                    );
        
                    if (infoResponse.status === 200 && !infoResponse.data.errorMessage) {
                        infos = {
                            title: infoResponse.data.title,
                            image: infoResponse.data.image,
                            runtimeMins: infoResponse.data.runtimeMins,
                            genres: infoResponse.data.genres,
                            year: infoResponse.data.year,
                            imDbRating: infoResponse.data.imDbRating,
                            plot: infoResponse.data.plot,
                            plotLocal: infoResponse.data.plotLocal,
                            directors: infoResponse.data.directors,
                            writers: infoResponse.data.writers,
                            stars: infoResponse.data.stars
                        }
                    }

                    //----------------
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
                                magnet: ytsTorrentsResponse[0].url,
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


                    //----------------
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




                    //----------------
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
                        torrent: {
                            yts: ytsTorrent,
                            torrentProject: torrentProjectTorrent
                        },
                        comments: comments
                    });
                }
                else {
                    return next(createError(400, 'INVALID_REQUEST'));
                }
            }
            else {
                return res.status(400).json({
                    response: "ko",
                    message: "Access to resources not permitted"
                });
            }
        }
        else {
            return res.status(400).json({
                response: "ko",
                message: "Access to resources not permitted"
            });
        }

    }
    catch (e) {
        console.log(e.message);
        return next(createError(500, e.message));
    }

}

module.exports = getMovieDataViaUrl;