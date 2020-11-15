import express from 'express'; //creates server
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import bodyParser from 'body-parser';

const cookieParser = require('cookie-parser');

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {console.log('mongodb connected')})
.catch(error => console.log(error.reason));


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/users", userRoute); //concatenates this path to route url
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute)
app.use('/api/config/paypal', (req, res) => {
    console.log("/api/config/paypal: " + process.env.PAYPAL_CLIENT_ID);
    res.send('Ae4293kx8roL-JuFi_reCihWog9WabFzUR3yNUgCSweTK2YIsnud1DHW-rRkYLqopdSkUbNTBs2HXZE9')
    // res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
});
app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = res.send(data.products.find(x=>x._id === productId));
    if(product)
        res.send(product);
    else
        res.status(404).send({msg: "Product Not Found"});
});

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.listen(5000, () => {console.log("Server started at http://localhost:5000")});