import {Router, Request, Response} from 'express';
const router = Router();

router.post('/Monthly-Record', (req: Request, res: Response) => {
    const {newValue} = req.body;
    const data = [
        { name: 'Jan', value:400},
        { name: 'Feb', value:300},
        { name: 'Mar', value:800},
        { name: 'Apr', value:600},
        { name: 'May', value:700},
    ];

    const updatedData = data.map(item => item.name === 'May' ? {...item, value: newValue} : item);
    
    res.json(updatedData);
});

export default router;