
/**
 * Calculate days remaining in trial or subscription
 * Improved to handle timezone differences better
 */
export const getDaysRemaining = (endDate: Date | null): number => {
  if (!endDate) return 0;
  
  const now = new Date();
  
  // Get dates in YYYY-MM-DD format to ensure proper day comparison regardless of time
  const todayStr = now.toISOString().split('T')[0];
  const endDateStr = endDate.toISOString().split('T')[0];
  
  // Convert back to Date objects at midnight UTC
  const todayDate = new Date(todayStr);
  const endDateObj = new Date(endDateStr);
  
  // Calculate the difference in days
  const diffTime = endDateObj.getTime() - todayDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  console.log("Days calculation:", { 
    today: todayStr, 
    endDate: endDateStr, 
    diffDays: diffDays 
  });
  
  return Math.max(0, diffDays);
};

/**
 * Format end date to a readable string
 */
export const formatEndDate = (date: Date | null): string => {
  if (!date) return '';
  
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
};
