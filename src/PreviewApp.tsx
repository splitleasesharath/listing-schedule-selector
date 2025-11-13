import React, { useState, useEffect } from 'react';
import { ListingScheduleSelector } from './components/ListingScheduleSelector';
import { fetchListings, getMockListing, supabase } from './services/supabase';
import { Listing, ScheduleState } from './types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PreviewApp.css';

export const PreviewApp: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedListingId, setSelectedListingId] = useState<string>('');
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [scheduleState, setScheduleState] = useState<ScheduleState | null>(null);
  const [useMockData, setUseMockData] = useState(!supabase);

  // Load listings on mount
  useEffect(() => {
    loadListings();
  }, [useMockData]);

  const loadListings = async () => {
    setLoading(true);
    try {
      if (useMockData) {
        // Use mock data
        const mockListing = getMockListing();
        setListings([mockListing]);
        setSelectedListingId(mockListing.id);
        setSelectedListing(mockListing);
      } else {
        // Fetch from Supabase
        const data = await fetchListings();
        setListings(data);
        if (data.length > 0) {
          setSelectedListingId(data[0].id);
          setSelectedListing(data[0]);
        }
      }
    } catch (error) {
      console.error('Error loading listings:', error);
      toast.error('Failed to load listings. Using mock data.');
      // Fall back to mock data
      const mockListing = getMockListing();
      setListings([mockListing]);
      setSelectedListingId(mockListing.id);
      setSelectedListing(mockListing);
      setUseMockData(true);
    } finally {
      setLoading(false);
    }
  };

  const handleListingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const listingId = event.target.value;
    setSelectedListingId(listingId);
    const listing = listings.find(l => l.id === listingId);
    setSelectedListing(listing || null);
  };

  const handleScheduleSave = (selectedDays: any) => {
    toast.success(`Schedule saved! ${selectedDays.length} days selected.`);
    console.log('Schedule saved:', selectedDays);
  };

  if (loading) {
    return (
      <div className="preview-app">
        <div className="loading">Loading listings...</div>
      </div>
    );
  }

  return (
    <div className="preview-app">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />

      <header className="preview-header">
        <h1>Listing Schedule Selector - Preview</h1>
        <p className="preview-subtitle">
          Converted from Bubble.io to React Component
        </p>
        {useMockData && (
          <div className="mock-data-badge">
            Using Mock Data (Supabase not configured)
          </div>
        )}
      </header>

      <div className="preview-controls">
        <div className="listing-selector">
          <label htmlFor="listing-select">Select Listing:</label>
          <select
            id="listing-select"
            value={selectedListingId}
            onChange={handleListingChange}
            className="listing-dropdown"
          >
            {listings.map(listing => (
              <option key={listing.id} value={listing.id}>
                Listing {listing.id.substring(0, 8)}...
                {listing.active ? ' (Active)' : ' (Inactive)'}
              </option>
            ))}
          </select>
        </div>

        {selectedListing && (
          <div className="listing-info">
            <h3>Listing Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>ID:</strong> {selectedListing.id}
              </div>
              <div className="info-item">
                <strong>Min Nights:</strong> {selectedListing.minimumNights}
              </div>
              <div className="info-item">
                <strong>Max Nights:</strong> {selectedListing.maximumNights}
              </div>
              <div className="info-item">
                <strong>Nights Available:</strong> {selectedListing.numberOfNightsAvailable}
              </div>
              <div className="info-item">
                <strong>Check-in:</strong> {selectedListing.checkInTime}
              </div>
              <div className="info-item">
                <strong>Check-out:</strong> {selectedListing.checkOutTime}
              </div>
              <div className="info-item">
                <strong>Active:</strong> {selectedListing.active ? 'Yes' : 'No'}
              </div>
              <div className="info-item">
                <strong>Approved:</strong> {selectedListing.approved ? 'Yes' : 'No'}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="preview-component">
        {selectedListing ? (
          <ListingScheduleSelector
            listing={selectedListing}
            onScheduleSave={handleScheduleSave}
            showPricing={true}
          />
        ) : (
          <div className="no-listing">
            No listing selected. Please select a listing from the dropdown above.
          </div>
        )}
      </div>

      {scheduleState && (
        <div className="custom-states-display">
          <h3>Custom States (from Bubble Implementation)</h3>
          <div className="states-grid">
            <div className="state-item">
              <strong>Selected Days Count:</strong> {scheduleState.selectedDays.length}
            </div>
            <div className="state-item">
              <strong>Selected Nights Count:</strong> {scheduleState.nightsCount}
            </div>
            <div className="state-item">
              <strong>Not Selected Days Count:</strong> {scheduleState.notSelectedDays.length}
            </div>
            <div className="state-item">
              <strong>Is Contiguous:</strong> {scheduleState.isContiguous ? 'Yes' : 'No'}
            </div>
            <div className="state-item">
              <strong>Acceptable Schedule:</strong> {scheduleState.acceptableSchedule ? 'Yes' : 'No'}
            </div>
            <div className="state-item">
              <strong>Check-in Day:</strong> {scheduleState.checkInDay?.name || 'None'}
            </div>
            <div className="state-item">
              <strong>Check-out Day:</strong> {scheduleState.checkOutDay?.name || 'None'}
            </div>
            <div className="state-item">
              <strong>Start Night:</strong> {scheduleState.startNight !== null ? scheduleState.startNight : 'None'}
            </div>
            <div className="state-item">
              <strong>End Night:</strong> {scheduleState.endNight !== null ? scheduleState.endNight : 'None'}
            </div>
            <div className="state-item">
              <strong>Limit to 5 Nights:</strong> {scheduleState.limitToFiveNights ? 'Yes' : 'No'}
            </div>
            <div className="state-item">
              <strong>Autobind Listing:</strong> {scheduleState.autobindListing ? 'Yes' : 'No'}
            </div>
            <div className="state-item">
              <strong>Recalculate State:</strong> {scheduleState.recalculateState ? 'Yes' : 'No'}
            </div>
            <div className="state-item">
              <strong>Unused Nights Count:</strong> {scheduleState.unusedNights.length}
            </div>
            <div className="state-item">
              <strong>Total Reservation:</strong> ${scheduleState.totalReservation[0] || 0}
            </div>
            <div className="state-item">
              <strong>4-Week Rent:</strong> ${scheduleState.fourWeekRent[0] || 0}
            </div>
            <div className="state-item full-width">
              <strong>Selected Days:</strong>{' '}
              {scheduleState.selectedDays.map(d => d.first3Letters).join(', ') || 'None'}
            </div>
            <div className="state-item full-width">
              <strong>Not Selected Days:</strong>{' '}
              {scheduleState.notSelectedDays.map(d => d.first3Letters).join(', ')}
            </div>
          </div>
        </div>
      )}

      <footer className="preview-footer">
        <p>
          This component replicates all custom states and functionality from the Bubble implementation.
        </p>
        <p>
          <a
            href="https://github.com/splitleasesharath/listing-schedule-selector"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
};
