import express from 'express';
import dotenv from 'dotenv';
import customerRoutes from './routes/customerRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import itemTypeRoutes from './routes/itemTypeRoutes.js';
import itemRoutes from './routes/itemRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import { verifyJWT } from './middlewares/verifyJWT.js';
import { handleRefreshToken } from './controllers/refreshTokenControllers.js';
import { login, logout } from './controllers/authControllers.js';
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Login Path
app.post('/login', login);

// Refresh Token Path
app.get('/refresh-token', handleRefreshToken);

// Home Path
app.get('/', (req, res) => {
    res.send('This is the home page of the Server');
});

// Authentication Middleware
app.use(verifyJWT);

// Logout Path
app.get('/logout', logout);

// Customers Path
app.use('/customers', customerRoutes);

// Suppliers Path
app.use('/suppliers', supplierRoutes);

// Employee Path
app.use('/employees', employeeRoutes);

// Item Type Path
app.use('/item-types', itemTypeRoutes);

// Item Path
app.use('/items', itemRoutes);

// Order Path
app.use('/orders', orderRoutes);

// Handle undefined routes
app.all('/*', (req, res) => {
    res.status(404).send('404: Page not found!');
});


app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is running on port ${process.env.SERVER_PORT}`);
});