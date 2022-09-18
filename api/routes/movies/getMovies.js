const createError = require("http-errors");
const axios = require("axios");





async function getMovies(req, res, next) {

    try {

        if(req.query.search) {
            
            const search = req.query.search;


            const movies = [];

            const response = await axios.get(
                `https://imdb-api.com/${req.user.language}/API/SearchMovie/${process.env.IMDB_KEY}/${search}`
            );

            if(response.status === 200) {
                for(i = 0; i < response.data.results.length; i++) {
                    const movie = {
                        id: response.data.results[i].id,
                        title: response.data.results[i].title,
                        image: response.data.results[i].image,
                        year: response.data.results[i].description.replace(/\D/g, "").slice(0,4),
                        imDbRating: ''
                    }
    
                    movies.push(movie);
                }
            }

            return res.status(200).json({movies});
        }
        else if(req.query.genre && req.query.minRating &&
        req.query.maxRating && req.query.minYear && req.query.maxYear) {

            const genre = req.query.genre;
            const minRating = req.query.minRating;
            const maxRating = req.query.maxRating;
            const minYear = req.query.minYear;
            const maxYear = req.query.maxYear;


            const movies = [];

            const response = await axios.get(
                `https://imdb-api.com/API/AdvancedSearch/${process.env.IMDB_KEY}?title_type=feature&user_rating=${minRating},${maxRating}&release_date=${minYear}-01-01,${maxYear}-12-31&genres=${genre}&countries=us&sort=alpha,asc&count=250`
            );

            if(response.status === 200) {
                for(i = 0; i < response.data.results.length; i++) {
                    const movie = {
                        id: response.data.results[i].id,
                        title: response.data.results[i].title,
                        image: response.data.results[i].image,
                        year: response.data.results[i].description.replace(/\D/g, "").slice(0,4),
                        imDbRating: ''
                    }
    
                    movies.push(movie);
                }
            }

            return res.status(200).json({movies});
        }
        else {

            const movies = [];


            const firstResponse = await axios.get(
                `https://imdb-api.com/${req.user.language}/API/Top250Movies/${process.env.IMDB_KEY}`
            );

            if(firstResponse.status === 200) {
                for(i = 0; i < firstResponse.data.items.length; i++) {
                    const movie = {
                        id: firstResponse.data.items[i].id,
                        title: firstResponse.data.items[i].title,
                        image: firstResponse.data.items[i].image,
                        year: firstResponse.data.items[i].year,
                        imDbRating: firstResponse.data.items[i].imDbRating
                    }
    
                    movies.push(movie);
                }
            }

            const secondResponse = await axios.get(
                `https://imdb-api.com/${req.user.language}/API/MostPopularMovies/${process.env.IMDB_KEY}`
            );

            if(secondResponse.status === 200) {
                for(i = 0; i < secondResponse.data.items.length; i++) {
                    const movie = {
                        id: secondResponse.data.items[i].id,
                        title: secondResponse.data.items[i].title,
                        image: secondResponse.data.items[i].image,
                        year: secondResponse.data.items[i].year,
                        imDbRating: secondResponse.data.items[i].imDbRating
                    }

                    movies.push(movie);
                }
            }



            return res.status(200).json({
                movies: movies,
                moviesViewed: req.user.moviesViewed
            });
        }

    }
    catch(e) {
        return next(createError(400, e.message));
    }

}

module.exports = getMovies;