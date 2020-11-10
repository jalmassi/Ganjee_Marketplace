import express from 'express';
import Order from '../models/orderModel'

const router = express.Router();

router.put("/:id/pay", async(req,res) => { //edit order -> paid
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.payment = {
            paymentMethod: 'paypal',
            paymentResult: {
                payerID: req.body.payerID,
                orderID: req.body.orderID,
                paymentID: req.body.paymentID
            }
        }
        const updateOrder = await order.save();
        res.send({message: 'Order paid', order: updateOrder});
    }else{
        res.status(404).send({message: 'Order not found'});
    }
});

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

router.get("/:id", async (req, res) => { //get order details
    console.log("order details: route start");
    console.log(req.params.id);
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: "Order: not found"});
    }
})

export default router;