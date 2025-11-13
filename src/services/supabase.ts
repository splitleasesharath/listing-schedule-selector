import { createClient } from '@supabase/supabase-js';
import { Listing } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please add them to your .env file.');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Fetch all listings from Bubble database
export const fetchListings = async (): Promise<Listing[]> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { data, error } = await supabase
      .from('Listing')
      .select('*')
      .eq('Active', true)
      .eq('Approved', true);

    if (error) {
      throw error;
    }

    // Transform Bubble data to our Listing interface
    return (data || []).map(transformBubbleListing);
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

// Fetch a single listing by ID
export const fetchListingById = async (id: string): Promise<Listing | null> => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  try {
    const { data, error } = await supabase
      .from('Listing')
      .select('*')
      .eq('_id', id)
      .single();

    if (error) {
      throw error;
    }

    return data ? transformBubbleListing(data) : null;
  } catch (error) {
    console.error('Error fetching listing:', error);
    throw error;
  }
};

// Transform Bubble data format to our Listing interface
function transformBubbleListing(bubbleData: any): Listing {
  // Parse pricing list if it exists
  const pricingList = bubbleData.pricing_list || {
    combinedMarkup: 0,
    fullTimeDiscount: 0,
    hostCompensation: [],
    markupAndDiscountMultiplier: [],
    nightlyPrice: [],
    numberSelectedNights: [],
    overallSiteMarkup: 0,
    slope: 0,
    startingNightlyPrice: 0,
    unitMarkup: 0,
    unusedNights: [],
    unusedNightsDiscount: [],
    weeklyPriceAdjust: 0
  };

  // Convert days available to day of week numbers (0-6)
  const daysAvailable = (bubbleData['Days Available (List of Days)'] || [])
    .map((day: any) => {
      const dayMap: Record<string, number> = {
        'Sunday': 0,
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6
      };
      return dayMap[day] ?? 0;
    });

  return {
    id: bubbleData._id,
    firstAvailable: new Date(bubbleData['First Available']),
    lastAvailable: new Date(bubbleData['Last Available']),
    numberOfNightsAvailable: bubbleData['# of nights available'] || 7,
    active: bubbleData.Active === true,
    approved: bubbleData.Approved === true,
    datesBlocked: (bubbleData['Dates - Blocked'] || []).map((d: string) => new Date(d)),
    complete: bubbleData.Complete === true,
    confirmedAvailability: bubbleData.confirmedAvailability === true,
    kitchenType: bubbleData['Kitchen Type'],
    checkInTime: bubbleData['NEW Date Check-in Time'] || '2:00 pm',
    checkOutTime: bubbleData['NEW Date Check-out Time'] || '11:00 am',
    nightsAvailableList: bubbleData['Nights Available (List of Nights)'] || [],
    nightsAvailableNumbers: bubbleData['Nights Available (numbers)'] || [],
    nightsNotAvailable: bubbleData['Nights Not Available'] || [],
    pricingList: pricingList,
    minimumNights: bubbleData['Minimum Nights'] || 2,
    maximumNights: bubbleData['Maximum Nights'] || 7,
    daysAvailable: daysAvailable.length > 0 ? daysAvailable : [0, 1, 2, 3, 4, 5, 6],
    daysNotAvailable: []
  };
}

// Get mock listing for development/testing
export const getMockListing = (): Listing => {
  return {
    id: 'mock-listing-1',
    firstAvailable: new Date(),
    lastAvailable: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    numberOfNightsAvailable: 7,
    active: true,
    approved: true,
    datesBlocked: [],
    complete: true,
    confirmedAvailability: true,
    kitchenType: 'Full Kitchen',
    checkInTime: '2:00 pm',
    checkOutTime: '11:00 am',
    nightsAvailableList: [],
    nightsAvailableNumbers: [0, 1, 2, 3, 4, 5, 6],
    nightsNotAvailable: [],
    pricingList: {
      combinedMarkup: 15,
      fullTimeDiscount: 10,
      hostCompensation: [100, 200, 300, 400, 500],
      markupAndDiscountMultiplier: [1.0, 0.95, 0.9, 0.85, 0.8],
      nightlyPrice: [100, 95, 90, 85, 80, 75, 70],
      numberSelectedNights: [1, 2, 3, 4, 5, 6, 7],
      overallSiteMarkup: 5,
      slope: 0,
      startingNightlyPrice: 100,
      unitMarkup: 0,
      unusedNights: [],
      unusedNightsDiscount: [],
      weeklyPriceAdjust: 0
    },
    minimumNights: 2,
    maximumNights: 7,
    daysAvailable: [0, 1, 2, 3, 4, 5, 6],
    daysNotAvailable: []
  };
};
