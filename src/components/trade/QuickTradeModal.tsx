import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Zap, 
  ShoppingCart,
  X,
  ArrowUpDown,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface QuickTradeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: {
    name: string;
    symbol: string;
    price: number;
    chain: string;
  };
}

const QuickTradeModal = ({ open, onOpenChange, token }: QuickTradeModalProps) => {
  const [amount, setAmount] = useState("0.5");
  const receiveAmount = parseFloat(amount || "0") / token.price;

  const formatNumber = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
    return value.toFixed(2);
  };

  const presetAmounts = ["0.1", "0.5", "1", "2"];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0d0d0d] border-[#1a1a1a] max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-mono text-[#00ff9d] flex items-center gap-2">
            <Zap className="h-5 w-5" />
            QUICK_BUY
          </DialogTitle>
          <DialogDescription className="font-mono text-muted-foreground">
            Instant buy without leaving the feed
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Token Info */}
          <div className="flex items-center gap-3 p-3 bg-[#1a1a1a] rounded-lg">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-[#00ff9d]/30 to-emerald-600/20 border border-[#00ff9d]/30 flex items-center justify-center">
              <span className="text-sm font-bold text-[#00ff9d]">
                {token.symbol.slice(0, 2)}
              </span>
            </div>
            <div className="flex-1">
              <p className="font-mono font-bold text-white">{token.name}</p>
              <p className="text-xs text-muted-foreground font-mono">${token.symbol} • {token.chain}</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[#00ff9d]">${token.price.toFixed(6)}</p>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="text-xs font-mono text-muted-foreground mb-2 block">
              AMOUNT (SOL)
            </label>
            <div className="relative">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 text-lg font-mono pr-16 bg-[#1a1a1a] border-[#2a2a2a] focus:border-[#00ff9d]"
                placeholder="0.00"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="font-mono font-bold text-muted-foreground">SOL</span>
              </div>
            </div>
          </div>

          {/* Preset Amounts */}
          <div className="flex gap-2">
            {presetAmounts.map((preset) => (
              <Button
                key={preset}
                size="sm"
                variant={amount === preset ? "default" : "outline"}
                className={`flex-1 font-mono text-xs ${
                  amount === preset
                    ? 'bg-[#00ff9d] text-black hover:bg-[#00ff9d]/90'
                    : 'border-[#2a2a2a] hover:bg-[#1a1a1a]'
                }`}
                onClick={() => setAmount(preset)}
              >
                {preset} SOL
              </Button>
            ))}
          </div>

          {/* Swap Preview */}
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="text-center">
              <p className="text-2xl font-mono font-bold text-white">{amount}</p>
              <p className="text-xs text-muted-foreground font-mono">SOL</p>
            </div>
            <ArrowUpDown className="h-5 w-5 text-[#00ff9d]" />
            <div className="text-center">
              <p className="text-2xl font-mono font-bold text-[#00ff9d]">{formatNumber(receiveAmount)}</p>
              <p className="text-xs text-muted-foreground font-mono">{token.symbol}</p>
            </div>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-2 text-xs text-amber-400 font-mono bg-amber-400/10 p-2 rounded">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>High volatility token. Prices may change rapidly.</span>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="flex-1 font-mono border-[#2a2a2a] hover:bg-[#1a1a1a]"
          >
            <X className="h-4 w-4 mr-2" />
            CANCEL
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="flex-1 font-mono bg-[#00ff9d] text-black hover:bg-[#00ff9d]/90"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            BUY NOW
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuickTradeModal;
