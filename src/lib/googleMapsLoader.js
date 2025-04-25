import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Store your API key in .env.local
  version: 'weekly',
  libraries: ['places'], // Load the Places library for autocomplete
});

export const loadGoogleMaps = async () => {
  try {
    await loader.load();
    return window.google;
  } catch (error) {
    console.error('Failed to load Google Maps API:', error);
    throw error;
  }
};