import { Router } from "express";
import express from "express";
import imageController from "../controller/imageController";

const router = Router();
router.use(express.static('../images/'));

// all images
router.get('/images/', imageController.getImages)

// get all items from a category
router.get('/images/:category', imageController.getImagesByCategory)

// specific images
router.get('/images/:category/:id', imageController.getImagesByName)

export default router