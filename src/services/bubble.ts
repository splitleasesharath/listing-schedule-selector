import { Listing, DayOfWeek } from '../types';

const BUBBLE_API_URL = import.meta.env.VITE_BUBBLE_API_URL || '';
const BUBBLE_API_KEY = import.meta.env.VITE_BUBBLE_API_KEY || '';

interface BubbleListing {
  _id: string;
  'First Available': string;
  'Last Available': string;
  'Number of Nights Available': number;
  Active: boolean;
  Approved: boolean;
  'Dates Blocked': string[];
  Complete: boolean;
  'Confirmed Availability': boolean;
  'Kitchen Type': string;
  'Check-in Time': string;
  'Check-out Time': string;
  'Nights Available (List)': any[];
  'Nights Available (Numbers)': number[];
  'Nights Not Available': number[];
  'Pricing List': {
    'Combined Markup': number;
    'Full Time Discount': number;
    'Host Compensation': number[];
    'Markup and Discount Multiplier': number[];
    'Nightly Price': number[];
    'Number Selected Nights': number[];
    'Overall Site Markup': number;
    Slope: number;
    'Starting Nightly Price': number;
    'Unit Markup': number;
    'Unused Nights': any[];
    'Unused Nights Discount': number[];
    'Weekly Price Adjust': number;
  };
  'Minimum Nights': number;
  'Maximum Nights'?: number;
  'Days Available': number[];
  'Days Not Available': number[];
  // Additional fields for display
  'Unit Name'?: string;
  Address?: string;
  'Bedroom Count'?: number;
  'Bathroom Count'?: number;
}

export const transformBubbleListing = (bubbleListing: BubbleListing): Listing => {
  return {
    id: bubbleListing._id,
    firstAvailable: new Date(bubbleListing['First Available']),
    lastAvailable: new Date(bubbleListing['Last Available']),
    numberOfNightsAvailable: bubbleListing['Number of Nights Available'],
    active: bubbleListing.Active,
    approved: bubbleListing.Approved,
    datesBlocked: bubbleListing['Dates Blocked'] || [],
    complete: bubbleListing.Complete,
    confirmedAvailability: bubbleListing['Confirmed Availability'],
    kitchenType: bubbleListing['Kitchen Type'],
    checkInTime: bubbleListing['Check-in Time'],
    checkOutTime: bubbleListing['Check-out Time'],
    nightsAvailableList: bubbleListing['Nights Available (List)'] || [],
    nightsAvailableNumbers: (bubbleListing['Nights Available (Numbers)'] || []) as DayOfWeek[],
    nightsNotAvailable: (bubbleListing['Nights Not Available'] || []) as DayOfWeek[],
    pricingList: {
      combinedMarkup: bubbleListing['Pricing List']?.['Combined Markup'] || 0,
      fullTimeDiscount: bubbleListing['Pricing List']?.['Full Time Discount'] || 0,
      hostCompensation: bubbleListing['Pricing List']?.['Host Compensation'] || [],
      markupAndDiscountMultiplier: bubbleListing['Pricing List']?.['Markup and Discount Multiplier'] || [],
      nightlyPrice: bubbleListing['Pricing List']?.['Nightly Price'] || [],
      numberSelectedNights: bubbleListing['Pricing List']?.['Number Selected Nights'] || [],
      overallSiteMarkup: bubbleListing['Pricing List']?.['Overall Site Markup'] || 0,
      slope: bubbleListing['Pricing List']?.Slope || 0,
      startingNightlyPrice: bubbleListing['Pricing List']?.['Starting Nightly Price'] || 0,
      unitMarkup: bubbleListing['Pricing List']?.['Unit Markup'] || 0,
      unusedNights: bubbleListing['Pricing List']?.['Unused Nights'] || [],
      unusedNightsDiscount: bubbleListing['Pricing List']?.['Unused Nights Discount'] || [],
      weeklyPriceAdjust: bubbleListing['Pricing List']?.['Weekly Price Adjust'] || 0
    },
    minimumNights: bubbleListing['Minimum Nights'] || 1,
    maximumNights: bubbleListing['Maximum Nights'],
    daysAvailable: (bubbleListing['Days Available'] || [0, 1, 2, 3, 4, 5, 6]) as DayOfWeek[],
    daysNotAvailable: (bubbleListing['Days Not Available'] || []) as DayOfWeek[]
  };
};

export const fetchListingsFromBubble = async (): Promise<Listing[]> => {
  if (!BUBBLE_API_URL || !BUBBLE_API_KEY) {
    console.warn('Bubble API credentials not configured. Using mock data.');
    return [];
  }

  try {
    const response = await fetch(`${BUBBLE_API_URL}/api/1.1/obj/listing`, {
      headers: {
        'Authorization': `Bearer ${BUBBLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Bubble API error: ${response.statusText}`);
    }

    const data = await response.json();
    const listings = data.response.results as BubbleListing[];

    // Filter for active, approved, complete listings with confirmed availability
    return listings
      .filter(listing =>
        listing.Active &&
        listing.Approved &&
        listing.Complete &&
        listing['Confirmed Availability']
      )
      .map(transformBubbleListing);
  } catch (error) {
    console.error('Error fetching listings from Bubble:', error);
    throw error;
  }
};

export const fetchListingById = async (listingId: string): Promise<Listing | null> => {
  if (!BUBBLE_API_URL || !BUBBLE_API_KEY) {
    console.warn('Bubble API credentials not configured.');
    return null;
  }

  try {
    const response = await fetch(`${BUBBLE_API_URL}/api/1.1/obj/listing/${listingId}`, {
      headers: {
        'Authorization': `Bearer ${BUBBLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Bubble API error: ${response.statusText}`);
    }

    const data = await response.json();
    return transformBubbleListing(data.response as BubbleListing);
  } catch (error) {
    console.error('Error fetching listing from Bubble:', error);
    throw error;
  }
};

// For display purposes - returns listing name/address
export interface ListingOption {
  id: string;
  displayName: string;
  unitName?: string;
  address?: string;
  bedroomCount?: number;
  bathroomCount?: number;
}

export const getListingOptions = async (): Promise<ListingOption[]> => {
  try {
    const listings = await fetchListingsFromBubble();

    // If no listings from Bubble, return empty array (mock will be used in PreviewApp)
    if (listings.length === 0) {
      return [];
    }

    return listings.map(listing => ({
      id: listing.id,
      displayName: listing.id, // Will be enhanced with Unit Name/Address if available
      unitName: undefined,
      address: undefined,
      bedroomCount: undefined,
      bathroomCount: undefined
    }));
  } catch (error) {
    console.error('Error getting listing options:', error);
    return [];
  }
};
