'use client';

import { useState, useEffect, useRef } from 'react';
import { loadGoogleMaps } from '../../lib/googleMapsLoader';

export default function GooglePlacesAutocomplete({ value, onChange }) {
  const [google, setGoogle] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const inputRef = useRef(null);

  // Load Google Maps API and initialize Autocomplete
  useEffect(() => {
    const initAutocomplete = async () => {
      try {
        const googleMaps = await loadGoogleMaps();
        setGoogle(googleMaps);

        const autocompleteInstance = new googleMaps.maps.places.Autocomplete(inputRef.current, {
          types: ['geocode'], // Restrict to addresses
          fields: ['formatted_address', 'geometry'], // Fields to return
        });

        setAutocomplete(autocompleteInstance);

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();
          if (place.geometry) {
            const { lat, lng } = place.geometry.location;
            const address = place.formatted_address;
            onChange(address, { lng: lng(), lat: lat() });
          }
        });
      } catch (error) {
        console.error('Error initializing Google Places Autocomplete:', error);
      }
    };

    initAutocomplete();
  }, [onChange]);

  // Handle manual input changes
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder="Eg. Independence Square"
        className="border-2 border-red-600 rounded-lg w-full p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}