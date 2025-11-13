// Type definitions for Listing Schedule Selector

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type RentalType = 'Monthly' | 'Weekly' | 'Nightly';

export type AlertType = 'error' | 'warning' | 'info' | 'success';

export type CheckInOutTime = '11:00 am' | '12:00 pm' | '1:00 pm' | '2:00 pm' | '3:00 pm';

// Day object matching Bubble's Days option set
export interface Day {
  id: string;
  name: string;
  dayOfWeek: DayOfWeek;
  singleLetter: string;
  first3Letters: string;
  bubbleNumber: number;
  bubbleNumberText: string;
  nextDay: DayOfWeek;
  previousNight: DayOfWeek;
  associatedNight: DayOfWeek;
  isAvailable: boolean;
}

// Night object matching Bubble's Nights option set
export interface Night {
  id: string;
  name: string;
  nightNumber: DayOfWeek;
  bubbleNumber: number;
  bubbleNumberText: string;
  associatedCheckin: DayOfWeek;
  associatedCheckout: DayOfWeek;
  nextDay: DayOfWeek;
  nextNight: DayOfWeek;
  previousDay: DayOfWeek;
  sameDay: DayOfWeek;
  first3Letters: string;
  singleLetter: string;
}

// Pricing List matching Bubble data type
export interface PricingList {
  combinedMarkup: number;
  fullTimeDiscount: number;
  hostCompensation: number[];
  markupAndDiscountMultiplier: number[];
  nightlyPrice: number[];
  numberSelectedNights: number[];
  overallSiteMarkup: number;
  slope: number;
  startingNightlyPrice: number;
  unitMarkup: number;
  unusedNights: number[];
  unusedNightsDiscount: number[];
  weeklyPriceAdjust: number;
}

// Main Listing interface matching Bubble data type
export interface Listing {
  id: string;
  firstAvailable: Date;
  lastAvailable: Date;
  numberOfNightsAvailable: number;
  active: boolean;
  approved: boolean;
  datesBlocked: Date[];
  complete: boolean;
  confirmedAvailability: boolean;
  kitchenType?: string;
  checkInTime: CheckInOutTime;
  checkOutTime: CheckInOutTime;
  nightsAvailableList: Night[];
  nightsAvailableNumbers: number[];
  nightsNotAvailable: Night[];
  pricingList: PricingList;
  rentalType?: RentalType;
  minimumNights: number;
  maximumNights: number;
  daysAvailable: DayOfWeek[];
  daysNotAvailable: DayOfWeek[];
}

// Price breakdown for display
export interface PriceBreakdown {
  basePrice: number;
  nightlyRate: number;
  discountAmount: number;
  markupAmount: number;
  totalPrice: number;
  pricePerNight: number;
  numberOfNights: number;
  fourWeekRent?: number;
  initialPayment?: number;
}

// Component state matching Bubble custom states
export interface ScheduleState {
  selectedDays: Day[];
  notSelectedDays: Day[];
  selectedNights: Night[];
  unusedNights: Night[];
  selectedCheckinDays: Day[];
  checkInDay: Day | null;
  checkOutDay: Day | null;
  startNight: number | null;
  endNight: number | null;
  startDayNumber: number | null;
  nightsCount: number;
  isContiguous: boolean;
  acceptableSchedule: boolean;
  autobindListing: boolean;
  limitToFiveNights: boolean;
  recalculateState: boolean;
  actualWeeksDaysAM: number[];
  actualWeeksDaysPM: number[];
  changeListings: boolean[];
  changePricing: string;
  labels: string[];
  listingNightlyN: number[];
  monthly: boolean[];
  priceMultiplier: number[];
  numberOfMonths: number | null;
  otherReservation: number[];
  proratedNights: number[];
  reservationSpecificDays: any[];
  guestDesiredUserDate: any[];
  fourWeekRent: number[];
  totalReservation: number[];
  listingMaximumNights: number | null;
}

// Error state
export interface ErrorState {
  hasError: boolean;
  errorType: 'minimum_nights' | 'maximum_nights' | 'availability' | 'contiguity' | 'days_selected' | 'nights_outside_host' | null;
  errorMessage: string;
}

// Discount interface
export interface Discount {
  id: string;
  type: 'length_of_stay' | 'unused_nights' | 'promotional';
  value: number;
  isPercentage: boolean;
  minNights?: number;
}

// Markup interface
export interface Markup {
  id: string;
  type: 'service_fee' | 'cleaning' | 'platform';
  value: number;
  isPercentage: boolean;
}

// Toast notification options
export interface ToastOptions {
  title: string;
  content?: string;
  time?: number;
  alertType?: AlertType;
  showOnLive?: boolean;
}
