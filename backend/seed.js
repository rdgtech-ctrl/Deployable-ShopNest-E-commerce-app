const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");

const users = [
  {
    name: "Admin User",
    email: "admin@shopnest.com",
    password: "admin123",
    role: "admin",
    verified: true,
  },
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: "john123",
    role: "user",
    verified: true,
  },
  {
    name: "Jane Smith",
    email: "jane@gmail.com",
    password: "jane123",
    role: "user",
    verified: true,
  },
];

const products = [
  {
    name: "iPhone 15 Pro",
    description: "Latest Apple iPhone with A17 Pro chip and titanium design.",
    price: 129999,
    category: "Electronics",
    stock: 50,
    imageUrl:
      "https://imgs.search.brave.com/wHqj7EGiLQqHxdL4FaZUXOHshREeqjFay_18l-ZX8ik/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0cv/MzEvaW1nMjUvV2ly/ZWxlc3MvTWFkaGF2/L0ZlYi9BcHBsZS9j/b21wL0FNWl9GYW1p/bHlfU3RyaXBlX2lQ/aG9uZV8xNV9wcm8u/X0NCNTUwMTA5ODI4/Xy5wbmc",
    rating: 4.8,
    numReviews: 120,
  },
  {
    name: "Samsung Galaxy S24",
    description: "Flagship Android phone with AI-powered camera.",
    price: 89999,
    category: "Electronics",
    stock: 40,
    imageUrl:
      "https://imgs.search.brave.com/Hvr4Biafuv97kDRlYxE2QV-wTz8A-DKcSqMVbnVbLc0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9mZG4u/Z3NtYXJlbmEuY29t/L2ltZ3Jvb3QvcmV2/aWV3cy8yNC9zYW1z/dW5nLWdhbGF4eS1z/MjQtdWx0cmEvbGlm/ZXN0eWxlLy0xMDI0/dzIvZ3NtYXJlbmFf/MDI1LmpwZw",
    rating: 4.6,
    numReviews: 95,
  },
  {
    name: "Nike Air Max 270",
    description: "Comfortable and stylish running shoes with Air Max sole.",
    price: 12999,
    category: "Footwear",
    stock: 100,
    imageUrl:
      "https://imgs.search.brave.com/8KkpY3RSCON59pU9GbTKKvcB5lVRgHwyhIfk9tkYaR0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWRlYWxvLmNvbS9m/b2xkZXIvUHJvZHVj/dC82MDY1LzYvNjA2/NTYyOS9zMV9wcm9k/dWt0YmlsZF9ncm9z/cy9uaWtlLWFpci1t/YXgtMjcwLmpwZw",
    rating: 4.5,
    numReviews: 200,
  },
  {
    name: "Levi's 501 Jeans",
    description: "Classic straight fit jeans made with premium denim.",
    price: 4999,
    category: "Clothing",
    stock: 150,
    imageUrl:
      "https://imgs.search.brave.com/vo4_Su_6FPhjUqefUW03rZn1iIE9Kot0Nsl_2_1vFl8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pNS53/YWxtYXJ0aW1hZ2Vz/LmNvbS9zZW8vTGV2/aS1zLU1lbi1zLTUw/MS1PcmlnaW5hbC1G/aXQtSmVhbnNfYzM1/YWE1N2QtNTgwMy00/YjU1LWE4ODMtMTky/ODlmMjY0OTc2LmU4/MjYwODdmM2QyMzE1/OGFkMzgxNmI1MTk1/MDgzZjY4LmpwZWc_/b2RuSGVpZ2h0PTg2/NCZvZG5XaWR0aD01/NzYmb2RuQmc9RkZG/RkZG",
    rating: 4.3,
    numReviews: 180,
  },
  {
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancelling wireless headphones.",
    price: 29999,
    category: "Electronics",
    stock: 30,
    imageUrl:
      "https://imgs.search.brave.com/nhEvGkS9JoPGcN-z78ADYl_WwCM6U6KWFUlg19bipmY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c291bmRndXlzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/Mi8wNS9zb255LXdo/LTEwMDB4bTUtaGVy/by5qcGc",
    rating: 4.9,
    numReviews: 300,
  },
  {
    name: "MacBook Air M2",
    description: "Supercharged by M2 chip, ultra-thin and lightweight laptop.",
    price: 114999,
    category: "Electronics",
    stock: 25,
    imageUrl:
      "https://imgs.search.brave.com/B2DjgI7v-6vgjekgq8a-tiN_stGRvERXs64FgSi2erU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjFFWUo5NW5Rb0wu/anBn",
    rating: 4.9,
    numReviews: 250,
  },
  {
    name: "Adidas Ultraboost 22",
    description: "High performance running shoes with Boost cushioning.",
    price: 14999,
    category: "Footwear",
    stock: 80,
    imageUrl:
      "https://imgs.search.brave.com/Z-B0G3szIUDpt3jvXCqa5bBqrBvQ29lQGldOC6LgsJ4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pLmVi/YXlpbWcuY29tL2lt/YWdlcy9nL3U0SUFB/ZVN3MkZ0cE9kZXAv/cy1sNDAwLndlYnA",
    rating: 4.4,
    numReviews: 160,
  },
  {
    name: "Cotton Casual T-Shirt",
    description: "Soft and breathable 100% cotton t-shirt for everyday wear.",
    price: 799,
    category: "Clothing",
    stock: 300,
    imageUrl:
      "https://imgs.search.brave.com/G5t4LFiMpp8WCXi_rYs57mkCQLvK2UumSa2UbGLCjB8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dmlzaGFsbWVnYW1h/cnQuY29tL2R3L2lt/YWdlL3YyL0JHSFRf/UFJEL29uL2RlbWFu/ZHdhcmUuc3RhdGlj/Ly0vU2l0ZXMtdm1t/LWFwcGFyZWwtbWFz/dGVyLWNhdGFsb2cv/ZGVmYXVsdC9kdzkz/YjI1MjFiL2ltYWdl/cy9sYXJnZS8xMTEw/MDY1Nzc5MDAyLmpw/Zz9zdz00MDAmc2g9/NDAw",
    rating: 4.1,
    numReviews: 400,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    console.log("Existing data cleared...");

    // Hash passwords and insert users
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return { ...user, password: hashedPassword };
      }),
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`${createdUsers.length} users seeded...`);

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`${createdProducts.length} products seeded...`);

    // Create sample orders
    const orders = [
      {
        user: createdUsers[1]._id, // John
        items: [
          {
            productId: createdProducts[0]._id, // iPhone
            qty: 1,
            price: createdProducts[0].price,
          },
          {
            productId: createdProducts[4]._id, // Sony Headphones
            qty: 1,
            price: createdProducts[4].price,
          },
        ],
        totalAmount: createdProducts[0].price + createdProducts[4].price,
        address: {
          fullName: "John Doe",
          street: "123 MG Road",
          city: "Bangalore",
          postalCode: "560001",
          country: "India",
        },
        paymentId: "pay_test_123456",
        status: "delivered",
      },
      {
        user: createdUsers[2]._id, // Jane
        items: [
          {
            productId: createdProducts[2]._id, // Nike shoes
            qty: 2,
            price: createdProducts[2].price,
          },
        ],
        totalAmount: createdProducts[2].price * 2,
        address: {
          fullName: "Jane Smith",
          street: "456 Park Street",
          city: "Mumbai",
          postalCode: "400001",
          country: "India",
        },
        paymentId: "pay_test_789012",
        status: "shipped",
      },
      {
        user: createdUsers[1]._id, // John
        items: [
          {
            productId: createdProducts[5]._id, // MacBook
            qty: 1,
            price: createdProducts[5].price,
          },
        ],
        totalAmount: createdProducts[5].price,
        address: {
          fullName: "John Doe",
          street: "123 MG Road",
          city: "Bangalore",
          postalCode: "560001",
          country: "India",
        },
        paymentId: "pay_test_345678",
        status: "pending",
      },
    ];

    const createdOrders = await Order.insertMany(orders);
    console.log(`${createdOrders.length} orders seeded...`);

    console.log("\nDatabase seeded successfully!");
    console.log("\n--- Login Credentials ---");
    console.log("Admin   admin@shopnest.com / admin123");
    console.log("User 1 -> john@gmail.com / john123");
    console.log("User 2 -> jane@gmail.com / jane123");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
