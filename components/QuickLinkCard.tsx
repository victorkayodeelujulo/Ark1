import React from 'react';
import { QuickLink } from '../types';

const QuickLinkCard: React.FC<{ link: QuickLink; onClick: () => void; }> = ({ link, onClick }) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (link.imageUrls.length > 1) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % link.imageUrls.length);
            }, 3000);
            return () => clearInterval(timer);
        }
    }, [link.imageUrls.length]);

    return (
        <button onClick={onClick} className="flex flex-col items-center gap-3 group text-left">
            <div className="relative w-36 h-36 rounded-full overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                {link.imageUrls.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`${link.title} image ${index + 1}`}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    />
                ))}
            </div>
            <h3 className="font-bold text-base text-arkaenia-accent capitalize">{link.title}</h3>
        </button>
    );
};

export default QuickLinkCard;