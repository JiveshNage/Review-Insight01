import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Tags, TrendingDown, TrendingUp } from "lucide-react";

type OverviewStat = {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  changeType: 'increase' | 'decrease';
};

const stats: OverviewStat[] = [
  {
    title: "Total Reviews",
    value: "1,258",
    change: "+20.1% from last month",
    icon: MessageSquare,
    changeType: 'increase',
  },
  {
    title: "Positive Sentiment",
    value: "82%",
    change: "+2.5% from last month",
    icon: TrendingUp,
    changeType: 'increase',
  },
    {
    title: "Negative Sentiment",
    value: "11%",
    change: "-1.2% from last month",
    icon: TrendingDown,
    changeType: 'decrease',
  },
  {
    title: "New Topics Today",
    value: "4",
    change: "+1 from yesterday",
    icon: Tags,
    changeType: 'increase',
  },
];

export default function OverviewCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
