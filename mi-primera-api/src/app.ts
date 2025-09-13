import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRoutes } from './routes/auth.routes';
import { bookRoutes } from './routes/book.routes';
import { userRoutes } from './routes/user.routes';
import { handleError } from './middlewares/error.middleware';
import { logRequest } from './middlewares/logger.middleware';


dotenv.config(); 
const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = { 
origin: process.env.FRONTEND_URL || 'http://localhost:5173',
credentials: true,
methods: ['GET', 'POST', 'PUT', 'DELETE' , 'OPTIONS' ],
allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(logRequest);

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);

app.use(handleError);
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
