import { Router } from "express";
import { yearRouter } from './year';
import { eventRouter } from './event';
import { photoRouter } from './photo';

export const router = Router();

// years controller route
router.use('/years', yearRouter);

// events controller route
router.use('/events', eventRouter);

router.use('/photos', photoRouter);