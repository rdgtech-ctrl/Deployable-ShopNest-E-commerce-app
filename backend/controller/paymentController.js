require("dotenv").config();  // ← Add this at the very top
const Razorpay = require("razorpay");
const crypto = require("crypto");

const createdOrder = async (req, res) => {
  try {
    console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
    console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);
    
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    
    const order = await instance.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Payment error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
      
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      res.status(200).json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Verify error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createdOrder, verifyPayment };