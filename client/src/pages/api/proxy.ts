// pages/api/proxy.ts

import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';
import cors, { CorsOptions } from 'cors';

// Initialize CORS middleware with options
const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', // Replace '*' with your specific origin or an array of allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

const corsMiddleware = cors(corsOptions);

// Helper function to run middleware in Next.js
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, middleware: any) => {
    return new Promise((resolve, reject) => {
        middleware(req, res, (result: Error | unknown) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // Run CORS middleware
    await runMiddleware(req, res, corsMiddleware);

    // Get the target API endpoint from query parameters
    const targetUrl = req.query.targetUrl as string;

    if (!targetUrl) {
        res.status(400).json({ message: 'Missing targetUrl query parameter' });
        return;
    }

    try {
        const response: AxiosResponse = await axios.get(targetUrl);
        res.status(response.status).json(response.data);
    } catch (error: any) {
        const { response } = error;
        res.status(response?.status || 500).json(response?.data || { message: 'An error occurred' });
    }
};

export default handler;