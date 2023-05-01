import { Router } from "express";
import authController from "../controller/authController"
import { body, CustomValidator } from 'express-validator';
import User from "../models/user"

const router = Router();

const isValidUser: CustomValidator = email => {
    return User.findOne({email:email}).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    });
  };

  const isRegistered: CustomValidator = email => {
    return User.findOne({email:email}).then(user => {
      if (!user) {
        return Promise.reject('User is not registered');
      }
    });
  };

router.post("/signup", [
    body("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(isValidUser)
    .normalizeEmail(),
    
    body('password')
    .trim()
    .isLength({ min: 6 }),

    body("name")
    .trim()
    .not(),

    body("surname")
    .trim()
    .not(),

    body("adress")
    .trim()
    .not(),

], authController.signUp)

router.post("/login", [
  body("email")
  .isEmail()
  .withMessage("Please enter a valid email")
  .custom(isRegistered)
  .normalizeEmail()
  ,
  
  body('password')
  .trim()
  .isLength({ min: 6 })
  ,

], authController.login)

export default router
