import { Router, Request, Response } from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import pgPromise from 'pg-promise';

const router = Router();
const pgp = pgPromise();
const db = pgp({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

let stockData: any[] = [];

const updateData = () => {
    exec('D:\\Stock_Web_Record\\running_go\\Stock_Instance.exe', (errExec, stdout, stderr) => {
        if (errExec) {
            console.error("Error executing Stock_Instance.exe:", errExec);
            return;
        }
        if (stderr) {
            console.error(`Error: ${stderr}`);
        }

        fs.readFile('D:\\Stock_Web_Record\\data.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
            if (err) {
                console.error("Error reading JSON file:", err);
                return;
            }
            stockData = JSON.parse(data);
        });
    });
};

updateData();
setInterval(updateData, 30000);

router.post('/update-data', (req, res) => {
    res.json(stockData);
});

let contentData: any;
let stockidData: string;
router.post('/receive-fundamental-analysis', (req, res) => {
    const { content, id } = req.body;
    contentData = content;
    stockidData = id;
    res.status(200).send('Fundamental analysis data received');
});

router.post('/send-fundamental-analysis', (req, res) => {
    res.json({ content: contentData, stockid: stockidData });
});

router.post('/ownerstock', (req, res) => {
    db.any("SELECT a.stock_code, a.stock_name, a.stock_price, a.stock_number FROM stockbank as a INNER JOIN stockuser as b ON a.ownername = b.account WHERE b.account = $1", [req.body.username])
        .then((user: any) => {
            if (user) {
                res.json(user);
            } else {
                res.json({ message: 'Record not exist' });
            }
        })
        .catch((error: any) => {
            console.error('Error querying the database:', error);
            res.status(500).json({ message: 'Server error' });
        });
});

export default router;