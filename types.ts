import React from 'react';

// FIX: The file was incorrectly containing component definitions. 
// Replaced with actual type definitions used across the application to resolve widespread import errors.

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: number;
    imageUrl: string;
    color?: string;
    size?: string | number;
}

export interface Playlist {
    id: string;
    title: string;
    description: string;
    coverUrl: string;
    productIds: string[];
}

export interface Reel {
    id: string;
    userName: string;
    thumbnailUrl: string;
    fullImageUrl: string;
}

export interface QuickLink {
    id: string;
    title: string;
    imageUrls: string[];
    productIds: string[];
}

export interface User {
    name: string;
    email: string;
    phone: string;
    avatarUrl: string;
    sizes: {
        tops: string;
        denims: string;
        dresses: string;
    };
}

export interface ChatUser {
    id: string;
    name: string;
    avatarUrl: string;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    text?: string;
    imageUrl?: string;
    timestamp: string;
}

export interface Genre {
    id: string;
    name: string;
    color: string;
    imageUrl: string;
    productIds: string[];
}