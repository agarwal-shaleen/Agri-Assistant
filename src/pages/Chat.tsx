// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Send, Paperclip, Bot, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface Message {
//   id: string;
//   type: 'user' | 'bot';
//   content: string;
//   timestamp: Date;
//   avatar?: string;
//   images?: string[]; // 🆕 Store uploaded image URLs
// }

// const Chat = () => {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: '1',
//       type: 'bot',
//       content: "Hello! I'm your AgriBot assistant. I'm here to help you with all your farming questions. What would you like to know today?",
//       timestamp: new Date(),
//     }
//   ]);
//   const [inputValue, setInputValue] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const [selectedImages, setSelectedImages] = useState<File[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);


//    async function sendQueryToBackend(query: string, imageUrls: string[]): Promise<string> {
//       // Placeholder function to simulate backend response
//       return new Promise<string>((resolve) => {
//         setTimeout(() => {
//           resolve("This is a placeholder response from backend.");
//         }, 2000);
//       });
//    }
//     async function uploadImages(files: File[]): Promise<string[]> {
//       // Placeholder function to simulate image upload
//       return new Promise<string[]>((resolve) => {
//         setTimeout(() => {  
//           const urls = files.map((file, idx) => `https://example.com/image${Date.now()}_${idx}.jpg`);
//           resolve(urls);
//         }, 2000);
//       });}
    

//   const handleSendMessage = async () => {
//     if (!inputValue.trim() && selectedImages.length === 0) return;

//     // Create User Message
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       type: 'user',
//       content: inputValue || "[Sent images]",
//       timestamp: new Date(),
//       images: selectedImages.map((file) => URL.createObjectURL(file)), // preview locally
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputValue("");
//     setIsTyping(true);
   
//     try {
//       // Upload images to backend
//       const uploadedImageUrls = selectedImages.length > 0 ? await uploadImages(selectedImages) : [];

//       // Send query and get response
//       const botResponse = await sendQueryToBackend(inputValue, uploadedImageUrls);

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         type: 'bot',
//         content: botResponse,
//         timestamp: new Date(),
//       };
//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       console.error(error);
//       const errorMessage: Message = {
//         id: (Date.now() + 2).toString(),
//         type: 'bot',
//         content: "Oops! Something went wrong while processing your query. Please try again.",
//         timestamp: new Date(),
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setIsTyping(false);
//       setSelectedImages([]);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);
//       setSelectedImages(prev => [...prev, ...files]);
//     }
//   };

//   return (
//     <div className="h-full flex flex-col bg-background">
//       {/* Chat Header */}
//       <motion.div 
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="p-6 border-b border-border bg-card/50 backdrop-blur-sm"
//       >
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
//             <Bot className="w-6 h-6 text-primary-foreground" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-semibold text-foreground">AI Farm Assistant</h1>
//             <p className="text-muted-foreground">Ask me anything about farming, crops, or agriculture</p>
//           </div>
//           <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
//             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//             Online
//           </div>
//         </div>
//       </motion.div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-6 space-y-6">
//         <AnimatePresence>
//           {messages.map((message) => (
//             <motion.div
//               key={message.id}
//               initial={{ opacity: 0, y: 20, scale: 0.9 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -20, scale: 0.9 }}
//               transition={{ type: "spring", damping: 20, stiffness: 300 }}
//               className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} gap-3`}
//             >
//               {message.type === 'bot' && (
//                 <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
//                   <Bot className="w-4 h-4 text-primary-foreground" />
//                 </div>
//               )}

//               <div className={message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}>
//                 <p className="text-sm leading-relaxed">{message.content}</p>
//                 {message.images && (
//                   <div className="flex gap-2 mt-2 flex-wrap">
//                     {message.images.map((src, idx) => (
//                       <img key={idx} src={src} alt="uploaded" className="w-20 h-20 object-cover rounded" />
//                     ))}
//                   </div>
//                 )}
//                 <p className="text-xs opacity-70 mt-2">
//                   {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </p>
//               </div>

//               {message.type === 'user' && (
//                 <div className="w-8 h-8 bg-gradient-earth rounded-full flex items-center justify-center flex-shrink-0">
//                   <User className="w-4 h-4 text-earth-dark" />
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {isTyping && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="flex justify-start gap-3"
//           >
//             <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
//               <Bot className="w-4 h-4 text-primary-foreground" />
//             </div>
//             <div className="bg-card text-card-foreground rounded-2xl rounded-bl-md px-4 py-3 border border-border shadow-soft">
//               <div className="flex space-x-1">
//                 <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
//                 <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
//                 <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Input */}
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="p-6 border-t border-border bg-card/50 backdrop-blur-sm"
//       >
//         <div className="flex items-end gap-3 max-w-4xl mx-auto">
//           <div className="flex-1 relative">
//             <Input
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask me about farming, crops, soil, weather, or anything agriculture-related..."
//               className="agricultural-input pr-24 py-4 text-base resize-none min-h-[50px]"
//               disabled={isTyping}
//             />
//             <input
//               type="file"
//               ref={fileInputRef}
//               className="hidden"
//               multiple
//               accept="image/*"
//               onChange={handleFileChange}
//             />
//             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => fileInputRef.current?.click()}
//                 className="p-2 text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 <Paperclip className="w-4 h-4" />
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 className="p-2 text-muted-foreground hover:text-foreground transition-colors"
//               >
//                 <Smile className="w-4 h-4" />
//               </motion.button>
//             </div>
//           </div>
          
//           <Button
//             onClick={handleSendMessage}
//             disabled={( !inputValue.trim() && selectedImages.length === 0 ) || isTyping}
//             className="agricultural-button px-6 py-4 h-auto"
//           >
//             <Send className="w-5 h-5" />
//           </Button>
//         </div>
//         {selectedImages.length > 0 && (
//           <div className="flex flex-wrap gap-2 mt-3">
//             {selectedImages.map((file, idx) => (
//               <div key={idx} className="w-16 h-16 relative border rounded overflow-hidden">
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt={file.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//         <p className="text-xs text-muted-foreground text-center mt-3 max-w-4xl mx-auto">
//           AgriBot is powered by AI and provides farming guidance. Always consult with local agricultural experts for critical decisions.
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Chat;
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Bot, User, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  avatar?: string;
  images?: string[];
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hello! I'm your AgriBot assistant. I'm here to help you with all your farming questions. What would you like to know today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mic State
  const [micActive, setMicActive] = useState(false);
  const [previousTranscript, setPreviousTranscript] = useState(""); // store previous text

  // Speech Recognition Hook
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();

  // Dynamically update input box with transcript
  useEffect(() => {
    if (micActive) {
      setInputValue(previousTranscript + transcript);
    }
    console.log("Transcript updated:", transcript);
    console.log("Input Value:", inputValue);
  }, [transcript, micActive, previousTranscript]);

  const startListening = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-IN",
    });
  };

  const handleMicToggle = () => {
    if (micActive) {
      // Stop listening, save what was transcribed so far
      SpeechRecognition.stopListening();
      setPreviousTranscript((prev) => prev + transcript);
    } else {
      // Resume listening
      startListening();
    }
    setMicActive(!micActive);
  };

  if (!browserSupportsSpeechRecognition) {
    console.warn("Speech Recognition not supported in this browser.");
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function sendQueryToBackend(
    query: string,
    imageUrls: string[]
  ): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("This is a placeholder response from backend.");
      }, 2000);
    });
  }

  async function uploadImages(files: File[]): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      setTimeout(() => {
        const urls = files.map(
          (file, idx) => `https://example.com/image${Date.now()}_${idx}.jpg`
        );
        resolve(urls);
      }, 2000);
    });
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() && selectedImages.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue || "[Sent images]",
      timestamp: new Date(),
      images: selectedImages.map((file) => URL.createObjectURL(file)),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const uploadedImageUrls =
        selectedImages.length > 0 ? await uploadImages(selectedImages) : [];
      const botResponse = await sendQueryToBackend(
        inputValue,
        uploadedImageUrls
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: botResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "bot",
        content:
          "Oops! Something went wrong while processing your query. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setSelectedImages([]);
      resetTranscript(); // ✅ Clear transcript after sending
      setPreviousTranscript(""); // ✅ Reset previous transcript too
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages((prev) => [...prev, ...files]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Chat Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-b border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              AI Farm Assistant
            </h1>
            <p className="text-muted-foreground">
              Ask me anything about farming, crops, or agriculture
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Online
          </div>
        </div>
      </motion.div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className={`flex ${
                message.type === "user" ? "justify-end" : "justify-start"
              } gap-3`}
            >
              {message.type === "bot" && (
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
              )}

              <div
                className={
                  message.type === "user"
                    ? "chat-bubble-user"
                    : "chat-bubble-bot"
                }
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.images && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {message.images.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt="uploaded"
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {message.type === "user" && (
                <div className="w-8 h-8 bg-gradient-earth rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-earth-dark" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-start gap-3"
          >
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="bg-card text-card-foreground rounded-2xl rounded-bl-md px-4 py-3 border border-border shadow-soft">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 border-t border-border bg-card/50 backdrop-blur-sm"
      >
        <div className="flex items-end gap-3 max-w-4xl mx-auto">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setPreviousTranscript(e.target.value); // keep track of manual edits
              }}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about farming, crops, soil, weather, or anything agriculture-related..."
              className="agricultural-input pr-32 py-4 text-base resize-none min-h-[50px]"
              disabled={isTyping}
            />
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleMicToggle}
                className={`p-2 ${
                  micActive
                    ? "text-red-500"
                    : "text-muted-foreground hover:text-foreground"
                } transition-colors`}
                title={micActive ? "Stop Listening" : "Start Listening"}
              >
                <Mic className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          <Button
            onClick={handleSendMessage}
            disabled={
              (!inputValue.trim() && selectedImages.length === 0) || isTyping
            }
            className="agricultural-button px-6 py-4 h-auto"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        {selectedImages.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedImages.map((file, idx) => (
              <div
                key={idx}
                className="w-16 h-16 relative border rounded overflow-hidden"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground text-center mt-3 max-w-4xl mx-auto">
          AgriBot is powered by AI and provides farming guidance. Always consult
          with local agricultural experts for critical decisions.
        </p>
      </motion.div>
    </div>
  );
};

export default Chat;
