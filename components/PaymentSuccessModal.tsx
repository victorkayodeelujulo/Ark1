import React from 'react';
import { CheckCircleIcon } from './IconComponents';

const PaymentSuccessModal: React.FC = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="bg-arkaenia-surface rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 animate-scaleIn text-center">
            <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-arkaenia-accent mb-2">Payment Successful!</h2>
            <p className="text-arkaenia-subtext">
                Your order is confirmed. You will receive an email with your order details shortly.
            </p>
        </div>
    </div>
);

export default PaymentSuccessModal;
