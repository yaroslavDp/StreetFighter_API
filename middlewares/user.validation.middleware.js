import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";

const requiredFields = Object.keys(USER).filter(field => !['id'].includes(field));

const hasRequiredFields = (obj, fieldsArr) => fieldsArr.every(field => obj.hasOwnProperty(field));
const hasInValidFields = (userObj) => !Object.keys(userObj).every(f => USER.hasOwnProperty(f));
const hasAtLeastOne = (userObj) => Object.keys(userObj).some(field => Object.keys(USER).includes(field));

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@gmail\.com$/;
  return typeof email === 'string' && emailRegex.test(email);
};
const isValidPhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+380\d{9}$/;
  return typeof phoneNumber === 'string' && phoneRegex.test(phoneNumber);
}
const isValidPassword = (password) => typeof password === 'string' && password.length >= 3;

const isUserAlreadyExistById = (id) => Boolean(userService.search({ id }));
const isUserAlreadyExistByEmail = (email) => Boolean(userService.search({ email }));
const isUserAlreadyExistByPhone = (phoneNumber) => Boolean(userService.search({ phoneNumber }));

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
    const userData = req.body;
    const hasAllRequiredFields = hasRequiredFields(userData, requiredFields);

    try {
      if(!Object.keys(userData).length){
        throw new Error(`Data should not be empty!`);
      } else if(!hasAllRequiredFields){
        throw new Error(`Not all required fields are set! Required fields: ${requiredFields.toString()}`);
      } else if (userData.id){
        throw new Error(`The 'id' field should not be included!`);
      } else if (hasInValidFields(userData)){
        throw new Error(`Extra fields are prohibited!`);
      } else if (!isValidEmail(userData.email)){
        throw new Error(`Email should belong to the Gmail domain.`);
      } else if (!isValidPhoneNumber(userData.phoneNumber)){
        throw new Error(`PhoneNumber should follow the pattern: +380xxxxxxxxx`);
      } else if (!isValidPassword(userData.password)){
        throw new Error(`Password should be at least 3 characters long`);
      } else if (isUserAlreadyExistByEmail(userData.email.toLowerCase())) {
        throw new Error(`The user with email: '${userData.email}' already exists!`);
      } else if (isUserAlreadyExistByPhone(userData.phoneNumber)) {
        throw new Error(`The user with phoneNumber: '${userData.phoneNumber}' already exists!`);
      }
      req.body.email = req.body.email.toLowerCase();
    } catch (error) {
      res.err = error;
    }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
    const userData = req.body;

    try {
      if(!Object.keys(userData).length){
        throw new Error(`Data should not be empty!`);
      } else if (!hasAtLeastOne(userData)){
        throw new Error(`At least one prop from model should be in body!`);
      } else if (userData.id){
        throw new Error(`The 'id' field should not be included!`);
      } else if (hasInValidFields(userData)){
        throw new Error(`Extra fields are prohibited!`);
      } else if (userData.password !== undefined && !isValidPassword(userData.password)){
        throw new Error(`Password should be at least 3 characters long`);
      } else if (userData.email !== undefined && !isValidEmail(userData.email)){
        throw new Error(`Email should belong to the Gmail domain.`);
      } else if (userData.phoneNumber !== undefined && !isValidPhoneNumber(userData.phoneNumber)){
        throw new Error(`PhoneNumber should follow the pattern: +380xxxxxxxxx`);
      } else if (userData.email !== undefined && isUserAlreadyExistByEmail(userData.email.toLowerCase())) {
        throw new Error(`The user with email: '${userData.email}' already exists!`);
      } else if (userData.phoneNumber && isUserAlreadyExistByPhone(userData.phoneNumber)) {
        throw new Error(`The user with phoneNumber: '${userData.phoneNumber}' already exists!`);
      }
      if(req.body.email){
        req.body.email = req.body.email.toLowerCase();
      }
    } catch (error) {
      res.err = error;
    }
  next();
};

const getUserValid = (req, res, next) => {
  if (!isUserAlreadyExistById(req.params.id)) {
      const error = new Error(`User with id: '${req.params.id}' not found.`);
      error.statusCode = 404;
      res.err = error;
  }
  next();
}

export { createUserValid, updateUserValid, getUserValid };
