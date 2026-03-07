# DeepSeek Clone - AI Chat Application 🤖💬

A full-stack AI-powered chat application that replicates the DeepSeek AI assistant experience. Chat with an intelligent AI, save your conversation history, and enjoy a sleek, modern interface.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-DeepSeek%20Clone-green)](https://deep-seek-clone-one.vercel.app/)

## 🎯 What Does It Do?

DeepSeek Clone is an AI chat application where you can:

- **Chat with AI**: Have natural conversations with an advanced AI assistant powered by DeepSeek
- **Ask Questions**: Get answers on any topic - coding, general knowledge, problem-solving, creative writing, and more
- **Save Conversations**: All your chat history is automatically saved and synced to the cloud
- **Access Anywhere**: Your conversations are available across all your devices
- **Secure Authentication**: Sign in securely with email, Google, or other providers
- **Real-Time Responses**: Get instant AI responses with streaming text
- **Multiple Conversations**: Create and manage multiple chat threads
- **Clean Interface**: Enjoy a modern, distraction-free chat experience

## 👤 Who Is It For?

- Developers seeking coding assistance and debugging help
- Students needing homework help or explanations
- Writers looking for creative inspiration
- Professionals needing quick research and information
- Anyone curious about AI and conversational interfaces
- Developers learning to build AI-powered applications

## 🚀 How to Use

### For Users

1. **Visit the Live Demo**: [https://deep-seek-clone-one.vercel.app/](https://deep-seek-clone-one.vercel.app/)

2. **Sign In**:
   - Click "Sign In" button
   - Choose your preferred method (Email, Google, etc.)
   - Complete authentication

3. **Start Chatting**:
   - Type your question or message in the input box
   - Press Enter or click Send
   - Watch as the AI responds in real-time

4. **Manage Conversations**:
   - Click "New Chat" to start a fresh conversation
   - Access previous chats from the sidebar
   - Delete conversations you no longer need

5. **Tips for Best Results**:
   - Be specific with your questions
   - Provide context when needed
   - Break complex questions into smaller parts
   - Use follow-up questions to dive deeper

### For Developers

#### Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- Accounts on:
  - [Clerk](https://clerk.com/) - Authentication
  - [MongoDB Atlas](https://cloud.mongodb.com/) - Database
  - [OpenRouter](https://openrouter.ai/) - DeepSeek API access

#### Installation

1. **Clone the Repository**:
```bash
git clone https://github.com/your-username/deep-seek-clone.git
cd deep-seek-clone
```

2. **Install Dependencies**:
```bash
npm install
# or
yarn install
```

3. **Set Up Environment Variables**:

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
SIGNING_SECRET=whsec_xxxxx

# MongoDB Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# DeepSeek AI API
DEEPSEEK_API_KEY=sk-xxxxx
```

#### Getting API Keys

**Clerk (Authentication):**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` from API Keys
4. Copy `CLERK_SECRET_KEY` from API Keys
5. For `SIGNING_SECRET`:
   - Navigate to Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/clerk`
   - Copy the signing secret

**MongoDB Atlas (Database):**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

**OpenRouter (AI API):**
1. Go to [OpenRouter](https://openrouter.ai/)
2. Sign up and navigate to API Keys
3. Create a new API key
4. Copy the key (starts with `sk-`)

#### Run the Application

```bash
# Development mode
npm run dev
# or
yarn dev

# Open http://localhost:3000
```

#### Build for Production

```bash
# Build
npm run build

# Start production server
npm start
```

## ✨ Key Features

### AI-Powered Conversations
- Natural language understanding
- Context-aware responses
- Multi-turn conversations
- Streaming responses for real-time feel

### User Authentication
- Secure sign-in with Clerk
- Multiple authentication methods (Email, Google, GitHub)
- Session management
- Protected routes

### Conversation Management
- Create unlimited chat threads
- Automatic conversation saving
- Search through chat history
- Delete unwanted conversations
- Conversation timestamps

### Modern UI/UX
- Clean, minimalist design
- Responsive layout (mobile, tablet, desktop)
- Dark mode support
- Smooth animations and transitions
- Loading states and error handling

### Data Persistence
- All conversations saved to MongoDB
- User-specific data isolation
- Fast retrieval and search
- Reliable cloud storage

## 🛠️ Technical Stack

- **[Next.js](https://nextjs.org/)** - React framework with App Router and API routes
- **[React](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Clerk](https://clerk.com/)** - Authentication and user management
- **[MongoDB](https://www.mongodb.com/)** - NoSQL database for conversation storage
- **[OpenRouter](https://openrouter.ai/)** - AI API gateway for DeepSeek
- **[Vercel](https://vercel.com/)** - Hosting and deployment

## 📁 Project Structure

```
deep-seek-clone/
├── app/
│   ├── api/
│   │   ├── chat/           # Chat API endpoint
│   │   ├── conversations/  # Conversation CRUD
│   │   └── webhooks/       # Clerk webhooks
│   ├── chat/               # Chat page
│   ├── sign-in/            # Sign in page
│   ├── sign-up/            # Sign up page
│   └── layout.tsx          # Root layout
├── components/
│   ├── ChatInterface.tsx   # Main chat UI
│   ├── MessageList.tsx     # Message display
│   ├── ChatInput.tsx       # Message input
│   ├── Sidebar.tsx         # Conversation sidebar
│   └── ...                 # Other components
├── lib/
│   ├── mongodb.ts          # Database connection
│   ├── openrouter.ts       # AI API client
│   └── utils.ts            # Utility functions
├── models/
│   ├── Conversation.ts     # Conversation schema
│   └── Message.ts          # Message schema
└── public/                 # Static assets
```

## 🔧 Configuration

### Clerk Authentication Setup

1. **Configure Allowed Redirect URLs**:
   - Development: `http://localhost:3000`
   - Production: `https://your-domain.com`

2. **Set Up Webhooks** (for user sync):
   - Endpoint: `/api/webhooks/clerk`
   - Events: `user.created`, `user.updated`, `user.deleted`

### MongoDB Setup

1. **Create Database**: `deepseek_clone`
2. **Collections**:
   - `users` - User profiles
   - `conversations` - Chat threads
   - `messages` - Individual messages

### Environment-Specific Settings

**Development:**
```env
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Production:**
```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## 📊 Data Models

### Conversation Schema
```typescript
{
  _id: ObjectId,
  userId: string,
  title: string,
  createdAt: Date,
  updatedAt: Date,
  messages: Message[]
}
```

### Message Schema
```typescript
{
  _id: ObjectId,
  conversationId: ObjectId,
  role: 'user' | 'assistant',
  content: string,
  timestamp: Date
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Update Clerk URLs**:
   - Add Vercel URL to Clerk allowed redirects
   - Update webhook endpoint to Vercel URL

### Environment Variables on Vercel

Add all variables from `.env.local` to Vercel:
- Project Settings → Environment Variables
- Add each variable individually
- Redeploy after adding variables

## 🧪 Testing

### Test Locally

```bash
# Run development server
npm run dev

# Test authentication flow
# Test chat functionality
# Test conversation management
```

### Test API Endpoints

```bash
# Test chat endpoint
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, AI!"}'
```

## 🔐 Security Features

- Secure authentication with Clerk
- API route protection
- User data isolation
- Environment variable protection
- HTTPS in production
- CORS configuration
- Rate limiting (recommended to add)

## 📈 Future Enhancements

- [ ] Voice input and output
- [ ] Image generation capabilities
- [ ] Code syntax highlighting
- [ ] Export conversations (PDF, TXT)
- [ ] Conversation sharing
- [ ] Custom AI personalities
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Conversation folders/tags
- [ ] Advanced search and filters

## 🎨 Customization

### Change AI Model

Edit `lib/openrouter.ts`:
```typescript
const model = "deepseek/deepseek-chat"; // Change to any OpenRouter model
```

### Customize Theme

Edit `tailwind.config.js` for colors and styling.

### Modify Chat Behavior

Edit API route in `app/api/chat/route.ts` to adjust:
- Temperature (creativity)
- Max tokens (response length)
- System prompts (AI personality)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- DeepSeek AI for the powerful language model
- Clerk for seamless authentication
- Vercel for excellent hosting
- MongoDB for reliable data storage

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check existing issues for solutions
- Review documentation links above
