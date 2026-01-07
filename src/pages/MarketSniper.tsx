import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Crosshair, 
  Clock, 
  Droplets, 
  Flame, 
  Shield, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Eye,
  Zap,
  ShoppingCart,
  ExternalLink
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
import QuickTradeModal from "@/components/trade/QuickTradeModal";

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
  price: number;
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
    price: 0.00234,
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
    price: 0.000012,
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
    price: 0.0089,
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
    price: 0.0000034,
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
    price: 0.0456,
  },
  {
    id: "6",
    name: "NeuralAI",
    symbol: "NRAI",
    chain: "SOL",
    launchedAt: new Date(Date.now() - 30 * 60 * 1000),
    liquidity: 1250000,
    hypeScore: 95,
    priceChange: 892.3,
    isScam: false,
    holders: 2341,
    price: 0.123,
  },
];

const chainColors: Record<string, string> = {
  ETH: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  SOL: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  BSC: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const getTimeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ago`;
};

const getHypeColor = (score: number) => {
  if (score >= 80) return "text-[#00ff9d]";
  if (score >= 50) return "text-yellow-400";
  return "text-[#ff4d4d]";
};

const MarketSniper = () => {
  const [scamFilter, setScamFilter] = useState(true);
  const [pairs] = useState<NewPair[]>(mockNewPairs);
  const [quickTradeToken, setQuickTradeToken] = useState<NewPair | null>(null);
  const navigate = useNavigate();

  const filteredPairs = scamFilter
    ? pairs.filter((p) => !p.isScam)
    : pairs;

  const formatLiquidity = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
    return `$${value}`;
  };

  const handleRowClick = (pair: NewPair) => {
    navigate(`/trade?token=${pair.id}`);
  };

  const handleQuickBuy = (e: React.MouseEvent, pair: NewPair) => {
    e.stopPropagation();
    setQuickTradeToken(pair);
  };

  return (
    <DashboardLayout>
      <div style={{ background: '#0a0a0a' }} className="min-h-screen -m-4 md:-m-6 p-4 md:p-6">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#00ff9d] to-emerald-600 flex items-center justify-center shadow-lg shadow-[#00ff9d]/25">
              <Crosshair className="h-6 w-6 text-black" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-tight">
                MARKET_SNIPER<span className="text-[#00ff9d] animate-pulse">_</span>
              </h1>
              <p className="text-muted-foreground font-mono text-sm">
                // Real-time new pair detection • Click any row to trade
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "New Pairs (24h)", value: "147", icon: Flame, color: "text-orange-400" },
            { label: "Avg Liquidity", value: "$245K", icon: Droplets, color: "text-blue-400" },
            { label: "Gems Found", value: "12", icon: TrendingUp, color: "text-[#00ff9d]" },
            { label: "Scams Detected", value: "89", icon: Shield, color: "text-[#ff4d4d]" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-[#0d0d0d] border-[#1a1a1a] hover:border-[#00ff9d]/30 transition-colors">
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
              <Shield className="h-4 w-4 text-[#00ff9d]" />
              <Label htmlFor="scam-filter" className="text-sm font-mono text-white">
                Scam Filter
              </Label>
              <Switch
                id="scam-filter"
                checked={scamFilter}
                onCheckedChange={setScamFilter}
                className="data-[state=checked]:bg-[#00ff9d]"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-[#00ff9d]/30 text-[#00ff9d] hover:bg-[#00ff9d]/10 font-mono"
              onClick={() => navigate("/gem-finder")}
            >
              <Crosshair className="h-4 w-4 mr-2" />
              GEM_FINDER
            </Button>
            <Button
              className="bg-[#00ff9d] text-black hover:bg-[#00ff9d]/90 font-mono"
              onClick={() => navigate("/trade")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              OPEN_TERMINAL
            </Button>
          </div>
        </motion.div>

        {/* Live Pairs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-[#0d0d0d] border-[#1a1a1a] overflow-hidden">
            <CardHeader className="pb-0 border-b border-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-[#00ff9d] animate-pulse" />
                <CardTitle className="font-mono text-lg text-white">LIVE_NEW_PAIRS</CardTitle>
              </div>
              <CardDescription className="font-mono text-xs text-muted-foreground">
                // Click any row to open full trading terminal
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#1a1a1a] hover:bg-transparent">
                      <TableHead className="font-mono text-xs text-[#00ff9d]">TOKEN</TableHead>
                      <TableHead className="font-mono text-xs text-[#00ff9d]">CHAIN</TableHead>
                      <TableHead className="font-mono text-xs text-[#00ff9d]">LAUNCHED</TableHead>
                      <TableHead className="font-mono text-xs text-[#00ff9d]">LIQUIDITY</TableHead>
                      <TableHead className="font-mono text-xs text-[#00ff9d]">HYPE_SCORE</TableHead>
                      <TableHead className="font-mono text-xs text-[#00ff9d]">CHANGE</TableHead>
                      <TableHead className="font-mono text-xs text-[#00ff9d] text-right">ACTIONS</TableHead>
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
                          className={`border-[#1a1a1a] hover:bg-[#00ff9d]/5 cursor-pointer group ${
                            pair.isScam && !scamFilter ? "opacity-40" : ""
                          }`}
                          onClick={() => handleRowClick(pair)}
                        >
                          <TableCell className="font-mono">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00ff9d]/20 to-emerald-600/20 border border-[#00ff9d]/30 flex items-center justify-center">
                                <span className="text-xs font-bold text-[#00ff9d]">
                                  {pair.symbol.slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-sm text-white">{pair.name}</p>
                                <p className="text-xs text-muted-foreground">${pair.symbol}</p>
                              </div>
                              {pair.isScam && (
                                <AlertTriangle className="h-4 w-4 text-[#ff4d4d]" />
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
                            <div className="flex items-center gap-1 text-blue-400">
                              <Droplets className="h-3 w-3" />
                              {formatLiquidity(pair.liquidity)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    pair.hypeScore >= 80 ? 'bg-[#00ff9d]' :
                                    pair.hypeScore >= 50 ? 'bg-yellow-400' : 'bg-[#ff4d4d]'
                                  }`}
                                  style={{ width: `${pair.hypeScore}%` }}
                                />
                              </div>
                              <span className={`font-mono text-sm font-bold ${getHypeColor(pair.hypeScore)}`}>
                                {pair.hypeScore}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`flex items-center gap-1 font-mono text-sm ${
                              pair.priceChange >= 0 ? "text-[#00ff9d]" : "text-[#ff4d4d]"
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
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-[#00ff9d] border-[#00ff9d]/30 hover:bg-[#00ff9d]/10 font-mono"
                                onClick={(e) => handleQuickBuy(e, pair)}
                              >
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                QUICK_BUY
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#00ff9d] hover:text-[#00ff9d] hover:bg-[#00ff9d]/10"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
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

        {/* Quick Trade Modal */}
        {quickTradeToken && (
          <QuickTradeModal
            open={!!quickTradeToken}
            onOpenChange={(open) => !open && setQuickTradeToken(null)}
            token={{
              name: quickTradeToken.name,
              symbol: quickTradeToken.symbol,
              price: quickTradeToken.price,
              chain: quickTradeToken.chain,
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default MarketSniper;
