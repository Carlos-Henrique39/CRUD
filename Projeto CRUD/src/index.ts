import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import userRoutes from './routes/userRoutes';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globais
app.use(helmet());              
app.use(cors());                
app.use(express.json());        
app.use(morgan('dev'));         
app.use(logger);                

app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
