import React, { useState, useEffect } from 'react';
import { ListingScheduleSelector } from './components/ListingScheduleSelector';
import { getMockListing } from './services/supabase';
import { fetchListingsFromBubble, fetchListingById } from './services/bubble';
import { Listing } from './types';
import './PreviewApp.css';

export const PreviewApp: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListingId, setSelectedListingId] = useState<string>('');
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingListing, setLoadingListing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  // Load listings on mount
  useEffect(() => {
    const loadListings = async () => {
      setLoading(true);
      setError(null);

      try {
        const bubbleListings = await fetchListingsFromBubble();

        if (bubbleListings.length === 0) {
          // No Bubble connection, use mock data
          console.log('No Bubble listings found. Using mock data.');
          const mockListing = getMockListing();
          setListings([mockListing]);
          setSelectedListingId(mockListing.id);
          setListing(mockListing);
          setUsingMockData(true);
        } else {
          // Use Bubble listings
          setListings(bubbleListings);
          setUsingMockData(false);
          // Auto-select first listing
          if (bubbleListings.length > 0) {
            setSelectedListingId(bubbleListings[0].id);
            setListing(bubbleListings[0]);
          }
        }
      } catch (err) {
        console.error('Error loading listings:', err);
        setError('Failed to load listings. Using mock data.');
        // Fallback to mock data
        const mockListing = getMockListing();
        setListings([mockListing]);
        setSelectedListingId(mockListing.id);
        setListing(mockListing);
        setUsingMockData(true);
      } finally {
        setLoading(false);
      }
    };

    loadListings();
  }, []);

  // Load selected listing
  const handleListingChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const listingId = e.target.value;
    setSelectedListingId(listingId);

    if (!listingId) {
      setListing(null);
      return;
    }

    setLoadingListing(true);

    try {
      if (usingMockData) {
        // Use local listing from array
        const selected = listings.find(l => l.id === listingId);
        setListing(selected || null);
      } else {
        // Fetch from Bubble
        const fetchedListing = await fetchListingById(listingId);
        setListing(fetchedListing);
      }
    } catch (err) {
      console.error('Error loading listing:', err);
      setError('Failed to load listing details.');
    } finally {
      setLoadingListing(false);
    }
  };

  const handleScheduleSave = (selectedDays: any) => {
    alert(`Schedule saved! ${selectedDays.length} days selected.`);
    console.log('Schedule saved:', selectedDays);
  };

  if (loading) {
    return <div className="preview-app"><div className="loading">Loading listings...</div></div>;
  }

  return (
    <div className="preview-app">
      <header className="preview-header">
        <h1>Listing Schedule Selector - Preview</h1>
        <p className="preview-subtitle">Converted from Bubble.io to React Component</p>
        {usingMockData && <div className="mock-data-badge">Using Mock Data</div>}
        {!usingMockData && <div className="bubble-data-badge">Connected to Bubble</div>}
      </header>

      <div className="listing-selector-container">
        <label htmlFor="listing-dropdown" className="listing-dropdown-label">
          Select a Listing:
        </label>
        <select
          id="listing-dropdown"
          className="listing-dropdown"
          value={selectedListingId}
          onChange={handleListingChange}
          disabled={loadingListing}
        >
          <option value="">-- Select a listing --</option>
          {listings.map(l => (
            <option key={l.id} value={l.id}>
              Listing {l.id} - Min: {l.minimumNights} nights, Max: {l.maximumNights || 'N/A'} nights
            </option>
          ))}
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="preview-component">
        {loadingListing ? (
          <div className="loading">Loading listing details...</div>
        ) : listing ? (
          <ListingScheduleSelector
            listing={listing}
            onScheduleSave={handleScheduleSave}
            showPricing={true}
          />
        ) : (
          <div className="no-listing">Please select a listing</div>
        )}
      </div>

      <footer className="preview-footer">
        <p>This component replicates all functionality from the Bubble implementation.</p>
        <p><a href="https://github.com/splitleasesharath/listing-schedule-selector" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>
      </footer>
    </div>
  );
};
