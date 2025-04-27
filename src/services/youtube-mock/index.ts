
// Main export file for the YouTube mock service

import { searchYouTubeVideos, saveSearch, getSavedSearches, deleteSavedSearch } from './search-service';
import { getLanguageDistributionData, getViewRangeData, getEarningsData, getTrendAnalysis } from './analytics-service';
import { exportToCSV } from './export-service';

export {
  searchYouTubeVideos,
  saveSearch,
  getSavedSearches,
  deleteSavedSearch,
  getLanguageDistributionData,
  getViewRangeData,
  getEarningsData,
  getTrendAnalysis,
  exportToCSV
};
