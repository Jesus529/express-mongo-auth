import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'Debes enviar un token Bearer'
    });
  }

  const token = authorization.split(' ')[1];

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: 'JWT_SECRET no está configurado'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.sub;
    next();
  } catch {
    return res.status(401).json({
      message: 'Token inválido o vencido'
    });
  }
};