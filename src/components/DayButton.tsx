import React from 'react';
import { Day } from '../types';
import './DayButton.css';

interface DayButtonProps {
  day: Day;
  isSelected: boolean;
  isClickable: boolean;
  onClick: (day: Day) => void;
}

export const DayButton: React.FC<DayButtonProps> = ({
  day,
  isSelected,
  isClickable,
  onClick
}) => {
  const handleClick = () => {
    if (day.isAvailable && isClickable) {
      onClick(day);
    }
  };

  const classNames = [
    'day-button',
    isSelected && 'selected',
    !day.isAvailable && 'disabled',
    !isClickable && 'not-clickable'
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      onClick={handleClick}
      disabled={!day.isAvailable || !isClickable}
      title={day.name}
      aria-label={`${day.name}, ${isSelected ? 'selected' : 'not selected'}`}
      aria-pressed={isSelected}
      type="button"
    >
      {day.singleLetter}
    </button>
  );
};
