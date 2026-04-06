import type { DataRow } from '../components/ManualDataEntry';

export function generateMockData(): DataRow[] {
  const categories = ['Marketing', 'Operations', 'Sales', 'IT', 'HR', 'Finance'];
  const names = [
    'Software License',
    'Office Supplies',
    'Marketing Campaign',
    'Server Hosting',
    'Employee Training',
    'Consulting Services',
    'Equipment Purchase',
    'Travel Expenses',
    'Advertising',
    'Cloud Storage',
    'Professional Services',
    'Maintenance',
    'Subscriptions',
    'Utilities',
    'Insurance',
    'Legal Fees',
    'Research',
    'Development Tools',
    'Conference Tickets',
    'Team Building',
  ];

  const data: DataRow[] = [];
  const baseDate = new Date('2026-01-01');

  for (let i = 0; i < 40; i++) {
    const randomDays = Math.floor(Math.random() * 90);
    const date = new Date(baseDate);
    date.setDate(date.getDate() + randomDays);

    data.push({
      id: `mock-${i + 1}`,
      name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ''),
      category: categories[Math.floor(Math.random() * categories.length)],
      value: Math.round((Math.random() * 9000 + 1000) * 100) / 100,
      date: date.toISOString().split('T')[0],
    });
  }

  return data;
}

export function calculateStats(data: DataRow[]) {
  if (data.length === 0) {
    return {
      totalRecords: 0,
      averageValue: 0,
      highestValue: 0,
      lowestValue: 0,
    };
  }

  const values = data.map((row) => row.value);
  const sum = values.reduce((acc, val) => acc + val, 0);

  return {
    totalRecords: data.length,
    averageValue: sum / data.length,
    highestValue: Math.max(...values),
    lowestValue: Math.min(...values),
  };
}

export function filterData(data: DataRow[], filters: any) {
  return data.filter((row) => {
    if (filters.category && row.category !== filters.category) {
      return false;
    }
    if (row.value < filters.minValue || row.value > filters.maxValue) {
      return false;
    }
    if (filters.startDate && row.date < filters.startDate) {
      return false;
    }
    if (filters.endDate && row.date > filters.endDate) {
      return false;
    }
    return true;
  });
}
