const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const nodemailer = require("nodemailer");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "*", // or specify exact domain like: "https://your-frontend.vercel.app"
  credentials: true
}));
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);
app.post("/api/place-order", async (req, res) => {
  try {
    const { name, mobile, room, cart, total } = req.body; // ✅ included room
    console.log("Incoming order summary:", req.body);

    if (!name || !mobile || !room || !Array.isArray(cart) || !total) {
      return res.status(400).send("Invalid order data.");
    }

    const orderDetails = cart.map(item =>
      `- ${item.name} ×${item.quantity} = ₹${item.price * item.quantity}`
    ).join("\n");

    const message = `
Order from Kamdhenu Bhawan:
Customer: ${name}
Mobile: ${mobile}
Room: ${room}  👈

Items:
${orderDetails}

Total: ₹${total}
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // Use Gmail App Passwords
      }
    });

    console.log("Email message:\n", message);

    await transporter.sendMail({
      from: "gautamyadav6232@gmail.com",
      to: "pande.prakhar007@gmail.com",
      subject: "New Food Order",
      text: message
    });

    res.status(200).send("Order placed and email sent.");
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).send("Failed to place order.");
  }
});


app.get("/", (req, res) => {
  res.send("Kamdhenu Bhawan Food Ordering Backend is running");
});

mongoose.connect(process.env.MONGO_URI,)
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
