import { useState } from 'react';
import { X, Send, User, CheckCheck, MessageSquare, Bot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const INITIAL_MESSAGES = [
    { id: 1, sender: 'Green Earth Foundation', text: 'Hello Sarah! Thank you for expressing interest in our Community Garden project. Are you available for an orientation this Saturday?', time: '10:15 AM', isSelf: false },
    { id: 2, sender: 'You', text: 'Hi! Yes, I am available this Saturday morning. What time does the orientation start?', time: '10:18 AM', isSelf: true },
    { id: 3, sender: 'Green Earth Foundation', text: 'Awesome! We start at 9:00 AM at the Civic Center Garden. Looking forward to meeting you!', time: '10:20 AM', isSelf: false },
];

export default function ChatDrawer({ isOpen, onClose }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');

    if (!isOpen) return null;

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newMsg = {
            id: Date.now(),
            sender: 'You',
            text: inputText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSelf: true,
        };

        setMessages(prev => [...prev, newMsg]);
        setInputText('');

        // Simulated instant response
        setTimeout(() => {
            setMessages(prev => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: 'Green Earth Foundation',
                    text: 'Thank you for your message! Our coordinator will confirm the details shortly.',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    isSelf: false,
                }
            ]);
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs animate-in fade-in">
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md bg-white dark:bg-gray-900 border-l border-gray-100 dark:border-gray-800 shadow-2xl flex flex-col">
                    {/* Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-primary to-secondary text-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-bold text-sm backdrop-blur-md">
                                GE
                            </div>
                            <div>
                                <h3 className="font-extrabold text-sm">Green Earth Foundation</h3>
                                <p className="text-[11px] text-white/80 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active Coordinator
                                </p>
                            </div>
                        </div>
                        <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
                            <X className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Messages Scroll View */}
                    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-900/50">
                        {messages.map((m) => (
                            <div key={m.id} className={`flex flex-col ${m.isSelf ? 'items-end' : 'items-start'}`}>
                                <div className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                                    m.isSelf
                                        ? 'bg-primary text-white rounded-br-none'
                                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-none'
                                }`}>
                                    <p>{m.text}</p>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 mt-1 px-1 flex items-center gap-1">
                                    {m.time} {m.isSelf && <CheckCheck className="w-3 h-3 text-primary" />}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <form onSubmit={handleSend} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex gap-2">
                        <input
                            type="text"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-1 px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-900 dark:text-white border-0 focus:ring-2 focus:ring-primary outline-none"
                        />
                        <button
                            type="submit"
                            className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
