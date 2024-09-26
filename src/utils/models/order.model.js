import { timeStamp } from 'console';
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  email: { type: String, required: true },
  products: [{
    productId: { type: String, required: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
  }],
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  discount: { type: Number, default: 0 },
  paymentStatus: { type: String, required: true },
  orderStatus: { type: String, required: true, default: 'pending' },
},
  { timestamps: true }
);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;