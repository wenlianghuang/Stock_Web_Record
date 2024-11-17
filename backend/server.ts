import { exec } from 'child_process';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

// Import routes
import monthlyRecordRouter from './routes/monthlyRecord';
import authRouter from './routes/auth';
import stockRouter from './routes/stock';

// Use routes
app.use('/Monthly-Record', monthlyRecordRouter);
app.use('/api', authRouter);
app.use('/api', stockRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});