import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    id: String,
    title: String,
    price: Number,
    image: String,
    slug: String,
    category: String,
    quantity: { type: Number, default: 1 }
});

const cartSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Changed to String to match Clerk ID
    items: [cartItemSchema]
}, { timestamps: true });

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default Cart;