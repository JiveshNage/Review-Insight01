'use client';

import { useState } from 'react';
import { Sparkles, Combine } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { handleDeduplicateTopics } from '@/lib/actions';
import { initialTopicsForDeduplication } from '@/lib/data';
import type { DeduplicateSemanticallySimilarTopicsOutput } from '@/ai/flows/deduplicate-semantically-similar-topics';

export default function TopicDeduplicationCard() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] =
    useState<DeduplicateSemanticallySimilarTopicsOutput | null>(null);
  const { toast } = useToast();

  async function onDeduplicate() {
    setIsLoading(true);
    setResult(null);

    const { data, error } = await handleDeduplicateTopics(
      initialTopicsForDeduplication
    );

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error,
      });
    } else {
      setResult(data);
    }
    setIsLoading(false);
  }

  const uniqueCanonicalTopics = result ? [...new Set(Object.values(result.canonicalTopics))] : [];

  return (
    <Card id="topic-deduplication" className="flex flex-col">
      <CardHeader>
        <CardTitle>Topic Deduplication</CardTitle>
        <CardDescription>
          Merge similar topics into a single canonical topic using AI.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h3 className="font-semibold text-card-foreground">Topics to Process:</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {initialTopicsForDeduplication.map((topic, index) => (
            <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
              {topic}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-4">
        <Button onClick={onDeduplicate} disabled={isLoading}>
          <Combine className="mr-2" />
          {isLoading ? 'Deduplicating...' : 'Deduplicate Topics'}
        </Button>
        {isLoading && (
          <div className="w-full space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-[80%]" />
          </div>
        )}
        {result && (
          <div className="w-full">
            <h3 className="mb-2 font-semibold text-card-foreground">
              Canonical Topics ({uniqueCanonicalTopics.length}):
            </h3>
            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Original Topic</TableHead>
                    <TableHead>Canonical Topic</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(result.canonicalTopics).map(
                    ([original, canonical]) => (
                      <TableRow key={original}>
                        <TableCell>{original}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{canonical}</Badge>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
