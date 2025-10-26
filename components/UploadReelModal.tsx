import React, { useState, useCallback } from 'react';
import { CloseIcon, ImageIcon, PlusIcon } from './IconComponents';

interface UploadReelModalProps {
  onClose: () => void;
  onPost: (fileUrl: string, caption: string) => void;
}

const UploadReelModal: React.FC<UploadReelModalProps> = ({ onClose, onPost }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
    }
  };
  
  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  }, []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);
  
  const onDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);
  
   const onDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleFileInputClick = () => {
    document.getElementById('file-upload-input')?.click();
  };
  
  const handleSubmit = () => {
      if (preview) {
          onPost(preview, caption);
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-arkaenia-surface dark:bg-arkaenia-surface-dark rounded-lg shadow-2xl w-full max-w-lg mx-4 animate-scaleIn" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-arkaenia-card dark:border-arkaenia-card-dark">
          <h2 className="text-xl font-bold text-arkaenia-accent dark:text-arkaenia-accent-dark">Create a new Reel</h2>
          <button onClick={onClose} className="text-arkaenia-subtext dark:text-arkaenia-subtext-dark hover:text-arkaenia-accent dark:hover:text-arkaenia-accent-dark"><CloseIcon className="w-6 h-6" /></button>
        </div>

        <div className="p-6">
          {!preview ? (
            <div 
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              className={`flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? 'border-arkaenia-primary dark:border-arkaenia-primary-dark bg-arkaenia-primary/10 dark:bg-arkaenia-primary-dark/10' : 'border-arkaenia-card dark:border-arkaenia-card-dark hover:border-arkaenia-accent dark:hover:border-arkaenia-accent-dark'}`}
              onClick={handleFileInputClick}
            >
              <input 
                id="file-upload-input"
                type="file" 
                accept="image/*,video/*" 
                onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} 
                className="hidden" 
              />
              <ImageIcon className="w-16 h-16 text-arkaenia-subtext dark:text-arkaenia-subtext-dark mb-4" />
              <p className="text-lg font-semibold text-arkaenia-text dark:text-arkaenia-text-dark">Drag & drop or click to upload</p>
              <p className="text-sm text-arkaenia-subtext dark:text-arkaenia-subtext-dark">Supports images and videos</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-full h-64 bg-arkaenia-bg dark:bg-arkaenia-bg-dark rounded-lg overflow-hidden flex items-center justify-center">
                 {file?.type.startsWith('video/') ? (
                    <video src={preview} controls className="w-full h-full object-contain"></video>
                 ) : (
                    <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                 )}
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                rows={3}
                className="w-full p-2 bg-arkaenia-bg dark:bg-arkaenia-bg-dark border border-arkaenia-card dark:border-arkaenia-card-dark rounded-md focus:border-arkaenia-accent dark:focus:border-arkaenia-accent-dark outline-none"
              />
            </div>
          )}
        </div>

        <div className="p-4 border-t border-arkaenia-card dark:border-arkaenia-card-dark flex justify-end">
            <button
                onClick={handleSubmit}
                disabled={!file}
                className="px-6 py-2 font-bold bg-arkaenia-primary dark:bg-arkaenia-primary-dark text-white dark:text-arkaenia-bg-dark rounded-full hover:scale-105 transition-transform disabled:bg-arkaenia-subtext dark:disabled:bg-arkaenia-subtext-dark disabled:cursor-not-allowed disabled:scale-100"
            >
                Post
            </button>
        </div>
      </div>
    </div>
  );
};

export default UploadReelModal;