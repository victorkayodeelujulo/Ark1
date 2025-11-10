import React, { useState } from 'react';
import { Product } from '../types';
import { ChevronLeftIcon, ShoppingBagIcon } from './IconComponents';
import AuthModal from './AuthModal';
import PaymentModal from './PaymentModal';

interface CheckoutPageProps {
  cart: Product[];
  isLoggedIn: boolean;
  onLogin: () => void;
  onSuccessfulPayment: (method: 'card' | 'paypal' | 'crypto') => void;
  onRemoveFromCart: (productId: string) => void;
  onBack: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, isLoggedIn, onLogin, onSuccessfulPayment, onRemoveFromCart, onBack }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const shippingFee = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shippingFee;

  const handleProceedToPayment = () => {
    if (isLoggedIn) {
      setIsPaymentModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    onLogin();
    // After login, immediately show payment modal
    setIsPaymentModalOpen(true);
  };
  
  const handlePaymentSuccess = (method: 'card' | 'paypal' | 'crypto') => {
      setIsPaymentModalOpen(false);
      onSuccessfulPayment(method);
  };

  return (
    <>
      <div className="animate-fadeIn p-4 md:p-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark transition-colors">
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <h1 className="text-4xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark capitalize">My Bag</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg">
              <ShoppingBagIcon className="w-24 h-24 mx-auto text-arkaenia-subtext dark:text-arkaenia-subtext-dark mb-4" />
              <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Your bag is empty</h2>
              <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark mt-2">Looks like you haven't added anything yet.</p>
              <button onClick={onBack} className="mt-6 px-6 py-3 font-bold text-white dark:text-arkaenia-bg-dark transition-transform duration-200 bg-arkaenia-primary dark:bg-arkaenia-primary-dark rounded-full hover:scale-105">
                  Continue Shopping
              </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center bg-arkaenia-surface dark:bg-arkaenia-surface-dark p-4 rounded-lg shadow-sm">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-md object-cover mr-4" />
                  <div className="flex-grow">
                    <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark">{item.brand}</p>
                    <h3 className="font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">{item.name}</h3>
                    <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark mt-1">
                      {item.color && `Color: ${item.color}`}
                      {item.color && item.size && ' | '}
                      {item.size && `Size: ${item.size}`}
                    </p>
                  </div>
                  <div className="text-right">
                      <p className="font-bold text-arkaenia-text dark:text-arkaenia-text-dark text-lg">₦{item.price.toFixed(2)}</p>
                      <button onClick={() => onRemoveFromCart(item.id)} className="text-sm text-red-500 hover:underline mt-2">
                          Remove
                      </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark mb-6">Order Summary</h2>
                <div className="space-y-4 text-arkaenia-text dark:text-arkaenia-text-dark">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">₦{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold">₦{shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-arkaenia-card dark:border-arkaenia-card-dark my-4"></div>
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>₦{total.toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={handleProceedToPayment}
                  className="mt-8 w-full py-3 font-bold bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark rounded-full hover:scale-105 transition-transform duration-200"
                >
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
        totalAmount={total}
      />
    </>
  );
};

export default CheckoutPage;
