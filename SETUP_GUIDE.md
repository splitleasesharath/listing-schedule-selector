# Setup Guide - Listing Schedule Selector

## Quick Start

### 1. Install Dependencies

```bash
cd listing-schedule-selector
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
copy .env.example .env
```

Edit `.env` and add your Supabase credentials:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:** If you don't configure Supabase, the preview will automatically use mock data.

### 3. Run Development Server

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

## Preview Features

The preview application includes:

### 1. **Listing Dropdown**
   - Select from available listings in your Bubble database
   - Falls back to mock data if Supabase is not configured

### 2. **Schedule Selector Component**
   - Click days to select/deselect
   - Visual feedback for selected days
   - Real-time validation and error messages

### 3. **Custom States Display**
   - Shows all custom states from Bubble implementation
   - Real-time updates as you interact with the component
   - Verifies functionality matches Bubble behavior

### 4. **Price Breakdown**
   - Dynamic pricing based on selected nights
   - Shows discounts, markups, and total price
   - Supports multiple rental types (Monthly, Weekly, Nightly)

## Component Usage

### Basic Usage

```tsx
import { ListingScheduleSelector } from './components/ListingScheduleSelector';

function App() {
  const listing = {
    // Your listing data from Supabase/Bubble
  };

  const handleSave = (selectedDays) => {
    console.log('Selected days:', selectedDays);
    // Save to your backend
  };

  return (
    <ListingScheduleSelector
      listing={listing}
      onScheduleSave={handleSave}
      showPricing={true}
    />
  );
}
```

### With Custom Hook

```tsx
import { useScheduleSelector } from './hooks/useScheduleSelector';

function CustomScheduleComponent() {
  const {
    selectedDays,
    nightsCount,
    priceBreakdown,
    handleDayClick,
    acceptableSchedule
  } = useScheduleSelector({
    listing: myListing
  });

  return (
    // Your custom UI
  );
}
```

## Supabase Setup

### 1. Get Supabase Credentials

1. Go to your Supabase project: https://app.supabase.com
2. Click on "Project Settings" → "API"
3. Copy:
   - Project URL (VITE_SUPABASE_URL)
   - anon/public key (VITE_SUPABASE_ANON_KEY)

### 2. Database Schema

Ensure your Bubble database is connected to Supabase with these tables:

- **Listing** table with columns:
  - `_id` (text)
  - `Active` (boolean)
  - `Approved` (boolean)
  - `First Available` (date)
  - `Last Available` (date)
  - `Minimum Nights` (number)
  - `Maximum Nights` (number)
  - `Days Available (List of Days)` (array)
  - `pricing_list` (json)
  - And other fields as per Bubble schema

## Testing Locally

### Verify Custom States

The preview app displays all custom states that match the Bubble implementation:

- ✅ Selected Days
- ✅ Selected Nights
- ✅ Not Selected Days
- ✅ Check-in Day
- ✅ Check-out Day
- ✅ Start Night / End Night
- ✅ Is Contiguous
- ✅ Acceptable Schedule
- ✅ Price Breakdown
- ✅ Unused Nights

### Test Scenarios

1. **Select Consecutive Days**: Click on consecutive days (e.g., Mon, Tue, Wed)
   - Verify contiguity shows "Yes"
   - Check pricing updates

2. **Try Non-Consecutive**: Click Mon, then Wed (skipping Tue)
   - Should show error: "Days must be consecutive"

3. **Minimum Nights**: Try removing days below minimum
   - Should block removal with error message

4. **Maximum Nights**: Try selecting more than allowed
   - Should block selection

5. **Different Rental Types**: Test with Monthly, Weekly, Nightly listings
   - Verify pricing calculations differ

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Project Structure

```
listing-schedule-selector/
├── src/
│   ├── components/          # React components
│   │   ├── ListingScheduleSelector.tsx
│   │   ├── ListingScheduleSelector.css
│   │   ├── DayButton.tsx
│   │   ├── DayButton.css
│   │   ├── ErrorOverlay.tsx
│   │   ├── ErrorOverlay.css
│   │   ├── PriceDisplay.tsx
│   │   └── PriceDisplay.css
│   ├── hooks/               # Custom hooks
│   │   └── useScheduleSelector.ts
│   ├── utils/               # Utility functions
│   │   ├── dayHelpers.ts
│   │   ├── validators.ts
│   │   ├── nightCalculations.ts
│   │   └── priceCalculations.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── services/            # API services
│   │   └── supabase.ts
│   ├── PreviewApp.tsx       # Preview application
│   ├── PreviewApp.css
│   ├── main.tsx             # Entry point
│   ├── index.css
│   └── index.ts             # Library exports
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Troubleshooting

### Issue: "Supabase not configured"
**Solution**: Create `.env` file with Supabase credentials, or use mock data for testing.

### Issue: No listings appearing
**Solution**: Check that:
1. Supabase credentials are correct
2. Your Bubble database is synced to Supabase
3. Listings have `Active: true` and `Approved: true`

### Issue: Pricing shows $0
**Solution**: Ensure your listing has a valid `pricing_list` object with:
- `startingNightlyPrice`
- `nightlyPrice` array
- `numberSelectedNights` array

### Issue: Days can't be selected
**Solution**: Check that `daysAvailable` array in listing contains the day numbers (0-6).

## Next Steps

1. ✅ Test locally with preview mode
2. ✅ Verify all custom states match Bubble behavior
3. ✅ Connect to your Supabase database
4. ✅ Integrate component into your main application
5. ✅ Deploy to production

## Support

- GitHub Issues: https://github.com/splitleasesharath/listing-schedule-selector/issues
- Bubble Implementation Documentation: See included `.md` files in repository

## Conversion Notes

This React component replicates all 26 workflows from the Bubble implementation:

- ✅ 10 Custom Events → React functions/hooks
- ✅ 5 "Do When" Actions → useEffect hooks
- ✅ 6 Error Handling workflows → Error validation functions
- ✅ 2 Page Loaded workflows → Component initialization
- ✅ 2 Adding Days workflows → Selection handlers
- ✅ 1 Removing Days workflow → Removal handler

All functionality has been preserved and enhanced with TypeScript type safety.
