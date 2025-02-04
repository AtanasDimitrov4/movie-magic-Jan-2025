import { Router } from 'express';
import movieService from '../services/movie-service.js';


const router = Router();


router.get('/', async (req, res) => {
    try {
    const movies = await movieService.getAll();
    } catch(err) {
        return res.redirect('404');
    }

    res.render('home', { movies });
});

router.get('/about', (req, res) =>{
    res.render('about', {pageTitle: 'About'});
});

export default router;