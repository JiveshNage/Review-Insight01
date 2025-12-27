# **App Name**: Review Insights Trend Analyzer

## Core Features:

- Review Collection: Collect daily Google Play Store reviews from the specified date range for a given app link.
- Review Preprocessing: Clean and preprocess review text to remove noise and irrelevant information, making it suitable for topic extraction.
- Topic Extraction with LLM: Extract relevant topics (issues, requests, feedback) from preprocessed reviews using an LLM to identify key themes. The LLM will use a tool to help reason about whether or not information needs to be included in the output.
- Topic Deduplication: Merge semantically similar topics into canonical topics using semantic similarity and LLM-based reasoning. Implements a 'TopicMemoryStore' to persist known topics and prevent future duplication.
- Frequency Counting: Count the occurrences of each extracted topic per day to track topic trends over time.
- Trend Report Generation: Generate a trend report table in CSV and Excel formats, displaying topic frequencies from T-30 to T.
- Configuration Management: Loads parameters from configuration files. Parameters include date ranges, API keys and LLM related prompt templates, and thresholds for operations such as deduplication.

## Style Guidelines:

- Primary color: Dark charcoal gray (#333333) for the background, providing a sleek and modern feel.
- Secondary color: Deep purple (#663399) for primary UI elements and highlights, conveying sophistication.
- Accent color: Teal (#008080) to draw attention to key data points and interactive elements.
- Neutral color: Light gray (#EEEEEE) for content containers and subtle separation of sections.
- Body and headline font: 'Roboto', a sans-serif font known for its clarity and legibility across various screen sizes.
- Data labels: 'Montserrat', a modern sans-serif to ensure labels are easily readable within charts and tables.
- Use minimalist, line-based icons for representing different data categories and actions, ensuring clarity and a modern aesthetic.
- Dashboard layout: Utilize a grid-based layout with clear separation between sections to present data in an organized and easily digestible manner.
- Subtle transitions and animations for loading data and updating charts to enhance user experience without being distracting.