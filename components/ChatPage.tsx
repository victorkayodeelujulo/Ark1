import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatUser } from '../types';
import { CHAT_USERS, INITIAL_MESSAGES } from '../constants';
import { ChevronLeftIcon, ImageIcon, SendIcon } from './IconComponents';

interface ChatPageProps {
  onBack: () => void;
}

const ChatPage: React.FC<ChatPageProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUser = CHAT_USERS['user-me'];
  const otherUsers = Object.values(CHAT_USERS).filter(u => u.id !== 'user-me');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([...messages, message]);
    setNewMessage('');
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const message: ChatMessage = {
          id: `msg-${Date.now()}`,
          senderId: currentUser.id,
          imageUrl: event.target?.result as string,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, message]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-arkaenia-bg dark:bg-arkaenia-bg-dark rounded-lg shadow-inner animate-fadeIn">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center p-4 border-b border-arkaenia-card dark:border-arkaenia-card-dark">
        <button onClick={onBack} className="p-2 -ml-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <div className="flex -space-x-2 overflow-hidden ml-2">
            {otherUsers.map(user => (
                <img key={user.id} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-arkaenia-bg-dark" src={user.avatarUrl} alt={user.name} />
            ))}
        </div>
        <div className="ml-4">
            <h1 className="text-lg font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Style Session</h1>
            <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Chatting with {otherUsers.map(u => u.name).join(' & ')}</p>
        </div>
      </header>

      {/* Message List */}
      <div className="flex-1 p-6 overflow-y-auto space-y-6">
        {messages.map((msg, index) => {
            const sender = CHAT_USERS[msg.senderId];
            const isMe = sender.id === currentUser.id;
            
            return (
                <div key={msg.id} className={`flex items-end gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {!isMe && <img src={sender.avatarUrl} alt={sender.name} className="w-8 h-8 rounded-full flex-shrink-0" />}
                    
                    <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl p-1 ${isMe ? 'bg-arkaenia-primary dark:bg-arkaenia-primary-dark' : 'bg-arkaenia-surface dark:bg-arkaenia-surface-dark'}`}>
                        {msg.text && <p className={`px-3 py-2 text-sm ${isMe ? 'text-white dark:text-arkaenia-bg-dark' : 'text-arkaenia-text dark:text-arkaenia-text-dark'}`}>{msg.text}</p>}
                        {msg.imageUrl && <img src={msg.imageUrl} alt="Uploaded content" className="rounded-xl object-cover" />}
                    </div>

                    {isMe && <img src={sender.avatarUrl} alt={sender.name} className="w-8 h-8 rounded-full flex-shrink-0" />}
                </div>
            );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <footer className="flex-shrink-0 p-4 border-t border-arkaenia-card dark:border-arkaenia-card-dark bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-b-lg">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
                <ImageIcon className="w-6 h-6"/>
            </button>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 py-2 px-4 bg-arkaenia-bg dark:bg-arkaenia-bg-dark border border-transparent rounded-full focus:bg-white dark:focus:bg-arkaenia-bg-dark focus:border-arkaenia-accent dark:focus:border-arkaenia-accent-dark outline-none transition-colors"
            />
            <button type="submit" className="p-2 rounded-full bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark hover:opacity-90 disabled:bg-arkaenia-subtext dark:disabled:bg-arkaenia-subtext-dark transition-colors" disabled={!newMessage.trim()}>
                <SendIcon className="w-6 h-6"/>
            </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPage;