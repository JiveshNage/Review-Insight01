# Review Insights

A Next.js application for analyzing customer reviews using AI-powered topic extraction, semantic deduplication, and trend reporting. Built with Firebase Genkit for AI workflows and modern web technologies.

## Features

- **Topic Extraction**: Automatically extract key topics from customer reviews using AI
- **Semantic Deduplication**: Remove duplicate or similar topics to streamline analysis
- **Trend Reporting**: Generate insights and trends from review data
- **Dashboard**: Comprehensive overview with cards for different analysis modules
- **Review Scraping**: Built-in scraper for collecting review data
- **Modern UI**: Responsive design using Tailwind CSS and shadcn/ui components

## Tech Stack

- **Framework**: Next.js 14
- **AI**: Firebase Genkit
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Firebase App Hosting
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Firebase CLI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Review-Insight01-main
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Initialize Firebase project
   - Configure Genkit for AI workflows

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - Next.js app router pages
- `src/components/` - Reusable UI components
- `src/ai/` - AI workflows and Genkit configurations
- `src/lib/` - Utility functions and data handling
- `src/context/` - React context providers

## Usage

1. **Upload Reviews**: Use the scraper or upload review data
2. **Extract Topics**: Navigate to Topic Extraction page to analyze reviews
3. **Deduplicate Topics**: Use the deduplication feature to clean up similar topics
4. **Generate Reports**: View trend reports and insights on the dashboard

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
