import express from 'express';
import cors from "cors";
import { config } from "dotenv"
import router from './routes/index.js';
config()

const cors_option = {
    origin:["http://localhost:3000","https://tracking-energy-usage.web.app"],
    methods: ["GET", "POST", "DELETE", "UPDATE", "PATCH", "PUT"]
}

const app = express();
app.use(cors(cors_option));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// API Routes
app.use('/api', router);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));