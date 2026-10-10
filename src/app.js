
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'API Express Mongo Cloud funcionando'
  });
});

app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);

  if (err.code === 11000) {
    return res.status(409).json({
      message: 'El correo electronico ya existe'
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Datos invalidos',
      error: err.message
    });
  }

  res.status(500).json({
    message: 'Error interno del servidor'
  });
});

export default app;
