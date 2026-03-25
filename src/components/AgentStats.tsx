import { Star, Clock, Home, TrendingUp, Award } from "lucide-react";
import { motion } from "framer-motion";

interface AgentStatsProps {
  agentName: string;
  agencyName: string;
}

// Mock data - would come from API
const agentData = {
  rating: 4.8,
  reviews: 127,
  propertiesSold: 234,
  avgDaysToSell: 28,
  activeListings: 18,
  successRate: 96,
  yearsActive: 12,
  responseTime: "< 2 hours",
};

export function AgentStats({ agentName, agencyName }: AgentStatsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
    >
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-accent" />
        Agent Performance
      </h2>
      <div className="bg-card rounded-2xl border border-border p-5">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            {agentName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-foreground">{agentName}</p>
            <p className="text-sm text-muted-foreground">{agencyName} · {agentData.yearsActive} years experience</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">{agentData.rating}/5</p>
              <p className="text-xs text-muted-foreground">{agentData.reviews} reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
            <Home className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">{agentData.propertiesSold}</p>
              <p className="text-xs text-muted-foreground">properties sold</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
            <Clock className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">{agentData.avgDaysToSell} days</p>
              <p className="text-xs text-muted-foreground">avg. to sell</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 bg-secondary rounded-xl">
            <TrendingUp className="w-4 h-4 text-accent flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-foreground">{agentData.successRate}%</p>
              <p className="text-xs text-muted-foreground">success rate</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mt-3 text-center">
          Avg. response time: {agentData.responseTime}
        </p>
      </div>
    </motion.div>
  );
}
