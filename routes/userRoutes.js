import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  getUserValid,
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get('/', (req, res, next) => {
  const users = userService.getUsers();
  res.data = {users: users};
  next()
}, responseMiddleware)

router.get('/:id', getUserValid, (req, res, next) => {
  if(res.err){
    return next()
  }
  const user = userService.getUserById(req.params.id);
  res.data = {user: user};
  next();
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
  if(res.err){
    return next()
  }
  const user = userService.createUser(req.body);
  if(user){
    res.data = {user: user}
  }
  next();
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
  if(res.err){
    return next()
  }
  const user = userService.updateUser(req.params.id, req.body);
  if(user){
    res.data = {user: user}
  }
  next();
}, responseMiddleware);

router.delete('/:id', getUserValid, (req, res, next) => {
  if(res.err){
    return next()
  }
  userService.deleteUser(req.params.id);
  res.data = { message: `Successfully deleted user with id: '${req.params.id}'` };
  next();
}, responseMiddleware);

export { router };
