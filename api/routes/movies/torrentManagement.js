const download = require("download");
const fs = require("fs");
const OS = require("opensubtitles-api");
const OpenSubtitles = new OS({
  useragent:'UserAgent',
  username: process.env.OS_USERNAME,
  password: process.env.OS_PASSWORD,
});
const mime = require("mime");
const pump = require("pump");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);
const TorrentStream = require("torrent-stream");
const User = require("../../schemas/user");
const Movie = require("../../schemas/movie");
const mongoose = require("mongoose");






const options = {
    connections: 100,
    uploads: 10,
    path: `${process.cwd()}/sources/movies`,
    verify: true,
    tracker: true,
    trackers: [
        "udp://open.demonii.com:1337/announce",
        "udp://tracker.openbittorrent.com:80",
        "udp://tracker.coppersurfer.tk:6969",
        "udp://glotorrents.pw:6969/announce",
        "udp://torrent.gresille.org:80/announce",
        "udp://p4p.arenabg.com:1337",
        "udp://tracker.leechers-paradise.org:6969",
        "udp://tracker.ccc.de:80",
        "udp://tracker.leechers-paradise.org:6969/announce",
        "udp://tracker.pirateparty.gr:6969/announce",
        "udp://tracker.coppersurfer.tk:6969/announce",
        "http://asnet.pw:2710/announce",
        "http://tracker.opentrackr.org:1337/announce",
        "udp://tracker.opentrackr.org:1337/announce",
        "udp://tracker1.xku.tv:6969/announce",
        "udp://tracker1.wasabii.com.tw:6969/announce",
        "udp://tracker.zer0day.to:1337/announce",
        "udp://p4p.arenabg.com:1337/announce",
        "http://tracker.internetwarriors.net:1337/announce",
        "udp://tracker.internetwarriors.net:1337/announce",
        "udp://allesanddro.de:1337/announce",
        "udp://9.rarbg.com:2710/announce",
        "udp://tracker.dler.org:6969/announce",
        "http://mgtracker.org:6969/announce",
        "http://tracker.mg64.net:6881/announce",
        "http://tracker.devil-torrents.pl:80/announce",
        "http://ipv4.tracker.harry.lu:80/announce",
        "http://tracker.electro-torrent.pl:80/announce",
        "udp://wambo.club:1337/announce",
        "udp://tracker.dutchtracking.com:6969/announce",
        "udp://tc.animereactor.ru:8082/announce",
        "udp://tracker.uw0.xyz:6969/announce",
        "udp://tracker.kamigami.org:2710/announce",
        "http://tracker.files.fm:6969/announce",
        "udp://opentracker.i2p.rocks:6969/announce",
        "udp://tracker.zerobytes.xyz:1337/announce",
        "https://tracker.nitrix.me:443/announce",
        "http://novaopcj.icu:10325/announce",
        "udp://aaa.army:8866/announce",
        "https://tracker.imgoingto.icu:443/announce",
        "udp://tracker.shkinev.me:6969/announce",
        "udp://blokas.io:6969/announce",
        "udp://api.bitumconference.ru:6969/announce",
        "udp://cutiegirl.ru:6969/announce",
        "udp://ln.mtahost.co:6969/announce",
        "udp://vibe.community:6969/announce",
        "udp://tracker.vulnix.sh:6969/announce",
        "udp://wassermann.online:6969/announce",
        "udp://kanal-4.de:6969/announce",
        "udp://mts.tvbit.co:6969/announce",
        "udp://adminion.n-blade.ru:6969/announce",
        "udp://benouworldtrip.fr:6969/announce",
        "udp://sd-161673.dedibox.fr:6969/announce",
        "udp://47.ip-51-68-199.eu:6969/announce",
        "udp://cdn-1.gamecoast.org:6969/announce",
        "udp://daveking.com:6969/announce",
        "http://rt.tace.ru:80/announce",
        "udp://forever-tracker.zooki.xyz:6969/announce"
    ]
};



module.exports = {

    getSubtitles: async (req, res, next) => {
        var movieId = req.params.movieId;

        await OpenSubtitles.search({
            sublanguageid: ["eng", "fre", "ger"].join(),
            extensions: ['srt', 'vtt'],
            imdbid: movieId,
            limit: 'best'
        })
        .then(async subtitles => {
            var subtitlesPath = `${process.cwd()}/sources/subtitles/`;
            var englishSubtitles = undefined;
            var frenchSubtitles = undefined;
            var germanSubtitles = undefined;

            if (subtitles.en && subtitles.en.vtt && !fs.existsSync(`${subtitlesPath}${movieId}_en.vtt`)) {
                await download(subtitles.en.vtt)
                .then(data => {
                    fs.writeFileSync(`${subtitlesPath}${movieId}_en.vtt`, data);
                })
                .catch(err => {
                    console.log("No english subtitles");
                });
                englishSubtitles = fs.existsSync(`${subtitlesPath}${movieId}_en.vtt`) ? `${movieId}_en.vtt` : undefined;
            }
            else if (fs.existsSync(`${subtitlesPath}${movieId}_en.vtt`)) {
                englishSubtitles = `${movieId}_en.vtt`;
            }
            
            if (subtitles.fr && subtitles.fr.vtt && !fs.existsSync(`${subtitlesPath}${movieId}_fr.vtt`)) {
                await download(subtitles.fr.vtt)
                .then(data => {
                    fs.writeFileSync(`${subtitlesPath}${movieId}_fr.vtt`, data);
                })
                .catch(err => {
                    console.log("No french subtitles");
                });
                frenchSubtitles = fs.existsSync(`${subtitlesPath}${movieId}_fr.vtt`) ? `${movieId}_fr.vtt` : undefined;
            } else if (fs.existsSync(`${subtitlesPath}${movieId}_fr.vtt`)) {
                frenchSubtitles = `${movieId}_fr.vtt`;
            }

            if (subtitles.de && subtitles.de.vtt && !fs.existsSync(`${subtitlesPath}${movieId}_de.vtt`)) {
                await download(subtitles.de.vtt)
                .then(data => {
                    fs.writeFileSync(`${subtitlesPath}${movieId}_de.vtt`, data);
                })
                .catch(err => {
                    console.log("No German subtitles");
                });
                germanSubtitles = fs.existsSync(`${subtitlesPath}${movieId}_de.vtt`) ? `${movieId}_de.vtt` : undefined;
            }
            else if (fs.existsSync(`${subtitlesPath}${movieId}_de.vtt`)) {
                germanSubtitles = `${movieId}_de.vtt`;
            }

            return res.status(200).json({
                englishSubtitles: englishSubtitles ? `http://localhost:5000/sources/subtitles/${englishSubtitles}` : null,
                frenchSubtitles: frenchSubtitles ? `http://localhost:5000/sources/subtitles/${frenchSubtitles}` : null,
                germanSubtitles: germanSubtitles ? `http://localhost:5000/sources/subtitles/${germanSubtitles}` : null
            });

        })
        .catch((error) => {
            console.error("The Promise is rejected!", error);
        })
    },



    convertVideo: async (res, path, start, end, mode) => {
        let stream;
        if (mode === 0) {
            stream = path.createReadStream();
        } else {
            stream = fs.createReadStream(path);
        }

        var progression = 0;

        var newStream =
            ffmpeg({ source: stream })
            .videoCodec("libvpx")
            .videoBitrate(1024)
            .audioCodec("libopus")
            .audioBitrate(128)
            .outputOptions([
                "-crf 30",
                "-deadline realtime",
                "-cpu-used 2",
                "-threads 3"
            ])
            .format("webm")
            .on("progress", progress => {
                if (progress.targetSize >= (progression + 1000) && progress.targetSize <= (progression + 1200)) {
                    progression = progress.targetSize;
                    console.log(`↓↓↓ CONVERSION IN PROGRESS... `);
                    console.log(progress);
                }
            })
            .on("start", cmd => {
                console.log("***| STARTING CONVERSION... |***");
            })
            .on("end", () => {
                console.log("CONVERSION IS DONE!");
            })
            .on("error", (err, stdout, stderr) => {
                console.log(`CANNOT PROCESS VIDEO, ERROR => ${err.message}`);
            });

        pump(newStream, res);
    },



    streamMovie: async (res, path, start, end, mode) => {
        if (mode === 1) {
            if (mime.getType(path.name) !== "video/mp4" && mime.getType(path.name) !== "video/ogg") {
                module.exports.convertVideo(res, path, start, end, 0);
            }
            else {
                let stream = path.createReadStream({
                    start: start,
                    end: end
                });
                pump(stream, res);
            }
        }
        else if (mime.getType(path) !== "video/mp4" && mime.getType(path) !== "video/ogg") {
            module.exports.convertVideo(res, path, start, end, 1);
        } else {
            let stream = fs.createReadStream(path, {
                start: start,
                end: end
            });
            pump(stream, res);
        }
    },



    downloadMovie: async (req, res, userId, source, magnet) => {
        try {

            let newMagnet;

            if (source === 'yts') {
                newMagnet = `magnet:?xt=urn:btih:${magnet}&dn=Url+Encoded+Movie+Name&tr=http://track.one:1234/announce&tr=udp://track.two:80&udp://open.demonii.com:1337/announce&udp://tracker.openbittorrent.com:80&udp://tracker.coppersurfer.tk:6969&udp://glotorrents.pw:6969/announce&udp://tracker.opentrackr.org:1337/announce&udp://torrent.gresille.org:80/announce&udp://p4p.arenabg.com:1337&udp://tracker.leechers-paradise.org:6969`;
            }
            else if (source == 'torrentProject') {
                newMagnet = magnet;
            }

            const engine = TorrentStream(newMagnet, options);

            let newFilePath;
            let fileSize;
            var progress = 0;

            engine
            .on("ready", () => {
                engine.files.forEach(file => {
                    var ext = file.name.substr(-4, 4);
                    if (ext === ".mp4" || ext === ".mkv" || ext === ".avi" || ext === ".ogg") {
                        file.select();
                        if (ext !== ".mp4" && ".ogg") ext = ".webm";
                        fileSize = file.length;
                        newFilePath = `${process.cwd()}/sources/movies/${file.path}`;

                        const range = req.headers.range;
                        if (range) {
                            const parts = range.replace(/bytes=/, "").split("-");
                            const start = parseInt(parts[0], 10);
                            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                            const chunksize = end - start + 1;

                            const head = {
                                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                                "Accept-Ranges": "bytes",
                                "Content-Length": chunksize,
                                "Content-Type": mime.getType(file.name) === "video/mp4" || mime.getType(file.name) === "video/ogg" ?
                                                mime.getType(file.name) : "video/webm",
                                Connection: "keep-alive"
                            };
                            if (mime.getType(file.path) === "video/mp4" || mime.getType(file.path) === "video/ogg") {
                                res.writeHead(206, head);
                            }
                                module.exports.streamMovie(res, file, start, end, 1);
                        }
                        else {
                            const head = {
                                "Content-Length": fileSize,
                                "Content-Type": mime.getType(file.name) === "video/mp4" || mime.getType(file.name) === "video/ogg" ?
                                                mime.getType(file.name) : "video/webm"
                            };
                            res.writeHead(200, head);
                            module.exports.streamMovie(res, file, 0, fileSize - 1, 1);
                        }
                    }
                    else { file.deselect(); }
                });
            })
            .on("download", () => {
                const downloaded = Math.round(Math.round((engine.swarm.downloaded / fileSize) * 100 * 100) / 100);
                if (downloaded === (progress + 5)) {
                    console.log(`DOWNLOAD => ${downloaded}%`);
                    progress = downloaded;
                }
            })
            .on("idle", async () => {
                console.log("FULL DOWNLOAD!");
                const movie = await Movie.findOne({ movieId: req.params.movieId });
                if (!movie) {
                    const newMovie = new Movie({
                        movieId: req.params.movieId,
                        path: newFilePath,
                        lastView: new Date()
                    });
                    newMovie.save();
                }
            });

        } catch (error) { console.log(error) }
    },



    getMovieStream: async (req, res) => {

        if (!req.query.magnet) return res.status(404).json({ error: "INVALID_TRANSMITTED_DATA" });

        const movieId = req.params.movieId;
        const userId = mongoose.Types.ObjectId(req.params.userId);
        const source = req.params.source;
        const magnet = req.query.magnet;

        const user = await User.findOne({ _id: userId });
        if (!user) return res.status(404).json({ error: "INVALID_USER_ID" });

        if (!user.moviesViewed.includes(movieId)) {
            user.moviesViewed.push(movieId);
            user.save();
        }

        const movie = await Movie.findOne({ movieId: movieId });

        if (movie) {
            if (fs.existsSync(movie.path)) {

                movie.lastView = new Date();
                movie.save();

                const stat = fs.statSync(movie.path);
                const fileSize = stat.size;
                const fileStart = 0;
                const fileEnd = fileSize - 1;
                const range = req.headers.range;

                if (range) {
                    const rangeParts = range.replace(/bytes=/, '').split('-');
                    const start = parseInt(rangeParts[0], 10);
                    const end = rangeParts[1] ? parseInt(rangeParts[1], 10) : fileSize - 1;
                    const chunkSize = end - start + 1;

                    const head = {
                        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                        "Accept-Ranges": "bytes",
                        "Content-Length": chunkSize,
                        "Content-Type": mime.getType(movie.path)
                    }
                    res.writeHead(206, head);
                    module.exports.streamMovie(res, movie.path, start, end, 0);
                }
                else {
                    const head = {
                        "Content-Length": fileSize,
                        "Content-Type": mime.getType(movie.path)
                    }
                    res.writeHead(200, head);
                    module.exports.streamMovie(res, movie.path, fileStart, fileEnd, 0);
                }
            }
            else {
                module.exports.downloadMovie(req, res, userId, source, magnet);
            }
        }
        else {
            module.exports.downloadMovie(req, res, userId, source, magnet);
        }
    }

};