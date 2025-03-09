const STORAGE_KEY = 'opposites_game_stats';

export const saveGameStats = (gameStats) => {
  const existingStats = getGameStats();
  const updatedStats = [...existingStats, gameStats];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
};

export const getGameStats = () => {
  const stats = localStorage.getItem(STORAGE_KEY);
  return stats ? JSON.parse(stats) : [];
};

export const clearGameStats = () => {
  localStorage.removeItem(STORAGE_KEY);
};
