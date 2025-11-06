import React, { useState, useEffect } from 'react';
import { ListingScheduleSelector } from './components/ListingScheduleSelector';
import { getMockListing } from './services/supabase';
import { Listing } from './types';
import './PreviewApp.css';

export const PreviewApp: React.FC = () => {
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockListing = getMockListing();
    setListing(mockListing);
    setLoading(false);
  }, []);

  const handleScheduleSave = (selectedDays: any) => {
    alert(`Schedule saved! ${selectedDays.length} days selected.`);
    console.log('Schedule saved:', selectedDays);
  };

  if (loading) {
    return <div className="preview-app"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="preview-app">
      <header className="preview-header">
        <h1>Listing Schedule Selector - Preview</h1>
        <p className="preview-subtitle">Converted from Bubble.io to React Component</p>
        <div className="mock-data-badge">Using Mock Data</div>
      </header>

      <div className="preview-component">
        {listing ? (
          <ListingScheduleSelector
            listing={listing}
            onScheduleSave={handleScheduleSave}
            showPricing={true}
          />
        ) : (
          <div className="no-listing">No listing available</div>
        )}
      </div>

      <footer className="preview-footer">
        <p>This component replicates all functionality from the Bubble implementation.</p>
        <p><a href="https://github.com/splitleasesharath/listing-schedule-selector" target="_blank" rel="noopener noreferrer">View on GitHub</a></p>
      </footer>
    </div>
  );
};
