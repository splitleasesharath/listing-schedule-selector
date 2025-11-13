LISTING SCHEDULE SELECTOR \- CUSTOM EVENTS ANALYSIS & REACT CONVERSION GUIDE

OVERVIEW  
The Listing Schedule Selector is a reusable element in Bubble that manages scheduling, pricing calculations, and reservation logic for rental properties. The custom events folder contains 10 key workflows that define the core behavior of this component.

\==================================================  
CUSTOM EVENTS DETAILED ANALYSIS  
\==================================================

1. ALERTS GENERAL  
2. Purpose: Universal alert/notification system for user feedback  
3. Trigger: Custom event “Alerts General is triggered”  
4. Parameters:  
5.   \- title: text (required)  
6.   \- content: text (optional)  
7.   \- time (ms): number (optional)  
8.   \- alert type: Alert Type (optional)  
9.   \- Show on Live?: yes/no (optional)

Workflow Steps (6 steps):  
  Step 1: Custom Toast ERROR \- Only when alert type is error and Show on Live? Is yes  
  Step 2: Custom Toast INFORMATION \- Only when alert type is information and Show on Live? Is yes  
  Step 3: Custom Toast WARNING \- Only when alert type is warning and Show on Live? Is yes  
  Step 4: Custom Toast SUCCESS \- Only when alert type is success and Show on Live? Is yes  
  Step 5: Custom Toast EMPTY ALERT TYPE \- Only when alert type is empty and Show on Live? Is yes  
  Step 6: Custom Toast Version-Test ONLY \- Only when isn’t live version is yes and Show on Live? Formatted as number is 0

React Implementation:

- Create a Toast/Notification context using React Context API  
- \- Use a notification library like react-toastify or create custom toast component  
- \- Implement toast types: error, information, warning, success  
- \- Add conditional rendering based on environment (development vs production)

2\. CALCULATE DAYS, THEN SORT DAYS AND SET STATES  
Purpose: Core scheduling logic \- handles day selection, sorting, and state management  
Trigger: Custom event “calculate days, then sort days and set states is triggered”  
Parameters:

- Parent\_group\_day: Days (optional)  
-   \- add: yes/no (required)  
-   \- remove: yes/no (required)

Workflow Steps (21 steps):  
  Step 1: add day and sort days \- Only when Selected Days count is not 7 and add is yes  
  Step 2: Remove the new day and then sort days \- Only when remove is yes  
  Step 3: Set NOT Selected days and Sort  
  Step 4: Set check out day (number) \- only when including Sunday \- Only when Selected Days contains Sunday  
  Step 5: Set check out day  
  Step 6: (Corner case) Set check out day \- Only when Not Selected Days doesn’t contain Sunday  
  Step 7: Set check in day  
  Step 8: (Corner case) Set check in day \- Only when Not Selected Days doesn’t contain Sunday  
  Step 9: Create list of nights (take selected days, sort and remove last item)  
  Step 10: Set start night number  
  Step 11: (Corner Case) Set start night number \- Only when Not Selected Days doesn’t contain Sunday  
  Step 12: Set start night (num) \_duplicated on purpose  
  Step 13: (Corner Case) Set start night number \_duplicated on purpose \- Only when Not Selected Days doesn’t contain Sunday  
  Step 14: Set end night number  
  Step 15: Set end night  
  Step 16: Set start day number  
  Step 17: Create unused nights list by removing selected nights  
  Step 18: set list of days as numbers  
  Step 19: count number of selected nights and set nights number  
  Step 20: Set selected nights (num list)  
  Step 21: Trigger Run JS \- Check Contiguity

React Implementation:

- Create a state management system (useState or useReducer) for:  
-   \* selectedDays: array of selected day objects  
-   \* notSelectedDays: array of unselected days  
-   \* startNight/endNight: numbers  
-   \* checkInDay/checkOutDay: day identifiers  
-   \* selectedNights: array of night numbers  
-   \* unusedNights: array of unused nights  
- \- Implement day selection logic with add/remove functionality  
- \- Create sorting functions for days and nights  
- \- Implement Sunday special case handling (week boundary logic)  
- \- Create utility functions to convert between days and numbers  
- \- Trigger contiguity check after state updates

3\. CALCULATE LISTING NIGHTLY PRICE  
Purpose: Calculates the nightly rental price based on rental type (monthly vs nightly) and number of nights  
Trigger: Custom event “calculate listing nightly price is triggered”  
Parameters: None

Workflow Steps (13+ steps):  
  Step 1: calculate monthly rental prorated nightly host rate \- Only when Listing’s rental type is Monthly  
  Step 3: calculate monthly rental listing nightly price \- Only when Listing’s rental type is Monthly  
  Step 5: set nightly host rate when 3 nights selected \- Only when Selected Nights count is 3  
  Step 7: set nightly host rate when 4 nights selected \- Only when Selected Nights count is 4  
  Step 8: set nightly host rate when 5 nights selected \- Only when Selected Nights count is 5  
  Step 9: set nightly host rate when 7 nights selected \- Only when Selected Nights count is 7  
  Step 11: calculate 4 week rent \- monthly and nightly  
  Step 12: calculate initial payment  
  Step 13: calculate total reservation price

React Implementation:

- Create a pricing calculation hook (usePriceCalculator)  
- \- Implement rental type logic (Monthly vs Nightly)  
- \- Create tiered pricing based on number of nights (3, 4, 5, 7+ nights)  
- \- Calculate prorated monthly rental to nightly rate  
- \- Compute total reservation price with initial payment  
- \- Store calculated values in component state  
- \- Recalculate when dependencies change (rental type, nights selected)

4\. CHECK ERROR MESSAGES WHEN REMOVING  
Purpose: Validates removal of days and shows appropriate error messages  
Trigger: Custom event “check errors when removing is triggered”  
Parameters:

- Day: Days (required)

Workflow Steps (2+ steps):  
  Step 1: Change popup to ask user \- Only when Selected Nights count is \> 1  
  Step 2: Store Keys Floppy popupNumber \- Only when Selected Nights count is 1 and Floppy popupNumber’s Scalar Value (Storage) \< 6

Conditions:

- Checks if Listing Schedule Selector’s Selected Days contains day end  
- \- Checks if Listing Schedule Selector’s Selected Nights count is less than Listing’s Minimum Nights

React Implementation:

- Create validation functions for day removal  
- \- Implement popup/modal logic for user confirmation  
- \- Check minimum nights constraint before allowing removal  
- \- Display appropriate error messages using the Alerts system  
- \- Prevent removal if it violates business rules  
- \- Store popup interaction counts (floppy popup logic)

5\. CREATE RESERVATION SPAN VARIABLES  
Purpose: Calculates and sets variables related to the reservation time span (weeks, months)  
Trigger: Custom event “Create reservation span variables is triggered”  
Parameters: None

Workflow Steps (5 steps):  
  Step 1: Set actual weeks during 4 weeks  
  Step 2: Set number of months  
  Step 3: (corner case: other span) Set number of months \- Only when Reservation Span (Weeks) is Other (wks)  
  Step 4: Set actual weeks during reservation span  
  Step 5: Set actual weeks during reservation span WHEN is OTHER \- Only when Reservation Span (Weeks) is Other (wks)

React Implementation:

- Create span calculation utilities  
- \- Handle different reservation span types (4 weeks, other custom spans)  
- \- Calculate actual weeks within reservation period  
- \- Compute number of months covered  
- \- Handle edge cases for “other” span types  
- \- Store span variables in state

6\. RUN JS \- CHECK CONTIGUITY  
Purpose: Executes JavaScript to check if selected days are contiguous (consecutive)  
Trigger: Custom event “Run JS \- Check Contiguity is triggered”  
Parameters: None

Workflow Steps (6 steps):  
  Step 1: Run javascript-Checks Contiguity  
  Step 2: Add a pause before next action  
  Step 3: Set isContiguous to yes from javascript to bubble \- Only when JS2B-ChecksContiguity’s value is Contiguous  
  Step 4: Set isContiguous to no from javascript to bubble \- Only when JS2B-ChecksContiguity’s value is Not Contiguous  
  Step 5: Store Keys Floppy popupNumber \- Only when JS2B-ChecksContiguity’s value is Not Contiguous  
  Step 6: Show Days Selected Error \- Only when JS2B-ChecksContiguity’s value is Not Contiguous and Floppy popupNumber’s Scalar Value (Storage) \< 6

React Implementation:

- Create a JavaScript/TypeScript function to check day contiguity  
- \- Algorithm: Check if selected days form a consecutive sequence  
- \- Handle week wraparound (Sunday to Monday transition)  
- \- Set contiguity state (isContiguous: boolean)  
- \- Trigger error display if days are not contiguous  
- \- Implement the floppy popup counter logic  
- \- Add delay/debounce if needed before next action

7\. SAVE SCHEDULE  
Purpose: Persists the schedule selection (likely saves to database or parent component)  
Trigger: Custom event “save schedule is triggered”  
Parameters: None

Workflow Steps (1+ step):  
  Step 1: Save ideal schedule \- Only when URL contains “ideal\_schedule\_search”

React Implementation:

- Create a save function that sends schedule data to backend/API  
- \- Check URL parameters or route to determine save context  
- \- Collect all schedule state data (selected days, nights, pricing, etc.)  
- \- Make API call to persist schedule  
- \- Show success/error notifications  
- \- Update parent component or trigger callback with saved data  
- \- Handle loading states during save operation

8\. SET DISCOUNTS AND MARKUPS MULTIPLIER  
Purpose: Applies pricing adjustments based on listing configuration and number of nights  
Trigger: Custom event “set discounts and markups multipliers for adding is triggered”  
Parameters:

- Listing: Listing (required)  
-   \- number of nights: number (required)

Workflow Steps (2+ steps):  
  Step 1: set markups and discounts multiplier  
  Step 2: (corner case) add weekly markup to markups and discounts multiplier \- Only when listing’s rental type is Weekly

React Implementation:

- Create a pricing multiplier calculation function  
- \- Accept listing object and number of nights as parameters  
- \- Apply discounts based on night count (longer stays \= bigger discounts)  
- \- Add markups based on rental type (weekly markup for Weekly rentals)  
- \- Calculate combined multiplier value  
- \- Store multiplier in state  
- \- Use multiplier in final price calculations

9\. SET PRICE MULTIPLIERS  
Purpose: Sets pricing multipliers based on rental type (Monthly, Nightly, Weekly)  
Trigger: Custom event “set price multiplier by rental type (1. Monthly, 2\. Weekly, 3\. nightly) is triggered”  
Parameters: None

Workflow Steps (2+ steps):  
  Step 1: set nightly price multiplier for monthly rental types \- Only when Listing’s rental type is Monthly  
  Step 2: set nightly price multiplier for weekly rental types \- Only when Listing’s rental type is Weekly  
  Step 3: set nightly price multiplier for nightly rental types \- Only when Listing’s rental type is Nightly and Selected Nights count is 7

React Implementation:

- Create a function to determine and set base price multiplier  
- \- Check listing’s rental type (Monthly, Weekly, Nightly)  
- \- Set appropriate multiplier based on rental type  
- \- Handle special case: 7 nights selected for Nightly rental  
- \- Store multiplier value in state  
- \- This multiplier likely affects base nightly rate calculation  
10. SET UNUSED NIGHTS DISCOUNT  
11. Purpose: Applies discount multiplier for unused nights in the reservation  
12. Trigger: Custom event “set unused nights discount is triggered”  
13. Parameters:  
14.   \- listing: Listing (required)  
15.   \- number of nights: number (required)  
16.   \- unused nights mult: number (required)

Workflow Steps (7+ steps):  
  Step 1: set 0 night discount \- Only when listing’s \# of nights available \- number of nights is 0  
  Step 2: set 2 night discount \- Only when listing’s \# of nights available \- number of nights is 2  
  Step 3: set 4 night discount \- Only when listing’s \# of nights available \- number of nights is 4  
  Step 7: set 6 unused nights discount \- Only when listing’s \# of nights available \- number of nights is 7 and listing’s rental type is not Nightly

React Implementation:

- Create discount calculation based on unused nights  
- \- Calculate unused nights: (listing.availableNights \- selectedNights)  
- \- Apply tiered discount rates (0, 2, 4, 6, 7 unused nights)  
- \- Handle rental type conditions (exclude Nightly type for 7-night discount)  
- \- Multiply with unused nights multiplier parameter  
- \- Store discount value in state  
- \- Apply discount in final price calculation

\==================================================  
STEP-BY-STEP REACT CONVERSION GUIDE  
\==================================================

STEP 1: PROJECT SETUP & DEPENDENCIES  
—-------------------------------------

1. Create React project with TypeScript:  
2.    Npx create-react-app listing-schedule-selector –template typescript

2\. Install necessary dependencies:  
   Npm install –save  
     React-toastify          \# For toast notifications  
     Date-fns                \# For date manipulation  
     Axios                   \# For API calls  
     @tanstack/react-query   \# For data fetching     zustand                 \# For state management (alternative to Redux)3. Project structure:   /src     /components       /ListingScheduleSelector         index.tsx         ScheduleSelector.tsx         DayButton.tsx         PriceDisplay.tsx         styles.css     /hooks       [useScheduleState.ts](http://useScheduleState.ts)       [usePriceCalculator.ts](http://usePriceCalculator.ts)  
       [useContiguityCheck.ts](http://useContiguityCheck.ts)  
     /utils  
       [dayHelpers.ts](http://dayHelpers.ts)  
       [priceHelpers.ts](http://priceHelpers.ts)  
       [contiguityCheck.ts](http://contiguityCheck.ts)  
     /types  
       [listing.ts](http://listing.ts)  
       [schedule.ts](http://schedule.ts)  
     /services  
       [api.ts](http://api.ts)

STEP 2: DEFINE TYPESCRIPT TYPES  
—-------------------------------------  
Create /types/[schedule.ts](http://schedule.ts):

Interface Day {  
  Id: number;  
  Name: string;  
  shortName: string;  
  Selected: boolean;  
}

Interface Night {  
  Id: number;  
  dayId: number;  
  Selected: boolean;  
}

Type RentalType \= ‘Monthly’ | ‘Weekly’ | ‘Nightly’;  
Type AlertType \= ‘error’ | ‘information’ | ‘warning’ | ‘success’;

Interface Listing {  
  Id: string;  
  rentalType: RentalType;  
  minimumNights: number;  
  availableNights: number;  
  monthlyRate?: number;  
  weeklyRate?: number;  
  nightlyRate?: number;  
  Discounts?: {  
    Nights3?: number;  
    Nights4?: number;  
    Nights5?: number;  
    Nights7?: number;  
  };  
  unusedNightsDiscount?: {  
    Unused0?: number;  
    Unused2?: number;  
    Unused4?: number;  
    Unused6?: number;  
    Unused7?: number;  
  };  
}

Interface ScheduleState {  
  selectedDays: Day\[\];  
  notSelectedDays: Day\[\];  
  selectedNights: Night\[\];  
  unusedNights: Night\[\];  
  startNight: number | null;  
  endNight: number | null;  
  checkInDay: number | null;  
  checkOutDay: number | null;  
  isContiguous: boolean;  
  nightsCount: number;  
  priceMultiplier: number;  
  discountMultiplier: number;  
  nightlyPrice: number;  
  totalPrice: number;  
  initialPayment: number;  
}

STEP 3: CREATE UTILITY FUNCTIONS  
—-------------------------------------  
Create /utils/[dayHelpers.ts](http://dayHelpers.ts):

Export const DAYS \= \[  
  { id: 0, name: ‘Sunday’, shortName: ‘Sun’ },  
  { id: 1, name: ‘Monday’, shortName: ‘Mon’ },  
  { id: 2, name: ‘Tuesday’, shortName: ‘Tue’ },  
  { id: 3, name: ‘Wednesday’, shortName: ‘Wed’ },  
  { id: 4, name: ‘Thursday’, shortName: ‘Thu’ },  
  { id: 5, name: ‘Friday’, shortName: ‘Fri’ },  
  { id: 6, name: ‘Saturday’, shortName: ‘Sat’ },  
\];

Export const sortDays \= (days: Day\[\]): Day\[\] \=\> {  
  Return \[...days\].sort((a, b) \=\> [a.id](http://a.id) \- [b.id](http://b.id));  
};

Export const dayToNumber \= (day: Day): number \=\> [day.id](http://day.id);

Export const createNightsFromDays \= (days: Day\[\]): Night\[\] \=\> {  
  Const sortedDays \= sortDays(days);  
  // Remove last day since nights are between check-in and check-out  
  Return sortedDays.slice(0, \-1).map(day \=\> ({  
    Id: [day.id](http://day.id),  
    dayId: [day.id](http://day.id),  
    Selected: true  
  }));  
};

Export const getUnusedNights \= (allNights: Night\[\], selectedNights: Night\[\]): Night\[\] \=\> {  
  Const selectedIds \= new Set(selectedNights.map(n \=\> [n.id](http://n.id)));  
  Return allNights.filter(night \=\> \!selectedIds.has([night.id](http://night.id)));  
};

Create /utils/[contiguityCheck.ts](http://contiguityCheck.ts):

Export const checkContiguity \= (selectedDays: Day\[\]): boolean \=\> {  
  If (selectedDays.length \<= 1\) return true;  
    
  Const sortedDays \= \[...selectedDays\].sort((a, b) \=\> [a.id](http://a.id) \- [b.id](http://b.id));  
  Const dayIds \= sortedDays.map(d \=\> [d.id](http://d.id));  
    
  // Check for normal contiguity (no week wrap)  
  Let isContiguous \= true;  
  For (let i \= 0; i \< dayIds.length \- 1; i++) {  
    If (dayIds\[i \+ 1\] \- dayIds\[i\] \!== 1\) {  
      isContiguous \= false;  
      Break;  
    }  
  }  
    
  If (isContiguous) return true;  
    
  // Check for week wrap (Saturday to Sunday)  
  If (dayIds.includes(0) && dayIds.includes(6)) {  
    Const withoutSunday \= dayIds.filter(id \=\> id \!== 0);  
    Const withoutSaturday \= dayIds.filter(id \=\> id \!== 6);  
      
    // Check if remaining days are contiguous  
    Const checkSequence \= (ids: number\[\]): boolean \=\> {  
      For (let i \= 0; i \< ids.length \- 1; i++) {  
        If (ids\[i \+ 1\] \- ids\[i\] \!== 1\) return false;  
      }  
      Return true;  
    };  
      
    Return checkSequence(withoutSunday) || checkSequence(withoutSaturday);  
  }  
    
  Return false;  
};

Create /utils/[priceHelpers.ts](http://priceHelpers.ts):

Export const calculatePriceMultiplier \= (  
  Listing: Listing,  
  nightsCount: number  
): number \=\> {  
  Const { rentalType } \= listing;  
    
  If (rentalType \=== ‘Monthly’) {  
    // Monthly rental calculation logic  
    Return 1.0; // Base multiplier, adjust based on business logic  
  }  
    
  If (rentalType \=== ‘Weekly’) {  
    // Weekly rental multiplier  
    Return 1.0;  
  }  
    
  If (rentalType \=== ‘Nightly’ && nightsCount \=== 7\) {  
    // Special case for 7 nights  
    Return 1.0;  
  }  
    
  Return 1.0;  
};

Export const calculateDiscountMultiplier \= (  
  Listing: Listing,  
  nightsCount: number  
): number \=\> {  
  Const discounts \= listing.discounts || {};  
    
  If (nightsCount \=== 3 && discounts.nights3) {  
    Return discounts.nights3;  
  }  
  If (nightsCount \=== 4 && discounts.nights4) {  
    Return discounts.nights4;  
  }  
  If (nightsCount \=== 5 && discounts.nights5) {  
    Return discounts.nights5;  
  }  
  If (nightsCount \=== 7 && discounts.nights7) {  
    Return discounts.nights7;  
  }  
    
  Return 1.0; // No discount  
};

Export const calculateUnusedNightsDiscount \= (  
  Listing: Listing,  
  selectedNights: number,  
  unusedNightsMult: number  
): number \=\> {  
  Const unusedNights \= listing.availableNights \- selectedNights;  
  Const discounts \= listing.unusedNightsDiscount || {};  
    
  Let baseDiscount \= 1.0;  
    
  If (unusedNights \=== 0 && discounts.unused0) {  
    baseDiscount \= discounts.unused0;  
  } else if (unusedNights \=== 2 && discounts.unused2) {  
    baseDiscount \= discounts.unused2;  
  } else if (unusedNights \=== 4 && discounts.unused4) {  
    baseDiscount \= discounts.unused4;  
  } else if (unusedNights \=== 6 && discounts.unused6) {  
    baseDiscount \= discounts.unused6;  
  } else if (unusedNights \=== 7 && discounts.unused7 && listing.rentalType \!== ‘Nightly’) {  
    baseDiscount \= discounts.unused7;  
  }  
    
  Return baseDiscount \* unusedNightsMult;  
};

STEP 4: CREATE CUSTOM HOOKS  
—-------------------------------------  
Create /hooks/[useScheduleState.ts](http://useScheduleState.ts):

Import { useState, useCallback, useEffect } from ‘react’;  
Import { sortDays, createNightsFromDays, getUnusedNights } from ‘../utils/dayHelpers’;  
Import { checkContiguity } from ‘../utils/contiguityCheck’;  
Import { Day, Night, ScheduleState, Listing } from ‘../types/schedule’;

Export const useScheduleState \= (listing: Listing) \=\> {  
  Const \[state, setState\] \= useState\<ScheduleState\>({  
    selectedDays: \[\],  
    notSelectedDays: \[\],  
    selectedNights: \[\],  
    unusedNights: \[\],  
    startNight: null,  
    endNight: null,  
    checkInDay: null,  
    checkOutDay: null,  
    isContiguous: true,  
    nightsCount: 0,  
    priceMultiplier: 1.0,  
    discountMultiplier: 1.0,  
    nightlyPrice: 0,  
    totalPrice: 0,  
    initialPayment: 0,  
  });

  // Event 2: Calculate days, then sort days and set states  
  Const calculateDaysAndSetStates \= useCallback((  
    Day: Day,  
    Add: boolean,  
    Remove: boolean  
  ) \=\> {  
    setState(prev \=\> {  
      Let newSelectedDays \= \[...prev.selectedDays\];  
        
      // Step 1 & 2: Add or remove day  
      If (add && newSelectedDays.length \< 7\) {  
        newSelectedDays.push(day);  
      } else if (remove) {  
        newSelectedDays \= newSelectedDays.filter(d \=\> [d.id](http://d.id) \!== [day.id](http://day.id));  
      }  
        
      // Sort days  
      newSelectedDays \= sortDays(newSelectedDays);  
        
      // Step 3: Set NOT selected days  
      Const allDays \= DAYS.map(d \=\> ({ …d, selected: false }));  
      Const selectedIds \= new Set(newSelectedDays.map(d \=\> [d.id](http://d.id)));  
      Const notSelectedDays \= allDays.filter(d \=\> \!selectedIds.has([d.id](http://d.id)));  
        
      // Steps 4-8: Set check in/out days  
      Const hasSunday \= newSelectedDays.some(d \=\> [d.id](http://d.id) \=== 0);  
      Let checkOutDay \= newSelectedDays\[newSelectedDays.length \- 1\]?.id || null;  
      Let checkInDay \= newSelectedDays\[0\]?.id || null;  
        
      // Handle Sunday corner cases  
      If (hasSunday) {  
        // Special Sunday logic  
      }  
        
      // Step 9-20: Create nights and set numbers  
      Const selectedNights \= createNightsFromDays(newSelectedDays);  
      Const nightsCount \= selectedNights.length;  
        
      // Step 21: Check contiguity  
      Const isContiguous \= checkContiguity(newSelectedDays);  
        
      Return {  
        …prev,  
        selectedDays: newSelectedDays,  
        notSelectedDays,  
        selectedNights,  
        checkInDay,  
        checkOutDay,  
        nightsCount,  
        isContiguous,  
      };  
    });  
  }, \[\]);

  Return {  
    State,  
    calculateDaysAndSetStates,  
  };  
};

STEP 5: CREATE NOTIFICATION SYSTEM  
—-------------------------------------  
Create /components/NotificationProvider.tsx:

Import React, { createContext, useContext, useCallback } from ‘react’;  
Import { ToastContainer, toast } from ‘react-toastify’;  
Import ‘react-toastify/dist/ReactToastify.css’;

Type AlertType \= ‘error’ | ‘information’ | ‘warning’ | ‘success’;

Interface NotificationContextType {  
  showAlert: (  
    Title: string,  
    Content?: string,  
    Type?: AlertType,  
    showOnLive?: boolean  
  ) \=\> void;  
}

Const NotificationContext \= createContext\<NotificationContextType | undefined\>(undefined);

Export const NotificationProvider: [React.FC](http://React.FC)\<{ children: React.ReactNode }\> \= ({ children }) \=\> {  
  // Event 1: Alerts General implementation  
  Const showAlert \= useCallback((  
    Title: string,  
    Content: string \= ‘’,  
    Type: AlertType \= ‘information’,  
    showOnLive: boolean \= true  
  ) \=\> {  
    Const isProduction \= process.env.NODE\_ENV \=== ‘production’;  
      
    // Only show if showOnLive is true or we’re in development  
    If (\!showOnLive && isProduction) {  
      Return;  
    }  
      
    Const message \= content ? \`${title}: ${content}\` : title;  
      
    Switch (type) {  
      Case ‘error’:  
        toast.error(message);  
        Break;  
      Case ‘warning’:  
        toast.warning(message);  
        Break;  
      Case ‘success’:  
        toast.success(message);  
        Break;  
      Case ‘information’:  
      Default:  
        [toast.info](http://toast.info)(message);  
        Break;  
    }  
  }, \[\]);

  Return (  
    \<NotificationContext.Provider value={{ showAlert }}\>  
      {children}  
      \<ToastContainer  
        position=”top-right”  
        autoClose={5000}  
        hideProgressBar={false}  
        closeOnClick  
        pauseOnHover  
      /\>  
    \</NotificationContext.Provider\>  
  );  
};

Export const useNotification \= () \=\> {  
  Const context \= useContext(NotificationContext);  
  If (\!context) {  
    Throw new Error(‘useNotification must be used within NotificationProvider’);  
  }  
  Return context;  
};

STEP 6: CREATE MAIN COMPONENT  
—-------------------------------------  
Create /components/ListingScheduleSelector/ScheduleSelector.tsx:

Import React, { useState, useEffect } from ‘react’;  
Import { useScheduleState } from ‘../../hooks/useScheduleState’;  
Import { useNotification } from ‘../NotificationProvider’;  
Import { calculatePriceMultiplier, calculateDiscountMultiplier } from ‘../../utils/priceHelpers’;  
Import { Listing, Day } from ‘../../types/schedule’;  
Import { DAYS } from ‘../../utils/dayHelpers’;

Interface ScheduleSelectorProps {  
  Listing: Listing;  
  onSave?: (scheduleData: any) \=\> void;  
}

Export const ScheduleSelector: [React.FC](http://React.FC)\<ScheduleSelectorProps\> \= ({ listing, onSave }) \=\> {  
  Const { state, calculateDaysAndSetStates } \= useScheduleState(listing);  
  Const { showAlert } \= useNotification();  
    
  // Handle day click  
  Const handleDayClick \= (day: Day) \=\> {  
    Const isSelected \= state.selectedDays.some(d \=\> [d.id](http://d.id) \=== [day.id](http://day.id));  
      
    // Event 4: Check error messages when removing  
    If (isSelected) {  
      // Validate before removal  
      If (state.nightsCount \<= listing.minimumNights) {  
        showAlert(  
          ‘Cannot remove day’,  
          \`Minimum ${listing.minimumNights} nights required\`,  
          ‘Error’  
        );  
        Return;  
      }  
        
      calculateDaysAndSetStates(day, false, true);  
    } else {  
      calculateDaysAndSetStates(day, true, false);  
    }  
  };  
    
  // Event 6: Check contiguity after state changes  
  useEffect(() \=\> {  
    If (\!state.isContiguous && state.selectedDays.length \> 0\) {  
      showAlert(  
        ‘Days Selected Error’,  
        ‘Please select consecutive days’,  
        ‘Error’  
      );  
    }  
  }, \[state.isContiguous, state.selectedDays.length, showAlert\]);  
    
  // Event 7: Save schedule  
  Const handleSaveSchedule \= () \=\> {  
    If (\!state.isContiguous) {  
      showAlert(‘Cannot save’, ‘Days must be contiguous’, ‘error’);  
      Return;  
    }  
      
    Const scheduleData \= {  
      selectedDays: state.selectedDays,  
      selectedNights: state.selectedNights,  
      checkInDay: state.checkInDay,  
      checkOutDay: state.checkOutDay,  
      totalPrice: state.totalPrice,  
      nightlyPrice: state.nightlyPrice,  
    };  
      
    onSave?.(scheduleData);  
    showAlert(‘Schedule saved’, ‘Your schedule has been saved successfully’, ‘success’);  
  };  
    
  Return (  
    \<div className=”schedule-selector”\>  
      \<h2\>Select Your Schedule\</h2\>  
        
      \<div className=”days-container”\>  
        {DAYS.map(day \=\> {  
          Const isSelected \= state.selectedDays.some(d \=\> [d.id](http://d.id) \=== [day.id](http://day.id));  
          Return (  
            \<button  
              key={[day.id](http://day.id)}  
              className={\`day-button ${isSelected ? ‘selected’ : ‘’}\`}  
              onClick={() \=\> handleDayClick(day)}  
            \>  
              {day.shortName}  
            \</button\>  
          );  
        })}  
      \</div\>  
        
      \<div className=”schedule-info”\>  
        \<p\>Nights selected: {state.nightsCount}\</p\>  
        \<p\>Check-in: {state.checkInDay \!== null ? DAYS\[state.checkInDay\].name : ‘-’}\</p\>  
        \<p\>Check-out: {state.checkOutDay \!== null ? DAYS\[state.checkOutDay\].name : ‘-’}\</p\>  
        \<p\>Nightly price: ${state.nightlyPrice}\</p\>  
        \<p\>Total price: ${state.totalPrice}\</p\>  
      \</div\>  
        
      \<button   
        className=”save-button”  
        onClick={handleSaveSchedule}  
        disabled={\!state.isContiguous || state.nightsCount \=== 0}  
      \>  
        Save Schedule  
      \</button\>  
    \</div\>  
  );  
};

STEP 7: SUMMARY OF IMPLEMENTATION  
—-------------------------------------

KEY MAPPINGS FROM BUBBLE TO REACT:

1. Custom Events → Functions/Hooks  
2.    \- Each Bubble custom event becomes a function or hook method  
3.    \- Parameters map to function parameters  
4.    \- Workflows map to function logic

2\. Element States → React State

- Bubble’s element states become useState or useReducer state  
-    \- Custom states map to interface properties  
-    \- State changes trigger re-renders automatically

3\. Conditions → JavaScript Logic

- “Only when” conditions become if statements  
-    \- Multiple conditional steps become switch/case or if-else chains

4\. Triggers → useEffect/useCallback

- Event triggers become function calls  
-    \- Sequential workflows use async/await or promise chains  
-    \- Side effects use useEffect hook  
5. Data Types → TypeScript Interfaces  
6.    \- Bubble data types become TypeScript interfaces  
7.    \- Option sets become TypeScript enums or union types  
8.    \- Lists become arrays with proper typing

NEXT STEPS FOR FULL IMPLEMENTATION:

1. Implement remaining pricing calculations (Event 3, 8, 9, 10\)  
2. 2\. Add reservation span calculations (Event 5\)  
3. 3\. Create API service layer for save functionality  
4. 4\. Add proper error handling and loading states  
5. 5\. Implement CSS styling to match Bubble design  
6. 6\. Add unit tests for utility functions  
7. 7\. Add integration tests for component behavior  
8. 8\. Optimize performance with useMemo/useCallback where needed  
9. 9\. Add accessibility features (ARIA labels, keyboard navigation)  
10. 10\. Document component props and usage

TESTING STRATEGY:

1. Unit Tests:  
2.    \- Test utility functions (dayHelpers, priceHelpers, contiguityCheck)  
3.    \- Test each function in isolation with various inputs  
4.      
5. 2\. Integration Tests:  
6.    \- Test component behavior with different listing types  
7.    \- Test day selection/removal flows  
8.    \- Test price calculation flows  
9.    \- Test error handling and validation

3\. E2E Tests:

- Test complete user flows from selection to save  
-    \- Test edge cases (week boundaries, minimum nights)  
-    \- Test different rental types

DEPLOYMENT CONSIDERATIONS:

1. Environment variables for API endpoints  
2. 2\. Error tracking (Sentry, LogRocket)  
3. 3\. Analytics tracking for user interactions  
4. 4\. Performance monitoring  
5. 5\. Bundle size optimization  
6. 6\. Browser compatibility testing

\==================================================  
CONCLUSION  
\==================================================

This document provides a comprehensive analysis of the Listing Schedule Selector’s custom events and a detailed roadmap for converting it to a React component.

The 10 custom events analyzed represent the core business logic:

1. Alerts General \- Universal notification system  
2. 2\. Calculate days \- Core scheduling logic with 21 steps  
3. 3\. Calculate nightly price \- Pricing engine with rental type logic  
4. 4\. Check error messages \- Validation system  
5. 5\. Create reservation span variables \- Time span calculations  
6. 6\. Run JS \- Check Contiguity \- Day sequence validation  
7. 7\. Save schedule \- Persistence layer  
8. 8\. Set discounts and markups \- Pricing adjustments  
9. 9\. Set price multipliers \- Base pricing by rental type  
10. 10\. Set unused nights discount \- Additional pricing logic

The React implementation follows modern best practices:

- TypeScript for type safety  
- \- Custom hooks for reusable logic  
- \- Context API for notifications  
- \- Separation of concerns (utils, hooks, components)  
- \- Functional components with hooks  
- \- Comprehensive state management

This conversion enables:

- Better performance and user experience  
- \- Easier testing and maintenance  
- \- Modern development workflow  
- \- Better scalability  
- \- Independent deployment outside Bubble

The code structure provided serves as a solid foundation that can be extended with additional features and optimizations as needed.