import express from 'express';
import { bookRoutes } from './routes/book.routes';
import { handleError } from './middlewares/error.middleware';
import { logRequest } from './middlewares/logger.middleware';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logRequest);

app.use('/api/books', bookRoutes);

app.use(handleError);
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
