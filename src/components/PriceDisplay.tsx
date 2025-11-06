import React from 'react';
import { PriceBreakdown } from '../types';
import './PriceDisplay.css';

interface PriceDisplayProps {
  priceBreakdown: PriceBreakdown;
  currency?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  priceBreakdown,
  currency = 'USD'
}) => {
  if (priceBreakdown.numberOfNights === 0) {
    return null;
  }

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="price-display">
      <h4>Price Breakdown</h4>
      <div className="price-row">
        <span>Base Price ({priceBreakdown.numberOfNights} nights):</span>
        <span>{formatPrice(priceBreakdown.basePrice)}</span>
      </div>
      <div className="price-row">
        <span>Nightly Rate:</span>
        <span>{formatPrice(priceBreakdown.nightlyRate)}</span>
      </div>
      {priceBreakdown.discountAmount > 0 && (
        <div className="price-row discount">
          <span>Discounts:</span>
          <span>-{formatPrice(priceBreakdown.discountAmount)}</span>
        </div>
      )}
      {priceBreakdown.markupAmount > 0 && (
        <div className="price-row markup">
          <span>Fees & Markups:</span>
          <span>+{formatPrice(priceBreakdown.markupAmount)}</span>
        </div>
      )}
      <div className="price-row total">
        <span>Total Price:</span>
        <span>{formatPrice(priceBreakdown.totalPrice)}</span>
      </div>
      <div className="price-row per-night">
        <span>Per Night:</span>
        <span>{formatPrice(priceBreakdown.pricePerNight)}</span>
      </div>
    </div>
  );
};
