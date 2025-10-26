import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share, Bookmark, QrCode, Star, MapPin, Calendar, ShieldCheck, MoreHorizontal, Send, X, Camera, UserPlus, ChevronLeft, ChevronRight, Grid, List, Flag, MoreVertical, Edit, Trash2 } from 'lucide-react';
import ShareModal from '../../../components/ShareModal'; // Adjust path if needed



const COLORS = {
  dark: { bg: 'bg-gray-900', card: 'bg-gray-800', text: 'text-white', muted: 'text-gray-400', border: 'border-gray-700' },
  light: { bg: 'bg-gray-50', card: 'bg-white', text: 'text-gray-900', muted: 'text-gray-600', border: 'border-gray-200' }
};

const DEFAULT_USER = {
  name: 'Juan Dela Cruz',
  username: '@juandelacruz',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  coverPhoto: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=400&fit=crop',
  bio: 'Professional livestock farmer specializing in cattle and poultry.',
  location: 'Nueva Ecija, Philippines',
  joinDate: 'Joined March 2023',
  rating: 4.8,
  totalReviews: 127,
  followers: 1234,
  following: 567,
  isVerified: true,
  specialties: ['Cattle', 'Poultry', 'Goats']
};

const SAMPLE_POSTS = [
  {
    id: 1,
    content: 'Beautiful healthy cattle ready for sale! Vaccinated and well-maintained.',
    images: ['https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=800&h=600&fit=crop'],
    likes: 145,
    comments: 23,
    bookmarks: 45,
    timestamp: '2 hours ago',
    isLiked: false,
    isBookmarked: false,
    animalInfo: {
      title: 'Premium Cattle',
      type: 'Cattle',
      breed: 'Brahman',
      age: '2 years',
      sex: 'Male',
      price: '₱85,000',
      availability: 'available',
      description: 'Premium quality Brahman cattle in excellent health condition. Regularly vaccinated and dewormed. Perfect for breeding or meat production. Well-trained and easy to handle.'
    }
  },
  {
    id: 2,
    content: 'High-quality free-range chickens for egg production.',
    images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&h=600&fit=crop'],
    likes: 89,
    comments: 15,
    bookmarks: 28,
    timestamp: '5 hours ago',
    isLiked: true,
    isBookmarked: false,
    animalInfo: {
      title: 'Free-Range Chickens',
      type: 'Poultry',
      breed: 'Rhode Island Red',
      age: '6 months',
      sex: 'Female',
      price: '₱350 each',
      availability: 'available',
      description: 'Healthy free-range Rhode Island Red chickens. Excellent egg layers producing 5-6 eggs per week. Fed with organic feed and raised in spacious, natural environment.'
    }
  },
  {
    id: 3,
    content: 'Beautiful goats for sale - great for dairy or meat production.',
    images: ['https://images.unsplash.com/photo-1533318087102-b3ad366ed041?w=800&h=600&fit=crop'],
    likes: 67,
    comments: 12,
    bookmarks: 18,
    timestamp: '1 day ago',
    isLiked: false,
    isBookmarked: true,
    animalInfo: {
      title: 'Dairy Goats',
      type: 'Goats',
      breed: 'Saanen',
      age: '1.5 years',
      sex: 'Female',
      price: '₱12,000',
      availability: 'sold',
      description: 'High-producing Saanen dairy goats. Excellent milk production with good fat content. Friendly and easy to handle. Perfect for small-scale dairy operations.'
    }
  }
];

const SAMPLE_REVIEWS = [
  {
    id: 1,
    user: { name: 'Maria Santos', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    rating: 5,
    text: 'Excellent seller! The cattle were in perfect condition as described. Very professional and knowledgeable.',
    timestamp: '2 weeks ago'
  },
  {
    id: 2,
    user: { name: 'Pedro Reyes', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop' },
    rating: 4,
    text: 'Good quality livestock. Delivery was on time and animals were healthy. Would buy again.',
    timestamp: '1 month ago'
  }
];

const INITIAL_COMMENTS = [
  {
    id: 1,
    user: { name: 'Maria Santos', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' },
    text: 'Interested in this cattle! Can you provide more details about vaccination records?',
    timestamp: '1 hour ago',
    likes: 3,
    replies: [
      {
        id: 101,
        user: { name: 'Juan Dela Cruz', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop' },
        text: 'Hi Maria! Yes, all vaccination records are available. I can send them to you.',
        timestamp: '45 minutes ago',
        likes: 1
      }
    ]
  }
];

// Rating Stars
const RatingStars = ({ rating, darkMode }) => (
  <div className="flex items-center space-x-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < Math.floor(rating || 0) ? 'text-yellow-400 fill-current' : darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
    ))}
  </div>
);

// Post Grid Item
const PostGridItem = ({ post, onClick }) => (
  <button onClick={onClick} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
    <img src={post.images[0]} alt={post.animalInfo.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
      <div className="opacity-0 group-hover:opacity-100 text-white flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <Heart className="w-5 h-5 fill-current" />
          <span>{post.likes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>{post.comments}</span>
        </div>
      </div>
    </div>
  </button>
);

// Profile Card Preview Component (shown when QR is scanned)
const ProfileCardPreview = ({ user, darkMode, onViewProfile }) => {
  const COLORS = {
    dark: { bg: 'bg-gray-900', card: 'bg-gray-800', text: 'text-white', muted: 'text-gray-400', border: 'border-gray-700' },
    light: { bg: 'bg-gray-50', card: 'bg-white', text: 'text-gray-900', muted: 'text-gray-600', border: 'border-gray-200' }
  };

  const scheme = darkMode ? COLORS.dark : COLORS.light;

  return (
    <div className={`w-full max-w-sm rounded-2xl overflow-hidden shadow-xl ${scheme.card}`}>
      {/* Cover Photo */}
      <div className="relative h-32 overflow-hidden">
        <img src={user.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
      </div>

      {/* Profile Picture */}
      <div className="flex justify-center -mt-16 mb-4 px-6">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
          />
          {user.isVerified && (
            <div className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="px-6 pb-6 text-center">
        <h2 className={`text-xl font-bold mb-1 ${scheme.text}`}>{user.name}</h2>
        <p className={`text-sm mb-2 ${scheme.muted}`}>{user.username}</p>

        {/* Seller/Buyer Badge */}
        <div className="flex justify-center mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Verified Seller
          </span>
        </div>

        {/* Location */}
        <div className={`flex items-center justify-center space-x-1 mb-4 ${scheme.muted}`}>
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{user.location}</span>
        </div>

        {/* Rating */}
        <div className={`flex items-center justify-center space-x-2 mb-6 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <RatingStars rating={user.rating} darkMode={darkMode} />
          <span className={`text-sm font-medium ${scheme.text}`}>
            {user.rating.toFixed(1)} ({user.totalReviews} reviews)
          </span>
        </div>

        {/* Contact Button */}
        <button
          onClick={onViewProfile}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>View Full Profile</span>
        </button>
      </div>
    </div>
  );
};
const getUserTypeBadge = (type, darkMode) => {
  const types = {
    buyer: {
      light: 'bg-purple-100 text-purple-600',
      dark: 'bg-purple-600 text-purple-100',
      label: 'Buyer'
    },
    seller: {
      light: 'bg-blue-100 text-blue-600',
      dark: 'bg-blue-600 text-blue-100',
      label: 'Seller'
    },
    both: {
      light: 'bg-green-100 text-green-600',
      dark: 'bg-green-600 text-green-100',
      label: 'Buyer & Seller'
    }
  };

  const typeConfig = types[type] || types.both;
  return {
    className: darkMode ? typeConfig.dark : typeConfig.light,
    label: typeConfig.label
  };
};
// QR Code Modal Component
// QR Code Modal Component
const QRCodeModal = ({ user, darkMode, onClose }) => {
  const COLORS = {
    dark: { bg: 'bg-gray-900', card: 'bg-gray-800', text: 'text-white', muted: 'text-gray-400', border: 'border-gray-700' },
    light: { bg: 'bg-gray-50', card: 'bg-white', text: 'text-gray-900', muted: 'text-gray-600', border: 'border-gray-200' }
  };

  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const qrRef = useRef(null);

  // Generate profile URL for QR code
  const profileUrl = `${window.location.origin}/profile/${user.username.replace('@', '')}`;

  // Generate QR code as data URL
  useEffect(() => {
    const generateQR = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const size = 256;
      const moduleSize = 8;
      const modules = Math.floor(size / moduleSize);

      canvas.width = size;
      canvas.height = size;

      // White background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, size, size);

      // Simple QR-like pattern (for demo)
      ctx.fillStyle = '#000000';

      // Corner squares (position markers)
      const cornerSize = moduleSize * 7;
      [0, size - cornerSize].forEach(x => {
        [0, size - cornerSize].forEach(y => {
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = moduleSize;
          ctx.strokeRect(x + moduleSize, y + moduleSize, cornerSize - 2 * moduleSize, cornerSize - 2 * moduleSize);
          ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, cornerSize - 4 * moduleSize, cornerSize - 4 * moduleSize);
        });
      });

      // Random pattern for data
      for (let i = 0; i < modules; i++) {
        for (let j = 0; j < modules; j++) {
          if (Math.random() > 0.5) {
            ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize - 1, moduleSize - 1);
          }
        }
      }

      setQrDataUrl(canvas.toDataURL());
    };

    generateQR();
  }, [profileUrl]);

  const handleSimulateScan = () => {
    setShowPreview(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      alert('Failed to copy link');
    });
  };

  const handleDownload = () => {
    if (!qrDataUrl) {
      alert('QR code is still generating, please wait...');
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 300;
    canvas.height = 380;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const qrImage = new Image();
    qrImage.onload = () => {
      ctx.drawImage(qrImage, 20, 20, 260, 260);

      ctx.fillStyle = '#111827';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(user.name, 150, 310);

      ctx.fillStyle = '#6b7280';
      ctx.font = '14px Arial';
      ctx.fillText(user.username, 150, 335);

      ctx.font = '12px Arial';
      ctx.fillText('Scan to view profile', 150, 360);

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${user.username.replace('@', '')}-qrcode.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
    };
    qrImage.src = qrDataUrl;
  };

  return (
    <div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className={`w-full max-w-md rounded-2xl overflow-hidden ${scheme.card}`} onClick={(e) => e.stopPropagation()}>
        <div className={`flex items-center justify-between p-4 border-b ${scheme.border}`}>
          <h3 className={`text-lg font-semibold ${scheme.text}`}>Share Profile QR Code</h3>
          <button onClick={onClose} className={`p-2 rounded-full hover:opacity-80 ${scheme.muted}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showPreview ? (
          <div className="p-6">
            <div className="text-center mb-6">
              <div ref={qrRef} className="bg-white p-4 rounded-lg inline-block mb-4">
                <div className="w-64 h-64 flex items-center justify-center bg-gray-100 rounded relative">
                  {qrDataUrl ? (
                    <img src={qrDataUrl} alt="QR Code" className="w-full h-full" />
                  ) : (
                    <QrCode className="w-32 h-32 text-gray-400 animate-pulse" />
                  )}
                </div>
              </div>


              <p className={`text-sm mt-4 ${scheme.muted}`}>Scan this code to view profile</p>
            </div>

            <div className={`mb-4 p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <p className={`text-xs font-medium mb-2 ${scheme.muted}`}>Profile Link</p>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={profileUrl}
                  readOnly
                  className={`flex-1 px-3 py-2 text-sm rounded-lg border-none focus:outline-none ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-white text-gray-700'}`}
                />
                <button
                  onClick={handleCopyLink}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${copied
                      ? 'bg-green-600 text-white'
                      : darkMode
                        ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                >
                  {copied ? (
                    <>
                      <span className="text-sm">✓</span>
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share className="w-4 h-4" />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex gap-3 mb-3">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                <Camera className="w-5 h-5" />
                <span>Download QR</span>
              </button>

              <button
                onClick={handleSimulateScan}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
              >
                Preview Card
              </button>
            </div>

            <button
              onClick={onClose}
              className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              Close
            </button>
          </div>
        ) : (
          <div className="p-6">
            <ProfileCardPreview
              user={user}
              darkMode={darkMode}
              onViewProfile={() => {
                setShowPreview(false);
                onClose();
                window.open(profileUrl, '_blank');
              }}
            />
            <button
              onClick={() => setShowPreview(false)}
              className={`w-full mt-4 px-4 py-2 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
            >
              Back to QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Post List Item
const PostListItem = ({ post, user, darkMode, likedPosts, bookmarkedPosts, onLike, onBookmark, onImageClick }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;

  return (
    <div className={`rounded-lg border overflow-hidden relative ${scheme.card} ${scheme.border}`}>
      {/* Diagonal Ribbon */}
      {post.animalInfo && (
        <div className="absolute top-0 right-0 w-32 h-35 overflow-hidden z-10">
          <div className={`absolute top-4 right-[-32px] w-40 h-8 transform rotate-45 text-center text-white text-xs font-bold leading-8 shadow-lg ${post.animalInfo.availability === 'available' ? 'bg-green-500' : 'bg-red-500'
            }`}>
            {post.animalInfo.availability === 'available' ? 'AVAILABLE' : 'SOLD OUT'}
          </div>
        </div>
      )}

      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="flex items-center space-x-1">
                <h3 className={`font-semibold ${scheme.text}`}>{user.name}</h3>
                {user.isVerified && (
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className={`text-sm ${scheme.muted}`}>{post.timestamp}</p>
            </div>
          </div>
          <button className={`p-2 rounded-full hover:opacity-80 ${scheme.muted}`}>
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-4">
        {post.animalInfo && (
          <div className="mt-4">
            <h3 className={`text-lg font-semibold mb-1 text-center ${darkMode ? 'text-green-200' : 'text-green-800'}`}>
              {post.animalInfo.title}
            </h3>

            {post.animalInfo.description && (
              <div className="mb-2 text-center">
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {post.animalInfo.description}
                </p>
              </div>
            )}

            <div className="flex justify-center items-center">
              <span className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                {post.animalInfo.price}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Images */}
      {post.images?.length > 0 && (
        <div className="px-6 pb-4">
          <div className={`grid gap-2 rounded-lg overflow-hidden cursor-pointer hover:opacity-95 transition-opacity ${post.images.length === 1 ? 'grid-cols-1' : post.images.length === 2 ? 'grid-cols-2' : post.images.length === 3 ? 'grid-cols-2' : 'grid-cols-2'
            }`} onClick={onImageClick}>
            {post.images.slice(0, 4).map((image, i) => (
              <div key={i} className={`relative ${post.images.length === 3 && i === 0 ? 'row-span-2' : ''}`}>
                <img src={image} alt={`Post ${i}`} className="w-full h-full object-cover" style={{ minHeight: '200px', maxHeight: '400px' }} />
                {i === 3 && post.images.length > 4 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-xl font-semibold">+{post.images.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Stats */}
      <div className={`px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-sm ${scheme.muted}`}>
        <span>{post.likes} likes</span> &nbsp;  <span>{post.comments} comments</span>  &nbsp; <span>{post.bookmarks} bookmarks</span>
      </div>

      {/* Actions */}
<div className={`flex items-center justify-around border-t py-2 ${scheme.border}`}>
  {[
    { icon: Heart, label: 'like', action: onLike, active: likedPosts.has(post.id), color: 'text-green-600' },
    { icon: MessageCircle, label: 'comment', action: onImageClick, color: 'text-blue-600' },
    { icon: Bookmark, label: 'bookmark', action: onBookmark, active: bookmarkedPosts.has(post.id), color: 'text-yellow-600' },
    { icon: Share, label: 'share', action: () => {}, color: 'text-green-600' }
  ].map(({ icon: Icon, label, action, active, color }) => (
    <button key={label} onClick={action} className={`flex items-center space-x-2 px-4 py-2 hover:opacity-80 transition ${active ? color : scheme.muted}`}>
            <Icon className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Review Item
const ReviewItem = ({ review, darkMode }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
      <div className="flex items-start space-x-3">
        <img src={review.user.avatar} alt={review.user.name} className="w-10 h-10 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h4 className={`font-semibold ${scheme.text}`}>{review.user.name}</h4>
            <span className={`text-xs ${scheme.muted}`}>{review.timestamp}</span>
          </div>
          <RatingStars rating={review.rating} darkMode={darkMode} />
          <p className={`mt-2 text-sm ${scheme.text}`}>{review.text}</p>
        </div>
      </div>
    </div>
  );
};

// Post Modal
// Post Modal
const PostModal = ({ post, user, darkMode, onClose, isAuthenticated = true }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [commentText, setCommentText] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportComment, setReportComment] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);

  const reportReasons = [
    'Spam or misleading',
    'Inappropriate content',
    'False information',
    'Animal welfare concerns',
    'Scam or fraud',
    'Other'
  ];

  const handleReportSubmit = () => {
    if (!reportReason) {
      alert('Please select a reason for reporting');
      return;
    }

    console.log('Report submitted:', {
      postId: post?.id,
      reason: reportReason,
      comment: reportComment,
    });

    alert('Thank you for your report. We will review it shortly.');

    setShowReportModal(false);
    setShowReportMenu(false);
    setReportReason('');
    setReportComment('');
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      setComments([...comments, {
        id: Date.now(),
        user: { name: 'You', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop' },
        text: commentText,
        timestamp: 'Just now',
        likes: 0,
        replies: []
      }]);
      setCommentText('');
    }
  };

  const handleAddReply = (commentId) => {
    if (replyText.trim()) {
      setComments(comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), {
              id: Date.now(),
              user: { name: 'You', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop' },
              text: replyText,
              timestamp: 'Just now',
              likes: 0
            }]
          };
        }
        return comment;
      }));
      setReplyText('');
      setReplyingTo(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />

        <div className={`relative rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden ${scheme.card}`}>
          {/* Header */}
          {/* Header */}
          <div className={`flex items-center justify-between p-6 border-b ${scheme.border}`}>
            <div className="flex items-center space-x-4">
              <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h2 className={`text-xl font-semibold ${scheme.text}`}>{post.animalInfo.title}</h2>
                <div className="flex items-center space-x-4 mt-1">
                  <p className={scheme.muted}>by {user.name}</p>
                  <span className={scheme.muted}>•</span>
                  <p className={`text-sm ${scheme.muted}`}>{post.timestamp}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Report Menu Button - Only show if logged in */}
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setShowReportMenu(!showReportMenu)}
                    className={`p-2 rounded-lg transition-colors ${darkMode
                        ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    <MoreVertical className="w-6 h-6" />
                  </button>

                  {/* Dropdown Menu */}
                  {showReportMenu && (
                    <div
                      className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 ${darkMode
                          ? "bg-gray-700 border border-gray-600"
                          : "bg-white border border-gray-200"
                        }`}
                    >
                      <button
                        onClick={() => {
                          setShowReportModal(true);
                          setShowReportMenu(false);
                        }}
                        className={`w-full flex items-center space-x-2 px-4 py-3 text-left transition-colors rounded-lg ${darkMode
                            ? "text-gray-300 hover:bg-gray-600"
                            : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <Flag className="w-5 h-5 text-red-500" />
                        <span>Report Post</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Close Button */}
              <button onClick={onClose} className={`p-2 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="p-6">
              {/* Images */}
              {post.images && post.images.length > 0 && (
                <div className="mb-6">
                  <div className="relative">
                    <img src={post.images[currentImageIndex]} alt={post.animalInfo.title} className="w-full h-80 object-cover rounded-xl" />
                    {post.images.length > 1 && (
                      <>
                        <button onClick={() => setCurrentImageIndex(prev => prev === 0 ? post.images.length - 1 : prev - 1)}
                          className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 bg-opacity-80' : 'bg-white bg-opacity-80'}`}>
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => setCurrentImageIndex(prev => prev === post.images.length - 1 ? 0 : prev + 1)}
                          className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg ${darkMode ? 'bg-gray-700 bg-opacity-80' : 'bg-white bg-opacity-80'}`}>
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                          {post.images.map((_, index) => (
                            <button key={index} onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'}`} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {post.images.length > 1 && (
                    <div className="flex space-x-3 mt-4 overflow-x-auto pb-2">
                      {post.images.map((image, index) => (
                        <button key={index} onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${index === currentImageIndex ? 'border-green-500' : darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                          <img src={image} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="mb-6">
                <h3 className={`text-lg font-medium mb-3 ${scheme.text}`}>Description</h3>
                <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{post.animalInfo.description}</p>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="space-y-5">
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Animal Type</h4>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`}>
                      {post.animalInfo.type}
                    </span>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Age & Sex</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>{post.animalInfo.age} • {post.animalInfo.sex}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Status</h4>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${post.animalInfo.availability === 'available' ? (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') : (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')}`}>
                      {post.animalInfo.availability}
                    </span>
                  </div>
                </div>
                <div className="space-y-5">
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Breed</h4>
                    <p className={darkMode ? 'text-gray-400' : 'text-gray-700'}>{post.animalInfo.breed}</p>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Location</h4>
                    <div className="flex items-start space-x-2">
                      <MapPin className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.location}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold mb-1 ${scheme.text}`}>Price</h4>
                    <p className="text-lg font-bold text-green-600">{post.animalInfo.price}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              {isAuthenticated && (
                <div className={`flex items-center justify-between p-4 rounded-lg mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>{post.likes}</p>
                      <p className={`text-xs ${scheme.muted}`}>Likes</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>{post.bookmarks}</p>
                      <p className={`text-xs ${scheme.muted}`}>Bookmarks</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-2xl font-bold ${scheme.text}`}>{comments.length}</p>
                      <p className={`text-xs ${scheme.muted}`}>Comments</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className={`flex items-center p-3 rounded-lg mb-6 border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${isAuthenticated ? 'justify-around' : 'justify-between'}`}>
                {isAuthenticated ? (
                  <>
                    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${post.isLiked ? 'text-green-600' : scheme.muted}`}>
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="font-medium">Like</span>
                    </button>
                    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${post.isBookmarked ? 'text-yellow-600' : scheme.muted}`}>
                      <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
                      <span className="font-medium">Save</span>
                    </button>
                    <button
                      onClick={() => setShowShareModal(true)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${scheme.muted}`}>
                      <Share className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${scheme.muted}`}>
                      <Share className="w-5 h-5" />
                      <span className="font-medium">Share</span>
                    </button>
                    <div className={`text-center px-4 py-2 text-sm ${scheme.muted}`}>Login to like, comment & save</div>
                  </>
                )}
              </div>

              {/* Comments */}
              {isAuthenticated && (
                <div className={`border-t pt-4 ${scheme.border}`}>
                  <h3 className={`text-lg font-semibold mb-4 ${scheme.text}`}>Comments ({comments.length})</h3>

                  {/* Add Comment */}
                  <div className="mb-6">
                    <div className={`flex space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-semibold">U</span>
                      </div>
                      <div className="flex-1">
                        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." rows="3"
                          className={`w-full px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900 border border-gray-200'}`} />
                        <div className="flex justify-end mt-2">
                          <button onClick={handleAddComment} disabled={!commentText.trim()}
                            className={`px-4 py-2 rounded-lg font-medium ${commentText.trim() ? 'bg-green-600 hover:bg-green-700 text-white' : (darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-400')} cursor-${commentText.trim() ? 'pointer' : 'not-allowed'}`}>
                            Post Comment
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {comments.map((comment) => (
                      <div key={comment.id}>
                        <div className={`flex space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                          <img src={comment.user.avatar} alt={comment.user.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <div>
                                <h4 className={`font-semibold text-sm ${scheme.text}`}>{comment.user.name}</h4>
                                <p className={`text-xs ${scheme.muted}`}>{comment.timestamp}</p>
                              </div>
                            </div>
                            <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{comment.text}</p>
                            <div className="flex items-center space-x-4">
                              <button className={`flex items-center space-x-1 text-xs ${scheme.muted}`}>
                                <Heart className="w-4 h-4" />
                                <span>{comment.likes > 0 ? comment.likes : 'Like'}</span>
                              </button>
                              <button onClick={() => setReplyingTo(comment.id)} className={`text-xs ${scheme.muted}`}>Reply</button>
                              {comment.replies?.length > 0 && (
                                <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Reply Input */}
                        {replyingTo === comment.id && (
                          <div className={`ml-12 mt-2 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <div className="flex space-x-3">
                              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                                <span className="text-white font-semibold text-xs">U</span>
                              </div>
                              <div className="flex-1">
                                <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder={`Reply to ${comment.user.name}...`} rows="2" autoFocus
                                  className={`w-full px-3 py-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 ${darkMode ? 'bg-gray-600 text-white' : 'bg-white text-gray-900 border border-gray-200'}`} />
                                <div className="flex justify-end space-x-2 mt-2">
                                  <button onClick={() => setReplyingTo(null)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                                    Cancel
                                  </button>
                                  <button onClick={() => handleAddReply(comment.id)} disabled={!replyText.trim()}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium ${replyText.trim() ? 'bg-green-600 hover:bg-green-700 text-white' : (darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-400')} cursor-${replyText.trim() ? 'pointer' : 'not-allowed'}`}>
                                    Reply
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="ml-12 mt-2 space-y-2">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className={`flex space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                                <img src={reply.user.avatar} alt={reply.user.name} className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <div>
                                      <h4 className={`font-semibold text-sm ${scheme.text}`}>{reply.user.name}</h4>
                                      <p className={`text-xs ${scheme.muted}`}>{reply.timestamp}</p>
                                    </div>
                                  </div>
                                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{reply.text}</p>
                                  <button className={`flex items-center space-x-1 text-xs ${scheme.muted}`}>
                                    <Heart className="w-3 h-3" />
                                    <span>{reply.likes > 0 ? reply.likes : 'Like'}</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal - THIS SHOULD BE HERE */}
      {showShareModal && (
        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          darkMode={darkMode}
          postId={post.id}
          title={post.animalInfo.title}
        />
      )}
      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
              onClick={() => setShowReportModal(false)}
            />

            <div
              className={`relative rounded-2xl shadow-xl max-w-md w-full ${darkMode ? "bg-gray-800" : "bg-white"
                }`}
            >
              {/* Modal Header */}
              <div
                className={`flex items-center justify-between p-6 border-b ${darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
              >
                <h2
                  className={`text-xl font-semibold ${darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                  Report Post
                </h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className={`p-2 rounded-lg transition-colors ${darkMode
                      ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                      : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <p
                  className={`text-sm mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                  Help us understand what's wrong with this post. Your report
                  will be reviewed by our team.
                </p>

                {/* Reason Selection */}
                <div className="mb-4">
                  <label
                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                  >
                    Reason for reporting <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {reportReasons.map((reason) => (
                      <label
                        key={reason}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${reportReason === reason
                            ? darkMode
                              ? "bg-red-900 bg-opacity-30 border-2 border-red-500"
                              : "bg-red-50 border-2 border-red-500"
                            : darkMode
                              ? "bg-gray-700 hover:bg-gray-600 border-2 border-gray-600"
                              : "bg-gray-50 hover:bg-gray-100 border-2 border-gray-200"
                          }`}
                      >
                        <input
                          type="radio"
                          name="reportReason"
                          value={reason}
                          checked={reportReason === reason}
                          onChange={(e) => setReportReason(e.target.value)}
                          className="mr-3 text-red-500 focus:ring-red-500"
                        />
                        <span
                          className={`text-sm ${darkMode ? "text-gray-200" : "text-gray-700"
                            }`}
                        >
                          {reason}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Comments */}
                <div className="mb-6">
                  <label
                    className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                  >
                    Additional details (optional)
                  </label>
                  <textarea
                    value={reportComment}
                    onChange={(e) => setReportComment(e.target.value)}
                    placeholder="Provide any additional information that might help us understand the issue..."
                    rows="4"
                    className={`w-full px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500 ${darkMode
                        ? "bg-gray-700 text-white placeholder-gray-400 border border-gray-600"
                        : "bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-300"
                      }`}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setShowReportModal(false);
                      setReportReason("");
                      setReportComment("");
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${darkMode
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                      }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleReportSubmit}
                    disabled={!reportReason}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${reportReason
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : darkMode
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    Report Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>


  );
};



// Message Modal
const MessageModal = ({ user, darkMode, onClose }) => {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'other', text: 'Hi! Interested in your livestock.', time: '10:30 AM' },
    { id: 2, sender: 'user', text: 'Thank you! What animals are you looking for?', time: '10:32 AM' }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, sender: 'user', text: message, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className={`w-full max-w-lg rounded-2xl overflow-hidden ${scheme.card}`} onClick={(e) => e.stopPropagation()}>
        <div className={`flex items-center justify-between p-4 border-b ${scheme.border}`}>
          <div className="flex items-center space-x-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h4 className={`font-semibold ${scheme.text}`}>{user.name}</h4>
              <span className="text-xs text-green-500">Online</span>
            </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full hover:opacity-80 ${scheme.muted}`}><X className="w-5 h-5" /></button>
        </div>
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-green-600 text-white' : darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={`p-4 border-t flex items-center space-x-2 ${scheme.border}`}>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className={`flex-1 px-4 py-2 rounded-full text-sm border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`} />
          <button onClick={sendMessage} disabled={!message.trim()} className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full disabled:opacity-50"><Send className="w-5 h-5" /></button>
        </div>
      </div>
    </div>
  );

};

// Main Profile Component
export default function UserViewProfile({ user, userPosts = [], darkMode = false, onBack, onMessage }) {
  const scheme = darkMode ? COLORS.dark : COLORS.light;
  const currentUser = user || DEFAULT_USER;

 // ✅ PRIORITY: Use posts from user.posts if available (from API)
  const posts = user?.posts?.length > 0 
    ? user.posts 
    : (userPosts.length > 0 ? userPosts : SAMPLE_POSTS);

  console.log('📊 UserProfileView Data:', {
    userId: currentUser.id,
    name: currentUser.name,
    postsCount: posts.length,
    hasRealPosts: user?.posts?.length > 0,
    loading: user?.loading,
    error: user?.error,
  });

  // ✅ Show loading state while fetching profile
  if (user?.loading) {
    return (
      <div className={`min-h-screen transition-colors ${scheme.bg} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className={`text-lg font-medium ${scheme.text}`}>Loading profile...</p>
          <p className={`text-sm ${scheme.muted} mt-2`}>Fetching user data and posts</p>
        </div>
      </div>
    );
  }

  // ✅ Show error state if failed to load
  if (user?.error) {
    return (
      <div className={`min-h-screen transition-colors ${scheme.bg}`}>
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <button
            onClick={onBack}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode
                ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className={`mt-8 p-6 rounded-lg ${
            darkMode ? 'bg-red-900/20 border-2 border-red-600' : 'bg-red-50 border-2 border-red-200'
          }`}>
            <div className="text-center">
              <div className="mb-4">
                <svg className={`w-16 h-16 mx-auto ${darkMode ? 'text-red-400' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
                Failed to Load Profile
              </h3>
              <p className={`mb-4 ${darkMode ? 'text-red-200' : 'text-red-600'}`}>
                Unable to fetch complete profile data. Showing limited information.
              </p>
              <button
                onClick={onBack}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Rest of your existing UserProfileView code continues here...
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(currentUser.followers || 0);
  const [likedPosts, setLikedPosts] = useState(new Set(posts.filter(p => p.isLiked).map(p => p.id)));
  const [bookmarkedPosts, setBookmarkedPosts] = useState(new Set(posts.filter(p => p.isBookmarked).map(p => p.id)));
  const [showQRCode, setShowQRCode] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [viewMode, setViewMode] = useState('list');
  const [selectedPost, setSelectedPost] = useState(null);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
  };

  const toggleLike = (postId) => {
    const newLiked = new Set(likedPosts);
    newLiked.has(postId) ? newLiked.delete(postId) : newLiked.add(postId);
    setLikedPosts(newLiked);
  };

  const toggleBookmark = (postId) => {
    const newBookmarked = new Set(bookmarkedPosts);
    newBookmarked.has(postId) ? newBookmarked.delete(postId) : newBookmarked.add(postId);
    setBookmarkedPosts(newBookmarked);
  };



  return (
    <div className={`min-h-screen transition-colors ${scheme.bg}`}>

      <div className="max-w-4xl mx-auto px-4 pt-6">
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${darkMode
              ? 'text-gray-400 hover:bg-gray-800 hover:text-white'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
      </div>


      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Profile Card */}
        <div className={`rounded-2xl overflow-hidden shadow-lg ${scheme.card}`}>
          {/* Cover Photo */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img src={currentUser.coverPhoto} alt="Cover" className="w-full h-full object-cover" />
          </div>

          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center md:justify-start -mt-16 mb-6 relative z-10">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg" />
            </div>

            {/* Header */}
         {/* Header */}
<div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 text-center md:text-left">
  <div>
    {/* Name + Verified Badge + User Type Badge */}
    <div className="flex items-center justify-center md:justify-start space-x-2 mb-1 flex-wrap gap-2">
      <h1 className={`text-2xl font-bold ${scheme.text}`}>{currentUser.name}</h1>

     
      {/* User Type Badge */}
      {currentUser.user_type && (
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            getUserTypeBadge(currentUser.user_type, darkMode).className
          }`}
        >
          {getUserTypeBadge(currentUser.user_type, darkMode).label}
        </span>
      )}
    </div>

    {/* Username */}
    <p className={`text-base ${scheme.muted}`}>{currentUser.username}</p>
  </div>

  {/* Action Buttons */}
  <div className="flex justify-center md:justify-end gap-2 mt-4 md:mt-0">
    <button 
      onClick={() => setShowQRCode(true)} 
      className={`px-4 py-2 rounded-lg font-medium transition ${
        darkMode 
          ? 'bg-gray-700 text-white hover:bg-gray-600' 
          : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
      }`}
    >
      <QrCode className="w-4 h-4" />
    </button>
    <button 
      onClick={async () => {
        if (typeof onMessage === 'function') {
          await onMessage(currentUser.id);
        } else {
          setShowMessageModal(true);
        }
      }} 
      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition flex items-center space-x-2"
    >
      <MessageCircle className="w-4 h-4" />
      <span>Message</span>
    </button>
  </div>
</div>





            {/* Location & Join Date */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm justify-center md:justify-start">
              <div className={`flex items-center space-x-1 ${scheme.muted}`}><MapPin className="w-4 h-4" /><span>{currentUser.location}</span></div>
              <div className={`flex items-center space-x-1 ${scheme.muted}`}><Calendar className="w-4 h-4" /><span>{currentUser.joinDate}</span></div>
            </div>

            {/* Rating */}
            <div
              className={`p-4 rounded-lg text-center max-w-md mx-auto ${darkMode ? "bg-gray-700" : "bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-center space-x-1 mb-1">
                <RatingStars rating={currentUser.rating} darkMode={darkMode} />
              </div>
              <div
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                {currentUser.rating.toFixed(1)} ({currentUser.totalReviews} reviews)
              </div>
            </div>

          </div>
        </div>

        {/* Tabs */}
        <div className={`rounded-2xl overflow-hidden shadow-lg ${scheme.card}`}>
          <div className={`border-b ${scheme.border}`}>
            <div className="flex justify-between items-center px-6">
              <nav className="flex space-x-8">
                {['posts', 'reviews'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab ? 'border-green-500 text-green-600' : `border-transparent ${scheme.muted}`}`}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>


            </div>
          </div>

          <div className="p-6">
            {activeTab === 'posts' && (
              <div className={viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 gap-4' : 'space-y-4'}>
                {posts.map((post) => (
                  <div key={post.id}>
                    {viewMode === 'grid' ? (
                      <PostGridItem post={post} onClick={() => setSelectedPost(post)} />
                    ) : (
                      <PostListItem
                        post={post}
                        user={currentUser}
                        darkMode={darkMode}
                        likedPosts={likedPosts}
                        bookmarkedPosts={bookmarkedPosts}
                        onLike={() => toggleLike(post.id)}
                        onBookmark={() => toggleBookmark(post.id)}
                        onImageClick={() => setSelectedPost(post)}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {/* Existing reviews */}
                {SAMPLE_REVIEWS.map((review) => (
                  <ReviewItem key={review.id} review={review} darkMode={darkMode} />
                ))}

                {/* Divider (optional, just for visual separation) */}
                <hr className={`my-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />

                {/* Write a new review */}
                <div
                  className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                >
                  <h4
                    className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                  >
                    Write a Review
                  </h4>

                  <textarea
                    rows="3"
                    placeholder="Share your experience..."
                    className={`w-full p-2 rounded-md border text-sm resize-none focus:outline-none focus:ring-2 ${darkMode
                        ? 'bg-gray-800 border-gray-600 text-gray-200 focus:ring-blue-500'
                        : 'bg-white border-gray-300 text-gray-700 focus:ring-blue-400'
                      }`}
                  />

                  <button
                    className={`mt-3 px-4 py-2 rounded-md text-sm font-medium transition ${darkMode
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                  >
                    Send Review
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modals */}
        {showQRCode && <QRCodeModal user={currentUser} darkMode={darkMode} onClose={() => setShowQRCode(false)} />}
        {showMessageModal && <MessageModal user={currentUser} darkMode={darkMode} onClose={() => setShowMessageModal(false)} />}
        {selectedPost && <PostModal post={selectedPost} user={currentUser} darkMode={darkMode} onClose={() => setSelectedPost(null)} />}
      </div>
    </div>
  );
}