const Movie = require('../../schemas/movie');
const fs = require("fs");




const calculateSeniority = (movieLastView) => {
    const movieDate = new Date(movieLastView);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - movieDate.getTime();

    return (Math.round(timeDifference / (1000 * 3600 * 24)));
}

const removeOldMovies = async () => {

    try {
        
        const movies = await Movie.find({});

        for(let i = 0; i < movies.length; i++) {
            const movieSeniority = calculateSeniority(movies[i].lastView);
            if (movieSeniority > 30) {
                let moviePath = movies[i].path;
                moviePath = moviePath.split('/');
                moviePath.pop();
                moviePath = moviePath.toString();
                moviePath = moviePath.replaceAll(',', '/');
                if (fs.existsSync(moviePath)) {
                    fs.rmdir(moviePath, {recursive: true}, (err) => {
                        console.log(err)
                        console.log("FOLDER DELETED!");
                    });
                }
                movies[i].remove();
            }
        }

    } catch (e) {
        console.log(e.message);
    }

}

module.exports = removeOldMovies;