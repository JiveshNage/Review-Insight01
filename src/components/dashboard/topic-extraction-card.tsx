'use client';

<<<<<<< HEAD
import { useState } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> origin/main
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Sparkles } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { handleExtractTopics } from '@/lib/actions';
<<<<<<< HEAD
=======
import { useReviewContext } from '@/context/review-provider';
>>>>>>> origin/main
import type { ExtractTopicsFromReviewsOutput } from '@/ai/flows/extract-topics-from-reviews';

const formSchema = z.object({
  reviews: z.string().min(10, {
    message: 'Please enter at least a few reviews to analyze.',
  }),
});

export default function TopicExtractionCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] =
    useState<ExtractTopicsFromReviewsOutput | null>(null);
  const { toast } = useToast();
<<<<<<< HEAD
=======
  const { reviews: reviewsFromContext } = useReviewContext();
>>>>>>> origin/main

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reviews: '',
    },
  });

<<<<<<< HEAD
=======
  useEffect(() => {
    if (reviewsFromContext.length > 0) {
      form.setValue('reviews', reviewsFromContext.join('\n\n'));
    }
  }, [reviewsFromContext, form]);

>>>>>>> origin/main
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    const reviews = values.reviews.split('\n\n').filter((r) => r.trim() !== '');

    if (reviews.length === 0) {
        toast({
            variant: 'destructive',
            title: 'No Reviews',
<<<<<<< HEAD
            description: 'Please paste reviews here.',
=======
            description: 'Please fetch reviews from the dashboard first or paste them here.',
>>>>>>> origin/main
        });
        setIsLoading(false);
        return;
    }

    const { data, error } = await handleExtractTopics(reviews);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
      });
    } else {
      setResult(data);
       toast({
        title: 'Success',
        description: 'Topics have been extracted from the reviews.',
      });
    }
    setIsLoading(false);
  }

  return (
    <Card id="topic-extraction" className="flex flex-col">
      <CardHeader>
        <CardTitle>Topic Extraction</CardTitle>
        <CardDescription>
<<<<<<< HEAD
          Use AI to extract key topics from user reviews.
=======
          Use AI to extract key topics from the fetched user reviews. This is stage 3 of the workflow.
>>>>>>> origin/main
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-grow">
          <CardContent className="flex-grow">
            <FormField
              control={form.control}
              name="reviews"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Reviews</FormLabel>
                  <FormControl>
                    <Textarea
<<<<<<< HEAD
                      placeholder="Paste user reviews here, one per line."
=======
                      placeholder="Paste user reviews here, one per line, or fetch them from the dashboard."
>>>>>>> origin/main
                      className="min-h-[200px] resize-y bg-background text-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4">
            <Button type="submit" disabled={isLoading}>
              <Sparkles className="mr-2" />
              {isLoading ? 'Analyzing...' : 'Extract Topics'}
            </Button>
            {isLoading && (
              <div className="w-full space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-[80%]" />
              </div>
            )}
            {result && result.topics.length > 0 && (
              <div className="w-full">
                <h3 className="mb-2 font-semibold text-card-foreground">Extracted Topics:</h3>
                <Accordion type="single" collapsible className="w-full">
                  {result.topics.map((item, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger>{item.topic}</AccordionTrigger>
                      <AccordionContent>{item.reasoning}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
