'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useReview } from '@/context/review-provider';

export default function TrendReportCard() {
  const { report, isLoading } = useReview();

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Generating Trend Report... This may take a few minutes as we process daily batches.</p>
        </CardContent>
      </Card>
    );
  }

  if (!report) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trend Report</CardTitle>
          <CardDescription>No report generated yet. Please enter an app URL and process reviews.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card id="trend-report">
      <CardHeader>
        <CardTitle>Topic Trend Report (T to T-30)</CardTitle>
        <CardDescription>
          Daily occurrence frequency of topics extracted from user reviews.
        </CardDescription>
      </CardHeader>
      <CardContent className="font-data">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px] font-semibold sticky left-0 bg-background z-10">Topic</TableHead>
                {report.headers.map((header, i) => (
                  <TableHead key={i} className="text-center font-semibold">{header}</TableHead>
                ))}
                <TableHead className="text-right font-semibold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {report.data.map((row) => (
                <TableRow key={row.topic}>
                  <TableCell className="font-medium sticky left-0 bg-background z-10 border-r">{row.topic}</TableCell>
                  {row.counts.map((count, index) => (
                    <TableCell key={index} className="text-center">
                      {count > 0 ? (
                        <Badge
                          variant="secondary"
                          className="w-8 justify-center bg-secondary text-secondary-foreground"
                        >
                          {count}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="text-right font-bold">
                    {row.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
       <CardFooter>
        <Button variant="outline" onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report));
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href",     dataStr);
            downloadAnchorNode.setAttribute("download", "trend-report.json");
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        }}>
          <Download className="mr-2" />
          Export JSON
        </Button>
      </CardFooter>
    </Card>
  );
}
