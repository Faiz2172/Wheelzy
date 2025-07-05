import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, User, Loader2, Sparkles, Car, Zap, Crown, Shield, 
  Search, Settings, TrendingUp, Battery, Leaf, Snowflake, 
  Sun, Droplet, Gauge, MapPin, ShieldCheck, BadgeDollarSign 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import axios from 'axios';
import LoadingScreen from '../LoadingScreen';
import Header from '../Header';

// API configuration - use environment variable or fallback
const AI_RECOMMENDATION_API =  'http://127.0.0.1:8000';

const AiCarRecommendation = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  
  // Load chat history from localStorage on component mount
  const loadChatHistory = () => {
    try {
      const savedHistory = localStorage.getItem('aiCarChatHistory');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        // Convert timestamp strings back to Date objects
        return parsedHistory.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
    
    // Return default welcome message if no history exists
    return [
      {
        id: 1,
        text: "Welcome to the future of car shopping! I'm your AI-powered car recommendation engine. I analyze thousands of vehicles in real-time to find your perfect match. What's your dream car scenario?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'welcome'
      }
    ];
  };

  const [messages, setMessages] = useState(loadChatHistory);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [quickActionVisible, setQuickActionVisible] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);
  const [carDetailsVisible, setCarDetailsVisible] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [messagesContainer] = useAutoAnimate();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Save chat history to localStorage whenever messages change
  const saveChatHistory = (newMessages) => {
    try {
      localStorage.setItem('aiCarChatHistory', JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };

  // Clear chat history
  const clearChatHistory = () => {
    const welcomeMessage = [
      {
        id: 1,
        text: "Welcome to the future of car shopping! I'm your AI-powered car recommendation engine. I analyze thousands of vehicles in real-time to find your perfect match. What's your dream car scenario?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'welcome'
      }
    ];
    setMessages(welcomeMessage);
    saveChatHistory(welcomeMessage);
    setQuickActionVisible(true);
  };

  // Handle loading screen for 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoadingScreen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save chat history whenever messages change
  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  // Function to map backend car data to frontend format
  const mapBackendCarToFrontend = (backendCar) => {
    return {
      id: backendCar.id || Math.random().toString(36).substr(2, 9),
      name: `${backendCar.Make || ''} ${backendCar.Model || ''} ${backendCar.Variant || ''}`.trim(),
      price: backendCar.Price || 'Price not available',
      matchScore: Math.round((backendCar.score || 0) * 100),
      image: "https://digitalassets.tesla.com/tesla-contents/image/upload/f_auto,q_auto/Model-S-Main-Hero-Desktop-LHD.jpg", // Default image
      features: [
        backendCar.Body_Type && `${backendCar.Body_Type}`,
        backendCar.Fuel_Type && `${backendCar.Fuel_Type} engine`,
        backendCar.Power && `${backendCar.Power} power`,
        backendCar.ARAI_Certified_Mileage && `${backendCar.ARAI_Certified_Mileage} mileage`,
        backendCar.Seating_Capacity && `${backendCar.Seating_Capacity} seats`
      ].filter(Boolean),
      specs: {
        range: backendCar.ARAI_Certified_Mileage || '-',
        chargeTime: backendCar.Transmission || '-',
        efficiency: backendCar.Fuel_Type || '-',
        topSpeed: backendCar.Power || '-'
      },
      // Store original backend data for detailed view
      originalData: backendCar
    };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);
    setQuickActionVisible(false);

    try {
      // Make API call to FastAPI backend
      const response = await axios.post(`${AI_RECOMMENDATION_API}/recommend`, {
        query: inputValue,
        user_preferences: null // You can add user preferences here if needed
      });

      // Check if we have recommendations
      if (response.data.recommendations && response.data.recommendations.length > 0) {
        // Map backend data to frontend format
        const mappedCars = response.data.recommendations.map(mapBackendCarToFrontend);
        
        const botResponse = {
          id: messages.length + 2,
          text: `Here are your car recommendations for: "${response.data.query_processed}"\n\nI found ${response.data.total_results} cars matching your criteria. Processing time: ${response.data.processing_time.toFixed(2)}s`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'recommendation',
          cars: mappedCars
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        // No recommendations found
        const botResponse = {
          id: messages.length + 2,
          text: `I couldn't find any cars matching "${response.data.query_processed}". Try being more specific about your requirements, such as:\n\n• "SUV under 15 lakhs"\n• "Electric car with good range"\n• "Family car with 7 seats"`,
          sender: 'bot',
          timestamp: new Date(),
          type: 'no_results'
        };
        setMessages(prev => [...prev, botResponse]);
      }
    } catch (error) {
      console.error('API Error:', error);
      
      let errorMessage = "Sorry, there was an error connecting to the recommendation engine.";
      
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 404) {
          errorMessage = "The recommendation service is not available. Please try again later.";
        } else if (error.response.status === 500) {
          errorMessage = "The recommendation engine encountered an error. Please try a different query.";
        } else {
          errorMessage = `Server error (${error.response.status}). Please try again.`;
        }
      } else if (error.request) {
        // Network error
        errorMessage = "Unable to connect to the recommendation service. Please check your internet connection.";
      }
      
      setMessages(prev => [...prev, {
        id: messages.length + 2,
        text: errorMessage,
        sender: 'bot',
        timestamp: new Date(),
        type: 'error'
      }]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };


  const handleQuickAction = (text) => {
    setInputValue(text);
    setQuickActionVisible(false);
  };

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    setCarDetailsVisible(true);
  };

  const handleCheckAvailability = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000); // Hide after 3 seconds
  };

  const SuccessToast = () => (
    <motion.div
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
      />
      <span className="font-medium">Availability check request sent!</span>
    </motion.div>
  );

  const LoadingAnimation = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start space-x-3 mb-6"
    >
      <div className="relative">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Bot size={20} className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex items-center space-x-2 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl rounded-tl-md border border-gray-100 shadow-sm">
          <div className="flex space-x-1">
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            ></motion.div>
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: 0.1 }}
              className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
            ></motion.div>
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
              className="w-2 h-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full"
            ></motion.div>
          </div>
          <span className="text-sm text-gray-600 font-medium">AI analyzing preferences...</span>
        </div>
        <div className="flex space-x-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full"
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );

  const Message = ({ message }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-6 px-4 lg:px-8`}
    >
      <div className={`flex max-w-xs md:max-w-md lg:max-w-2xl ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 ${message.sender === 'user' ? 'ml-3' : 'mr-3'}`}>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg ${
              message.sender === 'user' 
                ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500' 
                : 'bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500'
            }`}
          >
            {message.sender === 'user' ? (
              <User size={20} className="text-white" />
            ) : (
              <Bot size={20} className="text-white" />
            )}
          </motion.div>
        </div>
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className={`px-6 py-4 rounded-2xl shadow-sm backdrop-blur-sm ${
            message.sender === 'user' 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md' 
              : message.type === 'welcome'
              ? 'bg-gradient-to-r from-violet-50 to-blue-50 text-gray-800 rounded-bl-md border border-violet-200'
              : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
          }`}
        >
          <p className="text-sm md:text-base leading-relaxed font-medium">{message.text}</p>
          
          {message.type === 'recommendation' && message.cars && (
            <div className="mt-4 space-y-4">
              <h3 className="font-bold text-violet-600">Top Recommendations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {message.cars.map((car) => (
                  <motion.div 
                    key={car.id}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCarSelect(car)}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer transition-all"
                  >
                    <div className="relative">
                      <div className="h-32 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                        <Car size={48} className="text-gray-300" />
                      </div>
                      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-violet-600 shadow-sm">
                        {car.matchScore}% Match
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-gray-900">{car.name}</h4>
                      <p className="text-lg font-bold text-blue-600 mt-1">{car.price}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {car.features.map((feature, i) => (
                          <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs opacity-70">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            {message.sender === 'bot' && (
              <div className="flex items-center space-x-1 text-xs opacity-70">
                <Sparkles size={12} />
                <span>AI</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );

  const QuickActions = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`px-4 lg:px-8 py-6`}
    >
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Popular Car Categories
        </h3>
        <p className="text-sm text-gray-500">Tap to explore personalized recommendations</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: Crown, text: "Luxury & Premium", query: "Show me luxury cars with premium features and performance", color: "from-yellow-400 to-orange-500" },
          { icon: Zap, text: "Electric & Hybrid", query: "Find electric vehicles with best range and charging network", color: "from-green-400 to-blue-500" },
          { icon: Shield, text: "Family & Safety", query: "Recommend family-friendly cars with top safety ratings", color: "from-blue-400 to-purple-500" },
          { icon: BadgeDollarSign, text: "Best Value", query: "Find cars with best value for money and low maintenance", color: "from-purple-400 to-pink-500" }
        ].map((action, index) => (
          <motion.button
            key={index}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleQuickAction(action.query)}
            className="group p-4 bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300"
          >
            <motion.div 
              className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3`}
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <action.icon size={24} className="text-white" />
            </motion.div>
            <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">{action.text}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );

  const StatsBar = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: showLoadingScreen ? 0.7 : 0.5 }}
      className="px-4 lg:px-8 py-3 bg-gradient-to-r from-violet-50 to-blue-50 border-y border-gray-100"
    >
      <div className="flex items-center justify-center space-x-6 text-xs md:text-sm">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-1"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600">50,000+ Cars Analyzed</span>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-1"
        >
          <TrendingUp size={14} className="text-blue-500" />
          <span className="text-gray-600">Real-time Pricing</span>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-1"
        >
          <Sparkles size={14} className="text-purple-500" />
          <span className="text-gray-600">AI Powered</span>
        </motion.div>
      </div>
    </motion.div>
  );

  const CarDetailsModal = () => (
    <AnimatePresence>
      {carDetailsVisible && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setCarDetailsVisible(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            {selectedCar && (
              <div className="relative">
                <div className="h-64 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                  <Car size={72} className="text-gray-300" />
                </div>
                <button 
                  onClick={() => setCarDetailsVisible(false)}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCar.name}</h2>
                      <p className="text-xl font-bold text-blue-600 mt-1">{selectedCar.price}</p>
                    </div>
                    <div className="bg-gradient-to-r from-violet-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {selectedCar.matchScore}% Match
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Key Features</h3>
                      <div className="space-y-3">
                        {selectedCar.features.map((feature, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                              <Sparkles size={16} className="text-violet-600" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Technical Specifications</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Battery size={16} className="text-blue-500" />
                            <span className="text-sm font-medium">Range</span>
                          </div>
                          <p className="text-lg font-bold mt-1">{selectedCar.specs.range}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Gauge size={16} className="text-purple-500" />
                            <span className="text-sm font-medium">Top Speed</span>
                          </div>
                          <p className="text-lg font-bold mt-1">{selectedCar.specs.topSpeed}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Zap size={16} className="text-yellow-500" />
                            <span className="text-sm font-medium">Charge Time</span>
                          </div>
                          <p className="text-lg font-bold mt-1">{selectedCar.specs.chargeTime}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Leaf size={16} className="text-green-500" />
                            <span className="text-sm font-medium">Efficiency</span>
                          </div>
                          <p className="text-lg font-bold mt-1">{selectedCar.specs.efficiency}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-violet-600 text-white py-3 px-6 rounded-lg font-bold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                      <MapPin size={18} />
                      <span>Find Nearest Dealer</span>
                    </button>
                    <button 
                      onClick={handleCheckAvailability}
                      className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-bold hover:bg-gray-50 transition-all flex items-center justify-center space-x-2"
                    >
                      <ShieldCheck size={18} />
                      <span>Check Availability</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <AnimatePresence>
        {showLoadingScreen && (
          <LoadingScreen 
            title="AI Car Recommendation"
            message="Loading your personalized car recommendation engine..."
          />
        )}
      </AnimatePresence>
      
      <div className="flex flex-col h-screen bg-gradient-to-br from-violet-50 via-white to-blue-50 overflow-hidden">
        <Header/>
        {/* Header */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: showLoadingScreen ? 0.5 : 0 }}
          className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 px-4 lg:px-8 py-4 shadow-sm"
        >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ rotate: 10 }}
              className="w-14 h-14 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Car size={24} className="text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                AI Car Recommendation
              </h1>
              <p className="text-sm text-gray-500">
                {isTyping ? (
                  <span className="flex items-center">
                    <div className="flex space-x-1 mr-2">
                      <motion.div 
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="w-1 h-1 bg-blue-500 rounded-full"
                      ></motion.div>
                      <motion.div 
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.1 }}
                        className="w-1 h-1 bg-purple-500 rounded-full"
                      ></motion.div>
                      <motion.div 
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                        className="w-1 h-1 bg-pink-500 rounded-full"
                      ></motion.div>
                    </div>
                    AI is analyzing your preferences...
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Powered by advanced AI algorithms</span>
                    {messages.length > 1 && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                        {messages.length - 1} messages in history
                      </span>
                    )}
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearChatHistory}
              className="p-3 hover:bg-red-50 rounded-2xl transition-colors text-red-600"
              title="Clear Chat History"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
            <motion.button 
              whileHover={{ rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 hover:bg-gray-100 rounded-2xl transition-colors"
            >
              <Settings size={20} className="text-gray-600" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <StatsBar />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto" ref={messagesContainer}>
        <div className="py-8">
          {messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="px-4 lg:px-8">
              <LoadingAnimation />
            </div>
          )}
          {quickActionVisible && messages.length === 1 && <QuickActions />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: showLoadingScreen ? 0.8 : 0.3 }}
        className="bg-white/80 backdrop-blur-lg border-t border-gray-200/50 px-4 lg:px-8 py-4 shadow-lg"
      >
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <motion.input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Describe your perfect car... (e.g., 'luxury SUV under $80k with hybrid engine')"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm md:text-base transition-all duration-200 placeholder-gray-400"
              disabled={isLoading}
              whileFocus={{ scale: 1.005 }}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <Search size={20} className="text-gray-400" />
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-12 h-12 bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </motion.button>
        </form>
      </motion.div>

      {/* Car Details Modal */}
      <CarDetailsModal />

      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              scale: 0.5 + Math.random() * 1.5
            }}
            animate={{ 
              opacity: [0, 0.1, 0],
              scale: [0.5 + Math.random(), 1 + Math.random()],
              x: [Math.random() * 100 - 50, Math.random() * 200 - 100],
              y: [Math.random() * 100 - 50, Math.random() * 200 - 100]
            }}
            transition={{ 
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute rounded-full bg-gradient-to-r from-violet-200 to-blue-200"
            style={{
              width: `${10 + Math.random() * 20}px`,
              height: `${10 + Math.random() * 20}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(8px)'
            }}
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default AiCarRecommendation;