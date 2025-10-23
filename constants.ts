import { Product, Playlist, Reel, QuickLink, ChatUser, ChatMessage, Genre } from './types';

export const ARKAENIA_LOGO = 'https://lh3.googleusercontent.com/d/1YPRBBmTxLrjYLTBFRYKKrFRMTHH6hLC8'
export const AFROBEATS_MUSIC_URL = 'https://cdn.pixabay.com/download/audio/2022/01/24/audio_510a041a98.mp3';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Oversized Linen Shirt',
    brand: 'Urban Threads',
    price: 68.00,
    imageUrl: 'https://images.pexels.com/photos/4066290/pexels-photo-4066290.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'White',
    size: 'M'
  },
  {
    id: 'prod-002',
    name: 'Classic Denim Jacket',
    brand: 'Levi\'s',
    price: 120.00,
    imageUrl: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Vintage Blue',
    size: 'L'
  },
  {
    id: 'prod-003',
    name: 'High-Waisted Trousers',
    brand: 'Zara',
    price: 79.90,
    imageUrl: 'https://images.pexels.com/photos/5439433/pexels-photo-5439433.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Beige',
    size: 28
  },
  {
    id: 'prod-004',
    name: 'Leather Crossbody Bag',
    brand: 'Coach',
    price: 250.00,
    imageUrl: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Black'
  },
  {
    id: 'prod-005',
    name: 'Minimalist Gold Hoops',
    brand: 'Mejuri',
    price: 85.00,
    imageUrl: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'prod-006',
    name: 'Chunky Knit Sweater',
    brand: 'Aritzia',
    price: 150.00,
    imageUrl: 'https://images.pexels.com/photos/7187893/pexels-photo-7187893.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Heather Grey',
    size: 'S'
  },
  {
    id: 'prod-007',
    name: 'Suede Ankle Boots',
    brand: 'Steve Madden',
    price: 130.00,
    imageUrl: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Tan',
    size: 8
  },
  {
    id: 'prod-008',
    name: 'Silk Slip Dress',
    brand: 'Reformation',
    price: 278.00,
    imageUrl: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Champagne',
    size: 'M'
  },
  {
    id: 'prod-009',
    name: 'Retro Sunglasses',
    brand: 'Ray-Ban',
    price: 160.00,
    imageUrl: 'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'prod-010',
    name: 'Leather Biker Jacket',
    brand: 'AllSaints',
    price: 450.00,
    imageUrl: 'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Black',
    size: 'M'
  },
  {
    id: 'prod-011',
    name: 'Performance Leggings',
    brand: 'Lululemon',
    price: 98.00,
    imageUrl: 'https://images.pexels.com/photos/4132538/pexels-photo-4132538.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Graphite Grey',
    size: 'M'
  },
  {
    id: 'prod-012',
    name: 'Embroidered Peasant Blouse',
    brand: 'Free People',
    price: 128.00,
    imageUrl: 'https://images.pexels.com/photos/1518177/pexels-photo-1518177.jpeg?auto=compress&cs=tinysrgb&w=600',
    color: 'Ivory',
    size: 'S'
  }
];

export const PURCHASE_HISTORY: string[] = [
    'prod-001', 'prod-002', 'prod-011', 'prod-001', 'prod-010', 'prod-006', 'prod-002', 'prod-001', 'prod-005', 'prod-003', 'prod-011'
];


export const PLAYLISTS: Playlist[] = [
  {
    id: 'pl-001',
    title: 'Beach Vacation',
    description: 'Breezy linens, sun-kissed hues, and effortless style.',
    coverUrl: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600',
    productIds: ['prod-001', 'prod-004', 'prod-005', 'prod-009'],
  },
  {
    id: 'pl-002',
    title: 'Harmattan airy',
    description: 'Warm knits, rich textures, and your favorite autumn layers.',
    coverUrl: 'https://images.pexels.com/photos/1597406/pexels-photo-1597406.jpeg?auto=compress&cs=tinysrgb&w=600',
    productIds: ['prod-006', 'prod-002', 'prod-007', 'prod-010'],
  },
  {
    id: 'pl-003',
    title: 'Wedding Guest Attire',
    description: 'Elegant dresses, chic accessories, for a memorable occasion.',
    coverUrl: 'https://images.pexels.com/photos/168927/pexels-photo-168927.jpeg?auto=compress&cs=tinysrgb&w=600',
    productIds: ['prod-008', 'prod-005'],
  },
  {
    id: 'pl-004',
    title: 'Bougee Lagos Vibes',
    description: 'Versatile pieces for exploring cobblestone streets in style.',
    coverUrl: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=600',
    productIds: ['prod-002', 'prod-003', 'prod-007', 'prod-010'],
  },
  {
    id: 'pl-005',
    title: 'Work From Home Comfort',
    description: 'Look polished and feel comfortable during your virtual meetings.',
    coverUrl: 'https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=600',
    productIds: ['prod-001', 'prod-006'],
  },
];

export const STORIES: Reel[] = [
  { id: 'reel-001', userName: 'StyleByMaria', thumbnailUrl: 'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=300', fullImageUrl: 'https://images.pexels.com/photos/3757743/pexels-photo-3757743.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'reel-002', userName: 'UrbanExplorer', thumbnailUrl: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=300', fullImageUrl: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'reel-003', userName: 'JennaLovesChic', thumbnailUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300', fullImageUrl: 'https://images.pexels.com/photos/1839904/pexels-photo-1839904.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'reel-004', userName: 'DavidStyle', thumbnailUrl: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=300', fullImageUrl: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'reel-005', userName: 'VintageFinds', thumbnailUrl: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=300', fullImageUrl: 'https://images.pexels.com/photos/2752045/pexels-photo-2752045.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'reel-006', userName: 'MinimalistKate', thumbnailUrl: 'https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=300', fullImageUrl: 'https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'reel-007', userName: 'FashionDad', thumbnailUrl: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300', fullImageUrl: 'https://images.pexels.com/photos/3775583/pexels-photo-3775583.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'reel-008', userName: 'GlobalTrotter', thumbnailUrl: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=300', fullImageUrl: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

export const QUICK_LINKS: QuickLink[] = [
    {
        id: 'ql-001',
        title: 'summer cozy',
        imageUrls: [
            'https://images.pexels.com/photos/179909/pexels-photo-179909.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=300',
        ],
        productIds: ['prod-001', 'prod-003', 'prod-008', 'prod-009', 'prod-004'],
    },
    {
        id: 'ql-002',
        title: 'date night',
        imageUrls: [
            'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300',
        ],
        productIds: ['prod-008', 'prod-004', 'prod-005', 'prod-007'],
    },
    {
        id: 'ql-003',
        title: 'work from home',
        imageUrls: [
            'https://images.pexels.com/photos/7187893/pexels-photo-7187893.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=600',
            'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300',
        ],
        productIds: ['prod-001', 'prod-006', 'prod-003', 'prod-005'],
    },
    {
        id: 'ql-004',
        title: 'trending now',
        imageUrls: [
            'https://images.pexels.com/photos/1362534/pexels-photo-1362534.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/2034346/pexels-photo-2034346.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg?auto=compress&cs=tinysrgb&w=300',
        ],
        productIds: ['prod-002', 'prod-010', 'prod-007', 'prod-009'],
    },
];

export const CHAT_USERS: Record<string, ChatUser> = {
    'user-me': {
        id: 'user-me',
        name: 'Alex (You)',
        avatarUrl: 'https://images.pexels.com/photos/974911/pexels-photo-974911.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    'user-friend1': {
        id: 'user-friend1',
        name: 'Jenna',
        avatarUrl: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300',
    },
    'user-friend2': {
        id: 'user-friend2',
        name: 'David',
        avatarUrl: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg?auto=compress&cs=tinysrgb&w=300',
    }
};

export const INITIAL_MESSAGES: ChatMessage[] = [
    {
        id: 'msg-1',
        senderId: 'user-friend1',
        text: 'Hey guys! I found the perfect dress for the wedding next month. What do you think?',
        timestamp: '10:30 AM',
    },
    {
        id: 'msg-2',
        senderId: 'user-friend1',
        imageUrl: 'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=600',
        timestamp: '10:31 AM',
    },
    {
        id: 'msg-3',
        senderId: 'user-me',
        text: 'Wow, Jenna, that\'s gorgeous! The champagne color is perfect. 😍',
        timestamp: '10:32 AM',
    },
    {
        id: 'msg-4',
        senderId: 'user-friend2',
        text: 'Looks great! Are you thinking of any specific accessories to go with it?',
        timestamp: '10:33 AM',
    },
    {
        id: 'msg-5',
        senderId: 'user-friend1',
        text: 'I was thinking maybe some minimalist gold jewelry? Like these hoops.',
        timestamp: '10:34 AM',
    },
    {
        id: 'msg-6',
        senderId: 'user-friend1',
        imageUrl: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=600',
        timestamp: '10:34 AM',
    },
];

export const GENRES: Genre[] = [
    { id: 'g1', name: 'Streetwear', color: 'bg-red-500', imageUrl: 'https://images.pexels.com/photos/1639729/pexels-photo-1639729.jpeg?auto=compress&cs=tinysrgb&w=400', productIds: ['prod-002', 'prod-010'] },
    { id: 'g2', name: 'Minimalist', color: 'bg-gray-400', imageUrl: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=400', productIds: ['prod-001', 'prod-003', 'prod-005'] },
    { id: 'g3', name: 'Formal', color: 'bg-slate-800', imageUrl: 'https://images.pexels.com/photos/2233729/pexels-photo-2233729.jpeg?auto=compress&cs=tinysrgb&w=400', productIds: ['prod-008'] },
    { id: 'g4', name: 'Vintage', color: 'bg-amber-600', imageUrl: 'https://images.pexels.com/photos/2752045/pexels-photo-2752045.jpeg?auto=compress&cs=tinysrgb&w=400', productIds: ['prod-009'] },
    { id: 'g5', name: 'Bohemian', color: 'bg-lime-700', imageUrl: 'https://images.pexels.com/photos/1518177/pexels-photo-1518177.jpeg?auto=compress&cs=tinysrgb&w=400', productIds: ['prod-012'] },
    { id: 'g6', name: 'Athleisure', color: 'bg-sky-500', imageUrl: 'https://images.pexels.com/photos/4132538/pexels-photo-4132538.jpeg?auto=compress&cs=tinysrgb&w=400', productIds: ['prod-011'] },
];