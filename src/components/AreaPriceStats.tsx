import { TrendingUp, TrendingDown, Home, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

interface AreaPriceStatsProps {
  parish: string;
  beds: number;
  currentPrice: string;
}

// Mock data - would come from API in production
const areaStats = {
  "St Brelade": { avgSale: 1180000, avgRent: 3200, trend: 4.2, totalListings: 24, avgDaysOnMarket: 45 },
  "St Helier": { avgSale: 620000, avgRent: 1800, trend: 2.8, totalListings: 67, avgDaysOnMarket: 32 },
  "St Peter": { avgSale: 890000, avgRent: 2600, trend: 3.5, totalListings: 18, avgDaysOnMarket: 52 },
  "Grouville": { avgSale: 950000, avgRent: 2800, trend: 5.1, totalListings: 12, avgDaysOnMarket: 38 },
};

function formatPrice(n: number) {
  return `£${(n / 1000).toFixed(0)}k`;
}

export function AreaPriceStats({ parish, beds, currentPrice }: AreaPriceStatsProps) {
  const stats = areaStats[parish as keyof typeof areaStats] || areaStats["St Brelade"];
  const isUp = stats.trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-accent" />
        {parish} Market Overview
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-secondary rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Avg. Sale Price</p>
          <p className="text-lg font-bold text-foreground">{formatPrice(stats.avgSale)}</p>
          <p className="text-xs text-muted-foreground">{beds}+ bed properties</p>
        </div>
        <div className="bg-secondary rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Avg. Monthly Rent</p>
          <p className="text-lg font-bold text-foreground">£{stats.avgRent.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">pcm in {parish}</p>
        </div>
        <div className="bg-secondary rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Price Trend (12m)</p>
          <div className="flex items-center gap-1">
            {isUp ? (
              <TrendingUp className="w-4 h-4 text-accent" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <p className={`text-lg font-bold ${isUp ? "text-accent" : "text-destructive"}`}>
              {isUp ? "+" : ""}{stats.trend}%
            </p>
          </div>
          <p className="text-xs text-muted-foreground">year on year</p>
        </div>
        <div className="bg-secondary rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">Active Listings</p>
          <div className="flex items-center gap-1">
            <Home className="w-4 h-4 text-muted-foreground" />
            <p className="text-lg font-bold text-foreground">{stats.totalListings}</p>
          </div>
          <p className="text-xs text-muted-foreground">avg {stats.avgDaysOnMarket} days on market</p>
        </div>
      </div>
    </motion.div>
  );
}
