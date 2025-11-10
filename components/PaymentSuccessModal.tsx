import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, NftIcon } from './IconComponents';

interface PaymentSuccessModalProps {
    paymentMethod: 'card' | 'paypal' | 'crypto' | null;
}

const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({ paymentMethod }) => {
    const [mintStatus, setMintStatus] = useState<'minting' | 'minted'>('minting');
    const [statusText, setStatusText] = useState('Payment Confirmed!');

    useEffect(() => {
        if (paymentMethod === 'crypto') {
            const timer1 = setTimeout(() => {
                setStatusText('Minting your Digital Receipt...');
                setMintStatus('minting');
            }, 1000);

            const timer2 = setTimeout(() => {
                setStatusText('Digital Receipt Minted!');
                setMintStatus('minted');
            }, 3500);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }
    }, [paymentMethod]);

    if (paymentMethod !== 'crypto') {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
                <div className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 animate-scaleIn text-center">
                    <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark mb-2">Payment Successful!</h2>
                    <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark">
                        Your order is confirmed. You will receive an email with your order details shortly.
                    </p>
                </div>
            </div>
        );
    }
    
    // Crypto payment success with NFT minting
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 animate-scaleIn text-center overflow-hidden">
                {mintStatus === 'minting' ? (
                    <div className="relative w-20 h-20 mx-auto mb-4">
                        <NftIcon className="w-20 h-20 text-arkaenia-accent dark:text-arkaenia-accent-dark animate-pulse" />
                        <div className="absolute inset-0 border-4 border-arkaenia-primary/50 dark:border-arkaenia-primary-dark/50 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <NftIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
                )}

                <h2 className="text-2xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark mb-2">{statusText}</h2>
                <p className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark">
                    Your unique, on-chain receipt is being added to your wallet.
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccessModal;
