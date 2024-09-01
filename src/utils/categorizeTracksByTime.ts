/* eslint-disable @typescript-eslint/no-explicit-any */
export const categorizeTracksByTimeRange = (tracks: any[]): Record<string, any[]> => {
  const categories: Record<string, any[]> = {
    'Il y a longtemps': [],
    'Des mois plus tôt': [],
    'Aujourd\'hui': [],
  };

  tracks.forEach((track) => {
    // Catégorisation basée sur le temps
    const timeRange = track.time_range;
    if (timeRange === 'long_term') {
      categories['Il y a longtemps'].push(track);
    } else if (timeRange === 'medium_term') {
      categories['Des mois plus tôt'].push(track);
    } else if (timeRange === 'short_term') {
      categories['Aujourd\'hui'].push(track);
    }
  });

  return categories;
};
