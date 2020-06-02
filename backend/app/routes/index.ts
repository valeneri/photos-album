import { Router } from "express";
import { yearRouter } from './year';
import { eventRouter } from './event';
import { photoRouter } from './photo';
import { categoryRouter } from './category';

export const router = Router();

// years controller route
router.use('/years', yearRouter);

// events controller route
router.use('/events', eventRouter);

// photos controller route
router.use('/photos', photoRouter);

//category controller route
router.use('/categories', categoryRouter);