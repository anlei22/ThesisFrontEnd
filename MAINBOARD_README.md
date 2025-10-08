# MainBoard - Animal Social Platform

## Overview

The MainBoard is a Facebook-like social platform specifically designed for animal lovers, featuring a green theme that reflects the animal-focused community.

## Features

### 🎨 Design Theme

- **Green Color Scheme**: Uses various shades of green to create a nature-friendly atmosphere
- **Dark/Light Mode**: Toggle between dark and light themes with persistent settings
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🧭 Navigation (Navbar)

- **Logo & Branding**: AnimalHub logo with green accent
- **Search Bar**: Search for animals, posts, or friends
- **Navigation Tabs**:
  - Home: News feed with animal posts
  - Chat: Messenger-style chat interface
  - Profile: User profile with ratings and feedback
- **Quick Actions**:
  - Create Post button (+ icon)
  - Dark/Light mode toggle
- **Active State Indicators**: Visual feedback for current tab

### 🏠 Home - News Feed

- **Scrollable Feed**: Infinite scroll with animal-related posts
- **Post Features**:
  - User information with verification badges
  - Rich text content with animal stories
  - Image gallery (1-10 images per post)
  - Interactive buttons (Like, Comment, Share)
  - Real-time like counting
- **Post Types**:
  - Animal rescue stories
  - Wildlife photography
  - Pet care tips
  - Conservation updates
- **Create Post Interface**: Quick access to post creation

### 💬 Chat Interface

- **Messenger Layout**:
  - Left sidebar with conversation list
  - Main chat area with message history
  - Contact search functionality
- **Features**:
  - Real-time online status indicators
  - Unread message counters
  - Message timestamps
  - Photo sharing capabilities
  - Emoji support
  - Voice/Video call buttons
- **Responsive**: Adapts to different screen sizes

### 👤 User Profile

- **Profile Header**:
  - Cover photo with upload capability
  - Profile picture with camera icon
  - User information (name, bio, location)
  - Join date and website links
  - Follow statistics
- **Rating System**:
  - Star-based rating (out of 5)
  - Review count display
  - Visual star indicators
- **Content Tabs**:
  - Posts: User's animal-related posts
  - Reviews & Feedback: Community ratings and comments
- **Profile Editing**: Edit profile information

### ✍️ Create Post Modal

- **Rich Text Editor**: Multi-line text input with character limit (280)
- **Image Upload**:
  - Multiple image selection (up to 10)
  - Image preview with remove option
  - Grid layout for multiple images
- **Additional Features**:
  - Location tagging
  - Emoji picker
  - User tagging
  - Hashtag support
- **Keyboard Shortcuts**: Ctrl/Cmd + Enter to post quickly

## Technical Implementation

### 🛠️ Tech Stack

- **React**: Component-based architecture
- **Tailwind CSS**: Utility-first styling with custom green theme
- **Heroicons**: Consistent icon system
- **React Router**: Client-side routing

### 📁 File Structure

```
src/
├── components/
│   └── Navbar.jsx                    # Main navigation bar
├── pages/User/
│   ├── Mainboard.jsx                 # Main container component
│   └── UserUI/
│       ├── NewsFeed.jsx              # Home feed component
│       ├── ChatInterface.jsx         # Chat functionality
│       ├── UserProfile.jsx           # Profile page
│       └── CreatePostModal.jsx       # Post creation modal
```

### 🎨 Styling Features

- **Dark Mode Support**:
  - System preference detection
  - Manual toggle with localStorage persistence
  - Smooth transitions between themes
- **Green Theme Palette**:
  - Primary: Various shades of green (green-500, green-600, etc.)
  - Backgrounds: Light green tints for light mode
  - Accents: Green highlights for active states
- **Responsive Breakpoints**:
  - Mobile-first design
  - Tablet and desktop optimizations
  - Flexible grid layouts

### 🔧 Key Components

#### Navbar Component

- Sticky positioning
- Search functionality
- Active tab highlighting
- Theme toggle
- Create post trigger

#### NewsFeed Component

- Post rendering with image galleries
- Like/comment/share interactions
- Infinite scroll capability
- Loading skeletons
- Post creation interface

#### ChatInterface Component

- Split-pane layout
- Real-time messaging simulation
- Contact management
- Message threading
- Media sharing

#### UserProfile Component

- Tabbed content display
- Star rating system
- Image upload handling
- Profile editing modal
- Statistics display

#### CreatePostModal Component

- Modal overlay with backdrop
- Image upload and preview
- Form validation
- Character counting
- Multi-media support

## Usage

### Navigation

1. Use the top navigation bar to switch between Home, Chat, and Profile
2. Click the search bar to find content
3. Toggle dark/light mode using the sun/moon icon
4. Create posts using the + button

### Posting Content

1. Click the + button or "What's on your mind..." area
2. Type your animal-related content
3. Add up to 10 images
4. Include location if desired
5. Post using the button or Ctrl+Enter

### Chat Features

1. Select a conversation from the left sidebar
2. Type messages in the input area
3. Share photos using the photo icon
4. Make voice/video calls using the respective buttons

### Profile Management

1. View your posts and reviews in separate tabs
2. Edit profile information using the edit button
3. Update profile and cover photos
4. Monitor your community rating

## Customization

### Theme Colors

The green theme can be customized in `tailwind.config.js`:

```javascript
colors: {
  green: {
    50: '#f0fdf4',   // Lightest green
    500: '#22c55e',  // Primary green
    900: '#14532d',  // Darkest green
  }
}
```

### Dark Mode

Dark mode is implemented using Tailwind's class-based approach:

- `dark:` prefixes for dark mode styles
- Automatic system preference detection
- Manual toggle with localStorage persistence

## Future Enhancements

- Real-time chat functionality
- Push notifications
- Advanced search filters
- Animal species categorization
- Geolocation features
- Video post support
- Story features
- Community groups
- Event planning
- Adoption matching system
