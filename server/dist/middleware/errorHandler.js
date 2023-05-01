"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Error object used in error handling middleware function
class AppError extends Error {
    constructor(statusCode, message) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = Error.name;
        this.statusCode = statusCode;
        Error.captureStackTrace(this);
    }
}
// Middleware function for logging the request method and request URL
const requestLogger = (request, response, next) => {
    console.log(`${request.method} url:: ${request.url}`);
    next();
};
// Error handling Middleware function for logging the error message
const errorLogger = (error, request, response, next) => {
    console.log(`error ${error.message}`);
    next(error); // calling next middleware
};
// Error handling Middleware function reads the error message 
// and sends back a response in JSON format  
const errorResponder = (error, request, response, next) => {
    response.header("Content-Type", 'application/json');
    const status = error.statusCode || 400;
    response.status(status).send(error.message);
};
// Fallback Middleware function for returning 
// 404 error for undefined paths
const invalidPathHandler = (request, response, next) => {
    response.status(404);
    response.send('invalid path');
};
const requireJsonContent = (request, response, next) => {
    if (request.headers['content-type'] !== 'application/json') {
        response.status(400).send('Server requires application/json');
    }
    else {
        next();
    }
};
