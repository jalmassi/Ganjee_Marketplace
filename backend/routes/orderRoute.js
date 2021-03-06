import express from 'express';
import { Mongoose } from 'mongoose';
import Order from '../models/orderModel'

const router = express.Router();
router.post("/", async (req,res) => { //create order
    const newOrder = new Order({
        orderItems: req.body.cartItems,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.body.userId
    });
    const newOrderCreated = await newOrder.save();
    res.status(201).send({message: "New Order Created", data: newOrderCreated})
});
router.get("/mine", async (req,res) => {
    // console.log("inside mine route");
    let cookie = JSON.parse(req.cookies.userInfo);
    console.log(cookie);
    console.log(cookie._id);
    const orders = await Order.find({user: cookie._id});
    if(orders)
        res.send(orders);
    else
        res.status(404).send({message: "No orders found"});
});

router.get("/:id", async (req, res) => { //get order details
    const order = await Order.findById(req.params.id);
    if(order){
        console.log("order details going to be sent");
        res.send(order);
    }else{
        res.status(404).send({message: "Order: not found"});
    }
});

router.put("/:id/pay", async(req,res) => { //edit order -> paid
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();

        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
            };
        const updateOrder = await order.save();
        res.send({message: 'Order paid', order: updateOrder});
    }else{
        res.status(404).send({message: 'Order not found'});
    }
});




export default router;