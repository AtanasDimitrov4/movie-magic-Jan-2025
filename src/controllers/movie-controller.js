import { Router } from "express";
import movieService from "../services/movie-service.js";
import castService from "../services/cast-service.js";


const movieController = Router();

movieController.get('/search', async (req, res) =>{
    const filter = req.query;
    const movies = await movieService.getAll(filter).lean();
    res.render('search', { movies, filter });
});

movieController.get('/create', (req, res) =>{
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    const UserId = req.user?._id;
    
   await movieService.create(newMovie, UserId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
   
    const movieId = req.params.movieId;

    const movie = await movieService.getOneWithCasts(movieId).lean();
    const isCreator = movie.creator && movie.creator?.equals(req.user?._id);

    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).lean();
    const casts = await castService.getAll({exclude: movie.casts}).lean();
    
    res.render('movie/attach-cast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId
    await movieService.attachCast(movieId, castId);


    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    if(!movie.creator?.equals(req.user?._id)) {
       return res.redirect('/404');
    }

    await movieService.delete(movieId);

    res.redirect('/');
});

movieController.get('/:movieId/edit', async (req, res) =>{
   const movieId = req.params.movieId;
   const movie = await movieService.getOne(movieId);
   res.render('movie/edit', { movie });
});


export default movieController;