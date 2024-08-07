import cors from 'cors';
import express, { Request, Response } from 'express';
const fs = require('fs');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/update-data', (req: Request, res: Response) => {

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
    
    // 获取前端发送的数据
    const stockData = req.body;

    // 模拟处理数据，简单地将每个股票的 value 和 change 修改一下
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

    // 返回处理后的数据
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
// 定义存储数据的变量
let stockData: any[] = [];

// 读取 JSON 文件并更新数据
const updateData = () => {
    fs.readFile('D:\\Stock_Web_Record\\data.json', 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            return;
        }
        stockData = JSON.parse(data);
        console.log("Data updated:", stockData);
    });
};

// 初始化数据
updateData();

// 每隔 10 秒钟更新一次数据
setInterval(updateData, 10000);
app.post('/api/update-data', (req, res) => {
    res.json(stockData);
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});