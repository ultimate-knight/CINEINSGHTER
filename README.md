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

## � Testing

### Setup Testing Environment

The project can be configured with Jest and React Testing Library for comprehensive testing:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### Configure Jest

Create a `jest.config.js` file in the root directory:

```javascript
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}

export default createJestConfig(config)
```

Create `jest.setup.js` in the root directory:

```javascript
import '@testing-library/jest-dom'
```

### Update package.json

Add test script to your `package.json`:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Testing Guidelines

#### 1. **API Route Testing**
Test the `/api/movie` endpoint:

```javascript
// src/app/api/movie/__tests__/route.test.js
import { GET } from '../route'

describe('/api/movie endpoint', () => {
  it('should return movie data for valid IMDb ID', async () => {
    const req = new Request('http://localhost:3000/api/movie?imdbId=tt0133093')
    const response = await GET(req)
    expect(response.status).toBe(200)
  })

  it('should return 400 for missing IMDb ID', async () => {
    const req = new Request('http://localhost:3000/api/movie')
    const response = await GET(req)
    expect(response.status).toBe(400)
  })
})
```

#### 2. **Component Testing**
Test the main Home component:

```javascript
// src/app/__tests__/page.test.js
import { render, screen } from '@testing-library/react'
import Home from '../page'

describe('Home Page', () => {
  it('renders the title correctly', () => {
    render(<Home />)
    expect(screen.getByText(/CINEINSIGHT/i)).toBeInTheDocument()
  })

  it('renders search input field', () => {
    render(<Home />)
    expect(screen.getByPlaceholderText(/tt0133093/i)).toBeInTheDocument()
  })

  it('renders Analyze button', () => {
    render(<Home />)
    expect(screen.getByRole('button', { name: /Analyze/i })).toBeInTheDocument()
  })
})
```

#### 3. **End-to-End Testing** (Optional)
For E2E tests, install Playwright or Cypress:

```bash
npm install --save-dev @playwright/test
```

Create `e2e/movie-search.spec.js`:

```javascript
import { test, expect } from '@playwright/test'

test.describe('Movie Search Flow', () => {
  test('should search and display movie information', async ({ page }) => {
    await page.goto('http://localhost:3000')
    await page.fill('input[placeholder="tt0133093"]', 'tt0133093')
    await page.click('button:has-text("Analyze")')
    await page.waitForSelector('text=The Matrix')
    expect(await page.isVisible('text=Cast')).toBeTruthy()
  })
})
```

### What to Test

- ✅ API endpoint validation and error handling
- ✅ Movie data fetching from TMDb
- ✅ Sentiment analysis response parsing
- ✅ UI component rendering and interactions
- ✅ Input validation for IMDb IDs
- ✅ API key validation (mock sensitive keys)
- ✅ Error boundaries and fallback UI
- ✅ Responsive design on different screen sizes

### Best Practices

- Mock external API calls (TMDb, Groq) to avoid rate limiting
- Use environment variables for test configuration
- Test both success and error scenarios
- Maintain test coverage above 80%
- Run tests before committing code

## �🤖 AI Integration Details

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
