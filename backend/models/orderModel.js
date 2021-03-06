import mongoose from 'mongoose';

const shippingSchema = {
    address: {type: String, required: true},
    city: {type: String, required: true},
    postalCode: {type: String, required: true},
    country: {type: String, required: true},
}
const paymentSchema = {
    paymentMethod: {type: String, required: true}
}
const orderItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    qty: {type: Number, required: true},
    image: {type: String, required: true},
    price: {type: String, required: true},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
});
const paymentResultSchema = {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String},
}
const orderSchema = new mongoose.Schema({
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    paymentResult: paymentResultSchema,
    itemsPrice: {type: Number},
    taxPrice: {type: Number},
    shippingPrice: {type: Number},
    totalPrice: {type: Number},
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: {type: Date},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
},
{timestamps: true}
);

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;