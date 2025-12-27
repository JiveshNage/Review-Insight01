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
import { Download } from 'lucide-react';
import { trendData, trendReportHeaders } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function TrendReportCard() {
  return (
    <Card id="trend-report">
      <CardHeader>
        <CardTitle>Weekly Topic Trend Report</CardTitle>
        <CardDescription>
          Frequency of key topics mentioned in reviews over the last 7 days.
        </CardDescription>
      </CardHeader>
      <CardContent className="font-data">
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px] font-semibold">Topic</TableHead>
                {trendReportHeaders.map((header) => (
                  <TableHead key={header} className="text-center font-semibold">{header}</TableHead>
                ))}
                <TableHead className="text-right font-semibold">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trendData.map((row) => (
                <TableRow key={row.topic}>
                  <TableCell className="font-medium">{row.topic}</TableCell>
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
        <Button variant="outline">
          <Download className="mr-2" />
          Export Report
        </Button>
      </CardFooter>
    </Card>
  );
}
