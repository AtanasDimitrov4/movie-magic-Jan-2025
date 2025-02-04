import { Router } from "express";
import castService from "../services/cast-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const castController = Router();

castController.use(isAuth);

castController.get('/create',  (req, res) => {
    res.render('cast/create');
});

castController.post('/create',  async (req, res) => {
     const castData = req.body;
     try {
    await castService.create(castData);
     } catch (err) {
        const error = getErrorMessage(err);
        return res.render('/', { error })
     }
     res.redirect('/');
});

export default castController;