
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieparser from 'cookie-parser'
import { router } from './routes'
import { connect } from './config/db'

const app = express();
const port = 3001;

connect()

// Middleware
var corsOptions = {
  origin: ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:3000/'],
  credentials: true
}

app.use(cors(corsOptions))
app.use(cookieparser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', router)

// Start Server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
