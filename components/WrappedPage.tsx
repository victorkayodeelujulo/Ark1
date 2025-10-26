import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Product } from '../types';
import { PRODUCTS, PURCHASE_HISTORY, GENRES, BACKGROUND_MUSIC_URL } from '../constants';
import { TwitterIcon, InstagramIcon, ShareIcon, CloseIcon } from './IconComponents';

// --- Data Analysis Logic ---
const analyzeHistory = () => {
    const purchasedProducts = PURCHASE_HISTORY.map(id => PRODUCTS.find(p => p.id === id)).filter((p): p is Product => Boolean(p));

    const brandCounts = purchasedProducts.reduce((acc, product) => {
        acc[product.brand] = (acc[product.brand] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    const topBrandEntry = Object.entries(brandCounts).sort((a, b) => b[1] - a[1])[0];

    const genreCounts = purchasedProducts.reduce((acc, product) => {
        GENRES.forEach(genre => {
            if (genre.productIds.includes(product.id)) {
                acc[genre.name] = (acc[genre.name] || 0) + 1;
            }
        });
        return acc;
    }, {} as Record<string, number>);
    const topGenreEntry = Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0];

    return {
        purchasedProducts: [...new Map(purchasedProducts.map(item => [item.id, item])).values()],
        totalItems: PURCHASE_HISTORY.length,
        topBrand: topBrandEntry ? { name: topBrandEntry[0], count: topBrandEntry[1] } : null,
        topGenre: topGenreEntry ? { name: topGenreEntry[0] } : null,
    };
};

// --- Main Component ---
interface WrappedPageProps {
    onBack: () => void;
    onOpenUploadModal: () => void;
}

const WrappedPage: React.FC<WrappedPageProps> = ({ onBack, onOpenUploadModal }) => {
    const [slide, setSlide] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const analysis = useMemo(() => analyzeHistory(), []);

    useEffect(() => {
        // The play() method returns a promise. We need to handle potential
        // rejections, such as when the component unmounts before playback starts.
        const playPromise = audioRef.current?.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                // Ignore the AbortError, which is expected when the user navigates
                // away before the media starts playing.
                if (error.name !== 'AbortError') {
                    console.error("Audio playback failed:", error);
                }
            });
        }

        return () => {
            // Ensure audio is paused when the component unmounts.
            audioRef.current?.pause();
        };
    }, []);

    const slides = [
        <div className="text-center">
            <h1 className="text-6xl font-extrabold mb-4">Your 2024</h1>
            <h2 className="text-8xl font-extrabold text-white" style={{ WebkitTextStroke: '2px #5C2D91' }}>WRAPPED</h2>
            <p className="mt-8 text-xl text-white/80">A look back at your year in style.</p>
        </div>,
        <div className="text-center">
             <h2 className="text-4xl font-bold mb-8">Your Style Snapshot</h2>
             <div className="flex justify-center gap-8">
                <div className="bg-arkaenia-surface/20 p-6 rounded-lg text-center w-48">
                    <p className="text-6xl font-bold">{analysis.totalItems}</p>
                    <p className="mt-2 text-white/80">Items Acquired</p>
                </div>
                 <div className="bg-arkaenia-surface/20 p-6 rounded-lg text-center w-48">
                    <p className="text-6xl font-bold">{analysis.purchasedProducts.length}</p>
                    <p className="mt-2 text-white/80">Unique Pieces</p>
                </div>
             </div>
        </div>,
        analysis.topBrand && <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 text-white/80">You couldn't get enough of</h2>
            <p className="text-7xl font-extrabold text-white my-4 drop-shadow-lg">{analysis.topBrand.name}</p>
            <p className="text-xl text-white/80">You snagged {analysis.topBrand.count} items from this brand!</p>
        </div>,
        analysis.topGenre && <div className="text-center">
            <h2 className="text-3xl font-bold mb-2 text-white/80">Your dominant aesthetic was</h2>
            <p className="text-7xl font-extrabold text-white my-4 drop-shadow-lg">{analysis.topGenre.name}</p>
            <p className="text-xl text-white/80">A true style signature.</p>
        </div>,
        <div>
            <h2 className="text-3xl font-bold mb-6 text-center">Your 2024 Style Gallery</h2>
            <div className="grid grid-cols-3 gap-4 max-h-96 overflow-y-auto p-2 bg-black/20 rounded-lg">
                {analysis.purchasedProducts.slice(0, 9).map(p => 
                    <img key={p.id} src={p.imageUrl} alt={p.name} className="w-full h-full object-cover rounded-lg aspect-square"/>
                )}
            </div>
        </div>,
        <div className="text-center">
            <h2 className="text-4xl font-bold mb-8">Share Your Style</h2>
            <p className="mb-8 text-white/80">Let the world see your 2024 Arkaenia Wrapped!</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button className="flex items-center w-full sm:w-auto justify-center gap-2 bg-white text-arkaenia-accent font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform"><TwitterIcon className="w-6 h-6"/> <span>Share on Twitter</span></button>
                 <button className="flex items-center w-full sm:w-auto justify-center gap-2 bg-white text-arkaenia-accent font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform"><InstagramIcon className="w-6 h-6"/> <span>Share on Instagram</span></button>
                 <button onClick={onOpenUploadModal} className="flex items-center w-full sm:w-auto justify-center gap-2 bg-white text-arkaenia-accent font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform"><ShareIcon className="w-6 h-6"/> <span>Post to Reels</span></button>
            </div>
        </div>
    ].filter(Boolean);

    const nextSlide = () => setSlide(s => Math.min(s + 1, slides.length - 1));
    const prevSlide = () => setSlide(s => Math.max(s - 1, 0));

    return (
        <div className="fixed inset-0 bg-arkaenia-primary text-white z-50 flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
             <audio ref={audioRef} src={BACKGROUND_MUSIC_URL} loop />
             <button onClick={onBack} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors z-20">
                <CloseIcon className="w-8 h-8"/>
             </button>

            <div className="w-full max-w-4xl flex-1 flex items-center justify-center">
                <div key={slide} className="animate-scaleIn w-full">
                    {slides[slide]}
                </div>
            </div>

            <div className="w-full max-w-4xl flex items-center justify-between mt-8">
                <button onClick={prevSlide} disabled={slide === 0} className="px-6 py-2 rounded-full border-2 border-white disabled:opacity-50 hover:bg-white/20 transition-colors">Previous</button>
                <div className="flex gap-2">
                    {slides.map((_, i) => <div key={i} className={`w-2.5 h-2.5 rounded-full transition-colors ${i === slide ? 'bg-white' : 'bg-white/50'}`} />)}
                </div>
                <button onClick={nextSlide} disabled={slide === slides.length - 1} className="px-6 py-2 rounded-full border-2 border-white disabled:opacity-50 hover:bg-white/20 transition-colors">Next</button>
            </div>
        </div>
    );
};

export default WrappedPage;