import React, { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  Sparkles,
  X,
  Heart,
  Filter,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Users,
  TrendingUp,
  Clock,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "sonner";

interface GemToken {
  id: string;
  name: string;
  symbol: string;
  chain: string;
  marketCap: number;
  volume24h: number;
  liquidity: number;
  holders: number;
  hypeScore: number;
  launchedAt: Date;
  description: string;
}

const mockGems: GemToken[] = [
  {
    id: "1",
    name: "Neural Protocol",
    symbol: "NEUR",
    chain: "SOL",
    marketCap: 320000,
    volume24h: 185000,
    liquidity: 145000,
    holders: 567,
    hypeScore: 89,
    launchedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    description: "AI-powered DeFi protocol with automated yield optimization",
  },
  {
    id: "2",
    name: "PixelVerse",
    symbol: "PIXEL",
    chain: "ETH",
    marketCap: 180000,
    volume24h: 220000,
    liquidity: 95000,
    holders: 342,
    hypeScore: 76,
    launchedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    description: "Gaming metaverse with NFT integration and play-to-earn mechanics",
  },
  {
    id: "3",
    name: "GreenChain",
    symbol: "GREEN",
    chain: "BSC",
    marketCap: 450000,
    volume24h: 310000,
    liquidity: 280000,
    holders: 1234,
    hypeScore: 92,
    launchedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    description: "Carbon-neutral blockchain solutions for sustainable DeFi",
  },
  {
    id: "4",
    name: "QuantumSwap",
    symbol: "QSWAP",
    chain: "SOL",
    marketCap: 280000,
    volume24h: 175000,
    liquidity: 120000,
    holders: 456,
    hypeScore: 71,
    launchedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    description: "Cross-chain DEX aggregator with MEV protection",
  },
];

const chainColors: Record<string, string> = {
  ETH: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  SOL: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  BSC: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const formatNumber = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value}`;
};

const GemFinder = () => {
  const [gems, setGems] = useState<GemToken[]>(mockGems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [discarded, setDiscarded] = useState<string[]>([]);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  
  // Filters
  const [maxMarketCap, setMaxMarketCap] = useState([500000]);
  const [minVolume, setMinVolume] = useState([100000]);
  const [showFilters, setShowFilters] = useState(false);

  const currentGem = gems[currentIndex];

  const handleSwipe = (dir: "left" | "right") => {
    setDirection(dir);
    
    if (dir === "right") {
      setWatchlist([...watchlist, currentGem.id]);
      toast.success(`Added ${currentGem.symbol} to watchlist!`, {
        icon: <Heart className="h-4 w-4 text-green-400" />,
      });
    } else {
      setDiscarded([...discarded, currentGem.id]);
    }

    setTimeout(() => {
      setDirection(null);
      if (currentIndex < gems.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        toast.info("You've reviewed all gems! Resetting...");
        setCurrentIndex(0);
      }
    }, 200);
  };

  const handleDrag = (event: any, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      handleSwipe(info.offset.x > 0 ? "right" : "left");
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setWatchlist([]);
    setDiscarded([]);
    toast.success("Reset complete!");
  };

  const getHypeColor = (score: number) => {
    if (score >= 80) return "text-green-400 bg-green-400";
    if (score >= 50) return "text-yellow-400 bg-yellow-400";
    return "text-red-400 bg-red-400";
  };

  if (!currentGem) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Sparkles className="h-16 w-16 text-green-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">All Gems Reviewed!</h2>
          <p className="text-muted-foreground mb-4">
            You've added {watchlist.length} tokens to your watchlist.
          </p>
          <Button onClick={handleReset} className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Start Over
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight">
                GEM_FINDER<span className="text-pink-400 animate-pulse">_</span>
              </h1>
              <p className="text-muted-foreground font-mono text-sm">
                // Swipe right to watchlist, left to discard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2 border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            >
              <Filter className="h-4 w-4" />
              Filters
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="flex gap-4 mb-6 font-mono text-sm">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-green-400" />
          <span className="text-muted-foreground">Watchlist:</span>
          <span className="text-green-400 font-bold">{watchlist.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <X className="h-4 w-4 text-red-400" />
          <span className="text-muted-foreground">Discarded:</span>
          <span className="text-red-400 font-bold">{discarded.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Remaining:</span>
          <span className="font-bold">{gems.length - currentIndex}</span>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <Card className="glass glass-border border-purple-500/20">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="font-mono text-xs text-purple-400">
                      MAX_MARKET_CAP: {formatNumber(maxMarketCap[0])}
                    </Label>
                    <Slider
                      value={maxMarketCap}
                      onValueChange={setMaxMarketCap}
                      max={1000000}
                      min={50000}
                      step={10000}
                      className="[&_[role=slider]]:bg-purple-500"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="font-mono text-xs text-purple-400">
                      MIN_VOLUME_24H: {formatNumber(minVolume[0])}
                    </Label>
                    <Slider
                      value={minVolume}
                      onValueChange={setMinVolume}
                      max={500000}
                      min={10000}
                      step={10000}
                      className="[&_[role=slider]]:bg-purple-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tinder Card */}
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-md">
          {/* Card Stack Visual */}
          <div className="absolute inset-0 transform translate-x-2 translate-y-2 opacity-20">
            <Card className="h-full glass glass-border border-purple-500/10" />
          </div>
          <div className="absolute inset-0 transform translate-x-1 translate-y-1 opacity-40">
            <Card className="h-full glass glass-border border-purple-500/20" />
          </div>

          {/* Main Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentGem.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDrag}
              animate={{
                x: direction === "left" ? -500 : direction === "right" ? 500 : 0,
                rotate: direction === "left" ? -30 : direction === "right" ? 30 : 0,
                opacity: direction ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="cursor-grab active:cursor-grabbing"
            >
              <Card className="glass glass-border border-purple-500/30 overflow-hidden">
                <CardHeader className="pb-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 border border-purple-500/40 flex items-center justify-center">
                        <span className="text-lg font-bold text-purple-300">
                          {currentGem.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="font-mono">{currentGem.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-muted-foreground">
                            ${currentGem.symbol}
                          </span>
                          <Badge variant="outline" className={chainColors[currentGem.chain]}>
                            {currentGem.chain}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold font-mono ${getHypeColor(currentGem.hypeScore).split(" ")[0]}`}>
                        {currentGem.hypeScore}
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">HYPE</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {currentGem.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <TrendingUp className="h-3 w-3" />
                        Market Cap
                      </div>
                      <p className="font-mono font-bold text-green-400">
                        {formatNumber(currentGem.marketCap)}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Droplets className="h-3 w-3" />
                        Liquidity
                      </div>
                      <p className="font-mono font-bold text-blue-400">
                        {formatNumber(currentGem.liquidity)}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Users className="h-3 w-3" />
                        Holders
                      </div>
                      <p className="font-mono font-bold">{currentGem.holders}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                        <Clock className="h-3 w-3" />
                        Volume 24h
                      </div>
                      <p className="font-mono font-bold text-purple-400">
                        {formatNumber(currentGem.volume24h)}
                      </p>
                    </div>
                  </div>

                  {/* Hype Score Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-mono">HYPE_SCORE</span>
                      <span className={`font-mono font-bold ${getHypeColor(currentGem.hypeScore).split(" ")[0]}`}>
                        {currentGem.hypeScore}/100
                      </span>
                    </div>
                    <Progress
                      value={currentGem.hypeScore}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <Button
              size="lg"
              variant="outline"
              className="h-16 w-16 rounded-full border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
              onClick={() => handleSwipe("left")}
            >
              <X className="h-8 w-8" />
            </Button>
            <Button
              size="lg"
              className="h-16 w-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg shadow-green-500/30"
              onClick={() => handleSwipe("right")}
            >
              <Heart className="h-8 w-8" />
            </Button>
          </div>

          {/* Swipe Hints */}
          <div className="flex justify-between mt-4 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-1">
              <ChevronLeft className="h-4 w-4" />
              Swipe left to discard
            </div>
            <div className="flex items-center gap-1">
              Swipe right to watchlist
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GemFinder;
