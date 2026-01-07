import React, { useState } from "react";
import { motion } from "framer-motion";
import { Fuel, TrendingUp, TrendingDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface GasPrice {
  network: string;
  price: number;
  unit: string;
  trend: "up" | "down" | "stable";
  change: number;
}

const mockGasPrices: GasPrice[] = [
  { network: "ETH", price: 23, unit: "Gwei", trend: "down", change: -5.2 },
  { network: "SOL", price: 0.00025, unit: "SOL", trend: "up", change: 2.1 },
  { network: "BNB", price: 5, unit: "Gwei", trend: "stable", change: 0.3 },
];

const GasTracker = () => {
  const [gasPrices] = useState<GasPrice[]>(mockGasPrices);

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-red-500";
      case "down":
        return "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3" />;
      case "down":
        return <TrendingDown className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground font-mono"
        >
          <Fuel className="h-4 w-4 text-primary" />
          <span className="hidden sm:inline text-xs">
            {gasPrices[0].price} {gasPrices[0].unit}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0 glass glass-border" align="end">
        <div className="p-3 border-b border-border/50">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <Fuel className="h-4 w-4 text-primary" />
            Gas Tracker
          </h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Current network fees
          </p>
        </div>
        <div className="p-2">
          {gasPrices.map((gas, index) => (
            <motion.div
              key={gas.network}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">
                    {gas.network}
                  </span>
                </div>
                <span className="text-sm font-medium">{gas.network}</span>
              </div>
              <div className="text-right">
                <div className="text-sm font-mono">
                  {gas.price} {gas.unit}
                </div>
                <div className={`flex items-center gap-1 text-xs ${getTrendColor(gas.trend)}`}>
                  {getTrendIcon(gas.trend)}
                  {gas.change > 0 ? "+" : ""}{gas.change}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GasTracker;
