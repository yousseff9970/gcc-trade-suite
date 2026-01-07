import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Crosshair, 
  Clock, 
  Droplets, 
  Flame, 
  Shield, 
  ExternalLink,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Eye
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface NewPair {
  id: string;
  name: string;
  symbol: string;
  chain: "ETH" | "SOL" | "BSC";
  launchedAt: Date;
  liquidity: number;
  hypeScore: number;
  priceChange: number;
  isScam: boolean;
  holders: number;
}

const mockNewPairs: NewPair[] = [
  {
    id: "1",
    name: "MoonShot Token",
    symbol: "MOON",
    chain: "ETH",
    launchedAt: new Date(Date.now() - 2 * 60 * 1000),
    liquidity: 125000,
    hypeScore: 87,
    priceChange: 234.5,
    isScam: false,
    holders: 342,
  },
  {
    id: "2",
    name: "SafeGem Pro",
    symbol: "SGEM",
    chain: "BSC",
    launchedAt: new Date(Date.now() - 5 * 60 * 1000),
    liquidity: 8500,
    hypeScore: 23,
    priceChange: -45.2,
    isScam: true,
    holders: 45,
  },
  {
    id: "3",
    name: "Solana Doge",
    symbol: "SOLDOGE",
    chain: "SOL",
    launchedAt: new Date(Date.now() - 8 * 60 * 1000),
    liquidity: 450000,
    hypeScore: 92,
    priceChange: 567.8,
    isScam: false,
    holders: 1234,
  },
  {
    id: "4",
    name: "Pepe Inu",
    symbol: "PEPINU",
    chain: "ETH",
    launchedAt: new Date(Date.now() - 15 * 60 * 1000),
    liquidity: 3200,
    hypeScore: 15,
    priceChange: 12.3,
    isScam: true,
    holders: 28,
  },
  {
    id: "5",
    name: "AI Revolution",
    symbol: "AIREV",
    chain: "SOL",
    launchedAt: new Date(Date.now() - 22 * 60 * 1000),
    liquidity: 890000,
    hypeScore: 78,
    priceChange: 123.4,
    isScam: false,
    holders: 876,
  },
];

const chainColors: Record<string, string> = {
  ETH: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  SOL: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  BSC: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const getTimeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 60) return `${mins} mins ago`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ago`;
};

const getHypeColor = (score: number) => {
  if (score >= 80) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
};

const MarketSniper = () => {
  const [scamFilter, setScamFilter] = useState(true);
  const [pairs] = useState<NewPair[]>(mockNewPairs);
  const navigate = useNavigate();

  const filteredPairs = scamFilter
    ? pairs.filter((p) => !p.isScam)
    : pairs;

  const formatLiquidity = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  return (
    <DashboardLayout>
      {/* Cyberpunk Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
            <Crosshair className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground font-mono tracking-tight">
              MARKET_SNIPER<span className="text-green-400 animate-pulse">_</span>
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              // Real-time new pair detection
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards - Cyberpunk Style */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "New Pairs (24h)", value: "147", icon: Flame, color: "text-orange-400" },
          { label: "Avg Liquidity", value: "$245K", icon: Droplets, color: "text-blue-400" },
          { label: "Gems Found", value: "12", icon: TrendingUp, color: "text-green-400" },
          { label: "Scams Detected", value: "89", icon: Shield, color: "text-red-400" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="glass glass-border border-green-500/20 hover:border-green-500/40 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <span className="text-xs text-muted-foreground font-mono uppercase">
                    {stat.label}
                  </span>
                </div>
                <p className={`text-2xl font-bold font-mono mt-2 ${stat.color}`}>
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between mb-4"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-400" />
            <Label htmlFor="scam-filter" className="text-sm font-mono">
              Scam Filter
            </Label>
            <Switch
              id="scam-filter"
              checked={scamFilter}
              onCheckedChange={setScamFilter}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
        <Button
          variant="outline"
          className="border-green-500/30 text-green-400 hover:bg-green-500/10 font-mono"
          onClick={() => navigate("/gem-finder")}
        >
          <Crosshair className="h-4 w-4 mr-2" />
          GEM_FINDER
        </Button>
      </motion.div>

      {/* Live Pairs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="glass glass-border border-green-500/20 overflow-hidden">
          <CardHeader className="pb-0">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <CardTitle className="font-mono text-lg">LIVE_NEW_PAIRS</CardTitle>
            </div>
            <CardDescription className="font-mono text-xs">
              // Streaming newly launched tokens
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 mt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-green-500/20 hover:bg-transparent">
                    <TableHead className="font-mono text-xs text-green-400">TOKEN</TableHead>
                    <TableHead className="font-mono text-xs text-green-400">CHAIN</TableHead>
                    <TableHead className="font-mono text-xs text-green-400">LAUNCHED</TableHead>
                    <TableHead className="font-mono text-xs text-green-400">LIQUIDITY</TableHead>
                    <TableHead className="font-mono text-xs text-green-400">HYPE_SCORE</TableHead>
                    <TableHead className="font-mono text-xs text-green-400">CHANGE</TableHead>
                    <TableHead className="font-mono text-xs text-green-400 text-right">ACTION</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <AnimatePresence>
                    {filteredPairs.map((pair, index) => (
                      <motion.tr
                        key={pair.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: pair.isScam && !scamFilter ? 0.4 : 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className={`border-green-500/10 hover:bg-green-500/5 cursor-pointer ${
                          pair.isScam && !scamFilter ? "opacity-40" : ""
                        }`}
                        onClick={() => navigate(`/token/${pair.id}`)}
                      >
                        <TableCell className="font-mono">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 flex items-center justify-center">
                              <span className="text-xs font-bold text-green-400">
                                {pair.symbol.slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-sm">{pair.name}</p>
                              <p className="text-xs text-muted-foreground">${pair.symbol}</p>
                            </div>
                            {pair.isScam && (
                              <AlertTriangle className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={chainColors[pair.chain]}>
                            {pair.chain}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {getTimeAgo(pair.launchedAt)}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          <div className="flex items-center gap-1">
                            <Droplets className="h-3 w-3 text-blue-400" />
                            {formatLiquidity(pair.liquidity)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={pair.hypeScore}
                              className="w-16 h-1.5"
                            />
                            <span className={`font-mono text-sm font-bold ${getHypeColor(pair.hypeScore)}`}>
                              {pair.hypeScore}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={`flex items-center gap-1 font-mono text-sm ${
                            pair.priceChange >= 0 ? "text-green-400" : "text-red-400"
                          }`}>
                            {pair.priceChange >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {pair.priceChange >= 0 ? "+" : ""}{pair.priceChange.toFixed(1)}%
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </DashboardLayout>
  );
};

export default MarketSniper;
