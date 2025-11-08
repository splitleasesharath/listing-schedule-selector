import { Listing, DayOfWeek, ZATPriceConfiguration, RentalType } from '../types';

const BUBBLE_API_URL = import.meta.env.VITE_BUBBLE_API_URL || '';
const BUBBLE_API_KEY = import.meta.env.VITE_BUBBLE_API_KEY || '';

interface BubbleListing {
  _id: string;
  Name?: string;
  'Listing Name'?: string;
  'Unit Name'?: string;
  ' First Available': string;
  'Last Available': string;
  '# of nights available': number;
  Active: boolean;
  Approved: boolean;
  'Dates - Blocked': string[];
  Complete: boolean;
  confirmedAvailability: boolean;
  'Kitchen Type': string;
  'NEW Date Check-in Time': string;
  'NEW Date Check-out Time': string;
  'Nights Available (List of Nights) ': any[];
  'Nights Available (numbers)': number[];
  'Nights Not Available': number[];
  // Individual pricing fields (fallback)
  '💰Nightly Host Rate for 2 nights'?: number;
  '💰Nightly Host Rate for 3 nights'?: number;
  '💰Nightly Host Rate for 4 nights'?: number;
  '💰Nightly Host Rate for 5 nights'?: number;
  '💰Nightly Host Rate for 7 nights'?: number;
  '💰Monthly Host Rate'?: number;
  '💰Weekly Host Rate'?: number;
  '💰Cleaning Cost / Maintenance Fee'?: number;
  '💰Damage Deposit'?: number;
  cleaningCost?: number;
  damageDeposit?: number;
  // Pricing list reference
  pricing_list?: string;
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
  'Days Available (List of Days)': any[];
  'Days Not Available': number[];
  'rental type'?: string;
  'Weeks offered'?: string;
  // Additional fields for display
  'Unit Name'?: string;
  Address?: string;
  'Bedroom Count'?: number;
  'Bathroom Count'?: number;
}

export const transformBubbleListing = (bubbleListing: BubbleListing): Listing => {
  // Try to get name from various possible fields
  const name = bubbleListing.Name || bubbleListing['Listing Name'] || bubbleListing['Unit Name'] || '';
  const displayName = name || `Listing ${bubbleListing._id.substring(0, 8)}`;

  // Build nightly price array from individual fields
  const nightlyPriceMap: Record<number, number> = {
    2: bubbleListing['💰Nightly Host Rate for 2 nights'] || 0,
    3: bubbleListing['💰Nightly Host Rate for 3 nights'] || 0,
    4: bubbleListing['💰Nightly Host Rate for 4 nights'] || 0,
    5: bubbleListing['💰Nightly Host Rate for 5 nights'] || 0,
    7: bubbleListing['💰Nightly Host Rate for 7 nights'] || 0,
  };

  const nightlyPrice: number[] = [];
  const numberSelectedNights: number[] = [];

  // Build arrays for available night counts
  Object.entries(nightlyPriceMap).forEach(([nights, price]) => {
    if (price > 0) {
      numberSelectedNights.push(parseInt(nights));
      nightlyPrice.push(price);
    }
  });

  // Use first available price as starting price
  const startingNightlyPrice = nightlyPrice.length > 0 ? nightlyPrice[0] : 0;

  // Extract days available from list
  const daysAvailableList = bubbleListing['Days Available (List of Days)'] || [];

  // Map day names to numbers
  const dayNameToNumber: Record<string, DayOfWeek> = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
  };

  const daysAvailable = daysAvailableList.map((day: any) => {
    // If it's already a number, return it
    if (typeof day === 'number') {
      return day as DayOfWeek;
    }
    // If it's an object with dayOfWeek, extract it
    if (typeof day === 'object' && day.dayOfWeek !== undefined) {
      return day.dayOfWeek as DayOfWeek;
    }
    // If it's a string name, convert to number
    if (typeof day === 'string') {
      return dayNameToNumber[day];
    }
    return undefined;
  }).filter((d: any) => d !== undefined && d !== null) as DayOfWeek[];

  console.log('  🔄 Converted days available:', { original: daysAvailableList, converted: daysAvailable });

  return {
    id: bubbleListing._id,
    name,
    displayName,
    firstAvailable: new Date(bubbleListing[' First Available']),
    lastAvailable: new Date(bubbleListing['Last Available']),
    numberOfNightsAvailable: bubbleListing['# of nights available'],
    active: bubbleListing.Active,
    approved: bubbleListing.Approved || false,
    datesBlocked: bubbleListing['Dates - Blocked'] || [],
    complete: bubbleListing.Complete || false,
    confirmedAvailability: bubbleListing.confirmedAvailability || false,
    kitchenType: bubbleListing['Kitchen Type'],
    checkInTime: (bubbleListing['NEW Date Check-in Time'] || '2:00 pm') as any,
    checkOutTime: (bubbleListing['NEW Date Check-out Time'] || '11:00 am') as any,
    nightsAvailableList: bubbleListing['Nights Available (List of Nights) '] || [],
    nightsAvailableNumbers: (bubbleListing['Nights Available (numbers)'] || []) as DayOfWeek[],
    nightsNotAvailable: (bubbleListing['Nights Not Available'] || []) as DayOfWeek[],
    pricingList: {
      combinedMarkup: 0,
      fullTimeDiscount: 0,
      hostCompensation: [],
      markupAndDiscountMultiplier: [],
      nightlyPrice,
      numberSelectedNights,
      overallSiteMarkup: 0,
      slope: 0,
      startingNightlyPrice,
      unitMarkup: 0,
      unusedNights: [],
      unusedNightsDiscount: [],
      weeklyPriceAdjust: 0
    },
    minimumNights: bubbleListing['Minimum Nights'] || 1,
    maximumNights: bubbleListing['Maximum Nights'],
    daysAvailable: daysAvailable.length > 0 ? daysAvailable : [0, 1, 2, 3, 4, 5, 6],
    daysNotAvailable: (bubbleListing['Days Not Available'] || []) as DayOfWeek[],
    rentalType: bubbleListing['rental type'] as RentalType | undefined,
    monthlyHostRate: bubbleListing['💰Monthly Host Rate'],
    weeklyHostRate: bubbleListing['💰Weekly Host Rate'],
    weeksOffered: bubbleListing['Weeks offered'],
    cleaningCost: bubbleListing['💰Cleaning Cost / Maintenance Fee'],
    damageDeposit: bubbleListing['💰Damage Deposit']
  };
};

export const fetchListingsFromBubble = async (): Promise<Listing[]> => {
  if (!BUBBLE_API_URL || !BUBBLE_API_KEY) {
    console.warn('Bubble API credentials not configured. Using mock data.');
    return [];
  }

  try {
    console.log('🔵 Fetching listings from Bubble...');
    console.log('  URL:', `${BUBBLE_API_URL}/api/1.1/obj/listing`);
    console.log('  API Key:', BUBBLE_API_KEY ? '✓ Present' : '✗ Missing');

    const response = await fetch(`${BUBBLE_API_URL}/api/1.1/obj/listing`, {
      headers: {
        'Authorization': `Bearer ${BUBBLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('  Response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('  Error response:', errorText);
      throw new Error(`Bubble API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('  Raw response data:', data);

    const listings = data.response?.results as BubbleListing[];
    console.log('  Total listings found:', listings?.length || 0);

    // Log first listing to see available fields
    if (listings && listings.length > 0) {
      console.log('  Sample listing fields:', Object.keys(listings[0]));
      console.log('  Sample listing data:', listings[0]);
      console.log('  Pricing List field:', listings[0]['Pricing List']);
      console.log('  Check-in Time:', listings[0]['Check-in Time']);
      console.log('  Check-out Time:', listings[0]['Check-out Time']);
      console.log('  Minimum Nights:', listings[0]['Minimum Nights']);
      console.log('  Days Available (List of Days):', listings[0]['Days Available (List of Days)']);
      console.log('  rental type:', listings[0]['rental type']);
    }

    if (!listings || listings.length === 0) {
      console.warn('  No listings in response');
      return [];
    }

    // Filter for active listings only (other fields may not be exposed in API)
    const filtered = listings.filter(listing => {
      const isActive = listing.Active === true;

      if (!isActive) {
        console.log(`  Filtered out listing ${listing._id}: Active=${listing.Active}`);
      }

      return isActive;
    });

    console.log('  Filtered listings (active only):', filtered.length);
    console.log('  Note: If you want stricter filtering, enable Approved/Complete/Confirmed Availability fields in Bubble API settings');

    return filtered.map(transformBubbleListing);
  } catch (error) {
    console.error('❌ Error fetching listings from Bubble:', error);
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

// Fetch ZAT Price Configuration from Bubble
export const fetchZATPriceConfiguration = async (): Promise<ZATPriceConfiguration> => {
  // Default values provided by user
  const defaultConfig: ZATPriceConfiguration = {
    unusedNightsDiscountMultiplier: 0.03,
    weeklyPriceAdjust: 0,
    overallSiteMarkup: 0.17,
    averageDaysPerMonth: 31,
    fullTimeDiscount: 0.13
  };

  if (!BUBBLE_API_URL || !BUBBLE_API_KEY) {
    console.warn('Bubble API credentials not configured. Using default ZAT Price Configuration.');
    return defaultConfig;
  }

  try {
    console.log('🔵 Fetching ZAT Price Configuration from Bubble...');

    const response = await fetch(`${BUBBLE_API_URL}/api/1.1/obj/zat-price_configuration`, {
      headers: {
        'Authorization': `Bearer ${BUBBLE_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      console.warn('  Failed to fetch ZAT Price Configuration, using defaults');
      return defaultConfig;
    }

    const data = await response.json();
    const configs = data.response?.results;

    if (!configs || configs.length === 0) {
      console.warn('  No ZAT Price Configuration found, using defaults');
      return defaultConfig;
    }

    // Use the most recent configuration (first one)
    const config = configs[0];
    console.log('  ✓ ZAT Price Configuration loaded:', config);

    return {
      unusedNightsDiscountMultiplier: config['Unused nights discount multiplier'] || defaultConfig.unusedNightsDiscountMultiplier,
      weeklyPriceAdjust: config['Weekly Price Adj'] || defaultConfig.weeklyPriceAdjust,
      overallSiteMarkup: config['Overall Site Markup'] || defaultConfig.overallSiteMarkup,
      averageDaysPerMonth: config['Average days per month'] || defaultConfig.averageDaysPerMonth,
      fullTimeDiscount: config['Full Time (7 Nights)'] || defaultConfig.fullTimeDiscount
    };
  } catch (error) {
    console.error('❌ Error fetching ZAT Price Configuration:', error);
    return defaultConfig;
  }
};
