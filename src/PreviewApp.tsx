import React, { useState, useEffect } from 'react';
import { ListingScheduleSelector } from './components/ListingScheduleSelector';
import { getMockListing } from './services/supabase';
import { fetchListingsFromBubble, fetchListingById, fetchZATPriceConfiguration } from './services/bubble';
import { Listing, ReservationSpan, ZATPriceConfiguration } from './types';
import './PreviewApp.css';

export const PreviewApp: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListingId, setSelectedListingId] = useState<string>('');
  const [listing, setListing] = useState<Listing | null>(null);
  const [reservationSpan, setReservationSpan] = useState<ReservationSpan | null>(13);
  const [customReservationSpan, setCustomReservationSpan] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [loadingListing, setLoadingListing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);
  const [zatConfig, setZatConfig] = useState<ZATPriceConfiguration | null>(null);

  // Load listings and ZAT config on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Load ZAT Price Configuration
        const config = await fetchZATPriceConfiguration();
        setZatConfig(config);

        // Load listings
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
          // Log rental type distribution
          const rentalTypes = bubbleListings.reduce((acc, l) => {
            const type = l.rentalType || 'undefined';
            acc[type] = (acc[type] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);

          console.log('📊 Total listings:', bubbleListings.length);
          console.log('📊 Rental type distribution:', rentalTypes);

          // Use Bubble listings (no filter)
          setListings(bubbleListings);
          setUsingMockData(false);
          // Auto-select first listing
          if (bubbleListings.length > 0) {
            setSelectedListingId(bubbleListings[0].id);
            setListing(bubbleListings[0]);
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
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

    loadData();
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
        <div className="selector-row">
          <div className="selector-column">
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
                  {l.displayName || l.name || `Listing ${l.id.substring(0, 8)}`} - {l.rentalType || 'N/A'} - Weekly Rate: ${l.weeklyHostRate || 'N/A'}
                </option>
              ))}
            </select>
          </div>

          <div className="selector-column">
            <label htmlFor="reservation-span-dropdown" className="listing-dropdown-label">
              Reservation Span (weeks):
            </label>
            <select
              id="reservation-span-dropdown"
              className="listing-dropdown"
              value={reservationSpan || 'custom'}
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'custom') {
                  setReservationSpan(null);
                } else {
                  setReservationSpan(parseInt(value) as ReservationSpan);
                  setCustomReservationSpan('');
                }
              }}
            >
              <option value={6}>6 weeks</option>
              <option value={7}>7 weeks</option>
              <option value={8}>8 weeks</option>
              <option value={9}>9 weeks</option>
              <option value={10}>10 weeks</option>
              <option value={12}>12 weeks</option>
              <option value={13}>13 weeks (3 months)</option>
              <option value={16}>16 weeks</option>
              <option value={17}>17 weeks</option>
              <option value={20}>20 weeks</option>
              <option value={22}>22 weeks</option>
              <option value={26}>26 weeks (6 months)</option>
              <option value="custom">Other (custom)</option>
            </select>
            {reservationSpan === null && (
              <input
                type="number"
                className="listing-dropdown"
                placeholder="Enter custom weeks"
                value={customReservationSpan}
                onChange={(e) => setCustomReservationSpan(e.target.value)}
                min="1"
                style={{ marginTop: '8px' }}
              />
            )}
          </div>
        </div>

        {listing && (
          <div className="listing-id-display">
            <strong>Listing Unique ID:</strong>
            <code className="listing-id-code">{listing.id}</code>
            <button
              className="copy-id-button"
              onClick={() => {
                navigator.clipboard.writeText(listing.id);
                alert('Listing ID copied to clipboard!');
              }}
              title="Copy ID to clipboard"
            >
              📋 Copy
            </button>
          </div>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="preview-component">
        {loadingListing ? (
          <div className="loading">Loading listing details...</div>
        ) : listing && zatConfig ? (
          <ListingScheduleSelector
            listing={listing}
            onScheduleSave={handleScheduleSave}
            showPricing={true}
            zatConfig={zatConfig}
            reservationSpanWeeks={reservationSpan || parseInt(customReservationSpan) || 13}
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
