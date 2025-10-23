import React from 'react';
import { GoogleIcon, EmailIcon, PhoneIcon, CloseIcon } from './IconComponents';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AuthButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-center gap-4 py-3 px-4 rounded-lg border border-arkaenia-card bg-arkaenia-bg hover:bg-arkaenia-surface transition-colors"
    >
      {icon}
      <span className="font-bold text-arkaenia-text">{label}</span>
    </button>
);

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  if (!isOpen) return null;

  const handleAuth = () => {
    onLoginSuccess();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className="bg-arkaenia-surface rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 animate-scaleIn relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-arkaenia-subtext hover:text-arkaenia-accent transition-colors">
            <CloseIcon className="w-6 h-6"/>
        </button>

        <div className="text-center">
            <h2 className="text-2xl font-bold text-arkaenia-accent mb-2">Join Arkaenia to Continue</h2>
            <p className="text-arkaenia-subtext mb-8">
                Save your bag, track orders, and enjoy a seamless checkout experience.
            </p>
        </div>

        <div className="space-y-4">
            <AuthButton icon={<GoogleIcon className="w-6 h-6 text-red-500" />} label="Continue with Google" onClick={handleAuth} />
            <AuthButton icon={<EmailIcon className="w-6 h-6 text-arkaenia-accent" />} label="Continue with Email" onClick={handleAuth} />
            <AuthButton icon={<PhoneIcon className="w-6 h-6 text-arkaenia-accent" />} label="Continue with Phone" onClick={handleAuth} />
        </div>
        
        <p className="text-xs text-arkaenia-subtext text-center mt-8">
            By continuing, you agree to Arkaenia's <a href="#" className="underline hover:text-arkaenia-accent">Terms of Service</a> and <a href="#" className="underline hover:text-arkaenia-accent">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;