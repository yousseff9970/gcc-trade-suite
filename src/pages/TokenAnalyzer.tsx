import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Brain,
  Wallet,
  ExternalLink,
  Copy,
  Share2,
  Star,
  Clock,
  Users,
  Droplets,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "sonner";

interface WhaleTransaction {
  id: string;
  type: "buy" | "sell";
  amount: number;
  value: number;
  wallet: string;
  timestamp: Date;
}

const mockToken = {
  id: "1",
  name: "MoonShot Token",
  symbol: "MOON",
  chain: "ETH",
  price: 0.00234,
  priceChange24h: 234.5,
  marketCap: 2340000,
  volume24h: 890000,
  liquidity: 450000,
  holders: 3456,
  contractAddress: "0x1234...abcd",
  launchedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
};

const mockSentiment = {
  overall: "bullish" as const,
  score: 78,
  socialMentions: 1234,
  twitterSentiment: 82,
  telegramActivity: 156,
  signals: [
    { type: "positive", text: "Strong community engagement on Twitter" },
    { type: "positive", text: "Increasing holder count over 24h" },
    { type: "warning", text: "Concentrated whale holdings (15%)" },
    { type: "positive", text: "Dev wallet locked for 6 months" },
  ],
};

const mockWhaleTransactions: WhaleTransaction[] = [
  {
    id: "1",
    type: "buy",
    amount: 1500000,
    value: 35000,
    wallet: "0xabc...123",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
  },
  {
    id: "2",
    type: "sell",
    amount: 800000,
    value: 18700,
    wallet: "0xdef...456",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "3",
    type: "buy",
    amount: 2200000,
    value: 51500,
    wallet: "0xghi...789",
    timestamp: new Date(Date.now() - 32 * 60 * 1000),
  },
  {
    id: "4",
    type: "buy",
    amount: 950000,
    value: 22200,
    wallet: "0xjkl...012",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "5",
    type: "sell",
    amount: 3100000,
    value: 72500,
    wallet: "0xmno...345",
    timestamp: new Date(Date.now() - 58 * 60 * 1000),
  },
];

const formatNumber = (value: number) => {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(1)}K`;
  return `$${value.toFixed(2)}`;
};

const formatTokenAmount = (value: number) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
};

const getTimeAgo = (date: Date) => {
  const mins = Math.floor((Date.now() - date.getTime()) / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ago`;
};

const TokenAnalyzer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  const handleCopyContract = () => {
    navigator.clipboard.writeText(mockToken.contractAddress);
    toast.success("Contract address copied!");
  };

  const handleWatchlist = () => {
    setIsWatchlisted(!isWatchlisted);
    toast.success(isWatchlisted ? "Removed from watchlist" : "Added to watchlist");
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="mb-4 gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-green-500/30 to-emerald-600/30 border border-green-500/40 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-400 font-mono">
                {mockToken.symbol.slice(0, 2)}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold font-mono">{mockToken.name}</h1>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {mockToken.chain}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-mono text-muted-foreground">
                  ${mockToken.symbol}
                </span>
                <button
                  onClick={handleCopyContract}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="font-mono">{mockToken.contractAddress}</span>
                  <Copy className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleWatchlist}
              className={`gap-2 ${isWatchlisted ? "border-yellow-500 text-yellow-500" : ""}`}
            >
              <Star className={`h-4 w-4 ${isWatchlisted ? "fill-current" : ""}`} />
              {isWatchlisted ? "Watchlisted" : "Watchlist"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button size="sm" className="gap-2 bg-green-500 hover:bg-green-600">
              <ExternalLink className="h-4 w-4" />
              Trade
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Price Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <Card className="glass glass-border border-green-500/20">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-mono mb-1">PRICE</p>
            <p className="text-xl font-bold font-mono">${mockToken.price.toFixed(6)}</p>
            <div className="flex items-center gap-1 text-green-400 text-sm">
              <TrendingUp className="h-3 w-3" />
              +{mockToken.priceChange24h}%
            </div>
          </CardContent>
        </Card>
        <Card className="glass glass-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-mono mb-1">MARKET CAP</p>
            <p className="text-xl font-bold font-mono">{formatNumber(mockToken.marketCap)}</p>
          </CardContent>
        </Card>
        <Card className="glass glass-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-mono mb-1">VOLUME 24H</p>
            <p className="text-xl font-bold font-mono text-purple-400">{formatNumber(mockToken.volume24h)}</p>
          </CardContent>
        </Card>
        <Card className="glass glass-border">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground font-mono mb-1">HOLDERS</p>
            <p className="text-xl font-bold font-mono">{mockToken.holders.toLocaleString()}</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass glass-border border-green-500/20">
              <CardContent className="p-6">
                <div className="h-[300px] flex items-center justify-center bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-lg border border-green-500/20">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-2" />
                    <p className="text-muted-foreground font-mono text-sm">
                      // Price chart coming soon
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Whale Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass glass-border border-green-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                  <Wallet className="h-5 w-5 text-blue-400" />
                  WHALE_ACTIVITY
                </CardTitle>
                <CardDescription className="font-mono text-xs">
                  // Last 5 large transactions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockWhaleTransactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      tx.type === "buy"
                        ? "bg-green-500/5 border-green-500/20"
                        : "bg-red-500/5 border-red-500/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          tx.type === "buy" ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        {tx.type === "buy" ? (
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-mono text-sm font-medium">
                          {tx.type === "buy" ? "BUY" : "SELL"}{" "}
                          {formatTokenAmount(tx.amount)} {mockToken.symbol}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {tx.wallet}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-bold">
                        {formatNumber(tx.value)}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                        <Clock className="h-3 w-3" />
                        {getTimeAgo(tx.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Sentiment Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass glass-border border-purple-500/30 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
                <CardTitle className="flex items-center gap-2 font-mono">
                  <Brain className="h-5 w-5 text-purple-400" />
                  AI_SENTIMENT
                </CardTitle>
                <CardDescription className="font-mono text-xs">
                  // Social data analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                {/* Overall Sentiment */}
                <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-lg px-4 py-1 mb-2">
                    {mockSentiment.overall.toUpperCase()}
                  </Badge>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-3xl font-bold font-mono text-green-400">
                      {mockSentiment.score}
                    </span>
                    <span className="text-muted-foreground font-mono text-sm">/ 100</span>
                  </div>
                </div>

                {/* Social Stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-lg bg-muted/30 text-center">
                    <p className="text-lg font-bold font-mono">
                      {mockSentiment.socialMentions.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Mentions</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30 text-center">
                    <p className="text-lg font-bold font-mono text-blue-400">
                      {mockSentiment.twitterSentiment}%
                    </p>
                    <p className="text-xs text-muted-foreground">Twitter</p>
                  </div>
                </div>

                {/* Signals */}
                <div className="space-y-2">
                  <p className="text-xs font-mono text-muted-foreground mb-2">
                    SIGNALS:
                  </p>
                  {mockSentiment.signals.map((signal, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 p-2 rounded text-xs ${
                        signal.type === "positive"
                          ? "bg-green-500/10 text-green-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full mt-1.5 ${
                          signal.type === "positive" ? "bg-green-400" : "bg-yellow-400"
                        }`}
                      />
                      {signal.text}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Token Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass glass-border">
              <CardHeader>
                <CardTitle className="text-sm font-mono">TOKEN_INFO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Liquidity</span>
                  <span className="font-mono text-sm font-bold text-blue-400">
                    {formatNumber(mockToken.liquidity)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Launched</span>
                  <span className="font-mono text-sm">
                    {getTimeAgo(mockToken.launchedAt)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Chain</span>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400">
                    {mockToken.chain}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TokenAnalyzer;
