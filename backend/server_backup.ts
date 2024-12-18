import { exec } from 'child_process';
import cors from 'cors';
import express, { Request, Response } from 'express';
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const fs = require('fs');
const app = express();
const port = process.env.PORT || 3001;
const pgp = pgPromise();
app.use(cors());
app.use(express.json());

// Set database connection
/*
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'Stock_Record',
    user: 'postgres',
    password: 'wenliang75'
});
*/
const db = pgp({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});


app.post('/Monthly-Record', (req: Request, res: Response) => {

    const {newValue} = req.body;
    const data = [
        { name: 'Jan', value:400},
        { name: 'Feb', value:300},
        { name: 'Mar', value:800},
        { name: 'Apr', value:600},
        { name: 'May', value:700},
    ];

    //const updatedData = data.map(item => item.name === 'May' ? { ...item, value: 1000 } : item);
    const updatedData = data.map(item => item.name === 'May' ? {...item, value: newValue} : item);
    
    res.json(updatedData);
});

/*
app.post('/api/update-data', (req, res) => {
    
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
*/
// 定義儲存數據的變量
let stockData: any[] = [];

// 讀取 JSON file並更新數據
const updateData = () => {
    exec('D:\\Stock_Web_Record\\running_go\\Stock_Instance.exe', (errExec, stdout, stderr) => {
        if (errExec) {
            console.error("Error executing Stock_Instance.exe:", errExec);
            return;
        }
        //console.log(`Output: ${stdout}`);
        if(stderr) {
            console.error(`Error: ${stderr}`);
        }

        fs.readFile('D:\\Stock_Web_Record\\data.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
            if (err) {
                console.error("Error reading JSON file:", err);
                return;
            }
            stockData = JSON.parse(data);
            //console.log("Data updated:", stockData);
        });
    });
};

// 初始化數據
updateData();


// 每隔 10 秒鐘更新一次數據
setInterval(updateData, 30000);
app.post('/api/update-data', (req, res) => {
    res.json(stockData);
});

// Send fundamental-analysis page
let contentData: any; // Declare the variable 'contentData'
let stockidData: string;
// receive and send are based on backend
app.post('/api/receive-fundamental-analysis', (req, res) => {
    const { content,id } = req.body;
    
    contentData = content;
    stockidData = id;
    res.status(200).send('Fundamental analysis data received');
});

app.post('/api/send-fundamental-analysis', (req, res) => {
    res.json({ content: contentData, stockid: stockidData });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // Query the database to check if the username and password match
    // Assuming you are using a library like pg-promise to interact with PostgreSQL
    db.oneOrNone('SELECT * FROM stockuser WHERE account = $1 AND password = $2', [username, password])
        .then((user: any) => {
            if (user) {
                // Username and password match, return success message
                res.json({ message: 'Login successful' });
            } else {
                // Username and password do not match, return error message
                //res.status(401).json({ message: 'Invalid username or password' });
                res.json({ message: 'Invalid username or password' });
            }
        })
        .catch((error: any) => {
            console.error('Error querying the database:', error);
            res.status(500).json({ message: 'Server error' });
        });
});

app.post('/api/signup', (req, res) => {
    const { account, password } = req.body;
    console.log("username: ", account);
    console.log("password: ", password);
    const createdatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("createdatetime: ", createdatetime);
    
    db.none('INSERT INTO stockuser(account, password, createdatetime) VALUES($1, $2, $3)', [account, password, createdatetime])
        .then(() => {
            res.json({ message: 'Account created' });
        })
        .catch((error: any) => {
            console.error('Error inserting into the database:', error);
            res.status(500).json({ message: 'Server error' });
        });
    
});

// Personal Stock Record
app.post('/api/ownerstock', (req, res) => {
    //console.log("username in backend: ",req.body);
    db.any("SELECT a.stock_code,a.stock_name,a.stock_price,a.stock_number FROM stockbank as a INNER JOIN stockuser as b ON a.ownername = b.account WHERE b.account = $1", [req.body.username])
        .then((user: any) => {
            if (user) {
                //console.log("user: ", user);
                //res.json({ message: 'Acount exists' });
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});