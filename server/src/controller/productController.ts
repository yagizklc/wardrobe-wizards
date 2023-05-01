import { Request, Response, NextFunction } from "express"
import Product from "../models/product"
import Category from '../models/category';

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
    //res.status(200).json({status: "Successfully fetched products"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "Server error" });
  }
};

/* DEPRECATED ??????
const getProductsByCategory = async (req: Request, res: Response) => {
  const category = req.params.category;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
};
*/

const getProductsById = async (req: Request, res: Response) => {
  const productid = req.params.productid;

  try {
    const product = await Product.findById(productid);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
};

const getCategorySpecificProducts = async (req: Request, res: Response) => {
  const slug = req.params.slug;  
  try {
    const category = await Category.findOne({ slug });
    if(!category){
      return res.status(404).send('Category not found');
    }
    const products = await Category.findProducts(category._id);
    res.json(products);
  } catch(error){
    console.error(error);
    res.status(500).json({ status: 'Server error' });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ message: 'Missing query parameter' });
  }
  const searchResult = await Product.search(query);
  res.json(searchResult);
};

// DEPRECATED????? export default { getProducts, getProductsByCategory, getProductsById, getCategorySpecificProducts, searchProducts}
export default { getProducts, getProductsById, getCategorySpecificProducts, searchProducts}