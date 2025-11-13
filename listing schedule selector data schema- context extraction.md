LISTING SCHEDULE SELECTOR \- BUBBLE TO REACT CONVERSION GUIDE

\==================================================

OVERVIEW  
This guide provides a comprehensive, step-by-step approach to convert the Bubble “Listing Schedule Selector” reusable element into a standalone React component.

\==================================================

SECTION 1: DATA SCHEMA ANALYSIS

1.1 PRIMARY DATA TYPES

1. LISTING DATA TYPE  
2. The main data type that powers the schedule selector component.

Key Fields:

- First Available: date  
- \- \# of nights available: number (default: 7\)  
- \- Active: yes/no  
- \- Approved: yes/no  
- \- Dates \- Blocked: List of dates  
- \- Complete: yes/no  
- \- confirmedAvailability: yes/no  
- \- Kitchen Type: Kitchen Types (option set)  
- \- Last Available: date  
- \- NEW Date Check-in Time: Check-In and Check-Out Times (default: 2:00 pm)  
- \- NEW Date Check-out Time: Check-In and Check-Out Times (default: 11:00 am)  
- \- Nights Available (List of Nights): List of Nightses  
- \- Nights Available (numbers): List of numbers  
- \- Nights Not Available: List of Nightses  
- \- pricing\_list: pricing\_list (related data type)

B. PRICING\_LIST DATA TYPE  
Contains all pricing-related information for the listing.

Key Fields:

- Combined Markup: number  
- \- Full Time Discount: number  
- \- Host Compensation: List of nums  
- \- Markup and Discount Multiplier: List of nums  
- \- Nightly Price: List of nums  
- \- Number Selected Nights: List of numbers  
- \- Overall Site Markup: number  
- \- Slope: number  
- \- Starting Nightly Price: number  
- \- Unit Markup: number  
- \- Unused Nights: List of nums  
- \- Unused Nights Discount: List of nums  
- \- Weekly Price Adjust: number

\==================================================

SECTION 2: OPTION SETS

2.1 DAYS OPTION SET

Attributes:

- Associated Night: Nights (reference to Nights option set)  
- \- Bubble Number: number  
- \- Bubble Number (Text): text  
- \- First 3 letters: text  
- \- Next Day: Days (self-reference)  
- \- Previous Night: Nights  
- \- Single Letter: text  
- \- Display: text (built-in)

Options:

1. Sunday  
2. 2\. Monday  
3. 3\. Tuesday  
4. 4\. Wednesday  
5. 5\. Thursday  
6. 6\. Friday  
7. 7\. Saturday

2.2 NIGHTS OPTION SET

Attributes:

- Associated Checkin: Days  
- \- Associated Checkout: Days  
- \- Bubble Number: number  
- \- Bubble Number (Text): text  
- \- First 3 letters: text  
- \- Next Day: Days  
- \- Next Night: Nights (self-reference)  
- \- Previous Day: Days  
- \- Same Day: Days  
- \- Single Letter: text  
- \- Display: text (built-in)

Options:

1. Sunday  
2. 2\. Monday  
3. 3\. Tuesday  
4. 4\. Wednesday  
5. 5\. Thursday  
6. 6\. Friday  
7. 7\. Saturday

\==================================================

SECTION 3: COMPONENT STRUCTURE ANALYSIS

3.1 BUBBLE ELEMENT HIERARCHY

Root Element: Listing Schedule Selector (Group)  
├── Type of content: Listing  
├── RG Days (Repeating Group)  
│   ├── Type of content: Days  
│   ├── Data source: All Days  
│   ├── Layout: 1 row × 7 columns (fixed)  
│   └── Cell content: Individual day cells displaying schedule info  
├── Overlays  
│   ├── Days Selected Error  
│   ├── Nights outside of host…  
│   └── GF: Day selected not available…  
└── Layers  
    ├── F: popupnumber  
    ├── Floppy popupNumber  
    ├── JS2B-ChecksContiguity  
    └── RG Days (main repeating group)

\==================================================

SECTION 4: REACT COMPONENT ARCHITECTURE

4.1 COMPONENT BREAKDOWN

Recommended React Component Structure:

1. ListingScheduleSelector (Main Container)  
2.    \- Props: listingData  
3.    \- State: selectedDates, errors, availability  
4.      
5. 2\. DayCell (Individual Day Component)  
6.    \- Props: day, isAvailable, isSelected, onClick  
7.    \- Displays day letter/abbreviation  
8.    \- Shows availability status  
9.    \- Handles selection logic

3\. ScheduleGrid (Days Container)

- Props: days, availability, onDaySelect  
-    \- Renders 7 DayCell components  
-    \- Manages grid layout

4\. ErrorOverlay (Error Display)

- Props: errorType, isVisible, message  
-    \- Shows validation errors  
-      
- 5\. PricingCalculator (Utility Component)  
-    \- Calculates pricing based on selected nights  
-    \- Applies discounts and markups

\==================================================

SECTION 5: DATA MODELS (TypeScript Interfaces)

5.1 TYPESCRIPT INTERFACES

\`\`\`typescript  
// Days enum matching the option set  
Enum DayOfWeek {  
  SUNDAY \= ‘Sunday’,  
  MONDAY \= ‘Monday’,  
  TUESDAY \= ‘Tuesday’,  
  WEDNESDAY \= ‘Wednesday’,  
  THURSDAY \= ‘Thursday’,  
  FRIDAY \= ‘Friday’,  
  SATURDAY \= ‘Saturday’  
}

// Nights enum matching the option set  
Enum NightOfWeek {  
  SUNDAY \= ‘Sunday’,  
  MONDAY \= ‘Monday’,  
  TUESDAY \= ‘Tuesday’,  
  WEDNESDAY \= ‘Wednesday’,  
  THURSDAY \= ‘Thursday’,  
  FRIDAY \= ‘Friday’,  
  SATURDAY \= ‘Saturday’  
}

// Day option set interface  
Interface Day {  
  Name: DayOfWeek;  
  associatedNight: NightOfWeek;  
  bubbleNumber: number;  
  bubbleNumberText: string;  
  first3Letters: string;  
  nextDay: DayOfWeek;  
  previousNight: NightOfWeek;  
  singleLetter: string;  
  Display: string;  
}

// Night option set interface  
Interface Night {  
  Name: NightOfWeek;  
  associatedCheckin: DayOfWeek;  
  associatedCheckout: DayOfWeek;  
  bubbleNumber: number;  
  bubbleNumberText: string;  
  first3Letters: string;  
  nextDay: DayOfWeek;  
  nextNight: NightOfWeek;  
  previousDay: DayOfWeek;  
  sameDay: DayOfWeek;  
  singleLetter: string;  
  Display: string;  
}

// Pricing list interface  
Interface PricingList {  
  combinedMarkup: number;  
  fullTimeDiscount: number;  
  hostCompensation: number\[\];  
  markupAndDiscountMultiplier: number\[\];  
  nightlyPrice: number\[\];  
  numberSelectedNights: number\[\];  
  overallSiteMarkup: number;  
  Slope: number;  
  startingNightlyPrice: number;  
  unitMarkup: number;  
  unusedNights: number\[\];  
  unusedNightsDiscount: number\[\];  
  weeklyPriceAdjust: number;  
}

// Main listing interface  
Interface Listing {  
  Id: string;  
  firstAvailable: Date;  
  numberOfNightsAvailable: number;  
  Active: boolean;  
  Approved: boolean;  
  datesBlocked: Date\[\];  
  Complete: boolean;  
  confirmedAvailability: boolean;  
  kitchenType: string;  
  lastAvailable: Date;  
  checkInTime: string;  
  checkOutTime: string;  
  nightsAvailableList: Night\[\];  
  nightsAvailableNumbers: number\[\];  
  nightsNotAvailable: Night\[\];  
  pricingList: PricingList;  
}

// Component state interface  
Interface ScheduleState {  
  selectedDates: Date\[\];  
  selectedNights: Night\[\];  
  Errors: ErrorType\[\];  
  totalPrice: number;  
  isContiguous: boolean;  
}

// Error types  
Enum ErrorType {  
  DAYS\_SELECTED\_ERROR \= ‘DAYS\_SELECTED\_ERROR’,  
  NIGHTS\_OUTSIDE\_HOST \= ‘NIGHTS\_OUTSIDE\_HOST’,  
  DAY\_NOT\_AVAILABLE \= ‘DAY\_NOT\_AVAILABLE’  
}  
\`\`\`

\==================================================

SECTION 6: STEP-BY-STEP CONVERSION PROCESS

STEP 1: SET UP REACT PROJECT  
\`\`\`bash  
Npx create-react-app listing-schedule-selector –template typescript  
Cd listing-schedule-selector  
Npm install date-fns lodash  
Npm install –save-dev @types/lodash\`\`\`STEP 2: CREATE CONSTANTS FILECreate a file: src/constants/[optionSets.ts](http://optionSets.ts)\`\`\`typescriptimport { Day, Night, DayOfWeek, NightOfWeek } from ‘../types’;

Export const DAYS: Day\[\] \= \[  
  {  
    Name: DayOfWeek.SUNDAY,  
    associatedNight: NightOfWeek.SUNDAY,  
    bubbleNumber: 0,  
    bubbleNumberText: ‘0’,  
    first3Letters: ‘Sun’,  
    nextDay: DayOfWeek.MONDAY,  
    previousNight: NightOfWeek.SATURDAY,  
    singleLetter: ‘S’,  
    Display: ‘Sunday’  
  },  
  {  
    Name: DayOfWeek.MONDAY,  
    associatedNight: NightOfWeek.MONDAY,  
    bubbleNumber: 1,  
    bubbleNumberText: ‘1’,  
    first3Letters: ‘Mon’,  
    nextDay: DayOfWeek.TUESDAY,  
    previousNight: NightOfWeek.SUNDAY,  
    singleLetter: ‘M’,  
    Display: ‘Monday’  
  },  
  // … continue for all 7 days  
\];

Export const NIGHTS: Night\[\] \= \[  
  {  
    Name: NightOfWeek.SUNDAY,  
    associatedCheckin: DayOfWeek.SUNDAY,  
    associatedCheckout: DayOfWeek.MONDAY,  
    bubbleNumber: 0,  
    bubbleNumberText: ‘0’,  
    first3Letters: ‘Sun’,  
    nextDay: DayOfWeek.MONDAY,  
    nextNight: NightOfWeek.MONDAY,  
    previousDay: DayOfWeek.SATURDAY,  
    sameDay: DayOfWeek.SUNDAY,  
    singleLetter: ‘S’,  
    Display: ‘Sunday’  
  },  
  // … continue for all 7 nights  
\];  
\`\`\`

STEP 3: CREATE MAIN COMPONENT  
Create file: src/components/ListingScheduleSelector.tsx

\`\`\`typescript  
Import React, { useState, useEffect } from ‘react’;  
Import { Listing, ScheduleState, ErrorType } from ‘../types’;  
Import ScheduleGrid from ‘./ScheduleGrid’;  
Import ErrorOverlay from ‘./ErrorOverlay’;  
Import { calculatePrice } from ‘../utils/pricingCalculator’;

Interface Props {  
  Listing: Listing;  
  onSelectionChange?: (selectedNights: Date\[\]) \=\> void;  
}

Const ListingScheduleSelector: [React.FC](http://React.FC)\<Props\> \= ({   
  Listing,   
  onSelectionChange   
}) \=\> {  
  Const \[state, setState\] \= useState\<ScheduleState\>({  
    selectedDates: \[\],  
    selectedNights: \[\],  
    Errors: \[\],  
    totalPrice: 0,  
    isContiguous: true  
  });

  Const handleDaySelect \= (date: Date) \=\> {  
    // Implement selection logic  
    // Check if date is available  
    // Validate contiguity  
    // Update state  
  };

  Const validateSelection \= () \=\> {  
    // Check for errors  
    // Validate nights are within host availability  
    // Check for blocked dates  
  };

  useEffect(() \=\> {  
    If (state.selectedNights.length \> 0\) {  
      Const price \= calculatePrice(  
        state.selectedNights,  
        listing.pricingList  
      );  
      setState(prev \=\> ({ …prev, totalPrice: price }));  
    }  
  }, \[state.selectedNights\]);

  Return (  
    \<div className=\\”listing-schedule-selector\\”\>  
      \<ScheduleGrid  
        listing={listing}  
        selectedDates={state.selectedDates}  
        onDaySelect={handleDaySelect}  
      /\>  
      {state.errors.map(error \=\> (  
        \<ErrorOverlay   
          key={error}  
          errorType={error}  
          isVisible={true}  
        /\>  
      ))}  
    \</div\>  
  );  
};

Export default ListingScheduleSelector;  
\`\`\`

STEP 4: CREATE SCHEDULE GRID COMPONENT  
Create file: src/components/ScheduleGrid.tsx

\`\`\`typescript  
Import React from ‘react’;  
Import DayCell from ‘./DayCell’;  
Import { DAYS } from ‘../constants/optionSets’;  
Import { Listing } from ‘../types’;

Interface Props {  
  Listing: Listing;  
  selectedDates: Date\[\];  
  onDaySelect: (date: Date) \=\> void;  
}

Const ScheduleGrid: [React.FC](http://React.FC)\<Props\> \= ({  
  Listing,  
  selectedDates,  
  onDaySelect  
}) \=\> {  
  Return (  
    \<div className=\\”schedule-grid\\”\>  
      {DAYS.map(day \=\> (  
        \<DayCell  
          key={[day.name](http://day.name)}  
          day={day}  
          listing={listing}  
          isSelected={false} // Calculate based on selectedDates  
          isAvailable={true} // Calculate based on listing availability  
          onClick={() \=\> onDaySelect(new Date())}  
        /\>  
      ))}  
    \</div\>  
  );  
};

Export default ScheduleGrid;  
\`\`\`

STEP 5: CREATE DAY CELL COMPONENT  
Create file: src/components/DayCell.tsx

\`\`\`typescript  
Import React from ‘react’;  
Import { Day, Listing } from ‘../types’;

Interface Props {  
  Day: Day;  
  Listing: Listing;  
  isSelected: boolean;  
  isAvailable: boolean;  
  onClick: () \=\> void;  
}

Const DayCell: [React.FC](http://React.FC)\<Props\> \= ({  
  Day,  
  Listing,  
  isSelected,  
  isAvailable,  
  onClick  
}) \=\> {  
  Const cellClasses \= \[  
    ‘Day-cell’,  
    isSelected && ‘selected’,  
    \!isAvailable && ‘unavailable’  
  \].filter(Boolean).join(‘ ‘);

  Return (  
    \<div   
      className={cellClasses}  
      onClick={isAvailable ? onClick : undefined}  
    \>  
      \<div className=\\”day-letter\\”\>{day.singleLetter}\</div\>  
      \<div className=\\”day-name\\”\>{day.first3Letters}\</div\>  
    \</div\>  
  );  
};

Export default DayCell;  
\`\`\`

STEP 6: CREATE ERROR OVERLAY COMPONENT  
Create file: src/components/ErrorOverlay.tsx

\`\`\`typescript  
Import React from ‘react’;  
Import { ErrorType } from ‘../types’;

Interface Props {  
  errorType: ErrorType;  
  isVisible: boolean;  
  Message?: string;  
}

Const ErrorOverlay: [React.FC](http://React.FC)\<Props\> \= ({  
  errorType,  
  isVisible,  
  Message  
}) \=\> {  
  If (\!isVisible) return null;

  Const getErrorMessage \= () \=\> {  
    Switch (errorType) {  
      Case ErrorType.DAYS\_SELECTED\_ERROR:  
        Return message || ‘Invalid day selection’;  
      Case ErrorType.NIGHTS\_OUTSIDE\_HOST:  
        Return message || ‘Selected nights outside host availability’;  
      Case ErrorType.DAY\_NOT\_AVAILABLE:  
        Return message || ‘Day not available’;  
      Default:  
        Return ‘An error occurred’;  
    }  
  };

  Return (  
    \<div className=\\”error-overlay\\”\>  
      \<div className=\\”error-message\\”\>  
        {getErrorMessage()}  
      \</div\>  
    \</div\>  
  );  
};

Export default ErrorOverlay;  
\`\`\`

STEP 7: CREATE PRICING CALCULATOR UTILITY  
Create file: src/utils/[pricingCalculator.ts](http://pricingCalculator.ts)

\`\`\`typescript  
Import { Night, PricingList } from ‘../types’;

Export const calculatePrice \= (  
  selectedNights: Night\[\],  
  pricingList: PricingList  
): number \=\> {  
  Const numberOfNights \= selectedNights.length;  
    
  // Get base nightly price from pricing list  
  Const basePrice \= pricingList.startingNightlyPrice;  
    
  // Apply slope for multiple nights  
  Const slopeAdjustment \= pricingList.slope \* numberOfNights;  
    
  // Calculate with markup  
  Const markup \= pricingList.combinedMarkup;  
    
  // Apply discounts if applicable  
  Const discount \= pricingList.fullTimeDiscount;  
    
  // Calculate final price  
  Let totalPrice \= (basePrice \+ slopeAdjustment) \* numberOfNights;  
  totalPrice \= totalPrice \* (1 \+ markup / 100);  
  totalPrice \= totalPrice \* (1 \- discount / 100);  
    
  Return Math.round(totalPrice \* 100\) / 100;  
};

Export const calculateNightlyPrices \= (  
  pricingList: PricingList,  
  numberOfNights: number  
): number\[\] \=\> {  
  // Return nightly prices based on number of selected nights  
  Const index \= pricingList.numberSelectedNights.indexOf(numberOfNights);  
    
  If (index \!== \-1 && pricingList.nightlyPrice\[index\]) {  
    Return \[pricingList.nightlyPrice\[index\]\];  
  }  
    
  // Fallback calculation  
  Return \[pricingList.startingNightlyPrice\];  
};  
\`\`\`

STEP 8: ADD VALIDATION LOGIC  
Create file: src/utils/[validators.ts](http://validators.ts)

\`\`\`typescript  
Import { Listing, Night } from ‘../types’;  
Import { isWithinInterval, parseISO } from ‘date-fns’;

Export const isDateAvailable \= (  
  Date: Date,  
  Listing: Listing  
): boolean \=\> {  
  // Check if date is within available range  
  Const isInRange \= isWithinInterval(date, {  
    Start: listing.firstAvailable,  
    End: listing.lastAvailable  
  });  
    
  // Check if date is not blocked  
  Const isNotBlocked \= \!listing.datesBlocked.some(  
    blockedDate \=\> blockedDate.getTime() \=== date.getTime()  
  );  
    
  Return isInRange && isNotBlocked && listing.active;  
};

Export const areNightsContiguous \= (  
  selectedNights: Night\[\]  
): boolean \=\> {  
  If (selectedNights.length \<= 1\) return true;  
    
  // Check if nights are in sequential order  
  For (let i \= 0; i \< selectedNights.length \- 1; i++) {  
    Const currentNight \= selectedNights\[i\];  
    Const nextNight \= selectedNights\[i \+ 1\];  
      
    If (currentNight.nextNight \!== [nextNight.name](http://nextNight.name)) {  
      Return false;  
    }  
  }  
    
  Return true;  
};

Export const isWithinHostAvailability \= (  
  selectedNights: Night\[\],  
  Listing: Listing  
): boolean \=\> {  
  // Check if all selected nights are in the available nights list  
  Return selectedNights.every(night \=\>  
    listing.nightsAvailableList.some(  
      availableNight \=\> [availableNight.name](http://availableNight.name) \=== [night.name](http://night.name)  
    )  
  );  
};  
\`\`\`

STEP 9: CREATE STYLES  
Create file: src/styles/ListingScheduleSelector.css

\`\`\`css  
.listing-schedule-selector {  
  Width: 100%;  
  Max-width: 600px;  
  Margin: 0 auto;  
  Padding: 20px;  
}

.schedule-grid {  
  Display: grid;  
  Grid-template-columns: repeat(7, 1fr);  
  Gap: 8px;  
  Margin-bottom: 20px;  
}

.day-cell {  
  Aspect-ratio: 1;  
  Border: 2px solid \#6B6B6B;  
  Border-radius: 5px;  
  Display: flex;  
  Flex-direction: column;  
  Align-items: center;  
  Justify-content: center;  
  Cursor: pointer;  
  Transition: all 0.2s ease;  
  Background-color: white;  
}

.day-cell:hover {  
  Background-color: \#f0f0f0;  
  Transform: scale(1.05);  
}

.day-cell.selected {  
  Background-color: \#4CAF50;  
  Color: white;  
  Border-color: \#45a049;  
}

.day-cell.unavailable {  
  Background-color: \#e0e0e0;  
  Color: \#999;  
  Cursor: not-allowed;  
  Opacity: 0.6;  
}

.day-cell.unavailable:hover {  
  Background-color: \#e0e0e0;  
  Transform: none;  
}

.day-letter {  
  Font-size: 18px;  
  Font-weight: bold;  
  Margin-bottom: 4px;  
}

.day-name {  
  Font-size: 12px;  
}

.error-overlay {  
  Position: fixed;  
  Top: 20px;  
  Right: 20px;  
  Background-color: \#f44336;  
  Color: white;  
  Padding: 15px 20px;  
  Border-radius: 5px;  
  Box-shadow: 0 2px 10px rgba(0,0,0,0.2);  
  Z-index: 1000;  
}

.error-message {  
  Font-size: 14px;  
}  
\`\`\`

STEP 10: INTEGRATE WITH API  
Create file: src/services/[listingService.ts](http://listingService.ts)

\`\`\`typescript  
Import { Listing } from ‘../types’;

Export const fetchListing \= async (  
  listingId: string  
): Promise\<Listing\> \=\> {  
  // Replace with your actual API endpoint  
  Const response \= await fetch(\`/api/listings/${listingId}\`);  
  Const data \= await response.json();  
    
  // Transform Bubble data to React format  
  Return {  
    Id: data.\_id,  
    firstAvailable: new Date(data\[‘First Available’\]),  
    numberOfNightsAvailable: data\[‘\# of nights available’\],  
    Active: data.Active \=== ‘yes’,  
    Approved: data.Approved \=== ‘yes’,  
    datesBlocked: data\[‘Dates \- Blocked’\].map(  
      (d: string) \=\> new Date(d)  
    ),  
    Complete: data.Complete \=== ‘yes’,  
    confirmedAvailability: data.confirmedAvailability \=== ‘yes’,  
    kitchenType: data\[‘Kitchen Type’\],  
    lastAvailable: new Date(data\[‘Last Available’\]),  
    checkInTime: data\[‘NEW Date Check-in Time’\],  
    checkOutTime: data\[‘NEW Date Check-out Time’\],  
    nightsAvailableList: data\[‘Nights Available (List of Nights)’\],  
    nightsAvailableNumbers: data\[‘Nights Available (numbers)’\],  
    nightsNotAvailable: data\[‘Nights Not Available’\],  
    pricingList: {  
      combinedMarkup: data.pricing\_list\[‘Combined Markup’\],  
      fullTimeDiscount: data.pricing\_list\[‘Full Time Discount’\],  
      hostCompensation: data.pricing\_list\[‘Host Compensation’\],  
      markupAndDiscountMultiplier:   
        data.pricing\_list\[‘Markup and Discount Multiplier’\],  
      nightlyPrice: data.pricing\_list\[‘Nightly Price’\],  
      numberSelectedNights:   
        data.pricing\_list\[‘Number Selected Nights’\],  
      overallSiteMarkup: data.pricing\_list\[‘Overall Site Markup’\],  
      Slope: data.pricing\_list.Slope,  
      startingNightlyPrice:   
        data.pricing\_list\[‘Starting Nightly Price’\],  
      unitMarkup: data.pricing\_list\[‘Unit Markup’\],  
      unusedNights: data.pricing\_list\[‘Unused Nights’\],  
      unusedNightsDiscount:   
        data.pricing\_list\[‘Unused Nig