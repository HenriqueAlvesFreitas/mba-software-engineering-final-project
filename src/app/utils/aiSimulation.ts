import type { DataRow } from '../components/ManualDataEntry';

export function generateAIResponse(question: string, data: DataRow[]): string {
  const lowerQuestion = question.toLowerCase();

  if (data.length === 0) {
    return "I don't have any data to analyze yet. Please upload or enter some data first.";
  }

  if (lowerQuestion.includes('best category') || lowerQuestion.includes('top category')) {
    const categoryTotals = data.reduce((acc, row) => {
      acc[row.category] = (acc[row.category] || 0) + row.value;
      return acc;
    }, {} as Record<string, number>);

    const best = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    return `Based on the data analysis, **${best[0]}** is the best performing category with a total value of **$${best[1].toFixed(2)}**. This category shows the highest aggregate value across all records.`;
  }

  if (lowerQuestion.includes('reduce cost') || lowerQuestion.includes('save money') || lowerQuestion.includes('cut')) {
    const categoryAverages = data.reduce((acc, row) => {
      if (!acc[row.category]) {
        acc[row.category] = { total: 0, count: 0 };
      }
      acc[row.category].total += row.value;
      acc[row.category].count += 1;
      return acc;
    }, {} as Record<string, { total: number; count: number }>);

    const averages = Object.entries(categoryAverages)
      .map(([cat, data]) => ({ category: cat, avg: data.total / data.count }))
      .sort((a, b) => b.avg - a.avg);

    const highest = averages[0];
    return `To reduce costs, I recommend focusing on the **${highest.category}** category, which has the highest average expense of **$${highest.avg.toFixed(2)}** per item. Consider negotiating better rates, finding alternative vendors, or optimizing processes in this area.`;
  }

  if (lowerQuestion.includes('highest') || lowerQuestion.includes('most expensive') || lowerQuestion.includes('maximum')) {
    const highest = data.reduce((max, row) => (row.value > max.value ? row : max), data[0]);
    return `The item with the highest value is **${highest.name}** in the **${highest.category}** category, valued at **$${highest.value.toFixed(2)}** on ${highest.date}. This represents a significant investment in your data set.`;
  }

  if (lowerQuestion.includes('lowest') || lowerQuestion.includes('minimum') || lowerQuestion.includes('cheapest')) {
    const lowest = data.reduce((min, row) => (row.value < min.value ? row : min), data[0]);
    return `The item with the lowest value is **${lowest.name}** in the **${lowest.category}** category, valued at **$${lowest.value.toFixed(2)}** on ${lowest.date}.`;
  }

  if (lowerQuestion.includes('average') || lowerQuestion.includes('mean')) {
    const avg = data.reduce((sum, row) => sum + row.value, 0) / data.length;
    return `The average value across all ${data.length} records is **$${avg.toFixed(2)}**. This gives you a baseline for understanding typical expense levels in your data.`;
  }

  if (lowerQuestion.includes('total') || lowerQuestion.includes('sum')) {
    const total = data.reduce((sum, row) => sum + row.value, 0);
    return `The total value across all records is **$${total.toFixed(2)}**, representing the complete sum of all ${data.length} entries in your dataset.`;
  }

  if (lowerQuestion.includes('trend') || lowerQuestion.includes('over time')) {
    const sorted = [...data].sort((a, b) => a.date.localeCompare(b.date));
    const firstHalf = sorted.slice(0, Math.floor(sorted.length / 2));
    const secondHalf = sorted.slice(Math.floor(sorted.length / 2));

    const firstAvg = firstHalf.reduce((sum, row) => sum + row.value, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((sum, row) => sum + row.value, 0) / secondHalf.length;

    const change = ((secondAvg - firstAvg) / firstAvg * 100).toFixed(1);
    const direction = secondAvg > firstAvg ? 'increased' : 'decreased';

    return `Analyzing the time trend, values have **${direction} by ${Math.abs(parseFloat(change))}%** from the first half to the second half of your data period. Early average: $${firstAvg.toFixed(2)}, Recent average: $${secondAvg.toFixed(2)}.`;
  }

  if (lowerQuestion.includes('category') || lowerQuestion.includes('categories')) {
    const categories = [...new Set(data.map(row => row.category))];
    const categoryCounts = categories.map(cat => ({
      category: cat,
      count: data.filter(row => row.category === cat).length
    })).sort((a, b) => b.count - a.count);

    return `Your data contains **${categories.length} categories**: ${categoryCounts.map(c => `${c.category} (${c.count} items)`).join(', ')}. The most common category is **${categoryCounts[0].category}** with ${categoryCounts[0].count} entries.`;
  }

  return `I've analyzed your question about "${question}". Based on the ${data.length} records in your dataset, I can provide insights on categories, values, trends, and cost optimization. Try asking more specific questions like "What is the best category?" or "Where can I reduce costs?" for detailed analysis.`;
}
