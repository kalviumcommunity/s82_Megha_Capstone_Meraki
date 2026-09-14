import { useState, useEffect } from "react";
import { MessageSquare, X, Send, User, CheckCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function DirectMessagingModal({ isOpen, onClose, recipient }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState([
        { id: 1, sender: "other", text: "Hello! Thank you for applying to our Community Garden Initiative. Are you available for a brief sync tomorrow?", time: "10:30 AM" },
        { id: 2, sender: "me", text: "Hi! Yes, absolutely. I am available anytime after 2:00 PM.", time: "10:32 AM" },
    ]);
    const [input, setInput] = useState("");

    if (!isOpen) return null;

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMsg = {
            id: Date.now(),
            sender: "me",
            text: input.trim(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMsg]);
        setInput("");
    };

    return (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-white rounded-3xl border border-gray-200 shadow-2xl z-50 overflow-hidden flex flex-col h-[500px] animate-in fade-in slide-in-from-bottom-4">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black text-white text-sm">
                        {recipient?.name ? recipient.name.charAt(0) : "M"}
                    </div>
                    <div>
                        <h4 className="font-extrabold text-sm text-white">{recipient?.name || "Green Earth Foundation"}</h4>
                        <div className="flex items-center gap-1 text-[10px] text-white/80 font-bold uppercase tracking-wider">
                            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> Online Now
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-semibold shadow-sm ${msg.sender === 'me' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'}`}>
                            <p>{msg.text}</p>
                            <div className={`mt-1 text-[9px] text-right flex items-center justify-end gap-1 ${msg.sender === 'me' ? 'text-white/70' : 'text-gray-400'}`}>
                                {msg.time}
                                {msg.sender === 'me' && <CheckCheck className="w-3 h-3 text-white/90" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Input */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 text-gray-900"
                />
                <button
                    type="submit"
                    className="p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-md"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
        </div>
    );
}
