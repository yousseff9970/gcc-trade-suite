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
  ExternalLink,
  Filter,
  RefreshCw,
  Volume2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  volume: number;
  buys: number;
  sells: number;
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
    volume: 89000,
    buys: 156,
    sells: 23,
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
    volume: 3200,
    buys: 12,
    sells: 34,
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
    volume: 567000,
    buys: 892,
    sells: 123,
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
    volume: 1200,
    buys: 8,
    sells: 15,
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
    volume: 234000,
    buys: 456,
    sells: 89,
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
    volume: 890000,
    buys: 1234,
    sells: 156,
  },
];

const chainColors: Record<string, string> = {
  ETH: "bg-blue-500/20 text-blue-500 border-blue-500/30",
  SOL: "bg-purple-500/20 text-purple-500 border-purple-500/30",
  BSC: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30",
};

const getTimeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ago`;
};

const getHypeColor = (score: number) => {
  if (score >= 80) return "text-success";
  if (score >= 50) return "text-warning";
  return "text-destructive";
};

const MarketSniper = () => {
  const [scamFilter, setScamFilter] = useState(true);
  const [pairs] = useState<NewPair[]>(mockNewPairs);
  const [quickTradeToken, setQuickTradeToken] = useState<NewPair | null>(null);
  const [chainFilter, setChainFilter] = useState<string>("all");
  const [minLiquidity, setMinLiquidity] = useState("");
  const [soundAlerts, setSoundAlerts] = useState(false);
  const navigate = useNavigate();

  const filteredPairs = pairs
    .filter((p) => !scamFilter || !p.isScam)
    .filter((p) => chainFilter === "all" || p.chain === chainFilter)
    .filter((p) => !minLiquidity || p.liquidity >= parseInt(minLiquidity) * 1000);

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
      <div className="min-h-screen">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-lg shadow-primary/25">
              <Crosshair className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
                MARKET_SNIPER<span className="text-primary animate-pulse">_</span>
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
            { label: "New Pairs (24h)", value: "147", icon: Flame, color: "text-orange-500" },
            { label: "Avg Liquidity", value: "$245K", icon: Droplets, color: "text-blue-500" },
            { label: "Gems Found", value: "12", icon: TrendingUp, color: "text-success" },
            { label: "Scams Detected", value: "89", icon: Shield, color: "text-destructive" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="hover:border-primary/30 transition-colors">
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

        {/* Advanced Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4">
                {/* First row on mobile */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {/* Scam Filter */}
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <Label htmlFor="scam-filter" className="text-xs sm:text-sm font-mono whitespace-nowrap">
                      Scam Filter
                    </Label>
                    <Switch
                      id="scam-filter"
                      checked={scamFilter}
                      onCheckedChange={setScamFilter}
                    />
                  </div>

                  {/* Sound Alerts */}
                  <div className="flex items-center gap-2 sm:hidden">
                    <Volume2 className="h-4 w-4 text-muted-foreground" />
                    <Switch
                      id="sound-mobile"
                      checked={soundAlerts}
                      onCheckedChange={setSoundAlerts}
                    />
                  </div>
                </div>

                {/* Second row on mobile */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {/* Chain Filter */}
                  <Select value={chainFilter} onValueChange={setChainFilter}>
                    <SelectTrigger className="w-[100px] sm:w-[120px] h-8 font-mono text-xs">
                      <SelectValue placeholder="Chain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Chains</SelectItem>
                      <SelectItem value="SOL">Solana</SelectItem>
                      <SelectItem value="ETH">Ethereum</SelectItem>
                      <SelectItem value="BSC">BSC</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Min Liquidity */}
                  <Input
                    type="number"
                    placeholder="Min Liq (K)"
                    value={minLiquidity}
                    onChange={(e) => setMinLiquidity(e.target.value)}
                    className="w-[90px] sm:w-[100px] h-8 font-mono text-xs"
                  />

                  {/* Refresh - mobile */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 sm:hidden"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>

                {/* Desktop-only items */}
                <div className="hidden sm:flex items-center gap-2">
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="sound" className="text-sm font-mono">
                    Sound
                  </Label>
                  <Switch
                    id="sound"
                    checked={soundAlerts}
                    onCheckedChange={setSoundAlerts}
                  />
                </div>

                <div className="hidden sm:block flex-1" />

                <div className="hidden sm:flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-mono"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>

                  <Button
                    variant="outline"
                    className="font-mono"
                    onClick={() => navigate("/gem-finder")}
                  >
                    <Crosshair className="h-4 w-4 mr-2" />
                    GEM_FINDER
                  </Button>
                  <Button
                    className="font-mono"
                    onClick={() => navigate("/trade")}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    TERMINAL
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Live Pairs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="overflow-hidden">
            <CardHeader className="pb-0 border-b">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <CardTitle className="font-mono text-lg">LIVE_NEW_PAIRS</CardTitle>
                <Badge variant="outline" className="ml-auto font-mono text-xs">
                  {filteredPairs.length} results
                </Badge>
              </div>
              <CardDescription className="font-mono text-xs">
                // Click any row to open full trading terminal
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap">TOKEN</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden sm:table-cell">CHAIN</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden md:table-cell">LAUNCHED</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap">LIQ</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden lg:table-cell">VOLUME</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden lg:table-cell">B/S</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap hidden sm:table-cell">HYPE</TableHead>
                      <TableHead className="font-mono text-xs text-primary whitespace-nowrap">CHG</TableHead>
                      <TableHead className="font-mono text-xs text-primary text-right whitespace-nowrap">ACT</TableHead>
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
                          className={`border-b hover:bg-muted/50 cursor-pointer group ${
                            pair.isScam && !scamFilter ? "opacity-40" : ""
                          }`}
                          onClick={() => handleRowClick(pair)}
                        >
                          <TableCell className="font-mono">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 flex items-center justify-center">
                                <span className="text-xs font-bold text-primary">
                                  {pair.symbol.slice(0, 2)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-sm">{pair.name}</p>
                                <p className="text-xs text-muted-foreground">${pair.symbol}</p>
                              </div>
                              {pair.isScam && (
                                <AlertTriangle className="h-4 w-4 text-destructive" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge variant="outline" className={`${chainColors[pair.chain]} text-[10px]`}>
                              {pair.chain}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-mono text-sm hidden md:table-cell">
                            <div className="flex items-center gap-1 text-muted-foreground whitespace-nowrap">
                              <Clock className="h-3 w-3" />
                              {getTimeAgo(pair.launchedAt)}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-xs sm:text-sm">
                            <div className="flex items-center gap-1 text-blue-500 whitespace-nowrap">
                              <Droplets className="h-3 w-3 hidden sm:block" />
                              {formatLiquidity(pair.liquidity)}
                            </div>
                          </TableCell>
                          <TableCell className="font-mono text-sm text-purple-500 hidden lg:table-cell whitespace-nowrap">
                            {formatLiquidity(pair.volume)}
                          </TableCell>
                          <TableCell className="font-mono text-sm hidden lg:table-cell whitespace-nowrap">
                            <span className="text-success">{pair.buys}</span>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-destructive">{pair.sells}</span>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${
                                    pair.hypeScore >= 80 ? 'bg-success' :
                                    pair.hypeScore >= 50 ? 'bg-warning' : 'bg-destructive'
                                  }`}
                                  style={{ width: `${pair.hypeScore}%` }}
                                />
                              </div>
                              <span className={`font-mono text-xs font-bold ${getHypeColor(pair.hypeScore)}`}>
                                {pair.hypeScore}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`flex items-center gap-1 font-mono text-xs sm:text-sm whitespace-nowrap ${
                              pair.priceChange >= 0 ? "text-success" : "text-destructive"
                            }`}>
                              {pair.priceChange >= 0 ? (
                                <TrendingUp className="h-3 w-3" />
                              ) : (
                                <TrendingDown className="h-3 w-3" />
                              )}
                              {pair.priceChange >= 0 ? "+" : ""}{pair.priceChange.toFixed(0)}%
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="hidden sm:flex opacity-0 group-hover:opacity-100 transition-opacity font-mono text-xs h-7 px-2"
                                onClick={(e) => handleQuickBuy(e, pair)}
                              >
                                <ShoppingCart className="h-3 w-3 mr-1" />
                                BUY
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary hover:bg-primary/10 h-7 w-7"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleQuickBuy(e, pair);
                                }}
                              >
                                <Zap className="h-4 w-4" />
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
