'use client';

import { useState } from 'react';
<<<<<<< HEAD
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
=======
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Link, Send } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
>>>>>>> origin/main
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
<<<<<<< HEAD
=======
  CardFooter
>>>>>>> origin/main
} from '@/components/ui/card';
import {
  Form,
  FormControl,
<<<<<<< HEAD
=======
  FormDescription,
>>>>>>> origin/main
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
<<<<<<< HEAD
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
=======
>>>>>>> origin/main
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
<<<<<<< HEAD
import { CalendarIcon, Loader2, Play } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { handleProcessReviews } from '@/lib/actions';
import { useReview } from '@/context/review-provider';

const formSchema = z.object({
  appStoreUrl: z.string().url({
    message: "Please enter a valid Google Play Store URL.",
  }),
  date: z.date({
    required_error: "A target date is required.",
=======
import { useToast } from '@/hooks/use-toast';
import { useReviewContext } from '@/context/review-provider';
import { handleProcessReviews } from '@/lib/actions';
import { sampleReviews } from '@/lib/data';

const formSchema = z.object({
  appStoreUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  date: z.date({
    required_error: 'A target date is required.',
>>>>>>> origin/main
  }),
});

export default function ReviewSourceCard() {
<<<<<<< HEAD
  const { toast } = useToast();
  const { setReport, setIsLoading, isLoading } = useReview();
=======
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setReviews } = useReviewContext();
  const { toast } = useToast();
>>>>>>> origin/main

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
<<<<<<< HEAD
      appStoreUrl: "https://play.google.com/store/apps/details?id=in.swiggy.android",
=======
      appStoreUrl: 'https://play.google.com/store/apps/details?id=com.google.android.apps.tasks',
>>>>>>> origin/main
      date: new Date(),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
<<<<<<< HEAD
    try {
      const result = await handleProcessReviews(values.appStoreUrl, values.date);
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.data) {
        setReport(result.data);
        toast({
          title: "Success",
          description: result.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
=======
    // Simulate fetching reviews. In a real app, this would be an API call.
    const { message, error } = await handleProcessReviews(values.appStoreUrl, values.date);
    
    // For now, we'll use sample data to populate the context.
    setReviews(sampleReviews);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
      });
      setIsLoading(false);
    } else {
       toast({
        title: 'Success!',
        description: 'Simulated fetching reviews. Redirecting to extraction...',
      });
      router.push('/topic-extraction');
>>>>>>> origin/main
    }
  }

  return (
<<<<<<< HEAD
    <Card>
      <CardHeader>
        <CardTitle>Review Source</CardTitle>
        <CardDescription>
          Specify the app and starting date for trend analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
=======
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle>Analyze App Reviews</CardTitle>
        <CardDescription>
          Enter an App Store link and a date to generate a trend analysis report.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
>>>>>>> origin/main
            <FormField
              control={form.control}
              name="appStoreUrl"
              render={({ field }) => (
                <FormItem>
<<<<<<< HEAD
                  <FormLabel>App Store URL / App ID</FormLabel>
                  <FormControl>
                    <Input placeholder="https://play.google.com/store/apps/details?id=..." {...field} />
=======
                  <FormLabel>App Store URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <Input placeholder="https://play.google.com/store/apps/details?id=..." {...field} className="pl-10 text-foreground" />
                    </div>
>>>>>>> origin/main
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
<<<<<<< HEAD
                  <FormLabel>Target Date (T)</FormLabel>
=======
                  <FormLabel>Target Date</FormLabel>
>>>>>>> origin/main
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
<<<<<<< HEAD
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
=======
                          variant={'outline'}
                          className={cn(
                            'w-full justify-start pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card" align="start">
>>>>>>> origin/main
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
<<<<<<< HEAD
                          date > new Date() || date < new Date("1900-01-01")
=======
                          date > new Date() || date < new Date('1900-01-01')
>>>>>>> origin/main
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
<<<<<<< HEAD
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Generate Trend Report
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
=======
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
              <Send className="mr-2 size-4" />
              {isLoading ? 'Processing...' : 'Fetch Reviews'}
            </Button>
          </CardFooter>
        </form>
      </Form>
>>>>>>> origin/main
    </Card>
  );
}
