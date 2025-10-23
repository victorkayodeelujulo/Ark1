import React, { useState } from 'react';
import { CloseIcon, CreditCardIcon, PaypalIcon } from './IconComponents';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  totalAmount: number;
}

const Tab: React.FC<{ id: string; label: string; icon: React.ReactNode; activeTab: string; setActiveTab: (id: string) => void; }> = ({ id, label, icon, activeTab, setActiveTab }) => (
    <button 
      onClick={() => setActiveTab(id)} 
      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-t-lg transition-colors focus:outline-none ${activeTab === id ? 'bg-arkaenia-surface text-arkaenia-accent font-bold' : 'bg-arkaenia-bg/50 text-arkaenia-subtext hover:bg-arkaenia-surface'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
);

const InputField: React.FC<{ label: string; placeholder: string }> = ({ label, placeholder }) => (
    <div>
        <label className="block text-sm font-bold text-arkaenia-subtext mb-1">{label}</label>
        <input 
            type="text" 
            placeholder={placeholder}
            disabled 
            className="w-full p-2 bg-arkaenia-card/50 border border-arkaenia-card rounded-md placeholder-arkaenia-subtext/50 cursor-not-allowed"
        />
    </div>
);

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess, totalAmount }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000); // Simulate network request
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className="bg-arkaenia-bg rounded-lg shadow-2xl max-w-md w-full mx-4 animate-scaleIn relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-arkaenia-subtext hover:text-arkaenia-accent transition-colors z-10">
            <CloseIcon className="w-6 h-6"/>
        </button>

        <div className="text-center p-6 border-b border-arkaenia-card">
            <h2 className="text-2xl font-bold text-arkaenia-accent">Complete Your Order</h2>
        </div>
        
        <div className="p-1">
          <div className="flex">
              <Tab id="card" label="Card" icon={<CreditCardIcon className="w-5 h-5" />} activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab id="paypal" label="PayPal" icon={<PaypalIcon className="w-5 h-5" />} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="p-6 bg-arkaenia-surface rounded-b-lg">
            {activeTab === 'card' && (
              <div className="space-y-4 animate-fadeIn">
                <InputField label="Card Number" placeholder="**** **** **** 1234" />
                <div className="grid grid-cols-2 gap-4">
                    <InputField label="Expiry Date" placeholder="MM / YY" />
                    <InputField label="CVC" placeholder="***" />
                </div>
                <InputField label="Cardholder Name" placeholder="Jane Doe" />
              </div>
            )}
            {activeTab === 'paypal' && (
              <div className="text-center p-8 animate-fadeIn">
                  <p className="text-arkaenia-subtext">You will be redirected to PayPal to complete your payment securely.</p>
                  <button className="mt-4 w-full bg-[#0070BA] text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                      Log in to PayPal
                  </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 border-t border-arkaenia-card">
            <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-3 font-bold bg-arkaenia-primary text-white rounded-full hover:scale-105 transition-transform duration-200 disabled:bg-arkaenia-subtext disabled:scale-100 disabled:cursor-wait"
            >
                {isProcessing ? 'Processing...' : `Pay ₦${totalAmount.toFixed(2)}`}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;