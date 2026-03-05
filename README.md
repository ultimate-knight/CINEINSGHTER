# 🎬 CINEINSIGHT - Movie Analysis Platform

A modern web application that provides comprehensive movie insights using AI-powered sentiment analysis. Enter any IMDb ID to explore detailed movie information, cast details, audience reviews, and AI-generated sentiment summaries.

## ✨ Features

- **Movie Information**: Get detailed movie data including title, poster, release year, rating, and plot
- **Cast Details**: View top 5 cast members with character names and profile images
- **Audience Reviews**: Browse recent audience reviews with ratings and dates
- **AI Sentiment Analysis**: Powered by Groq AI (Llama 3.3) to analyze reviews and provide:
  - Overall sentiment classification (positive/mixed/negative)
  - Sentiment score percentage
  - Concise summary of audience opinions
  - Key highlights from reviews
- **Responsive Design**: Beautiful, mobile-friendly interface built with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework for production-grade applications
- **React 19** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development
- **Lucide React** - Beautiful, customizable icons

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **TMDb API** - Movie database for comprehensive film data
- **Groq AI** - Fast inference API using Llama 3.3 70B model for sentiment analysis

### Development Tools
- **ESLint** - Code linting and quality assurance
- **PostCSS** - CSS processing and optimization

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, or **pnpm** package manager
- **TMDb API Key** - Get one from [TMDb Developer Portal](https://www.themoviedb.org/settings/api)
- **Groq API Key** - Get one from [Groq Console](https://console.groq.com/)

## 🚀 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd movie-imdb
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**

   Create a `.env.local` file in the root directory:

   ```env
   TMDB_TOKEN=your_tmdb_api_key_here
   GROK_KEY=your_groq_api_key_here
   ```

   Replace the placeholder values with your actual API keys.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

1. Enter a valid IMDb ID in the search field (e.g., `tt0133093` for The Matrix)
2. Click the "Analyze" button
3. View comprehensive movie information including:
   - Movie poster and basic details
   - AI-powered sentiment analysis
   - Cast information
   - Recent audience reviews

### Example IMDb IDs to try:
- `tt0133093` - The Matrix
- `tt0468569` - The Dark Knight
- `tt1375666` - Inception

## 🏗️ Project Structure

```
movie-imdb/
├── src/
│   └── app/
│       ├── api/
│       │   └── movie/
│       │       └── route.js          # Movie data API endpoint
│       ├── globals.css               # Global styles
│       ├── layout.js                 # Root layout component
│       └── page.js                   # Main page component
├── public/
│   └── video-player.png              # App logo
├── package.json                      # Dependencies and scripts
├── next.config.mjs                   # Next.js configuration
├── tailwind.config.mjs              # Tailwind CSS configuration
├── postcss.config.mjs               # PostCSS configuration
├── jsconfig.json                     # JavaScript configuration
└── eslint.config.mjs                # ESLint configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤖 AI Integration Details

The application uses Groq's Llama 3.3 70B model for sentiment analysis with the following prompt structure:

```
Summarize these audience reviews for the movie "[MOVIE_TITLE]" and classify the overall sentiment as positive, mixed, or negative.

Reviews:
[REVIEW_TEXT]

Respond ONLY in this JSON format, no extra text:
{
  "summary": "2-3 sentence overall summary",
  "sentiment": "positive",
  "score": 85,
  "highlights": [
    "Key point 1",
    "Key point 2",
    "Key point 3",
    "Key point 4"
  ]
}
```

## 📊 API Endpoints

### GET `/api/movie?imdbId={imdbId}`

Fetches movie data and performs sentiment analysis.

**Parameters:**
- `imdbId` (required): Valid IMDb ID (e.g., tt0133093)

**Response:**
```json
{
  "title": "The Matrix",
  "poster": "https://image.tmdb.org/t/p/w500/...",
  "release_year": "1999",
  "rating": 8.7,
  "plot": "When a beautiful stranger...",
  "cast": [...],
  "reviews": [...],
  "sentimentSummary": {
    "summary": "...",
    "sentiment": "positive",
    "score": 87,
    "highlights": [...]
  }
}
```

## 🎨 Design Decisions

- **Color Scheme**: Dark theme with yellow accent colors for movie industry feel
- **Typography**: Serif font for headings to evoke classic movie posters
- **Layout**: Responsive grid system that works on all device sizes
- **Icons**: Lucide React icons for consistent, modern iconography

## 🔒 Security Notes

- API keys are stored in environment variables (not committed to version control)
- Input validation for IMDb IDs
- Error handling for API failures
- No user data storage - all operations are stateless

## 📝 Assumptions

- Users have valid TMDb and Groq API keys
- Internet connection is available for API calls
- IMDb IDs entered are valid and exist in TMDb database
- Users understand basic movie terminology
- Browser supports modern JavaScript features (ES6+)

## 🚀 Deployment

The application can be deployed to any platform supporting Next.js:

- **Vercel** (recommended): Connect your GitHub repo for automatic deployments
- **Netlify**: Use the Next.js build command
- **Railway, Render, or Fly.io**: Standard Node.js deployment

Remember to set environment variables in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to ensure code quality
5. Test thoroughly
6. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js, Tailwind CSS, and AI-powered insights.
