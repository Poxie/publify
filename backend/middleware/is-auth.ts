import { NextFunction, Response } from "express"
import { AuthRequest } from "../types/AuthRequest";
import jwt from 'jsonwebtoken';

export const isAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization');
    req.isAuth = false;

    // If header is not present set isAuth false
    if(!authHeader) {
        return next();
    }

    // Getting token from header
    const token = authHeader.split(' ')[1];

    // If token is undefined return
    if(!token || token === '') {
        return next()
    }

    // Verifying token
    let decodedToken: any;
    try {
        decodedToken = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY || '')
    } catch(error) {
        return next();
    }

    // If token validation failed
    if(!decodedToken) {
        return next();
    }

    // If token is valid, set auth properties
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}