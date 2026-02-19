import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);
  const { t, isRTL } = useLanguage();
  const { isDark } = useTheme();

  useEffect(() => {
    const savedSession = localStorage.getItem('sara-chat-session');
    if (savedSession) {
      setSessionId(savedSession);
      loadChatHistory(savedSession);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      const scrollElement = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const loadChatHistory = async (sid) => {
    try {
      const response = await axios.get(`${API}/chat/history/${sid}`);
      if (response.data && response.data.length > 0) {
        setMessages(response.data.map(msg => ({
          role: msg.role,
          content: msg.content
        })));
        setShowQuickActions(false);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: isRTL 
          ? 'مرحباً! أنا كليم، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟'
          : "Hi! I'm Kaleem, your AI assistant. How can I help you today?"
      }]);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    setShowQuickActions(false);
    const userMessage = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API}/chat`, {
        message: text,
        session_id: sessionId
      });

      const { response: aiResponse, session_id: newSessionId } = response.data;
      
      if (newSessionId && !sessionId) {
        setSessionId(newSessionId);
        localStorage.setItem('sara-chat-session', newSessionId);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: aiResponse
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: isRTL 
          ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
          : 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = [
    { 
      key: 'services',
      icon: '🏢',
      label: isRTL ? 'استكشف خدماتنا' : 'Explore Services',
      message: isRTL ? 'أخبرني عن خدماتكم' : 'Tell me about your services'
    },
    { 
      key: 'demo',
      icon: '📅',
      label: isRTL ? 'احجز عرض توضيحي' : 'Book a Demo',
      message: isRTL ? 'أريد حجز عرض توضيحي' : 'I want to book a demo'
    },
    { 
      key: 'pricing',
      icon: '💰',
      label: isRTL ? 'الأسعار والباقات' : 'Pricing Info',
      message: isRTL ? 'ما هي أسعاركم؟' : 'What are your prices?'
    },
    { 
      key: 'support',
      icon: '🆘',
      label: isRTL ? 'الدعم الفني' : 'Get Support',
      message: isRTL ? 'أحتاج مساعدة' : 'I need help'
    },
  ];

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: isRTL 
        ? 'مرحباً! أنا كليم، مساعدك الذكي. كيف يمكنني مساعدتك اليوم؟'
        : "Hi! I'm Kaleem, your AI assistant. How can I help you today?"
    }]);
    setShowQuickActions(true);
    localStorage.removeItem('sara-chat-session');
    setSessionId(null);
  };

  return (
    <>
      {/* Chat Launcher */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleOpen}
            className={`fixed z-40 bottom-24 ${isRTL ? 'left-6' : 'right-6'}`}
            data-testid="chatbot-launcher"
          >
            <div className="relative">
              {/* Glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-sara-cyan"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Main button */}
              <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>

              {/* Notification dot */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-2 h-2 text-white" />
              </motion.div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed bottom-24 z-50 w-full max-w-sm h-[500px] max-h-[70vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden ${
              isRTL ? 'left-6' : 'right-6'
            } ${isDark 
              ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/10' 
              : 'bg-white border border-gray-200'
            }`}
            data-testid="chatbot-window"
          >
            {/* Header */}
            <div className={`relative p-4 ${
              isDark 
                ? 'bg-gradient-to-r from-cyan-600/20 to-purple-600/20' 
                : 'bg-gradient-to-r from-cyan-50 to-purple-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Kaleem
                    </h3>
                    <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isRTL ? 'مساعدك الذكي' : 'AI Assistant'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearChat}
                    className={`w-8 h-8 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                    title={isRTL ? 'مسح المحادثة' : 'Clear chat'}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className={`w-8 h-8 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
                    data-testid="chatbot-close"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 px-4 py-3" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end gap-2 max-w-[85%] ${
                      msg.role === 'user' ? 'flex-row-reverse' : ''
                    }`}>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                          : 'bg-gradient-to-br from-cyan-400 to-cyan-600'
                      }`}>
                        {msg.role === 'user' 
                          ? <User className="w-3.5 h-3.5 text-white" />
                          : <Bot className="w-3.5 h-3.5 text-white" />
                        }
                      </div>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? `bg-gradient-to-br from-purple-500 to-pink-500 text-white ${
                              isRTL ? 'rounded-br-md' : 'rounded-br-md'
                            }`
                          : `${isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'} ${
                              isRTL ? 'rounded-bl-md' : 'rounded-bl-md'
                            }`
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Quick Actions */}
                {showQuickActions && messages.length <= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2 pt-2"
                  >
                    <p className={`text-xs font-medium px-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {isRTL ? 'اختر موضوعاً:' : 'Quick actions:'}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action) => (
                        <motion.button
                          key={action.key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => sendMessage(action.message)}
                          className={`flex items-center gap-2 p-3 rounded-xl text-left transition-all ${
                            isDark 
                              ? 'bg-white/5 hover:bg-white/10 border border-white/10' 
                              : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                          }`}
                          data-testid={`quick-action-${action.key}`}
                        >
                          <span className="text-lg">{action.icon}</span>
                          <span className={`text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                            {action.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl rounded-bl-md ${
                      isDark ? 'bg-white/10' : 'bg-gray-100'
                    }`}>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 rounded-full bg-cyan-500"
                            animate={{ y: [0, -5, 0] }}
                            transition={{
                              duration: 0.5,
                              repeat: Infinity,
                              delay: i * 0.1,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className={`p-4 ${isDark ? 'bg-black/20' : 'bg-gray-50'}`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isRTL ? 'اكتب رسالتك...' : 'Type your message...'}
                  className={`flex-1 rounded-xl ${
                    isDark 
                      ? 'bg-white/5 border-white/10 focus:border-cyan-500' 
                      : 'bg-white border-gray-200 focus:border-cyan-500'
                  }`}
                  disabled={isLoading}
                  data-testid="chatbot-input"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 hover:from-cyan-500 hover:to-cyan-700 shadow-lg shadow-cyan-500/25"
                  data-testid="chatbot-send"
                >
                  <Send className="w-4 h-4 text-white" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
