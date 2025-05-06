import React, { useState, useContext, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiLogOut, FiUser, FiArrowLeft, FiShoppingCart } from "react-icons/fi";
import { DiwaliLamp, RangoliPattern } from "./IndianDecorations";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
const baseURL = import.meta.env.VITE_API_BASE_URL;


// Memoize decorative components
const MemoizedDiwaliLamp = React.memo(DiwaliLamp);
const MemoizedRangoliPattern = React.memo(RangoliPattern);

// Food menu data
const foodCategories = [
  {
    id: 1,
    name: "Breakfast",
    items: [
      { id: 101, name: "Poha", price: 40, description: "Flattened rice with spices and peanuts" },
      { id: 102, name: "Upma", price: 45, description: "Semolina cooked with vegetables" },
      { id: 103, name: "Idli Sambar", price: 50, description: "Steamed rice cakes with lentil soup" },
      { id: 104, name: "Dosa", price: 60, description: "Crispy rice-lentil crepe with chutney" }
    ]
  },
  {
    id: 2,
    name: "Lunch",
    items: [
      { id: 201, name: "Thali", price: 120, description: "Complete meal with 3 vegetables, dal, rice, roti" },
      { id: 202, name: "Rajma Chawal", price: 100, description: "Kidney beans curry with rice" },
      { id: 203, name: "Chole Bhature", price: 110, description: "Chickpea curry with fried bread" },
      { id: 204, name: "Vegetable Biryani", price: 130, description: "Fragrant rice with mixed vegetables" }
    ]
  },
  {
    id: 3,
    name: "Dinner",
    items: [
      { id: 301, name: "Roti-Sabzi", price: 90, description: "Indian bread with seasonal vegetables" },
      { id: 302, name: "Dal Tadka", price: 80, description: "Tempered lentils with spices" },
      { id: 303, name: "Paneer Butter Masala", price: 140, description: "Cottage cheese in rich tomato gravy" },
      { id: 304, name: "Malai Kofta", price: 150, description: "Vegetable dumplings in creamy sauce" }
    ]
  },
  {
    id: 4,
    name: "Snacks",
    items: [
      { id: 401, name: "Samosa", price: 30, description: "Spiced potato stuffed pastry" },
      { id: 402, name: "Pakora", price: 40, description: "Vegetable fritters" },
      { id: 403, name: "Chai", price: 20, description: "Traditional Indian tea" },
      { id: 404, name: "Lassi", price: 50, description: "Sweet yogurt drink" }
    ]
  }
];

const FoodMenuPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(1);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Memoized function for initials
  const getInitials = useCallback((name) => {
    if (!name) return "GU";
    return name.split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase();
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      } else {
        return prevCart.filter(item => item.id !== itemId);
      }
    });
  };

  const handlePlaceOrder = async () => {
    const orderSummary = {
      name: user?.name,
      mobile: user?.mobile,  // Ensure this is part of the AuthContext or profile
      cart,
      total: cartTotal
    };
  
    try {
      const res = await axios.post(`${baseURL}/api/place-order`, orderSummary);
    
      if (res.status === 200) {
        toast.success("🎉🍛 Order placed! Dhanyavaad 🙏🏻 Enjoy your meal!", {
          position: "top-center",
          style: {
            backgroundColor: "#fff8dc",
            color: "#b22222",
            fontWeight: "bold",
            fontFamily: "serif",
            borderRadius: "10px",
            fontSize: "1.1rem"
          },
          icon: "✅"
        });
        setCart([]);
        setShowCart(false);
      }
    } catch (error) {
      console.error("Failed to place order:", error);
      alert("Failed to send order.");
    }
    
  };
  

  // Calculate total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Render marigold flowers
  const renderMarigoldFlowers = () => {
    return [...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-yellow-500 text-xl"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 5 + Math.random() * 10,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        🌼
      </motion.div>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 relative overflow-hidden">
      {/* Decorative elements */}
      <MemoizedRangoliPattern />
      <div className="absolute top-0 right-0">
        <MemoizedDiwaliLamp />
      </div>

      {/* Floating marigold flowers */}
      {renderMarigoldFlowers()}

      {/* Main content container */}
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 relative z-10">
        {/* Header - Same as dashboard */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4"
        >
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="bg-white p-2 rounded-full shadow-md hover:bg-orange-50 transition"
            >
              <FiArrowLeft className="text-orange-700" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-orange-800 font-serif">Kamdhenu Bhawan</h1>
              <p className="text-sm sm:text-base text-orange-600">Traditional Indian Dining & Residence</p>
            </div>
          </div>
          
          {/* User Profile with Dropdown Menu */}
          <div className="relative self-end sm:self-auto flex items-center gap-4">
            {/* Cart Button */}
            <button 
              onClick={() => setShowCart(!showCart)}
              className="relative bg-white p-2 rounded-full shadow-md hover:bg-orange-50 transition"
            >
              <FiShoppingCart className="text-orange-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            
            {/* User Profile */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-full shadow-md p-2 sm:p-3 flex items-center space-x-1 sm:space-x-2 cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                {getInitials(user?.name)}
              </div>
              <div className="hidden sm:block">
                <p className="font-medium text-sm sm:text-base">{user?.name || "Loading..."}</p>
                <p className="text-xs sm:text-sm text-gray-600">Room No: {user?.room || "Loading..."}</p>
              </div>
            </motion.div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-700 flex items-center">
                      <FiUser className="mr-2" />
                      Profile
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-800 font-serif">Traditional Indian Menu</h2>
          <p className="text-orange-600 mt-2">Select items to add to your order</p>
        </motion.div>

        {/* Food Menu Content */}
        <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
            {foodCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${
                  activeCategory === category.id
                    ? 'bg-orange-600 text-white'
                    : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Food Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodCategories.find(cat => cat.id === activeCategory)?.items.map(item => (
              <motion.div
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-white border border-orange-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-orange-800">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    <p className="text-orange-600 font-semibold mt-2">₹{item.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 rounded-full text-sm"
                  >
                    Add
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
            className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-lg z-50 p-4 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-orange-800">Your Order</h3>
              <button 
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-orange-700"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="mt-4 bg-orange-100 text-orange-700 px-4 py-2 rounded-md hover:bg-orange-200"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                <div className="divide-y divide-orange-100">
                  {cart.map(item => (
                    <div key={item.id} className="py-3 flex justify-between">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">₹{item.price} × {item.quantity}</p>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-orange-200 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <button
                    className="w-full mt-4 bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 font-medium"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </button>

                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(FoodMenuPage);