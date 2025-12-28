'use server';

import { fetchReviews, getAppIdFromUrl } from './scraper';
import { extractTopicsFromReviews } from '@/ai/flows/extract-topics-from-reviews';
import { deduplicateSemanticallySimilarTopics } from '@/ai/flows/deduplicate-semantically-similar-topics';
import { format, subDays, isSameDay } from 'date-fns';
import fs from 'fs';
import path from 'path';

export interface TrendReport {
  headers: string[];
  data: {
    topic: string;
    counts: number[];
    total: number;
  }[];
}

export async function handleProcessReviews(appStoreUrl: string, targetDate: Date): Promise<{ message: string | null; error: string | null; data?: TrendReport }> {
  try {
    const appId = await getAppIdFromUrl(appStoreUrl);
    if (!appId) throw new Error("Invalid App Store URL or ID");

    // 1. Fetch reviews for the last 30 days
    const reviews = await fetchReviews(appId, 31); // Fetch slightly more to be safe

    // 2. Prepare daily batches
    const dailyData: Record<string, string[]> = {};
    const dates: string[] = [];
    for (let i = 0; i < 31; i++) {
        const d = subDays(targetDate, i);
        const dateStr = format(d, 'yyyy-MM-dd');
        dates.unshift(dateStr); // Keep chronological order T-30 to T
        dailyData[dateStr] = [];
    }

    reviews.forEach(r => {
        const dateStr = format(new Date(r.date), 'yyyy-MM-dd');
        if (dailyData[dateStr]) {
            dailyData[dateStr].push(r.text);
        }
    });

    // 3. Process batches and extract topics
    // In a real high-recall agent, we'd process each day, 
    // but for efficiency here, we'll extract topics from all reviews and then map back.
    // However, the requirement says "Daily data should be treated as a batch".
    
    let allExtractedTopicsByDate: Record<string, string[]> = {};
    let uniqueTopicsFound: Set<string> = new Set();

    for (const dateStr of dates) {
        if (dailyData[dateStr].length === 0) continue;
        
        // Extract topics for this day's batch
        const extractionResult = await extractTopicsFromReviews({ reviews: dailyData[dateStr] });
        allExtractedTopicsByDate[dateStr] = extractionResult.topics.map(t => t.topic);
        extractionResult.topics.forEach(t => uniqueTopicsFound.add(t.topic));
    }

    // 4. Deduplicate across all found topics
    const deduplicationResult = await deduplicateSemanticallySimilarTopics({
        topics: Array.from(uniqueTopicsFound),
        topicMemory: [] // We could pass seed topics here
    });

    const topicMappings = deduplicationResult.mappings;
    const canonicalTopics = Array.from(new Set(Object.values(topicMappings)));

    // 5. Build Trend Report
    const trendData: TrendReport['data'] = canonicalTopics.map(topic => {
        const counts = dates.map(dateStr => {
            const dailyTopics = allExtractedTopicsByDate[dateStr] || [];
            // Count how many original topics from this day map to this canonical topic
            // Actually, usually we'd want to count review occurrences.
            // But if we want frequency of topic occurrence:
            return dailyTopics.filter(t => topicMappings[t] === topic).length;
        });
        return {
            topic,
            counts,
            total: counts.reduce((a, b) => a + b, 0)
        };
    });

    const report: TrendReport = {
        headers: dates.map(d => format(new Date(d), 'MMM d')),
        data: trendData
    };

    // 6. Save to /output/
    const outputDir = path.join(process.cwd(), 'output');
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
    const fileName = `trend-report-${appId}-${format(targetDate, 'yyyy-MM-dd')}.json`;
    fs.writeFileSync(path.join(outputDir, fileName), JSON.stringify(report, null, 2));

    return { 
        message: "Trend analysis report generated successfully.", 
        error: null,
        data: report
    };

  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { message: null, error: `Failed to process reviews: ${errorMessage}` };
  }
}

export async function handleExtractTopics(
  reviews: string[]
) {
    const data = await extractTopicsFromReviews({ reviews });
    return { data, error: null };
}

export async function handleDeduplicateTopics(
  topics: string[]
) {
    const data = await deduplicateSemanticallySimilarTopics({ topics, topicMemory: [] });
    return { data, error: null };
}
