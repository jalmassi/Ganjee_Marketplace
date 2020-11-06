import express from 'express';
import Order from '../models/orderModel'

const router = express.Router();

router.put("/:id/pay", async(req,res) => {
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
    console.log("inside create order server");
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user._id,
        orderItems: req.body.orderItems,
        shipping: req.body.shipping,
        payment: req.body.payment,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        totalPrice: req.body.totalPrice,
    });
    const newOrderCreated = await newOrder.save();
    res.status(201).send({message: "New Order Created", data: newOrderCreated})
});

export default router;