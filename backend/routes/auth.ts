import { Router,Request,Response } from "express";
import pgPromise from "pg-promise";

const router = Router();
const pgp = pgPromise();
const db = pgp({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

router.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    db.oneOrNone('SELECT * FROM stockuser WHERE account = $1 AND password = $2', [username, password])
        .then((user: any) => {
            if (user) {
                res.json({ message: 'Login successful' });
            } else {
                res.json({ message: 'Invalid username or password' });
            }
        })
        .catch((error: any) => {
            console.error('Error querying the database:', error);
            res.status(500).json({ message: 'Server error' });
        });
});

router.post('/signup', (req: Request, res: Response) => {
    const { account, password } = req.body;
    const createdatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    db.none('INSERT INTO stockuser(account, password, createdatetime) VALUES($1, $2, $3)', [account, password, createdatetime])
        .then(() => {
            res.json({ message: 'Account created' });
        })
        .catch((error: any) => {
            console.error('Error inserting into the database:', error);
            res.status(500).json({ message: 'Server error' });
        });
});

export default router;
