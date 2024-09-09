const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  productImage: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const testProductModel = async () => {
  try {
    await mongoose.connect('mongodb+srv://nextstore:Alovez_116@next-store.bqe7m.mongodb.net/next-store?retryWrites=true&w=majority&appName=next-store', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const newProduct = new Product({
      name: "Test Product",
      price: 10.99,
      category: "Test Category",
      productImage: "test.jpg",
      description: "Test Description",
    });

    const savedProduct = await newProduct.save();
    console.log("Saved product:", savedProduct);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.disconnect();
  }
};

testProductModel();