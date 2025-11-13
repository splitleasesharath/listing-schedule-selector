# Listing Schedule Selector

A React component converted from Bubble.io for selecting days/nights for rental property listings.

## Features

- **Day Selection**: Select consecutive days for booking periods
- **Multiple Rental Types**: Supports Monthly, Weekly, and Nightly rentals
- **Dynamic Pricing**: Calculates pricing based on rental type, night count, discounts, and markups
- **Validation**: Enforces minimum/maximum nights, contiguity checks, and availability rules
- **Custom States**: Tracks all selection states with real-time updates
- **Error Handling**: Comprehensive validation with user-friendly error messages

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

## Preview Mode

The preview mode includes a dropdown to select listings from the Supabase database. All custom states from the Bubble implementation are printed to verify functionality.

## Environment Variables

Create a `.env` file in the root directory:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── ListingScheduleSelector/
│       ├── ListingScheduleSelector.tsx
│       ├── DayButton.tsx
│       ├── ErrorOverlay.tsx
│       └── PriceDisplay.tsx
├── hooks/
│   ├── useScheduleSelector.ts
│   └── usePriceCalculator.ts
├── utils/
│   ├── dayHelpers.ts
│   ├── validators.ts
│   ├── nightCalculations.ts
│   └── priceCalculations.ts
├── types/
│   └── index.ts
├── services/
│   └── supabase.ts
└── preview/
    └── PreviewApp.tsx
```

## Usage

```tsx
import { ListingScheduleSelector } from './components/ListingScheduleSelector';

function App() {
  const listing = {
    // Your listing data
  };

  return (
    <ListingScheduleSelector
      listing={listing}
      onScheduleSave={(selectedDays) => {
        console.log('Selected days:', selectedDays);
      }}
    />
  );
}
```

## Testing Locally

The preview file displays all custom states to verify the component works as expected:

- Selected Days
- Selected Nights
- Check-in/Check-out Days
- Price Breakdown
- Error States
- Contiguity Status

## GitHub Repository

https://github.com/splitleasesharath/listing-schedule-selector

## License

MIT
