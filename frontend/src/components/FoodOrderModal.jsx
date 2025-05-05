import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FoodOrderModal = ({ onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("thali");
  const [cart, setCart] = useState([]);

  const menuItems = {
    thali: [
      { id: 1, name: "Punjabi Thali", price: 250, description: "Butter chicken, dal makhani, paneer, naan, rice, salad" },
      { id: 2, name: "Gujarati Thali", price: 220, description: "Dhokla, thepla, shaak, dal, rice, kadhi" },
      { id: 3, name: "South Indian Thali", price: 230, description: "Sambar, rasam, 3 types of vegetable, rice, papad" },
    ],
    biryani: [
      { id: 4, name: "Hyderabadi Biryani", price: 180, description: "Authentic dum biryani with raita" },
      { id: 5, name: "Veg Biryani", price: 150, description: "Flavorful vegetable biryani" },
    ],
    snacks: [
      { id: 6, name: "Samosa Chaat", price: 80, description: "Crispy samosas with chutneys and yogurt" },
      { id: 7, name: "Pani Puri", price: 60, description: "6 pieces with sweet and spicy waters" },
    ],
    desserts: [
      { id: 8, name: "Gulab Jamun", price: 50, description: "2 pieces with syrup" },
      { id: 9, name: "Kheer", price: 60, description: "Traditional rice pudding" },
    ]
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center border-b p-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
            <h3 className="text-xl font-bold font-serif">Order Traditional Indian Food</h3>
            <button onClick={onClose} className="text-2xl hover:text-orange-200 transition">&times;</button>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Menu Section */}
            <div className="w-full md:w-2/3 p-4 overflow-y-auto">
              <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                {Object.keys(menuItems).map(category => (
                  <motion.button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-full capitalize whitespace-nowrap ${
                      selectedCategory === category 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-4">
                {menuItems[selectedCategory].map(item => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="border border-orange-200 rounded-lg p-4 flex justify-between items-start hover:shadow-md transition"
                  >
                    <div>
                      <h4 className="font-medium text-lg text-orange-800">{item.name}</h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-orange-700 font-semibold mt-1">₹{item.price}</p>
                    </div>
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-full hover:bg-orange-700 transition flex items-center"
                    >
                      <span className="mr-1">+</span> Add
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Cart Section */}
            <div className="w-full md:w-1/3 border-l p-4 bg-orange-50 flex flex-col">
              <h4 className="font-bold text-lg mb-4 text-orange-800 font-serif">Your Order</h4>
              
              {cart.length === 0 ? (
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="text-center text-orange-500 my-auto py-8"
                >
                  <p className="text-xl mb-2">🛒</p>
                  <p>Your cart is empty</p>
                  <p className="text-sm mt-2">Select items from the menu</p>
                </motion.div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto">
                    {cart.map((item, index) => (
                      <motion.div
                        key={`${item.id}-${index}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex justify-between items-center py-3 border-b border-orange-200"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-orange-600">₹{item.price}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="text-red-600 hover:text-red-800 text-xl"
                        >
                          &times;
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-orange-200 pt-4 mt-4">
                    <div className="flex justify-between font-bold mb-4 text-orange-800">
                      <span>Total:</span>
                      <span>₹{totalAmount}</span>
                    </div>
                    <div className="space-y-3">
                      <textarea
                        placeholder="Special Instructions (no onion, less spicy, etc.)"
                        className="w-full px-3 py-2 border border-orange-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        rows="2"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-700 transition font-medium"
                      >
                        Place Order (₹{totalAmount})
                      </motion.button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FoodOrderModal;