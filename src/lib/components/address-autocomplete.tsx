/* eslint-disable no-console */
import axios from 'axios';
import debounce from 'lodash.debounce';
import type { SetStateAction } from 'react';
import { useState } from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';

const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;
// const accessToken =
//   'pk.eyJ1IjoibHlvbnM4MDAiLCJhIjoiY2x0M2tpd2lmMXdieTJwbzFldDVuc2dvaiJ9.QZ8h9_XR1F8BtEYi47Rucw';

interface Suggestion {
  id: string;
  place_name: string;
  // Include other properties as needed
}

interface AddressAutocompleteProps {
  setSelectedAddress: (address: SetStateAction<string>) => void;
}

function AddressAutocomplete({ setSelectedAddress }: AddressAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  // Debounce the query input to avoid excessive API requests
  const debouncedFetchSuggestions = debounce(
    async (searchText: string | number | boolean) => {
      if (!searchText) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchText)}.json`,
          {
            params: {
              access_token: accessToken,
              autocomplete: true,
              limit: 5, // Adjust based on your needs
            },
          }
        );

        setSuggestions(response.data.features);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    },
    300
  ); // Adjust debounce time as needed

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    debouncedFetchSuggestions(inputValue);
  };

  const handleSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.place_name); // Update the input field with the selected address
    setSuggestions([]); // Clear suggestions
    setSelectedAddress(suggestion.place_name); // Update the selected address state
    // Additional actions on select (e.g., update map view)
  };

  return (
    <div>
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for a location"
      />
      <ul>
        {suggestions.map((suggestion) => (
          <Button key={suggestion.id} onClick={() => handleSelect(suggestion)}>
            {suggestion.place_name}
          </Button>
        ))}
      </ul>
    </div>
  );
}

export default AddressAutocomplete;
