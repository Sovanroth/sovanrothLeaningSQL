// import jwt from 'jsonwebtoken';
// import express from "express";

// export const authenticateToken = (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const token = req.header('Authorization')?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({
//       error: true,
//       message: 'Access denied. Token not provided.',
//     });
//   }

//   jwt.verify(token, 'your-secret-key', (err, decoded) => {
//     if (err) {
//       return res.status(403).json({
//         error: true,
//         message: 'Invalid token.',
//       });
//     }

//     // Attach the decoded user information to the request for further use in the route
//     req.user = decoded;

//     next();
//   });
// };
