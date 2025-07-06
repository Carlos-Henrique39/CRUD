import { Request, Response, NextFunction } from 'express';

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    // Aqui você validaria o token com JWT
    // const decoded = jwt.verify(token, 'seusegredo');
    // req.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido' });
  }
}
