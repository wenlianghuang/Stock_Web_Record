// generateStockData.tsx
export interface StockData {
    date: number;
    o: number;
    h: number;
    l: number;
    c: number;
  }
  
  export const generateStockData = (): StockData[] => {
    const stockData: StockData[] = [];
    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 11, 31);
  
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const open = Math.random() * 100 + 100;
      const close = open + (Math.random() * 10 - 5);
      const high = Math.max(open, close) + Math.random() * 10;
      const low = Math.min(open, close) - Math.random() * 10;
  
      stockData.push({
        date: date.getTime(),
        o: open,
        h: high,
        l: low,
        c: close,
      });
    }
  
    return stockData;
  };
