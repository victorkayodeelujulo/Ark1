import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { ChevronLeftIcon, EditIcon } from './IconComponents';

interface ProfilePageProps {
  user: User;
  onUpdateProfile: (updatedProfile: User) => void;
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateProfile, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<User>(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const inputClasses = "w-full p-3 bg-arkaenia-surface border border-arkaenia-card rounded-md transition-colors focus:bg-arkaenia-bg focus:border-arkaenia-accent focus:outline-none";
  const disabledInputClasses = "disabled:bg-arkaenia-card/50 disabled:cursor-not-allowed disabled:text-arkaenia-subtext";
  const selectClasses = `${inputClasses} ${disabledInputClasses}`;

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-2 text-arkaenia-subtext hover:text-arkaenia-accent transition-colors">
          <ChevronLeftIcon className="w-8 h-8" />
        </button>
        <h1 className="text-4xl font-bold text-arkaenia-accent">My Profile</h1>
      </div>

      <div className="bg-arkaenia-surface rounded-lg shadow-sm p-8">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          <div className="relative">
            <img src={formData.avatarUrl} alt="User Avatar" className="w-32 h-32 rounded-full object-cover ring-4 ring-arkaenia-card" />
            <button className="absolute bottom-0 right-0 bg-arkaenia-primary text-white p-2 rounded-full hover:scale-110 transition-transform">
                <EditIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-arkaenia-text">{user.name}</h2>
            <p className="text-arkaenia-subtext">{user.email}</p>
          </div>
          {!isEditing && (
             <button 
                onClick={() => setIsEditing(true)} 
                className="flex items-center gap-2 px-6 py-3 font-bold bg-arkaenia-card text-arkaenia-accent rounded-full hover:bg-arkaenia-accent hover:text-white transition-colors"
            >
                <EditIcon className="w-5 h-5"/>
                <span>Edit Profile</span>
            </button>
          )}
        </div>

        <h3 className="text-xl font-bold text-arkaenia-text mb-4 mt-8 border-t border-arkaenia-card pt-6">Contact Information</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-arkaenia-subtext mb-2">Full Name</label>
            <input 
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={`${inputClasses} ${disabledInputClasses}`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-arkaenia-subtext mb-2">Email Address</label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`${inputClasses} ${disabledInputClasses}`}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-arkaenia-subtext mb-2">Phone Number</label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={`${inputClasses} ${disabledInputClasses}`}
            />
          </div>
        </div>

        <div className="animate-fadeIn">
            <h3 className="text-xl font-bold text-arkaenia-text mb-4 mt-8 border-t border-arkaenia-card pt-6">My Sizes</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-bold text-arkaenia-subtext mb-2">T-Shirts / Tops</label>
                    <select name="tops" value={formData.sizes?.tops || ''} onChange={handleSizeChange} disabled={!isEditing} className={selectClasses}>
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-arkaenia-subtext mb-2">Denims (Waist)</label>
                    <select name="denims" value={formData.sizes?.denims || ''} onChange={handleSizeChange} disabled={!isEditing} className={selectClasses}>
                        {['28', '29', '30', '31', '32', '33', '34', '36', '38'].map(size => <option key={size} value={size}>{size}"</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-arkaenia-subtext mb-2">Dresses</label>
                     <select name="dresses" value={formData.sizes?.dresses || ''} onChange={handleSizeChange} disabled={!isEditing} className={selectClasses}>
                        {['US 2', 'US 4', 'US 6', 'US 8', 'US 10', 'US 12', 'US 14'].map(size => <option key={size} value={size}>{size}</option>)}
                    </select>
                </div>
            </div>
        </div>

        {isEditing && (
            <div className="flex justify-end gap-4 mt-8 border-t border-arkaenia-card pt-6">
                <button 
                    onClick={handleCancel}
                    className="px-6 py-3 font-bold bg-arkaenia-card text-arkaenia-accent rounded-full hover:bg-arkaenia-card/80 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSave}
                    className="px-6 py-3 font-bold bg-arkaenia-primary text-white rounded-full hover:scale-105 transition-transform"
                >
                    Save Changes
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;