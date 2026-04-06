import { TrendingUp, TrendingDown, DollarSign, Database } from 'lucide-react';

interface SummaryCardsProps {
  totalRecords: number;
  averageValue: number;
  highestValue: number;
  lowestValue: number;
}

export function SummaryCards({ totalRecords, averageValue, highestValue, lowestValue }: SummaryCardsProps) {
  const cards = [
    {
      label: 'TOTAL RECORDS',
      value: totalRecords.toLocaleString(),
      icon: Database,
      iconBg: 'bg-[#dbeafe]',
      iconColor: 'text-[#3b82f6]',
      change: '+12.5%',
      changePositive: true,
    },
    {
      label: 'AVERAGE VALUE',
      value: `$${averageValue.toFixed(2)}`,
      icon: DollarSign,
      iconBg: 'bg-[#fef3c7]',
      iconColor: 'text-[#f59e0b]',
      change: '+8.2%',
      changePositive: true,
    },
    {
      label: 'HIGHEST VALUE',
      value: `$${highestValue.toFixed(2)}`,
      icon: TrendingUp,
      iconBg: 'bg-[#d1fae5]',
      iconColor: 'text-[#10b981]',
      change: '+15.3%',
      changePositive: true,
    },
    {
      label: 'LOWEST VALUE',
      value: `$${lowestValue.toFixed(2)}`,
      icon: TrendingDown,
      iconBg: 'bg-[#fee2e2]',
      iconColor: 'text-[#ef4444]',
      change: '-3.1%',
      changePositive: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white rounded-xl p-6 border border-[#e2e8f0] hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-semibold text-[#64748b] mb-1">{card.label}</p>
                <h3 className="text-2xl font-bold text-[#0f172a]">{card.value}</h3>
              </div>
              <div className={`${card.iconBg} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <Icon className={card.iconColor} size={24} />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className={`text-sm font-semibold ${card.changePositive ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                {card.change}
              </span>
              <span className="text-xs text-[#94a3b8]">vs last month</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
