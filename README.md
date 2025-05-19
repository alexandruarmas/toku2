# ZoomClone Video Conferencing App

A full-featured video conferencing application built with Next.js 15.3, React 19, Tailwind CSS v4.1, Clerk for authentication, and GetStream.io for real-time chat.

## Features

- Video conferencing with real-time chat
- User authentication via Clerk
- Personal meeting rooms
- Meeting scheduling
- Screen sharing
- Responsive design for all devices

## Tech Stack

- Next.js 15.3 with App Router
- React 19
- Tailwind CSS v4.1
- Clerk for authentication
- GetStream.io for real-time chat
- TypeScript

## Prerequisites

Before you begin, make sure you have:
- Node.js 18 or newer
- An account on [Clerk](https://clerk.dev) for authentication
- An account on [GetStream.io](https://getstream.io) for the chat functionality

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/zoom-clone.git
cd zoom-clone
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file in the root directory with the following variables:

```
# Clerk Auth Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_DOMAIN=your_clerk_domain

# GetStream.io Keys
NEXT_PUBLIC_GETSTREAM_API_KEY=your_getstream_api_key
GETSTREAM_API_SECRET=your_getstream_api_secret

# Base URL for Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
zoom-clone/
├── src/                       # Source code
│   ├── actions/               # Server actions for API functionality
│   ├── app/                   # Next.js App Router routes
│   │   ├── (app)/             # Protected application routes
│   │   ├── (auth)/            # Authentication routes
│   │   ├── api/               # API routes
│   ├── context/               # React context providers
│   ├── middleware.ts          # Authentication middleware
├── public/                    # Static assets
├── .env.local                 # Environment variables (create this file)
├── package.json               # Project dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## Deployment

### Deploying to Vercel

1. Push your code to a GitHub repository
2. Import the project to Vercel
3. Configure the environment variables in the Vercel dashboard
4. Deploy

### Deploying to Netlify

1. **Push your code to a GitHub repository**

2. **Connect to Netlify**
   - Sign in to [Netlify](https://www.netlify.com/)
   - Click "New site from Git"
   - Select your GitHub repository

3. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

4. **Set environment variables**
   - In the Netlify dashboard, go to Site settings > Environment variables
   - Add all the environment variables from your `.env.local` file
   - Make sure to update `NEXT_PUBLIC_BASE_URL` to your Netlify domain once deployed

5. **Deploy the site**
   - Netlify will automatically build and deploy your site
   - The site will be available at `https://your-site-name.netlify.app`

6. **Configure custom domain (optional)**
   - In the Netlify dashboard, go to Domain settings
   - Add your custom domain and follow the instructions

7. **Update Clerk settings**
   - In your Clerk dashboard, add your Netlify domain to the allowed domains

## Testing the Application

1. **Create an account** using the sign-up page
2. **Start a new meeting** from the dashboard
3. **Invite others** by sharing the meeting link
4. **Test features** like chat, screen sharing, and video controls

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Clerk](https://clerk.dev/)
- [GetStream.io](https://getstream.io/)
