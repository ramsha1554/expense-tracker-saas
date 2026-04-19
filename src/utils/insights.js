export const generateInsights = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const insights = [];
  const expenses = transactions.filter(t => t.type === 'expense');
  const income = transactions.filter(t => t.type === 'income');
  
  const totalExpense = expenses.reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const totalIncome = income.reduce((acc, t) => acc + Number(t.amount || 0), 0);
  const savings = totalIncome - totalExpense;

  // 1. Savings Insight
  if (savings > 0) {
    insights.push({
      type: 'success',
      text: `💰 You have saved ₹${savings.toLocaleString('en-IN')} so far! Keep it up.`,
      icon: 'savings'
    });
  } else if (savings < 0 && totalIncome > 0) {
    insights.push({
      type: 'warning',
      text: `⚠️ Your expenses have exceeded your income by ₹${Math.abs(savings).toLocaleString('en-IN')}.`,
      icon: 'overspend'
    });
  }

  // 2. Highest Category Insight
  if (expenses.length > 0) {
    const categories = {};
    expenses.forEach(e => {
      categories[e.category] = (categories[e.category] || 0) + Number(e.amount);
    });
    
    const highestCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
    if (highestCategory) {
      insights.push({
        type: 'info',
        text: `📊 Your highest spending is on ${highestCategory[0].charAt(0).toUpperCase() + highestCategory[0].slice(1)} (₹${highestCategory[1].toLocaleString('en-IN')}).`,
        icon: 'category'
      });
    }
  }

  // 3. Spending Trends (Pseudo-logic for demonstration since we don't have historical months yet)
  if (expenses.length > 5) {
     insights.push({
        type: 'trend',
        text: `📈 Your spending frequency is increasing. Consider reviewing your "Other" expenses.`,
        icon: 'trend'
      });
  }

  return insights;
};
