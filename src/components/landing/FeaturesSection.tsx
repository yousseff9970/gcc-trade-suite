import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  FolderKanban, 
  Users, 
  Crosshair,
  Search,
  Fish,
  Copy,
  Wallet,
  Receipt,
  Gift,
  Trophy,
  Settings,
  Shield,
  HelpCircle,
  Bell,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturesSectionProps {
  lang: "en" | "ar";
}

const translations = {
  en: {
    badge: "All-In-One Platform",
    title: "Your Complete Command Center",
    subtitle: "Everything you need to trade, manage, and grow — unified in one powerful super app.",
    sections: [
      {
        name: "Core",
        color: "from-blue-500 to-cyan-500",
        features: [
          { icon: LayoutDashboard, title: "Overview", description: "Mission Control dashboard with live stats, market pulse, and activity feed.", link: "/dashboard" },
          { icon: FolderKanban, title: "Projects", description: "Manage workspace projects, tasks, and file organization.", link: "/dashboard/projects" },
          { icon: Users, title: "Team", description: "Member management with roles, permissions, and collaboration.", link: "/dashboard/team" },
        ]
      },
      {
        name: "Terminal",
        color: "from-emerald-500 to-green-500",
        features: [
          { icon: Crosshair, title: "Sniper Board", description: "Live new pairs feed with safety scores and quick buy actions.", link: "/dashboard/sniper" },
          { icon: Search, title: "Scanner", description: "Contract analyzer and rug-check tool for token verification.", link: "/dashboard/scanner" },
          { icon: Fish, title: "Whale Watch", description: "Track large transactions and whale wallet movements.", link: "/dashboard/whale-watch" },
          { icon: Copy, title: "Copy Trader", description: "Follow successful wallets and auto-copy their trades.", link: "/dashboard/copy-trading" },
        ]
      },
      {
        name: "Finance",
        color: "from-amber-500 to-orange-500",
        features: [
          { icon: Wallet, title: "My Wallet", description: "Deposits, withdrawals, QR codes, and balance history.", link: "/dashboard/wallet" },
          { icon: Receipt, title: "Transactions", description: "Complete history of all trades, transfers, and payments.", link: "/dashboard/transactions" },
        ]
      },
      {
        name: "Growth",
        color: "from-purple-500 to-pink-500",
        features: [
          { icon: Gift, title: "Referrals", description: "Affiliate links, sharing tools, and earnings tracking.", link: "/dashboard/referrals" },
          { icon: Trophy, title: "Leaderboard", description: "Gamified ranking of top traders with rewards.", link: "/dashboard/leaderboard" },
        ]
      },
      {
        name: "Settings",
        color: "from-slate-500 to-gray-500",
        features: [
          { icon: Settings, title: "Settings", description: "Preferences, notifications, and app configuration.", link: "/dashboard/settings" },
          { icon: Shield, title: "Security", description: "2FA, session management, and account protection.", link: "/dashboard/security" },
          { icon: HelpCircle, title: "Support", description: "Help center, FAQs, and customer support.", link: "/dashboard/support" },
          { icon: Bell, title: "Notifications", description: "Alerts, updates, and activity notifications.", link: "/dashboard/notifications" },
        ]
      },
    ],
  },
  ar: {
    badge: "منصة شاملة",
    title: "مركز القيادة الخاص بك",
    subtitle: "كل ما تحتاجه للتداول والإدارة والنمو — موحد في تطبيق واحد قوي.",
    sections: [
      {
        name: "الأساسي",
        color: "from-blue-500 to-cyan-500",
        features: [
          { icon: LayoutDashboard, title: "نظرة عامة", description: "لوحة تحكم مع إحصائيات حية ونبض السوق.", link: "/dashboard" },
          { icon: FolderKanban, title: "المشاريع", description: "إدارة المشاريع والمهام وتنظيم الملفات.", link: "/dashboard/projects" },
          { icon: Users, title: "الفريق", description: "إدارة الأعضاء مع الأدوار والصلاحيات.", link: "/dashboard/team" },
        ]
      },
      {
        name: "المحطة",
        color: "from-emerald-500 to-green-500",
        features: [
          { icon: Crosshair, title: "لوحة القنص", description: "تغذية حية للأزواج الجديدة مع درجات الأمان.", link: "/dashboard/sniper" },
          { icon: Search, title: "الماسح", description: "محلل العقود وأداة فحص الاحتيال.", link: "/dashboard/scanner" },
          { icon: Fish, title: "مراقبة الحيتان", description: "تتبع المعاملات الكبيرة.", link: "/dashboard/whale-watch" },
          { icon: Copy, title: "نسخ التداول", description: "تابع المحافظ الناجحة وانسخ صفقاتهم.", link: "/dashboard/copy-trading" },
        ]
      },
      {
        name: "المالية",
        color: "from-amber-500 to-orange-500",
        features: [
          { icon: Wallet, title: "محفظتي", description: "الإيداعات والسحوبات ورموز QR.", link: "/dashboard/wallet" },
          { icon: Receipt, title: "المعاملات", description: "تاريخ كامل للصفقات والتحويلات.", link: "/dashboard/transactions" },
        ]
      },
      {
        name: "النمو",
        color: "from-purple-500 to-pink-500",
        features: [
          { icon: Gift, title: "الإحالات", description: "روابط الإحالة وتتبع الأرباح.", link: "/dashboard/referrals" },
          { icon: Trophy, title: "لوحة المتصدرين", description: "ترتيب أفضل المتداولين مع المكافآت.", link: "/dashboard/leaderboard" },
        ]
      },
      {
        name: "الإعدادات",
        color: "from-slate-500 to-gray-500",
        features: [
          { icon: Settings, title: "الإعدادات", description: "التفضيلات والإشعارات وتكوين التطبيق.", link: "/dashboard/settings" },
          { icon: Shield, title: "الأمان", description: "المصادقة الثنائية وحماية الحساب.", link: "/dashboard/security" },
          { icon: HelpCircle, title: "الدعم", description: "مركز المساعدة والأسئلة الشائعة.", link: "/dashboard/support" },
          { icon: Bell, title: "الإشعارات", description: "التنبيهات والتحديثات.", link: "/dashboard/notifications" },
        ]
      },
    ],
  },
};

const FeaturesSection = ({ lang }: FeaturesSectionProps) => {
  const t = translations[lang];
  const isRTL = lang === "ar";

  return (
    <section className="py-24 bg-secondary/30" id="features">
      <div className="container mx-auto px-4" dir={isRTL ? "rtl" : "ltr"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">{t.badge}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">{t.title}</h2>
          <p className="text-xl text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        <div className="space-y-12">
          {t.sections.map((section, sectionIndex) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: sectionIndex * 0.1 }}
            >
              {/* Section Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${section.color}`} />
                <h3 className="text-xl font-bold text-foreground">{section.name}</h3>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {section.features.map((feature, featureIndex) => (
                  <Link
                    key={feature.title}
                    to={feature.link}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: sectionIndex * 0.1 + featureIndex * 0.05 }}
                      className="group relative bg-card/50 backdrop-blur-sm rounded-xl p-5 border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full"
                    >
                      {/* Gradient glow on hover */}
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                      
                      <div className="relative z-10">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <feature.icon className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
