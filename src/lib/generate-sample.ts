'use server';

import { handleProcessReviews } from './actions';
import { subDays } from 'date-fns';

export async function generateSampleOutput() {
    const swiggyUrl = "https://play.google.com/store/apps/details?id=in.swiggy.android";
    const targetDate = new Date(); // Today
    
    console.log("Starting sample output generation for Swiggy...");
    const result = await handleProcessReviews(swiggyUrl, targetDate);
    
    if (result.error) {
        console.error("Error generating sample output:", result.error);
    } else {
        console.log("Sample output generated successfully in /output/ folder.");
    }
}
