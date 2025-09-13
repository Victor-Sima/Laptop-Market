import { Request, Response, NextFunction } from 'express';

export function rolesMiddleware(req: Request, res: Response, next: NextFunction) {
  // Simulăm autentificare/rol via header 'x-role'
  const roleHeader = req.header('x-role');
  if (!roleHeader || roleHeader.toLowerCase() !== 'admin') {
    return res.status(403).json({ statusCode: 403, message: 'Forbidden: Admins only' });
  }
  // dacă e admin -> next
  next();
}
