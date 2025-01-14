import React, { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import MessageInput from "./components/MessageInput";

function App() {
  const [messages, setMessages] = useState([]);
  const [lastActiveTime, setLastActiveTime] = useState(Date.now());
  const INACTIVE_THRESHOLD = 5000;
  const CHECK_INTERVAL = 3000;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      if (currentTime - lastActiveTime > INACTIVE_THRESHOLD) {
        const botMessage = {
          text: "الوووووووو 😅    ",
          sender: "Bot",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }
    }, CHECK_INTERVAL);

    return () => clearInterval(interval);
  }, [lastActiveTime]);

  const botQuestions = [
    "كيف بقدر أخد استشارة من عندكم؟",
    "كيف بقدر أحجز موعد؟",
    "ما هي الميزات التي ستضاف عند التسجيل بالموقع؟",
    "هل الأطباء عندكم موثوقون؟",
    "ما نوع الخدمات الطبية التي تقدمونها؟",
    "أريد التحدث مع إنسان.",
  ];

  const greetingReplies = {
    "مرحبا": "مرحبًا بك! 😊",
    "السلام عليكم": "وعليكم السلام ورحمة الله وبركاته! 🌟",
    "هاي": "أهلاً وسهلاً! 🙌",
    "هلو": "مرحبًا بك! 👋",
    "شكرا": "على الرحب والسعة! 😊",
    "يسلمو": "يسعدنا أنك راضٍ! 🌟",
    "استشارة": "لأخذ استشارة، يمكنك التواصل عبر موقعنا أو تحميل تطبيقنا من المتجر.",
    "موعد": "لحجز موعد، يرجى زيارة صفحة الحجوزات على موقعنا أو الاتصال بخدمة العملاء.",
    "ميزات": "عند التسجيل بالموقع، ستتمكن من الوصول إلى الأطباء المسجلين ومتابعة حالتك الصحية بسهولة.",
    "الأطباء": "نعم، جميع أطبائنا حاصلون على شهادات معتمدة ولديهم خبرة طويلة.",
    "خدمات": "نقدم استشارات طبية، حجوزات مواعيد، ومتابعة صحية شاملة.",
    "انسان": "يرجى الانتظار، سيتم تحويلك إلى أحد ممثلي الخدمة.",
  };

  const handleUserMessage = (text) => {
    setLastActiveTime(Date.now());
    const userMessage = {
      text,
      sender: "You",
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    const greetingReply = Object.keys(greetingReplies).find((greeting) =>
      text.toLowerCase().includes(greeting)
    );
    if (greetingReply) {
      setTimeout(() => {
        const botMessage = {
          text: greetingReplies[greetingReply],
          sender: "Bot",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1500);
      return;
    }

    setTimeout(() => {
      const botMessage = {
        text: ` لم أفهم رسالتك. هل تريد أحد هذه الشغلات؟\n${botQuestions
          .map((q) => ` - ${q}`)
          .join("\n")}\nهل بدك اشي من هدول ولا بتحب تحكي مع إنسان؟`,
        sender: "Bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1500);
  };

  return (
    
    <div >
      <h1> chating</h1>
      <ChatWindow messages={messages} />
      <MessageInput onSendMessage={handleUserMessage} />
    </div>
  );
}

export default App;
