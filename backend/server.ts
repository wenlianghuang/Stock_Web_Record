import { exec } from 'child_process';
import cors from 'cors';
import express, { Request, Response } from 'express';
const fs = require('fs');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

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
        console.log(`Output: ${stdout}`);
        if(stderr) {
            console.error(`Error: ${stderr}`);
        }

        fs.readFile('D:\\Stock_Web_Record\\data.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
            if (err) {
                console.error("Error reading JSON file:", err);
                return;
            }
            stockData = JSON.parse(data);
            console.log("Data updated:", stockData);
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
app.post('/api/receiv-fundamental-analysis', (req, res) => {
    const { content } = req.body;
    
    contentData = content;
    res.status(200).send('Fundamental analysis data received');
});

app.post('/api/send-fundamental-analysis', (req, res) => {
    res.json({ content: contentData});
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});