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


router.post('/update-data', (req, res) => {
    
    // 獲取前端發送的數據
    const stockData = req.body;

    // 模擬處理數據，簡單地將每個股票的 value 和 change 修改一下
    const updatedStockData = stockData.map((stock: any) => {
        let newValue = parseFloat(stock.value.replace(/,/g, '')) + Math.random() * 100;
        newValue = Number(newValue.toFixed(2));

        let changeValue = parseFloat(stock.change.match(/-?\d+(\.\d+)?/g)[0]) + Math.random() * 10;
        changeValue = Number(changeValue.toFixed(2));

        const changePercentage = (changeValue / newValue * 100).toFixed(2);
        const changeSign = stock.change.includes('-') ? '-' : '';

        return {
            name: stock.name,
            value: newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            change: `${changeSign}${changeValue} (${changePercentage}%)`,
        };
    });

    // 返回處理後的數據
    res.json(updatedStockData);
    
    fs.readFile('D:\\Stock_Web_Record\\data.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            res.status(500).send("Server Error");
            return;
        }

        // 将读取到的 JSON 字符串解析为对象
        const stockData = JSON.parse(data);

        // 返回 JSON 数据给前端
        res.json(stockData);
    });
});
export default router;