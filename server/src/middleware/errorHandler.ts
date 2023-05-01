import express, { Request, Response, NextFunction } from 'express'

// Error object used in error handling middleware function
class AppError extends Error{
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);

        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}


  // Middleware function for logging the request method and request URL
const requestLogger = (
    request: Request, 
    response: Response, 
    next: NextFunction) => {

        console.log(`${request.method} url:: ${request.url}`);
        next()
}

// Error handling Middleware function for logging the error message
const errorLogger = (
    error: Error, 
    request: Request, 
    response: Response, 
    next: NextFunction) => {
        console.log( `error ${error.message}`) 
        next(error) // calling next middleware
}


// Error handling Middleware function reads the error message 
// and sends back a response in JSON format  
const errorResponder = (
    error: AppError, 
    request: Request, 
    response: Response, 
    next: NextFunction) => {
        response.header("Content-Type", 'application/json')
            
        const status = error.statusCode || 400
        response.status(status).send(error.message)
}


// Fallback Middleware function for returning 
// 404 error for undefined paths
const invalidPathHandler = (
    request: Request, 
    response: Response, 
    next: NextFunction) => {
        response.status(404)
        response.send('invalid path')
}


const requireJsonContent = (
    request: Request, 
    response: Response, 
    next: NextFunction) => {
    if (request.headers['content-type'] !== 'application/json') {
        response.status(400).send('Server requires application/json')
    } else {
        next()
    }
}
