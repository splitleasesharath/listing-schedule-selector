LISTING SCHEDULE SELECTOR \- BUBBLE TO REACT CONVERSION GUIDE

\=============================================================================

EXECUTIVE SUMMARY  
\=============================================================================

This document provides a comprehensive analysis of the “Listing Schedule Selector” reusable element from the Bubble application and a step-by-step guide to convert it into a standalone React component.

Component Purpose: The Listing Schedule Selector is a calendar-like interface that allows users to select days of the week for scheduling purposes, manage nightly pricing, handle discounts, and calculate reservation spans with various validation rules.

\=============================================================================

1. COMPONENT OVERVIEW  
2. \=============================================================================  
1. Visual Structure  
2. —----------------  
3. The component consists of:  
4. \- A row of day selector buttons (likely representing days of the week: S, M, T, W, T, F, S)  
5. \- Multiple overlays for error states and notifications  
6. \- Popup dialogs for number input  
7. \- Layers including:  
8.   \* F: popupnumber (for popup interactions)  
9.   \* Floppy popupNumber (floating popup)  
10.   \* JS2B-ChecksContiguity (JavaScript checking logic)  
11.   \* RG Days (Repeating Group for days display)

B. Key Elements from Elements Tree  
—-------------------------------

1. Listing Schedule Selector (Main Container)  
2. 2\. Overlays:  
3.    \- Days Selected Error  
4.    \- Nights outside of host  
5.    \- GF: Day selected not avail  
6. 3\. Layers (Sub-components):  
7.    \- F: popupnumber  
8.    \- Floppy popupNumber  
9.    \- JS2B-ChecksContiguity  
10.    \- RG Days

\=============================================================================

II. WORKFLOW ANALYSIS  
\=============================================================================

The component has 26 workflows organized into 7 categories:

CATEGORY 1: UNCATEGORIZED (0 workflows)  
—-------------------------------------

- Empty category

CATEGORY 2: ADDING DAYS (2 workflows)  
—------------------------------------  
These workflows handle the logic when users add nights/days to their selection:

1. “Adding nights in general”   
2.    Trigger: When “Select Day of Week” is clicked  
3.    Conditions:   
4.    \- Selected Days (days) doesn’t contain Parent group’s Days  
5.    \- Selected Days (days):count \< 8  
6.    \- Listing Schedule Selector’s Selected Days (days):count \< 8  
7.    \- Listing Schedule Selector’s Listing’s Days Available (List of Days) contains Parent group’s Days  
8.      
9.    Action: Shows “Parent group’s Days’s Single Letter”  
10.    Purpose: Validates and adds a day to the selection if conditions are met

2\. “Adding nights in general” (duplicate/variant)  
   Trigger: When “Listing Schedule Selector’s Days Available (List of Days)” condition is met  
   Similar validation logic for day addition

CATEGORY 3: CUSTOM EVENTS (10 workflows)  
—--------------------------------------  
These are reusable workflow functions that can be triggered from multiple places:

1. “Alerts General”  
2.    Parameters:  
3.    \- title (text, required)  
4.    \- content (text, optional)  
5.    \- time (ms) (number, optional)  
6.    \- alert type (Alert Type, optional)  
7.    \- Show on Live? (yes/no, optional)  
8.      
9.    Steps (with conditional rendering):  
10.    \- Step 1: Custom Toast ERROR (only when alert type is error and Show on Live? Is yes)  
11.    \- Step 2: Custom Toast INFO (only when alert type is info and Show on Live? Is yes)  
12.    \- Step 3: Custom Toast WARNING (only when alert type is warning and Show on Live? Is yes)  
13.    \- Step 5: Custom Toast EMPTY ALERT TYPE (only when alert type is empty and Show on Live? Is yes)  
14.    \- Step 6: Custom Toast Verify (only when isn’t Live? Is formatted as text and isn’t Live?:formatted as text is yes)  
15.      
16.    Purpose: Centralized alert/notification system with different alert types

2\. “Calculate days, then sort days and set states”  
   Purpose: Processes selected days, sorts them, and updates component state  
   Likely handles the calculation logic for determining valid day ranges

3\. “Calculate listing nightly price”  
   Purpose: Computes the nightly rate based on selected days and pricing rules

4\. “Check error messages when removing”  
   Trigger Condition: 

- Listing Schedule Selector’s Selected Days (days) contains day  
-    \- Listing’s minimum nights threshold check  
-    Purpose: Validates if removing a day would violate minimum night requirements

5\. “Create reservation span variables”  
   Purpose: Sets up variables for reservation date ranges and calculates spans

6\. “Run JS \- Check Contiguity”  
   Purpose: Uses JavaScript to verify that selected days are contiguous (consecutive)  
   Critical for ensuring valid booking periods

7\. “Save schedule”  
   Purpose: Persists the selected schedule to the database or parent component

8\. “Set discounts and markups multiplier”  
   Purpose: Applies discount or markup calculations to the nightly price

9\. “Set price multipliers”  
   Purpose: Sets various price modification factors

10\. “Set unused nights discount”  
    Purpose: Applies discounts for unused nights in a booking period

CATEGORY 4: DO WHEN ACTIONS (5 workflows)  
—---------------------------------------  
These workflows respond to user interactions and state changes:

1. Click/interaction handlers for day selection  
2. 2\. Validation triggers when selections change  
3. 3\. Real-time price calculations  
4. 4\. Error state management  
5. 5\. UI state updates

CATEGORY 5: ERROR HANDLING (6 workflows)  
—--------------------------------------  
Comprehensive error validation and user feedback:

1. Day selection validation errors  
2. 2\. Minimum/maximum night requirements  
3. 3\. Availability conflicts  
4. 4\. Contiguity validation (ensuring consecutive days)  
5. 5\. Host calendar conflicts  
6. 6\. General error state management

CATEGORY 6: PAGE IS LOADED (2 workflows)  
—--------------------------------------  
Initialization workflows:

1. Component initialization  
2.    \- Loads initial data  
3.    \- Sets default states  
4.    \- Prepares the UI

2\. Data fetching and setup

- Retrieves listing information  
-    \- Loads available days  
-    \- Sets pricing information

CATEGORY 7: REMOVING DAYS (1 workflow)  
—------------------------------------  
Handles day deselection:

1. “Removing day”  
2.    \- Validates removal doesn’t violate constraints  
3.    \- Updates selected days list  
4.    \- Recalculates pricing  
5.    \- Checks contiguity after removal

\=============================================================================

III. COMPONENT STATE & DATA STRUCTURE  
\=============================================================================

1. Component State Variables  
2. —--------------------------  
3. Based on the workflows, the component manages:  
1. selectedDays: Array\<Day\>  
2.    \- List of currently selected days  
3.    \- Maximum of 7 days (one week)

2\. availableDays: Array\<Day\>

- Days that can be selected  
-    \- Filtered by listing availability

3\. listingData: Object

- Contains listing information  
-    \- Pricing details  
-    \- Availability rules  
-    \- Minimum night requirements  
4. priceCalculations: Object  
5.    \- nightlyPrice: number  
6.    \- discounts: number  
7.    \- markups: number  
8.    \- multipliers: number  
9.    \- totalPrice: number

5\. errorStates: Object

- daysSelectedError: boolean  
-    \- nightsOutsideHost: boolean  
-    \- dayNotAvailable: boolean  
-    \- contiguityError: boolean

6\. popupState: Object

- isOpen: boolean  
-    \- popupType: string  
-    \- value: number

B. Data Types  
—-----------  
Day: {  
  Id: string/number  
  dayOfWeek: number (0-6)  
  singleLetter: string (‘S’, ‘M’, ‘T’, ‘W’, ‘T’, ‘F’, ‘S’)  
  fullName: string  
  isAvailable: boolean  
  isSelected: boolean  
}

Listing: {  
  Id: string  
  availableDays: Array\<Day\>  
  minimumNights: number  
  maximumNights: number  
  baseNightlyPrice: number  
  Discounts: Array\<Discount\>  
  Markups: Array\<Markup\>  
}

AlertType: ‘error’ | ‘warning’ | ‘info’ | ‘success’ | ‘verify’

\=============================================================================

IV. KEY FUNCTIONALITY & BUSINESS LOGIC  
\=============================================================================

1. Day Selection Logic  
2. —-------------------  
1. Validation Before Selection:  
2.    \- Check if day is not already selected  
3.    \- Verify selectedDays.length \< 8  
4.    \- Confirm day is in available days list  
5.    \- Validate against listing’s available days

2\. Selection Process:

- Add day to selectedDays array  
-    \- Update UI to show selection  
-    \- Trigger calculation workflows  
-    \- Check contiguity  
-    \- Recalculate pricing

3\. Contiguity Checking:

- JavaScript function validates consecutive days  
-    \- Ensures no gaps in selected date range  
-    \- Critical for booking validity

B. Price Calculation System  
—-------------------------  
Multi-step calculation process:

1. Base Calculation:  
2.    \- Start with listing’s nightly price  
3.    \- Multiply by number of selected nights

2\. Apply Multipliers:

- Day-specific multipliers  
-    \- Seasonal multipliers  
-    \- Dynamic pricing factors

3\. Apply Discounts:

- Length-of-stay discounts  
-    \- Unused night discounts  
-    \- Promotional discounts  
4. Apply Markups:  
5.    \- Service fees  
6.    \- Special event markups  
7.    \- Platform fees

5\. Final Calculation:  
   totalPrice \= (basePrice × multipliers × nights) \- discounts \+ markups

C. Error Handling & Validation  
—----------------------------

1. Pre-Selection Validation:  
2.    \- Is day available?  
3.    \- Within selection limits?  
4.    \- Meets minimum nights?

2\. Post-Selection Validation:

- Are days contiguous?  
-    \- Within host availability?  
-    \- Meets all booking rules?

3\. Removal Validation:

- Would removal violate minimum nights?  
-    \- Check if remaining days are valid  
-    \- Maintain contiguity after removal

D. Toast Notification System  
—--------------------------  
Centralized alert system with types:

- ERROR: Critical issues, booking blocks  
- \- WARNING: Cautions, recommendations  
- \- INFO: General information  
- \- SUCCESS: Confirmation messages  
- \- VERIFY: Verification required

Parameters:

- Title: Alert heading  
- \- content: Detailed message  
- \- time: Display duration (ms)  
- \- alert type: Visual styling and urgency  
- \- Show on Live: Development vs production toggle

\=============================================================================

V. REACT CONVERSION \- STEP-BY-STEP GUIDE  
\=============================================================================

STEP 1: PROJECT SETUP  
—-------------------

1. Initialize React Project:  
2. \`\`\`bash  
3. Npx create-react-app listing-schedule-selector  
4. Cd listing-schedule-selector  
5. \`\`\`

2\. Install Required Dependencies:  
\`\`\`bash  
Npm install –save \\  
  React \\  
  React-dom \\  
  Typescript \\  
  │   │   ├── ErrorOverlay.tsx  
│   │   ├── PriceDisplay.tsx  
│   │   └── PopupNumber.tsx  
│   └── Toast/  
│       ├── ToastManager.tsx  
│       └── ToastManager.css  
├── hooks/  
│   ├── [useScheduleSelector.ts](http://useScheduleSelector.ts)  
│   ├── [usePriceCalculation.ts](http://usePriceCalculation.ts)  
│   └── [useContiguityCheck.ts](http://useContiguityCheck.ts)  
├── utils/  
│   ├── [validators.ts](http://validators.ts)  
│   ├── [priceCalculations.ts](http://priceCalculations.ts)  
│   └── [dateHelpers.ts](http://dateHelpers.ts)  
├── types/  
│   └── [index.ts](http://index.ts)  
└── App.tsx  
\`\`\`

STEP 2: DEFINE TYPESCRIPT TYPES  
—-----------------------------

Create src/types/[index.ts](http://index.ts):

\`\`\`typescript  
Export type DayOfWeek \= 0 | 1 | 2 | 3 | 4 | 5 | 6;

Export interface Day {  
  Id: string;  
  dayOfWeek: DayOfWeek;  
  singleLetter: string;  
  fullName: string;  
  isAvailable: boolean;  
  isSelected: boolean;  
}

Export interface Discount {  
  Id: strNov 4, 2025  type: ‘length\_of\_stay’ | ‘unused\_nights’ | ‘promotional’;  
  Value: number;  
  isPercentage: boolean;  
  minNights?: number;  
}

Export interface Markup {  
  Id: string;  
  Type: ‘service\_fee’ | ‘event’ | ‘platform’;  
  Value: number;  
  isPercentage: boolean;  
}

Export interface Listing {  
  Id: string;  
  availableDays: DayOfWeek\[\];  
  minimumNights: number;  
  maximumNights: number;  
  baseNightlyPrice: number;  
  Discounts: Discount\[\];  
  Markups: Markup\[\];  
  priceMultipliers?: Record\<DayOfWeek, number\>;  
}

Export interface PriceCalculation {  
  basePrice: number;  
  multipliedPrice: number;  
  discountAmount: number;  
  markupAmount: number;  
  totalPrice: number;  
  pricePerNight: number;  
  numberOfNights: number;  
}

Export interface ErrorState {  
  daysSelectedError: boolean;  
  nightsOutsideHost: boolean;  
  dayNotAvailable: boolean;  
  contiguityError: boolean;  
  minimumNightsError: boolean;  
  errorMessage?: string;  
}

Export type AlertType \= ‘error’ | ‘warning’ | ‘info’ | ‘success’ | ‘verify’;

Export interface ToastOptions {  
  Title: string;  
  Content?: string;  
  Time?: number;  
  alertType?: AlertType;  
  showOnLive?: boolean;  
}  
\`\`\`

STEP 3: CREATE UTILITY FUNCTIONS  
—------------------------------

Create src/utils/[validators.ts](http://validators.ts):

\`\`\`typescript  
Import { Day, Listing, DayOfWeek } from ‘../types’;

Export const validateDaySelection \= (  
  Day: Day,  
  selectedDays: Day\[\],  
  Listing: Listing  
): { isValid: boolean; error?: string } \=\> {  
  // Check if already selected  
  If (selectedDays.some(d \=\> [d.id](http://d.id) \=== [day.id](http://day.id))) {  
    Return { isValid: false, error: ‘Day already selected’ };  
  }

  // Check max selection limit  
  If (selectedDays.length \>= 7\) {  
    Return { isValid: false, error: ‘Maximum 7 days can be selected’ };  
  }

  // Check if day is available in listing  
  If (\!listing.availableDays.includes(day.dayOfWeek)) {  
    Return { isValid: false, error: ‘Day not available for this listing’ };  
  }

  // Check if day is marked as available  
  If (\!day.isAvailable) {  
    Return { isValid: false, error: ‘Day is not available’ };  
  }

  Return { isValid: true };  
};

Export const validateRemoval \= (  
  dayToRemove: Day,  
  selectedDays: Day\[\],  
  minimumNights: number  
): { isValid: boolean; error?: string } \=\> {  
  Const remainingDays \= selectedDays.filter(d \=\> [d.id](http://d.id) \!== [dayToRemove.id](http://dayToRemove.id));

  If (remainingDays.length \< minimumNights) {  
    Return {  
      isValid: false,  
      Error: \`Minimum ${minimumNights} nights required\`  
    };  
  }

  // Check if removal breaks contiguity  
  If (remainingDays.length \> 0 && \!areContiguous(remainingDays)) {  
    Return {  
      isValid: false,  
      Error: ‘Removal would create non-contiguous selection’  
    };  
  }

  Return { isValid: true };  
};

Export const areContiguous \= (days: Day\[\]): boolean \=\> {  
  If (days.length \=== 0\) return true;  
  If (days.length \=== 1\) return true;

  // Sort days by dayOfWeek  
  Const sorted \= \[...days\].sort((a, b) \=\> a.dayOfWeek \- b.dayOfWeek);

  // Check if consecutive  
  For (let i \= 1; i \< sorted.length; i++) {  
    If (sorted\[i\].dayOfWeek \- sorted\[i \- 1\].dayOfWeek \!== 1\) {  
      Return false;  
    }  
  }

  Return true;  
};

Export const checkMinimumNights \= (  
  selectedDays: Day\[\],  
  minimumNights: number  
): boolean \=\> {  
  Return selectedDays.length \>= minimumNights;  
};  
\`\`\`

Create src/utils/[priceCalculations.ts](http://priceCalculations.ts):

\`\`\`typescript  
Import { Listing, Day, PriceCalculation, Discount, Markup } from ‘../types’;

Export const calculatePrice \= (  
  selectedDays: Day\[\],  
  Listing: Listing  
): PriceCalculation \=\> {  
  Const numberOfNights \= selectedDays.length;  
    
  If (numberOfNights \=== 0\) {  
    Return {  
      basePrice: 0,  
      multipliedPrice: 0,  
      discountAmount: 0,  
      markupAmount: 0,  
      totalPrice: 0,  
      pricePerNight: 0,  
      numberOfNights: 0  
    };  
  }

  // Step 1: Calculate base price  
  Const basePrice \= listing.baseNightlyPrice \* numberOfNights;

  // Step 2: Apply day-specific multipliers  
  Let multipliedPrice \= 0;  
  selectedDays.forEach(day \=\> {  
    Const multiplier \= listing.priceMultipliers?.\[day.dayOfWeek\] || 1;  
    multipliedPrice \+= listing.baseNightlyPrice \* multiplier;  
  });

  // Step 3: Calculate discounts  
  Const discountAmount \= calculateDiscounts(  
    multipliedPrice,  
    numberOfNights,  
    Listing.discounts  
  );

  // Step 4: Calculate markups  
  Const markupAmount \= calculateMarkups(  
    multipliedPrice,  
    Listing.markups  
  );

  // Step 5: Final total  
  Const totalPrice \= multipliedPrice \- discountAmount \+ markupAmount;  
  Const pricePerNight \= totalPrice / numberOfNights;

  Return {  
    basePrice,  
    multipliedPrice,  
    discountAmount,  
    markupAmount,  
    totalPrice,  
    pricePerNight,  
    numberOfNights  
  };  
};

Const calculateDiscounts \= (  
  Price: number,  
  numberOfNights: number,  
  Discounts: Discount\[\]  
): number \=\> {  
  Let totalDiscount \= 0;

  discounts.forEach(discount \=\> {  
    // Check if discount applies based on minimum nights  
    If (discount.minNights && numberOfNights \< discount.minNights) {  
      Return;  
    }

    If (discount.isPercentage) {  
      totalDiscount \+= (price \* discount.value) / 100;  
    } else {  
      totalDiscount \+= discount.value;  
    }  
  });

  Return totalDiscount;  
};

Const calculateMarkups \= (  
  Price: number,  
  Markups: Markup\[\]  
): number \=\> {  
  Let totalMarkup \= 0;

  markups.forEach(markup \=\> {  
    If (markup.isPercentage) {  
      totalMarkup \+= (price \* markup.value) / 100;  
    } else {  
      totalMarkup \+= markup.value;  
    }  
  });

  Return totalMarkup;  
};  
\`\`\`

Create src/utils/[dateHelpers.ts](http://dateHelpers.ts):

\`\`\`typescript  
Import { Day, DayOfWeek } from ‘../types’;

Export const DAY\_NAMES \= \[  
  ‘Sunday’, ‘Monday’, ‘Tuesday’, ‘Wednesday’, ‘Thursday’, ‘Friday’, ‘Saturday’  
\];

Export const DAY\_LETTERS \= \[‘S’, ‘M’, ‘T’, ‘W’, ‘T’, ‘F’, ‘S’\];

Export const createDay \= (  
  dayOfWeek: DayOfWeek,  
  isAvailable: boolean \= true  
): Day \=\> ({  
  Id: \`day-${dayOfWeek}\`,  
  dayOfWeek,  
  singleLetter: DAY\_LETTERS\[dayOfWeek\],  
  fullName: DAY\_NAMES\[dayOfWeek\],  
  isAvailable,  
  isSelected: false  
});

Export const sortDays \= (days: Day\[\]): Day\[\] \=\> {  
  Return \[...days\].sort((a, b) \=\> a.dayOfWeek \- b.dayOfWeek);  
};  
\`\`\`

STEP 4: CREATE CUSTOM HOOKS  
—-------------------------

Create src/hooks/[useScheduleSelector.ts](http://useScheduleSelector.ts):

\`\`\`typescript  
Import { useState, useCallback, useEffect } from ‘react’;  
Import { Day, Listing, ErrorState, PriceCalculation } from ‘../types’;  
Import { validateDaySelection, validateRemoval, areContiguous } from ‘../utils/validators’;  
Import { calculatePrice } from ‘../utils/priceCalculations’;  
Import { sortDays } from ‘../utils/dateHelpers’;

Interface UseScheduleSelectorProps {  
  Listing: Listing;  
  initialSelectedDays?: Day\[\];  
  onScheduleChange?: (selectedDays: Day\[\]) \=\> void;  
  onPriceChange?: (priceCalc: PriceCalculation) \=\> void;  
}

Export const useScheduleSelector \= ({  
  Listing,  
  initialSelectedDays \= \[\],  
  onScheduleChange,  
  onPriceChange  
}: UseScheduleSelectorProps) \=\> {  
  Const \[selectedDays, setSelectedDays\] \= useState\<Day\[\]\>(initialSelectedDays);  
  Const \[errorState, setErrorState\] \= useState\<ErrorState\>({  
    daysSelectedError: false,  
    nightsOutsideHost: false,  
    dayNotAvailable: false,  
    contiguityError: false,  
    minimumNightsError: false  
  });  
  Const \[priceCalculation, setPriceCalculation\] \= useState\<PriceCalculation | null\>(null);

  // Recalculate price whenever selected days change  
  useEffect(() \=\> {  
    Const calc \= calculatePrice(selectedDays, listing);  
    setPriceCalculation(calc);  
    onPriceChange?.(calc);  
  }, \[selectedDays, listing, onPriceChange\]);

  // Notify parent of selection changes  
  useEffect(() \=\> {  
    onScheduleChange?.(selectedDays);  
  }, \[selectedDays, onScheduleChange\]);

  Const handleDaySelect \= useCallback((day: Day) \=\> {  
    // Validate selection  
    Const validation \= validateDaySelection(day, selectedDays, listing);  
      
    If (\!validation.isValid) {  
      setErrorState(prev \=\> ({  
        …prev,  
        daysSelectedError: true,  
        errorMessage: validation.error  
      }));  
      Return false;  
    }

    // Add day and sort  
    Const newSelectedDays \= sortDays(\[...selectedDays, { …day, isSelected: true }\]);  
      
    // Check contiguity  
    If (\!areContiguous(newSelectedDays)) {  
      setErrorState(prev \=\> ({  
        …prev,  
        contiguityError: true,  
        errorMessage: ‘Selected days must be consecutive’  
      }));  
      Return false;  
    }

    setSelectedDays(newSelectedDays);  
    setErrorState({  
      daysSelectedError: false,  
      nightsOutsideHost: false,  
      dayNotAvailable: false,  
      contiguityError: false,  
      minimumNightsError: false  
    });  
      
    Return true;  
  }, \[selectedDays, listing\]);

  Const handleDayRemove \= useCallback((day: Day) \=\> {  
    // Validate removal  
    Const validation \= validateRemoval(day, selectedDays, listing.minimumNights);  
      
    If (\!validation.isValid) {  
      setErrorState(prev \=\> ({  
        …prev,  
        minimumNightsError: true,  
        errorMessage: validation.error  
      }));  
      Return false;  
    }

    Const newSelectedDays \= selectedDays.filter(d \=\> [d.id](http://d.id) \!== [day.id](http://day.id));  
    setSelectedDays(newSelectedDays);  
      
    Return true;  
  }, \[selectedDays, listing.minimumNights\]);

  Const clearSelection \= useCallback(() \=\> {  
    setSelectedDays(\[\]);  
    setErrorState({  
      daysSelectedError: false,  
      nightsOutsideHost: false,  
      dayNotAvailable: false,  
      contiguityError: false,  
      minimumNightsError: false  
    });  
  }, \[\]);

  Const clearError \= useCallback(() \=\> {  
    setErrorState({  
      daysSelectedError: false,  
      nightsOutsideHost: false,  
      dayNotAvailable: false,  
      contiguityError: false,  
      minimumNightsError: false  
    });  
  }, \[\]);

  Return {  
    selectedDays,  
    errorState,  
    priceCalculation,  
    handleDaySelect,  
    handleDayRemove,  
    clearSelection,  
    clearError  
  };  
};  
\`\`\`

STEP 5: CREATE CHILD COMPONENTS  
—-----------------------------

Create src/components/ListingScheduleSelector/DayButton.tsx:

\`\`\`typescript  
Import React from ‘react’;  
Import { Day } from ‘../../types’;  
Import ‘./DayButton.css’;

Interface DayButtonProps {  
  Day: Day;  
  isSelected: boolean;  
  onSelect: (day: Day) \=\> void;  
  onRemove: (day: Day) \=\> void;  
}

Export const DayButton: [React.FC](http://React.FC)\<DayButtonProps\> \= ({  
  Day,  
  isSelected,  
  onSelect,  
  onRemove  
}) \=\> {  
  Const handleClick \= () \=\> {  
    If (isSelected) {  
      onRemove(day);  
    } else {  
      onSelect(day);  
    }  
  };

  Return (  
    \<button  
      className={\`day-button ${isSelected ? ‘selected’ : ‘’} ${\!day.isAvailable ? ‘disabled’ : ‘’}\`}  
      onClick={handleClick}  
      disabled={\!day.isAvailable}  
      title={day.fullName}  
    \>  
      {day.singleLetter}  
    \</button\>  
  );  
};  
\`\`\`

Create src/components/ListingScheduleSelector/DayButton.css:

\`\`\`css  
.day-button {  
  Width: 50px;  
  Height: 50px;  
  Border: 2px solid \#6B6B6B;  
  Border-radius: 5px;  
  Background-color: white;  
  Font-size: 16px;  
  Font-weight: bold;  
  Cursor: pointer;  
  Transition: all 0.2s ease;  
  Margin: 0 4px;  
}

.day-button:hover:not(.disabled) {  
  Background-color: \#f0f0f0;  
  Transform: scale(1.05);  
}

.day-button.selected {  
  Background-color: \#4CAF50;  
  Color: white;  
  Border-color: \#45a049;  
}

.day-button.disabled {  
  Background-color: \#e0e0e0;  
  Color: \#9e9e9e;  
  Cursor: not-allowed;  
  Opacity: 0.5;  
}

.day-button:active:not(.disabled) {  
  Transform: scale(0.95);  
}  
\`\`\`

Create src/components/ListingScheduleSelector/ErrorOverlay.tsx:

\`\`\`typescript  
Import React from ‘react’;  
Import { ErrorState } from ‘../../types’;  
Import ‘./ErrorOverlay.css’;

Interface ErrorOverlayProps {  
  errorState: ErrorState;  
  onClose: () \=\> void;  
}

Export const ErrorOverlay: [React.FC](http://React.FC)\<ErrorOverlayProps\> \= ({  
  errorState,  
  onClose  
}) \=\> {  
  Const hasError \= Object.values(errorState).some(value \=\>   
    Typeof value \=== ‘boolean’ && value \=== true  
  );

  If (\!hasError) return null;

  Return (  
    \<div className=”error-overlay”\>  
      \<div className=”error-content”\>  
        \<button className=”error-close” onClick={onClose}\>×\</button\>  
        \<h3\>Error\</h3\>  
        \<p\>{errorState.errorMessage || ‘An error occurred’}\</p\>  
      \</div\>  
    \</div\>  
  );  
};  
\`\`\`

Create src/components/ListingScheduleSelector/PriceDisplay.tsx:

\`\`\`typescript  
Import React from ‘react’;  
Import { PriceCalculation } from ‘../../types’;  
Import ‘./PriceDisplay.css’;

Interface PriceDisplayProps {  
  priceCalculation: PriceCalculation | null;  
  Currency?: string;  
}

Export const PriceDisplay: [React.FC](http://React.FC)\<PriceDisplayProps\> \= ({  
  priceCalculation,  
  Currency \= ‘USD’  
}) \=\> {  
  If (\!priceCalculation || priceCalculation.numberOfNights \=== 0\) {  
    Return \<div className=”price-display”\>Select days to see pricing\</div\>;  
  }

  Const formatPrice \= (amount: number) \=\> {  
    Return new Intl.NumberFormat(‘en-US’, {  
      Style: ‘currency’,  
      Currency: currency  
    }).format(amount);  
  };

  Return (  
    \<div className=”price-display”\>  
      \<div className=”price-row”\>  
        \<span\>Base Price ({priceCalculation.numberOfNights} nights):\</span\>  
        \<span\>{formatPrice(priceCalculation.basePrice)}\</span\>  
      \</div\>  
        
      {priceCalculation.multipliedPrice \!== priceCalculation.basePrice && (  
        \<div className=”price-row”\>  
          \<span\>After Multipliers:\</span\>  
          \<span\>{formatPrice(priceCalculation.multipliedPrice)}\</span\>  
        \</div\>  
      )}  
        
      {priceCalculation.discountAmount \> 0 && (  
        \<div className=”price-row discount”\>  
          \<span\>Discounts:\</span\>  
          \<span\>-{formatPrice(priceCalculation.discountAmount)}\</span\>  
        \</div\>  
      )}  
        
      {priceCalculation.markupAmount \> 0 && (  
        \<div className=”price-row markup”\>  
          \<span\>Fees:\</span\>  
          \<span\>+{formatPrice(priceCalculation.markupAmount)}\</span\>  
        \</div\>  
      )}  
        
      \<div className=”price-row total”\>  
        \<span\>Total Price:\</span\>  
        \<span\>{formatPrice(priceCalculation.totalPrice)}\</span\>  
      \</div\>  
        
      \<div className=”price-row per-night”\>  
        \<span\>Per Night:\</span\>  
        \<span\>{formatPrice(priceCalculation.pricePerNight)}\</span\>  
      \</div\>  
    \</div\>  
  );  
};  
\`\`\`

STEP 6: CREATE MAIN COMPONENT  
—---------------------------

Create src/components/ListingScheduleSelector/ListingScheduleSelector.tsx:

\`\`\`typescript  
Import React, { useMemo } from ‘react’;  
Import { Listing, Day } from ‘../../types’;  
Import { useScheduleSelector } from ‘../../hooks/useScheduleSelector’;  
Import { createDay } from ‘../../utils/dateHelpers’;  
Import { DayButton } from ‘./DayButton’;  
Import { ErrorOverlay } from ‘./ErrorOverlay’;  
Import { PriceDisplay } from ‘./PriceDisplay’;  
Import ‘./ListingScheduleSelector.css’;

Interface ListingScheduleSelectorProps {  
  Listing: Listing;  
  onScheduleSave?: (selectedDays: Day\[\]) \=\> void;  
  initialSelectedDays?: Day\[\];  
}

Export const ListingScheduleSelector: [React.FC](http://React.FC)\<ListingScheduleSelectorProps\> \= ({  
  Listing,  
  onScheduleSave,  
  initialSelectedDays \= \[\]  
}) \=\> {  
  // Create all 7 days of the week  
  Const allDays \= useMemo(() \=\> {  
    Return Array.from({ length: 7 }, (\_, i) \=\> {  
      Const day \= createDay(i as any);  
      // Mark as available if in listing’s available days  
      day.isAvailable \= listing.availableDays.includes(i as any);  
      Return day;  
    });  
  }, \[listing.availableDays\]);

  Const {  
    selectedDays,  
    errorState,  
    priceCalculation,  
    handleDaySelect,  
    handleDayRemove,  
    clearSelection,  
    clearError  
  } \= useScheduleSelector({  
    Listing,  
    initialSelectedDays  
  });

  Const handleSave \= () \=\> {  
    If (selectedDays.length \< listing.minimumNights) {  
      clearError();  
      // Trigger error  
      Return;  
    }  
    onScheduleSave?.(selectedDays);  
  };

  Return (  
    \<div className=”listing-schedule-selector”\>  
      \<h2\>Select Days\</h2\>  
        
      \<div className=”day-selector-row”\>  
        {allD  
Create src/components/ListingScheduleSelector/ListingScheduleSelector.css:

\`\`\`css  
.listing-schedule-selector {  
  Max-width: 600px;  
  Margin: 0 auto;  
  Padding: 20px;  
  Border: 1px solid \#ddd;  
  Border-radius: 8px;  
  Background-color: \#fff;  
  Box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);  
}

.listing-schedule-selector h2 {  
  Margin-top: 0;  
  Margin-bottom: 20px;  
  Text-align: center;  
  Color: \#333;  
}

.day-selector-row {  
  Display: flex;  
  Justify-content: center;  
  Align-items: center;  
  Margin-bottom: 20px;  
  Flex-wrap: wrap;  
  Gap: 8px;  
}

.selection-info {  
  Text-align: center;  
  Margin: 20px 0;  
  Color: \#666;  
}

.selection-info p {  
  Margin: 5px 0;  
}

.actions {  
  Display: flex;  
  Justify-content: space-between;  
  Gap: 10px;  
  Margin-top: 20px;  
}

.actions button {  
  Flex: 1;  
  Padding: 12px 20px;  
  Border: none;  
  Border-radius: 5px;  
  Font-size: 16px;  
  Font-weight: bold;  
  Cursor: pointer;  
  Transition: all 0.2s ease;  
}

.btn-clear {  
  Background-color: \#f44336;  
  Color: white;  
}

.btn-clear:hover {  
  Background-color: \#da190b;  
}

.btn-save {  
  Background-color: \#4CAF50;  
  Color: white;  
}

.btn-save:hover:not(:disabled) {  
  Background-color: \#45a049;  
}

.btn-save:disabled {  
  Background-color: \#cccccc;  
  Cursor: not-allowed;  
  Opacity: 0.6;  
}  
\`\`\`

Create src/components/ListingScheduleSelector/ErrorOverlay.css:

\`\`\`css  
.error-overlay {  
  Position: fixed;  
  Top: 0;  
  Left: 0;  
  Right: 0;  
  Bottom: 0;  
  Background-color: rgba(0, 0, 0, 0.5);  
  Display: flex;  
  Justify-content: center;  
  Align-items: center;  
  Z-index: 1000;  
}

.error-content {  
  Background-color: white;  
  Padding: 30px;  
  Border-radius: 8px;  
  Max-width: 400px;  
  Position: relative;  
  Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);  
}

.error-close {  
  Position: absolute;  
  Top: 10px;  
  Right: 10px;  
  Background: none;  
  Border: none;  
  Font-size: 24px;  
  Cursor: pointer;  
  Color: \#666;  
}

.error-close:hover {  
  Color: \#333;  
}

.error-content h3 {  
  Margin-top: 0;  
  Color: \#f44336;  
}

.error-content p {  
  Margin-bottom: 0;  
  Color: \#666;  
}  
\`\`\`

Create src/components/ListingScheduleSelector/PriceDisplay.css:

\`\`\`css  
.price-display {  
  Background-color: \#f9f9f9;  
  Border: 1px solid \#e0e0e0;  
  Border-radius: 5px;  
  Padding: 15px;  
  Margin: 20px 0;  
}

.price-row {  
  Display: flex;  
  Justify-content: space-between;  
  Padding: 8px 0;  
  Font-size: 14px;  
  Color: \#333;  
}

.price-row.discount {  
  Color: \#4CAF50;  
}

.price-row.markup {  
  Color: \#f44336;  
}

.price-row.total {  
  Border-top: 2px solid \#333;  
  Margin-top: 10px;  
  Padding-top: 10px;  
  Font-size: 18px;  
  Font-weight: bold;  
}

.price-row.per-night {  
  Font-size: 14px;  
  Color: \#666;  
  Font-weight: normal;  
}  
\`\`\`

STEP 7: CREATE TOAST NOTIFICATION COMPONENT (OPTIONAL)  
—----------------------------------------------------

Create src/components/Toast/ToastManager.tsx:

\`\`\`typescript  
Import React, { useState, useCallback, useEffect } from ‘react’;  
Import { ToastOptions, AlertType } from ‘../../types’;  
Import ‘./ToastManager.css’;

Interface Toast extends ToastOptions {  
  Id: string;  
}

Let toastCounter \= 0;

Export const useToast \= () \=\> {  
  Const \[toasts, setToasts\] \= useState\<Toast\[\]\>(\[\]);

  Const showToast \= useCallback((options: ToastOptions) \=\> {  
    Const id \= \`toast-${++toastCounter}\`;  
    Const toast: Toast \= { id, …options };  
      
    setToasts(prev \=\> \[...prev, toast\]);

    // Auto-dismiss after specified time (default 3000ms)  
    Const timeout \= options.time || 3000;  
    setTimeout(() \=\> {  
      setToasts(prev \=\> prev.filter(t \=\> [t.id](http://t.id) \!== id));  
    }, timeout);  
  }, \[\]);

  Const dismissToast \= useCallback((id: string) \=\> {  
    setToasts(prev \=\> prev.filter(t \=\> [t.id](http://t.id) \!== id));  
  }, \[\]);

  Return { toasts, showToast, dismissToast };  
};

Interface ToastManagerProps {  
  Toasts: Toast\[\];  
  onDismiss: (id: string) \=\> void;  
}

Export const ToastManager: [React.FC](http://React.FC)\<ToastManagerProps\> \= ({ toasts, onDismiss }) \=\> {  
  Return (  
    \<div className=”toast-container”\>  
      {toasts.map(toast \=\> (  
        \<div   
          key={[toast.id](http://toast.id)}  
          className={\`toast toast-${toast.alertType || ‘info’}\`}  
        \>  
          \<div className=”toast-header”\>  
            \<strong\>{toast.title}\</strong\>  
            \<button onClick={() \=\> onDismiss([toast.id](http://toast.id))} className=”toast-close”\>×\</button\>  
          \</div\>  
          {toast.content && \<div className=”toast-body”\>{toast.content}\</div\>}  
        \</div\>  
      ))}  
    \</div\>  
  );  
};  
\`\`\`

Create src/components/Toast/ToastManager.css:

\`\`\`css  
.toast-container {  
  Position: fixed;  
  Top: 20px;  
  Right: 20px;  
  Z-index: 9999;  
  Display: flex;  
  Flex-direction: column;  
  Gap: 10px;  
}

.toast {  
  Min-width: 300px;  
  Max-width: 400px;  
  Padding: 15px;  
  Border-radius: 5px;  
  Box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);  
  Animation: slideIn 0.3s ease;  
  Background-color: white;  
}

[Split Lease Team](mailto:splitleaseteam@gmail.com)  
VI. ADVANCED FEATURES & CONSIDERATIONS  
\=============================================================================

1. API Integration  
2. —---------------  
3. To connect to a backend API:  
1. Create API Service (src/services/[listingApi.ts](http://listingApi.ts)):  
2. \`\`\`typescript  
3. Import axios from ‘axios’;  
4. Import { Listing, Day } from ‘../types’;

Const API\_BASE\_URL \= process.env.REACT\_APP\_API\_URL || ‘[http://localhost:3001/api](http://localhost:3001/api)’;

Export const listingApi \= {  
  getListing: async (id: string): Promise\<Listing\> \=\> {  
    Const response \= await axios.get(\`${API\_BASE\_URL}/listings/${id}\`);  
    Return response.data;  
  },

  saveSchedule: async (listingId: string, selectedDays: Day\[\]) \=\> {  
    Const response \= await [axios.post](http://axios.post)(  
      \`${API\_BASE\_URL}/listings/${listingId}/schedule\`,  
      { selectedDays }  
    );  
    Return response.data;  
  }  
};  
\`\`\`

2\. Use in Component:  
\`\`\`typescript  
Const \[listing, setListing\] \= useState\<Listing | null\>(null);  
Const \[loading, setLoading\] \= useState(true);

useEffect(() \=\> {  
  Const fetchListing \= async () \=\> {  
    Try {  
      Const data \= await listingApi.getListing(‘listing-id’);  
      setListing(data);  
    } catch (error) {  
      console.error(‘Failed to fetch listing:’, error);  
    } finally {  
      setLoading(false);  
    }  
  };  
  fetchListing();  
}, \[\]);  
\`\`\`

B. State Management with Redux (Optional)  
—---------------------------------------  
For larger applications, consider Redux:

\`\`\`typescript  
// store/slices/[scheduleSlice.ts](http://scheduleSlice.ts)  
Import { createSlice, PayloadAction } from ‘@reduxjs/toolkit’;  
Import { Day } from ‘../../types’;

Interface ScheduleState {  
  selectedDays: Day\[\];  
  Listing: Listing | null;  
}

Const scheduleSlice \= createSlice({  
  Name: ‘schedule’,  
  initialState: { selectedDays: \[\], listing: null } as ScheduleState,  
  Reducers: {  
    setSelectedDays: (state, action: PayloadAction\<Day\[\]\>) \=\> {  
      state.selectedDays \= action.payload;  
    },  
    setListing: (state, action: PayloadAction\<Listing\>) \=\> {  
      State.listing \= action.payload;  
    }  
  }  
});

Export const { setSelectedDays, setListing } \= scheduleSlice.actions;  
Export default scheduleSlice.reducer;  
\`\`\`

C. Testing  
—-------  
Create tests using Jest and React Testing Library:

\`\`\`typescript  
// ListingScheduleSelector.test.tsx  
Import { render, screen, fireEvent } from ‘@testing-library/react’;  
Import { ListingScheduleSelector } from ‘./ListingScheduleSelector’;

describe(‘ListingScheduleSelector’, () \=\> {  
  Const mockListing \= {  
    Id: ‘test-1’,  
    availableDays: \[0, 1, 2, 3, 4, 5, 6\],  
    minimumNights: 2,  
    maximumNights: 7,  
    baseNightlyPrice: 100,  
    Discounts: \[\],  
    Markups: \[\]  
  };

  test(‘renders day buttons’, () \=\> {  
    render(\<ListingScheduleSelector listing={mockListing} /\>);  
    expect(screen.getAllByRole(‘button’)).toHaveLength(7);  
  });

  test(‘selects day on click’, () \=\> {  
    render(\<ListingScheduleSelector listing={mockListing} /\>);  
    Const dayButton \= screen.getAllByRole(‘button’)\[0\];  
    fireEvent.click(dayButton);  
    expect(dayButton).toHaveClass(‘selected’);  
  });

  test(‘validates minimum nights’, () \=\> {  
    Const onSave \= [jest.fn](http://jest.fn)();  
    render(\<ListingScheduleSelector listing={mockListing} onScheduleSave={onSave} /\>);  
      
    Const saveButton \= screen.getByText(‘Save Schedule’);  
    expect(saveButton).toBeDisabled();  
      
    // Select 2 days  
    fireEvent.click(screen.getAllByRole(‘button’)\[0\]);  
    fireEvent.click(screen.getAllByRole(‘button’)\[1\]);  
      
    expect(saveButton).not.toBeDisabled();  
  });  
});  
\`\`\`

D. Performance Optimization  
—-------------------------

1. Use React.memo for components that don’t need frequent re-renders  
2. 2\. Use useCallback and useMemo to prevent unnecessary recalculations  
3. 3\. Implement virtualization for large day lists (if extended beyond 7 days)  
4. 4\. Debounce price calculations if they become expensive

E. Accessibility (a11y)  
—--------------------  
Ensure the component is accessible:

\`\`\`typescript  
\<button  
  className=”day-button”  
  onClick={handleClick}  
  disabled={\!day.isAvailable}  
  aria-label={\`${day.fullName}, ${isSelected ? ‘selected’ : ‘not selected’}\`}  
  aria-pressed={isSelected}  
  role=”checkbox”  
\>  
  {day.singleLetter}  
\</button\>  
\`\`\`

Add keyboard navigation:

- Arrow keys to navigate between days  
- \- Space/Enter to select/deselect  
- \- Escape to clear selection

\=============================================================================

VII. BUBBLE-SPECIFIC FEATURES TO MIGRATE  
\=============================================================================

1. Repeating Groups  
2. —----------------  
3. Bubble’s “RG Days” is likely a Repeating Group that displays day data.  
4. In React, use .map():

\`\`\`typescript  
{allDays.map(day \=\> (  
  \<DayButton key={[day.id](http://day.id)} day={day} … /\>  
))}  
\`\`\`

B. Custom States  
—-------------  
Bubble custom states → React useState or useReducer

Bubble:

- Element’s custom state: “Selected Days (days)”  
- React:  
- \- const \[selectedDays, setSelectedDays\] \= useState\<Day\[\]\>(\[\])

C. Conditional Visibility  
—-----------------------  
Bubble: “Only when” conditions on elements  
React: Conditional rendering

\`\`\`typescript  
{errorState.daysSelectedError && (  
  \<ErrorOverlay … /\>  
)}  
\`\`\`

D. Workflows as Functions  
—-----------------------  
Each Bubble workflow becomes a function or custom hook:

- “Calculate days, then sort” → calculateAndSortDays()  
- \- “check error messages” → validateErrors()  
- \- “save schedule” → handleSave()  
5. Database Operations  
6. —-------------------  
7. Replace Bubble’s database calls with API calls:

Bubble: “Make changes to thing”  
React: await axios.put(‘/api/listing’, data)

Bubble: “Create a new thing”  
React: await [axios.post](http://axios.post)(‘/api/listing’, data)

\=============================================================================

VIII. DEPLOYMENT  
\=============================================================================

1. Build for Production  
2. —---------------------  
3. \`\`\`bash  
4. Npm run build  
5. \`\`\`

B. Deploy Options  
—--------------

1. Vercel (Recommended for React):  
2. \`\`\`bash  
3. Npm install \-g vercel  
4. Vercel  
5. \`\`\`

2\. Netlify:  
\`\`\`bash  
Npm install \-g netlify-cli  
Netlify deploy  
\`\`\`

3\. AWS S3 \+ CloudFront  
4\. Docker Container  
5\. Traditional web hosting

C. Environment Variables  
—----------------------  
Create .env files:

.env.development:  
\`\`\`  
REACT\_APP\_API\_URL=[http://localhost:3001/api](http://localhost:3001/api)  
REACT\_APP\_ENVIRONMENT=development  
\`\`\`

.env.production:  
\`\`\`  
REACT\_APP\_API\_URL=[https://api.yourproduction.com](https://api.yourproduction.com)  
REACT\_APP\_ENVIRONMENT=production  
\`\`\`

\=============================================================================

IX. MIGRATION CHECKLIST  
\=============================================================================

☐ Setup  
  ☐ Initialize React project  
  ☐ Install dependencies  
  ☐ Create project structure

☐ Core Functionality  
  ☐ Define TypeScript types  
  ☐ Create utility functions (validators, calculators)  
  ☐ Build custom hooks  
  ☐ Create child components (DayButton, ErrorOverlay, PriceDisplay)  
  ☐ Build main component

☐ Features  
  ☐ Day selection/deselection  
  ☐ Contiguity validation  
  ☐ Price calculation with multipliers  
  ☐ Discount application  
  ☐ Markup application  
  ☐ Error handling  
  ☐ Toast notifications

☐ Testing  
  ☐ Unit tests for utilities  
  ☐ Component tests  
  ☐ Integration tests  
  ☐ E2E tests (optional)

☐ Styling  
  ☐ Create CSS files  
  ☐ Ensure responsive design  
  ☐ Add animations/transitions  
  ☐ Test cross-browser compatibility

☐ Integration  
  ☐ Connect to backend API  
  ☐ Handle loading states  
  ☐ Error boundary implementation  
  ☐ Authentication (if needed)

☐ Optimization  
  ☐ Code splitting  
  ☐ Lazy loading  
  ☐ Performance profiling  
  ☐ Accessibility audit

☐ Deployment  
  ☐ Environment configuration  
  ☐ Build optimization  
  ☐ Deploy to hosting  
  ☐ Set up CI/CD (optional)

\=============================================================================

X. TROUBLESHOOTING COMMON ISSUES  
\=============================================================================

ISSUE: Days not staying contiguous after selection  
FIX: Ensure areContiguous() function properly sorts days before checking

ISSUE: Price calculation incorrect  
FIX: Check that multipliers are applied per-day, not to total

ISSUE: Error states not clearing  
FIX: Call clearError() after successful operations

ISSUE: TypeScript errors with Day types  
FIX: Ensure DayOfWeek type is properly constrained to 0-6

ISSUE: Toast notifications not dismissing  
FIX: Verify setTimeout is properly clearing toasts

\=============================================================================

XI. ADDITIONAL RESOURCES  
\=============================================================================

Documentation:

- React: [https://react.dev](https://react.dev)  
- \- TypeScript: [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/)  
- \- React Testing Library: [https://testing-library.com/react](https://testing-library.com/react)

Tools:

- VS Code with ESLint and Prettier  
- \- React Developer Tools (browser extension)  
- \- Chrome DevTools for debugging

Community:

- Stack Overflow for React questions  
- \- React Discord community  
- \- GitHub for open-source examples

\=============================================================================

XII. CONCLUSION  
\=============================================================================

This guide provides a complete roadmap for converting the Bubble Listing Schedule Selector into a React component. The key differences are:

1. State Management: Bubble’s visual state system → React hooks  
2. 2\. Workflows: Visual workflows → JavaScript functions  
3. 3\. Database: Built-in Bubble DB → External API calls  
4. 4\. UI: Bubble’s drag-drop → JSX \+ CSS  
5. 5\. Logic: Conditional actions → Conditional rendering

The React version offers:  
✓ Better performance and scalability  
✓ Full code control and customization  
✓ Modern development practices  
✓ Easier testing and debugging  
✓ Portable across projects  
✓ Type safety with TypeScript

Follow the steps in order, test each component thoroughly, and you’ll have a production-ready React component that replicates all the functionality of the original Bubble element.

\=============================================================================  
END OF DOCUMENT  
\=============================================================================