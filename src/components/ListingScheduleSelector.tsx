import React from 'react';
import { Listing, Day, ZATPriceConfiguration } from '../types';
import { useScheduleSelector } from '../hooks/useScheduleSelector';
import { DayButton } from './DayButton';
import { ErrorOverlay } from './ErrorOverlay';
import { PriceDisplay } from './PriceDisplay';
import './ListingScheduleSelector.css';

interface ListingScheduleSelectorProps {
  listing: Listing;
  initialSelectedDays?: Day[];
  limitToFiveNights?: boolean;
  onScheduleSave?: (selectedDays: Day[]) => void;
  showPricing?: boolean;
  zatConfig?: ZATPriceConfiguration;
  reservationSpanWeeks?: number;
}

export const ListingScheduleSelector: React.FC<ListingScheduleSelectorProps> = ({
  listing,
  initialSelectedDays = [],
  limitToFiveNights = false,
  onScheduleSave,
  showPricing = true,
  zatConfig,
  reservationSpanWeeks = 13
}) => {
  const {
    selectedDays,
    selectedNights,
    allDays,
    nightsCount,
    priceBreakdown,
    errorState,
    isClickable,
    isContiguous,
    acceptableSchedule,
    checkInDay,
    checkOutDay,
    handleDayClick,
    clearSelection,
    clearError
  } = useScheduleSelector({
    listing,
    initialSelectedDays,
    limitToFiveNights,
    zatConfig,
    reservationSpanWeeks
  });

  const handleSave = () => {
    if (!acceptableSchedule) {
      return;
    }
    onScheduleSave?.(selectedDays);
  };

  return (
    <div className="listing-schedule-selector">
      <div className="selector-header">
        <h3>Select Your Days</h3>
        <p className="selector-description">
          Choose consecutive days for your stay (minimum {listing.minimumNights} nights)
        </p>
      </div>

      <div className="day-grid">
        {allDays.map((day) => {
          const isSelected = selectedDays.some(d => d.dayOfWeek === day.dayOfWeek);
          return (
            <DayButton
              key={day.id}
              day={day}
              isSelected={isSelected}
              isClickable={isClickable}
              onClick={handleDayClick}
            />
          );
        })}
      </div>

      <div className="selection-info">
        {selectedDays.length > 0 && (
          <>
            <div className="info-row">
              <span className="info-label">Days Selected:</span>
              <span className="info-value">
                {selectedDays.map(d => d.first3Letters).join(', ')} ({selectedDays.length} days)
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Nights Selected:</span>
              <span className="info-value">
                {selectedNights.map(n => n.first3Letters).join(', ')} ({nightsCount} nights)
              </span>
            </div>
            {checkInDay && (
              <div className="info-row">
                <span className="info-label">Check-in Day:</span>
                <span className="info-value">{checkInDay.name} at {listing.checkInTime}</span>
              </div>
            )}
            {checkOutDay && (
              <div className="info-row">
                <span className="info-label">Check-out Day:</span>
                <span className="info-value">{checkOutDay.name} at {listing.checkOutTime}</span>
              </div>
            )}
            <div className="info-row">
              <span className="info-label">Contiguous:</span>
              <span className={`info-value ${isContiguous ? 'success' : 'error'}`}>
                {isContiguous ? 'Yes ✓' : 'No ✗'}
              </span>
            </div>
          </>
        )}
      </div>

      {showPricing && nightsCount > 0 && (
        <PriceDisplay priceBreakdown={priceBreakdown} />
      )}

      <div className="selector-actions">
        <button
          className="btn-secondary"
          onClick={clearSelection}
          disabled={selectedDays.length === 0}
        >
          Clear Selection
        </button>
        <button
          className="btn-primary"
          onClick={handleSave}
          disabled={!acceptableSchedule}
        >
          Save Schedule
        </button>
      </div>

      <ErrorOverlay errorState={errorState} onClose={clearError} />
    </div>
  );
};
