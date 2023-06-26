import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  getFighterValid,
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', (req, res, next) => {
  const fighters = fighterService.getFighters();
  res.data = {fighters: fighters};
  next()
}, responseMiddleware)

router.get('/:id', getFighterValid, (req, res, next) => {
  if(res.err){
    return next()
  }
  const fighter = fighterService.getFighterById(req.params.id);
  res.data = {fighter: fighter};
  next();
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
  if(res.err){
    return next()
  }
  const fighter = fighterService.createFighter(req.body);
  if(fighter){
    res.data = {fighter: fighter}
  }
  next();
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
  if(res.err){
    return next()
  }
  const fighter = fighterService.updateFighter(req.params.id, req.body);
  if(fighter){
    res.data = {fighter: fighter}
  }
  next();
}, responseMiddleware);

router.delete('/:id', getFighterValid, (req, res, next) => {
  if(res.err){
    return next()
  }
  fighterService.deleteFighter(req.params.id);
  res.data = { message: `Successfully deleted fighter with id: '${req.params.id}'` };
  next();
}, responseMiddleware);

export { router };
