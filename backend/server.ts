import express,{Request,Response} from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/update-data', (req: Request, res: Response) => {
    const data = [
        { name: 'Jan', value:400},
        { name: 'Feb', value:300},
        { name: 'Mar', value:800},
        { name: 'Apr', value:600},
        { name: 'May', value:700},
    ];

    const updatedData = data.map(item => item.name === 'May' ? { ...item, value: 1000 } : item);

    res.json(updatedData);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});