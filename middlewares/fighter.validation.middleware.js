import { FIGHTER } from "../models/fighter.js";
import { fighterService } from "../services/fighterService.js";

const requiredFields = Object.keys(FIGHTER).filter(field => !['id', 'health'].includes(field));

const hasRequiredFields = (obj, fieldsArr) => fieldsArr.every(field => obj.hasOwnProperty(field));
const hasInValidFields = (fighterObj) => !Object.keys(fighterObj).every(f => FIGHTER.hasOwnProperty(f));

const isNumberBetween = (value, start, end) => !isNaN(value) && typeof value === 'number' && value >= start && value <= end;

const isFighterAlreadyExistById = (id) => Boolean(fighterService.search({ id }));
const isFighterAlreadyExistByName = (name) => Boolean(fighterService.search({ name }));

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
    const fighterData = req.body;
    const hasAllRequiredFields = hasRequiredFields(fighterData, requiredFields);

    try {
      if(!Object.keys(fighterData).length){
        throw new Error(`Data should not be empty!`);
      } else if(!hasAllRequiredFields){
        throw new Error(`Not all required fields are set! Required fields: ${requiredFields.toString()}`);
      } else if (fighterData.id){
        throw new Error(`The 'id' field should not be included!`);
      } else if (hasInValidFields(fighterData)){
        throw new Error(`Extra fields are prohibited!`);
      } else if (!isNumberBetween(fighterData.power, 1, 100)){
        throw new Error(`Power must be in range: 1 to 100!`);
      } else if (!isNumberBetween(fighterData.defense, 1, 10)){
        throw new Error(`Defense must be in range: 1 to 10!`);
      } else if (fighterData.health && !isNumberBetween(fighterData.health, 80, 120)){
        throw new Error(`Health must be in range: 80 to 120!`);
      } else if (isFighterAlreadyExistByName(fighterData.name.toLowerCase())) {
        throw new Error(`The fighter with name: '${fighterData.name}' already exists!`);
      }
      req.body.name = req.body.name.toLowerCase();
      req.body.health = req.body.health || FIGHTER.health;
    } catch (error) {
      res.err = error;
    }
  next();
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
      const fighterData = req.body;

      try {
        if(!Object.keys(fighterData).length){
          throw new Error(`Data should not be empty!`);
        } else if (fighterData.id){
          throw new Error(`The 'id' field should not be included!`);
        } else if (hasInValidFields(fighterData)){
          throw new Error(`Extra fields are prohibited!`);
        } else if (fighterData.power && !isNumberBetween(fighterData.power, 1, 100)){
          throw new Error(`Power must be in range: 1 to 100!`);
        } else if (fighterData.defense && !isNumberBetween(fighterData.defense, 1, 10)){
          throw new Error(`Defense must be in range: 1 to 10!`);
        } else if (fighterData.health && !isNumberBetween(fighterData.health, 80, 120)){
          throw new Error(`Health must be in range: 80 to 120!`);
        } else if (isFighterAlreadyExistByName(fighterData.name.toLowerCase())) {
          throw new Error(`The fighter with name: '${fighterData.name}' already exist!`);
        }
        if(req.body.name){
          req.body.name = req.body.name.toLowerCase();
        }
      } catch (error) {
        res.err = error;
      }
  next();
};

const getFighterValid = (req, res, next) => {
  if (!isFighterAlreadyExistById(req.params.id)) {
      const error = new Error(`Fighter with id: '${req.params.id}' not found.`);
      error.statusCode = 404;
      res.err = error;
  }
  next();
}

export { createFighterValid, updateFighterValid, getFighterValid };
