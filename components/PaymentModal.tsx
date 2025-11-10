import React, { useState } from 'react';
import { CloseIcon, CreditCardIcon, PaypalIcon, CoinbaseIcon } from './IconComponents';

// FIX: Defined a specific type for payment methods to ensure type safety.
type PaymentMethod = 'card' | 'paypal' | 'crypto';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  // FIX: Used the specific PaymentMethod type for consistency.
  onPaymentSuccess: (method: PaymentMethod) => void;
  totalAmount: number;
}

// FIX: Updated Tab component props to use the specific PaymentMethod type, resolving the type mismatch error with the setActiveTab handler.
const Tab: React.FC<{ id: PaymentMethod; label: string; icon: React.ReactNode; activeTab: PaymentMethod; setActiveTab: (id: PaymentMethod) => void; }> = ({ id, label, icon, activeTab, setActiveTab }) => (
    <button 
      onClick={() => setActiveTab(id)} 
      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-t-lg transition-colors focus:outline-none ${activeTab === id ? 'bg-arkaenia-surface dark:bg-arkaenia-surface-dark text-arkaenia-accent dark:text-arkaenia-accent-dark font-bold' : 'bg-arkaenia-bg/50 dark:bg-arkaenia-bg-dark/50 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:bg-arkaenia-surface dark:hover:bg-arkaenia-surface-dark'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
);

const InputField: React.FC<{ label: string; placeholder: string }> = ({ label, placeholder }) => (
    <div>
        <label className="block text-sm font-bold text-arkaenia-subtext dark:text-arkaenia-subtext-dark mb-1">{label}</label>
        <input 
            type="text" 
            placeholder={placeholder}
            disabled 
            className="w-full p-2 bg-arkaenia-card/50 dark:bg-arkaenia-card-dark/50 border border-arkaenia-card dark:border-arkaenia-card-dark rounded-md placeholder-arkaenia-subtext/50 dark:placeholder-arkaenia-subtext-dark/50 cursor-not-allowed"
        />
    </div>
);

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess, totalAmount }) => {
  if (!isOpen) return null;

  // FIX: Used the specific PaymentMethod type for the state for better type safety.
  const [activeTab, setActiveTab] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(activeTab);
    }, 2000); // Simulate network request
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" 
      onClick={onClose}
    >
      <div 
        className="bg-arkaenia-bg dark:bg-arkaenia-bg-dark rounded-lg shadow-2xl max-w-md w-full mx-4 animate-scaleIn relative" 
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors z-10">
            <CloseIcon className="w-6 h-6"/>
        </button>

        <div className="text-center p-6 border-b border-arkaenia-card dark:border-arkaenia-card-dark">
            <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Complete Your Order</h2>
        </div>
        
        <div className="p-1">
          <div className="flex">
              <Tab id="card" label="Card" icon={<CreditCardIcon className="w-5 h-5" />} activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab id="paypal" label="PayPal" icon={<PaypalIcon className="w-5 h-5" />} activeTab={activeTab} setActiveTab={setActiveTab} />
              <Tab id="crypto" label="Crypto" icon={<CoinbaseIcon className="w-5 h-5" />} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
          <div className="p-6 bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-b-lg">
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
                  <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark">You will be redirected to PayPal to complete your payment securely.</p>
                  <button className="mt-4 w-full bg-[#0070BA] text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                      Log in to PayPal
                  </button>
              </div>
            )}
            {activeTab === 'crypto' && (
              <div className="text-center p-8 animate-fadeIn">
                  <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Pay with stablecoins via Base network. Your purchase will be minted as a Digital Receipt NFT.</p>
                  <button className="mt-4 w-full bg-[#0052FF] text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                      Connect Wallet
                  </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-6 border-t border-arkaenia-card dark:border-arkaenia-card-dark">
            <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-3 font-bold bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark rounded-full hover:scale-105 transition-transform duration-200 disabled:bg-arkaenia-subtext dark:disabled:bg-arkaenia-subtext-dark disabled:scale-100 disabled:cursor-wait"
            >
                {isProcessing ? 'Processing...' : `Pay ₦${totalAmount.toFixed(2)}`}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
