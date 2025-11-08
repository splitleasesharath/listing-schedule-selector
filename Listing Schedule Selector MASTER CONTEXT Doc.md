Listing Schedule Selector \- Bubble to React Conversion Guide

\================================================================================

TABLE OF CONTENTS

1. Component Overview  
2. 2\. Visual Design & Layout  
3. 3\. Custom States (Data Model)  
4. 4\. Element Hierarchy & Structure  
5. 5\. Conditional Logic & Behaviors  
6. 6\. Step-by-Step React Conversion Guide  
7. 7\. React Code Structure  
8. 8\. State Management Implementation  
9. 9\. Styling Guidelines  
10. 10\. Testing Considerations

\================================================================================

1. COMPONENT OVERVIEW

Purpose:  
The Listing Schedule Selector is a reusable element that allows users to select days of the week for scheduling listings. It displays a 7-column grid representing days of the week (Sunday through Saturday) and manages complex state for day/night selections, pricing, and availability.

Key Features:

- Visual day selector with 7 day cells  
- \- Toggle selection for each day  
- \- Multiple custom states for managing selections, pricing, and availability  
- \- Error handling with overlay messages  
- \- Responsive layout with fixed dimensions  
- \- Integration with parent listing data

\================================================================================

2. VISUAL DESIGN & LAYOUT

Container Properties:

- Type: Group container  
- \- Content Type: Listing  
- \- Default Width: 264px  
- \- Min Width: 0px  
- \- Min Height: 42px  
- \- Max Width: Infinite  
- \- Max Height: Infinite  
- \- Container Layout: Align to parent  
- \- Background: None  
- \- Opacity: 100%  
- \- Border: Solid, 2px width, \#6B6B6B color, 5px roundness  
- \- Shadow: None  
- \- Padding: All sides 0px

Repeating Group (RG Days):

- Type: Repeating Group  
- \- Content Type: Days  
- \- Data Source: All Days (static list of 7 days)  
- \- Layout: Fixed number of rows and columns  
- \- Rows: 1  
- \- Columns: 7  
- \- Style: None (Custom)  
- \- Separator: None  
- \- Background: None

Day Cell Properties:

- Type: Group  
- \- Content Type: Days (Current cell’s Days)  
- \- Width: 32px  
- \- Height: 32px  
- \- Background: Flat color \#FFFFFF (white)  
- \- Border: None, 10px roundness  
- \- Clickable: Not clickable by default  
- \- Shadow: None

Day Text Element (Select Day of Week):

- Type: Text  
- \- Content: “X” (single character display)  
- \- Background Color: \#4F3097 (purple) \- when selected  
- \- Background Color: \#B2B2B2 (gray) \- default state  
- \- Font Color: \#FFFFFF (white) when selected  
- \- Font Color: Text (\#4D4D4D) when not selected  
- \- Bottom Margin: 0  
- \- Left Margin: 0  
- \- Right Margin: 0

\================================================================================

3. CUSTOM STATES (Data Model)

The component has 26 custom states that manage various aspects of the schedule selector:

State 1: Acceptable Sch

- Type: yes/no  
- \- Default: (not specified)  
- \- Purpose: Tracks if the current schedule configuration is acceptable

State 2: Actual Weeks Days AM

- Type: number  
- \- List: Yes  
- \- Purpose: Stores AM week day counts

State 3: Actual Weeks Days PM  

- Type: number  
- \- List: Yes  
- \- Purpose: Stores PM week day counts

State 4: Autobind Listing

- Type: yes/no  
- \- Default: no  
- \- Purpose: Controls whether to autobind with listing data

State 5: Change Listings

- Type: yes/no  
- \- List: Yes  
- \- Purpose: Tracks which listings need changes

State 6: Change Pricing

- Type: text  
- \- Purpose: Stores pricing change information

State 7: Label

- Type: text  
- \- List: Yes  
- \- Purpose: Stores labels for display

State 8: Limit to 5 Nights

- Type: yes/no  
- \- Default: no  
- \- Purpose: Restricts selection to maximum 5 nights

State 9: ZEP-Listing

- Type: Listing  
- \- List: Yes  
- \- Purpose: Stores ZEP listing references

State 10: Listing Nightly N

- Type: number  
- \- List: Yes  
- \- Purpose: Stores nightly listing numbers

State 11: Monthly?

- Type: yes/no  
- \- List: Yes  
- \- Purpose: Tracks if listing is monthly

State 12: Price Multiplier (appears twice)

- Type: number  
- \- List: Yes  
- \- Purpose: Stores pricing multipliers

State 13: Not Selected Days

- Type: Days  
- \- List: Yes  
- \- Purpose: Tracks days that are not selected

State 14: Not Selected Nights

- Type: Nights  
- \- List: Yes  
- \- Purpose: Tracks nights that are not selected

State 15: Number of Months

- Type: number  
- \- Purpose: Stores number of months

State 16: Other Reservation

- Type: number  
- \- List: Yes  
- \- Purpose: Tracks other reservations

State 17: Prorated Nights

- Type: number  
- \- List: Yes  
- \- Purpose: Stores prorated night calculations

State 18: Recalculate State

- Type: yes/no  
- \- Default: no  
- \- Purpose: Triggers recalculation

State 19: Guest Desired User Date

- Type: Weekly Selection option  
- \- List: Yes  
- \- Purpose: Stores guest’s desired dates

State 20: Reservation Specific Days

- Type: Stay Periods (Reservation Specific)  
- \- List: Yes  
- \- Default: 13 weeks…  
- \- Purpose: Stores reservation-specific day periods

State 21: Selected Checkin Days (appears twice)

- Type: Days  
- \- List: Yes  
- \- Purpose: Tracks selected check-in days

State 22: Unused Nights (multiple instances)

- Type: number  
- \- List: Yes  
- \- Purpose: Tracks unused night counts

State 23: Start Night (number)

- Type: number  
- \- List: Yes  
- \- Purpose: Stores start night values

State 24: 4 Week Rent

- Type: number  
- \- List: Yes  
- \- Purpose: Stores 4-week rent amounts

State 25: Total Reservation

- Type: number  
- \- List: Yes  
- \- Purpose: Stores total reservation amounts

State 26: Listing’s Maximum Nights

- Type: number  
- \- Purpose: Maximum allowed nights for the listing

Additional State Logic (from notes):

- When adding a new day and too many nights are selected (more than host wants) and Listing Schedule Selector’s Selected Days (days) doesn’t contain Parent group’s Days and Listing Schedule Selector’s Selected Nights (nights):count \> Listing Schedule Selector’s Listing’s Maximum Nights  
- \- When user removes a day, and nights is less than 2, show popup on how selector works  
- \- Adding nights in general validation  
- \- Removing nights validation  
- \- Every time condition trigger when night selected is restricted night  
- \- Check error messages when removing

\================================================================================

4. ELEMENT HIERARCHY & STRUCTURE

Listing Schedule Selector (Root Group)  
├── Overlays  
│   ├── Days Selected Error  
│   ├── Nights outside of host availability  
│   └── GF: Day selected not available  
├── Layers  
│   ├── F: popupnumber  
│   ├── Floppy popupNumber  
│   ├── JS2B-ChecksContiguity  
│   └── RG Days (Repeating Group)  
│       └── Day (Group Cell \- repeats 7 times)  
│           └── Select Day of Week (Text Element)

Key Relationships:

- The RG Days repeating group iterates through 7 days  
- \- Each Day cell contains a text element showing the day abbreviation  
- \- Overlays are positioned above the main component for error states  
- \- Popup elements handle user interactions

\================================================================================

5. CONDITIONAL LOGIC & BEHAVIORS

Main Component Conditional:  
Condition 1:

- When: This CustomDefinition is visible  
- \- Changes: Border style \- all borders set to None

Day Cell Conditionals:  
Condition 1:

- When: This URL contains turn  
- \- Changes: This element isn’t clickable (checked)

Condition 2:

- When: Listing Schedule Selector’s isContiguous is no  
- \- Changes: (Property selection dropdown)

Select Day of Week Text Conditionals:  
Condition 1:

- When: Listing Schedule Selector’s Selected Days (days) contains Parent group’s Days  
- \- Changes:   
-   \- Background color: \#4F3097 (purple)  
-   \- Font color: \#FFFFFF (white)

Condition 2:

- When: Listing Schedule Selector’s Listing’s Days Available (List of Days) doesn’t contain Parent group’s Days  
-   AND Listing Schedule Selector’s Listing is not empty  
- \- Changes:   
-   \- Text: X  
-   \- Background color: \#B2B2B2 (gray)  
-   \- Font color: Text (\#4D4D4D)

Condition 3:  
(Additional complex logic for availability checking)

Condition 4:  
(Additional validation logic)

Error State Overlays:

1. Days Selected Error \- Shows when invalid day selection occurs  
2. 2\. Nights outside of host availability \- Shows when selected nights exceed availability  
3. 3\. GF: Day selected not available \- Shows when day is unavailable

\================================================================================

6\. STEP-BY-STEP REACT CONVERSION GUIDE

Step 1: Project Setup

1. Create a new React component file: ListingScheduleSelector.jsx  
2. 2\. Install required dependencies:  
3.    \- React (18+)  
4.    \- A state management library (Redux, Zustand, or Context API)  
5.    \- CSS-in-JS solution or CSS modules  
6.    \- [Day.js](http://Day.js) or date-fns for date handling

Step 2: Define the Data Model

1. Create TypeScript interfaces or PropTypes for:  
2.    \- Day object structure  
3.    \- Listing object structure  
4.    \- Night object structure  
5.    \- Reservation object structure  
6. 2\. Define all custom states as React state variables or store slices

Step 3: Create Component Structure

1. Main container component: ListingScheduleSelector  
2. 2\. Child components:  
3.    \- DayGrid (for RG Days)  
4.    \- DayCell (for each day)  
5.    \- ErrorOverlay (for error messages)  
6.    \- PopupNumber (for numeric inputs)

Step 4: Implement State Management

1. Use useState hooks for local component state  
2. 2\. Use useReducer or external state management for complex state  
3. 3\. Implement state for:  
4.    \- selectedDays (array)  
5.    \- selectedNights (array)  
6.    \- availableDays (array)  
7.    \- error states  
8.    \- pricing data  
9.    \- reservation data

Step 5: Build the Day Grid

1. Create static array of 7 days (Sun-Sat)  
2. 2\. Map over days array to render DayCell components  
3. 3\. Implement CSS Grid or Flexbox for 7-column layout

Step 6: Implement Click Handlers

1. Day selection toggle logic  
2. 2\. Validation on selection  
3. 3\. Maximum nights check  
4. 4\. Contiguity check (consecutive days)  
5. 5\. Availability check against listing data

Step 7: Add Conditional Styling

1. Selected state styling (purple background)  
2. 2\. Unavailable state styling (gray with X)  
3. 3\. Default state styling  
4. 4\. Hover effects

Step 8: Implement Error Handling

1. Create error overlay components  
2. 2\. Add validation logic for:  
3.    \- Too many nights selected  
4.    \- Non-contiguous selections  
5.    \- Unavailable days  
6.    \- Minimum/maximum night requirements

Step 9: Add Props Interface

1. Define props for parent communication:  
2.    \- listing (object)  
3.    \- onSelectionChange (callback)  
4.    \- initialSelectedDays (array)  
5.    \- maxNights (number)  
6.    \- limitToFiveNights (boolean)

Step 10: Testing & Refinement

1. Unit tests for selection logic  
2. 2\. Integration tests for state changes  
3. 3\. Visual regression tests  
4. 4\. Accessibility testing (keyboard navigation, ARIA labels)

\================================================================================

7\. REACT CODE STRUCTURE

Recommended File Structure:  
/components  
  /ListingScheduleSelector

- ListingScheduleSelector.jsx (main component)  
-     \- DayGrid.jsx  
-     \- DayCell.jsx  
-     \- ErrorOverlay.jsx  
-     \- ListingScheduleSelector.module.css  
-     \- [types.js](http://types.js) (or .ts)  
-     \- [utils.js](http://utils.js) (helper functions)  
-     \- hooks/  
-       \- [useScheduleValidation.js](http://useScheduleValidation.js)  
-       \- [useSelectedDays.js](http://useSelectedDays.js)  
-     \- \_\_tests\_\_/  
-       \- ListingScheduleSelector.test.jsx

Component Hierarchy:

\<ListingScheduleSelector\>  
  \<ErrorOverlay /\>  
  \<DayGrid\>  
    \<DayCell day={sunday} /\>  
    \<DayCell day={monday} /\>  
    \<DayCell day={tuesday} /\>  
    \<DayCell day={wednesday} /\>  
    \<DayCell day={thursday} /\>  
    \<DayCell day={friday} /\>  
    \<DayCell day={saturday} /\>  
  \</DayGrid\>  
\</ListingScheduleSelector\>

\================================================================================

8\. STATE MANAGEMENT IMPLEMENTATION

Option A: useState Hooks (for simpler implementations)

\`\`\`javascript  
Import { useState, useEffect } from ‘react’;

Const ListingScheduleSelector \= ({ listing, onSelectionChange }) \=\> {  
  // Core selection states  
  Const \[selectedDays, setSelectedDays\] \= useState(\[\]);  
  Const \[selectedNights, setSelectedNights\] \= useState(\[\]);  
  Const \[availableDays, setAvailableDays\] \= useState(\[\]);  
    
  // Configuration states  
  Const \[limitToFiveNights, setLimitToFiveNights\] \= useState(false);  
  Const \[autobindListing, setAutobindListing\] \= useState(false);  
  Const \[acceptableSchedule, setAcceptableSchedule\] \= useState(false);  
    
  // Error states  
  Const \[showDaysError, setShowDaysError\] \= useState(false);  
  Const \[showNightsError, setShowNightsError\] \= useState(false);  
  Const \[showAvailabilityError, setShowAvailabilityError\] \= useState(false);  
    
  // Pricing states  
  Const \[priceMultipliers, setPriceMultipliers\] \= useState(\[\]);  
  Const \[changepricing, setChangePricing\] \= useState(‘’);  
  Const \[totalReservation, setTotalReservation\] \= useState(0);  
    
  // Reservation states  
  Const \[notSelectedDays, setNotSelectedDays\] \= useState(\[\]);  
  Const \[notSelectedNights, setNotSelectedNights\] \= useState(\[\]);  
  Const \[unusedNights, setUnusedNights\] \= useState(\[\]);  
  Const \[proratedNights, setProratedNights\] \= useState(\[\]);  
    
  // … rest of component  
};  
\`\`\`

Option B: useReducer (for complex state logic)

\`\`\`javascript  
Const initialState \= {  
  selectedDays: \[\],  
  selectedNights: \[\],  
  availableDays: \[\],  
  limitToFiveNights: false,  
  autobindListing: false,  
  acceptableSchedule: false,  
  Errors: {  
    daysError: false,  
    nightsError: false,  
    availabilityError: false  
  },  
  Pricing: {  
    Multipliers: \[\],  
    changeText: ‘’,  
    Total: 0  
  }  
};

Const scheduleReducer \= (state, action) \=\> {  
  Switch (action.type) {  
    Case ‘TOGGLE\_DAY’:  
      Return {  
        …state,  
        selectedDays: toggleDayInArray(state.selectedDays, action.payload)  
      };  
    Case ‘SET\_ERROR’:  
      Return {  
        …state,  
        Errors: { …state.errors, \[action.errorType\]: action.value }  
      };  
    Case ‘UPDATE\_PRICING’:  
      Return {  
        …state,  
        Pricing: { …state.pricing, …action.payload }  
      };  
    // … more actions  
    Default:  
      Return state;  
  }  
};

Const ListingScheduleSelector \= ({ listing, onSelectionChange }) \=\> {  
  Const \[state, dispatch\] \= useReducer(scheduleReducer, initialState);  
  // … rest of component  
};  
\`\`\`

Option C: External State Management (Redux/Zustand)

Using Zustand:

\`\`\`javascript  
Import create from ‘zustand’;

Const useScheduleStore \= create((set) \=\> ({  
  selectedDays: \[\],  
  selectedNights: \[\],  
  availableDays: \[\],  
    
  toggleDay: (day) \=\> set((state) \=\> ({  
    selectedDays: state.selectedDays.includes(day)  
      ? state.selectedDays.filter(d \=\> d \!== day)  
      : \[...state.selectedDays, day\]  
  })),  
    
  setAvailableDays: (days) \=\> set({ availableDays: days }),  
    
  validateSelection: () \=\> {  
    // Validation logic  
  },  
    
  // … more actions  
}));  
\`\`\`

\================================================================================

9\. STYLING GUIDELINES

CSS Module Approach:

\`\`\`css  
/\* ListingScheduleSelector.module.css \*/

.container {  
  Width: 264px;  
  Min-height: 42px;  
  Border: 2px solid \#6B6B6B;  
  Border-radius: 5px;  
  Background: transparent;  
  Padding: 0;  
  Position: relative;  
}

.dayGrid {  
  Display: grid;  
  Grid-template-columns: repeat(7, 1fr);  
  Gap: 0;  
  Width: 100%;  
}

.dayCell {  
  Width: 32px;  
  Height: 32px;  
  Background: \#FFFFFF;  
  Border-radius: 10px;  
  Display: flex;  
  Align-items: center;  
  Justify-content: center;  
  Cursor: pointer;  
  Transition: all 0.2s ease;  
}

.dayCell:hover:not(.disabled) {  
  Transform: scale(1.05);  
  Box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  
}

.dayCell.selected {  
  Background: \#4F3097;  
  Color: \#FFFFFF;  
}

.dayCell.unavailable {  
  Background: \#B2B2B2;  
  Color: \#4D4D4D;  
  Cursor: not-allowed;  
}

.dayCell.disabled {  
  Opacity: 0.5;  
  Cursor: not-allowed;  
}

.dayText {  
  Font-size: 14px;  
  Font-weight: 500;  
  User-select: none;  
}

.errorOverlay {  
  Position: absolute;  
  Top: 100%;  
  Left: 0;  
  Right: 0;  
  Margin-top: 8px;  
  Padding: 12px;  
  Background: \#FF4444;  
  Color: white;  
  Border-radius: 4px;  
  Font-size: 14px;  
  Z-index: 10;  
  Animation: slideDown 0.3s ease;  
}

@keyframes slideDown {  
  From {  
    Opacity: 0;  
    Transform: translateY(-10px);  
  }  
  To {  
    Opacity: 1;  
    Transform: translateY(0);  
  }  
}

.errorOverlay.warning {  
  Background: \#FFA500;  
}

.[errorOverlay.info](http://errorOverlay.info) {  
  Background: \#2196F3;  
}  
\`\`\`

Styled Components Approach:

\`\`\`javascript  
Import styled from ‘styled-components’;

Export const Container \= styled.div\`  
  Width: 264px;  
  Min-height: 42px;  
  Border: 2px solid \#6B6B6B;  
  Border-radius: 5px;  
  Background: transparent;  
  Padding: 0;  
  Position: relative;  
\`;

Export const DayGrid \= styled.div\`  
  Display: grid;  
  Grid-template-columns: repeat(7, 1fr);  
  Gap: 0;  
  Width: 100%;  
\`;

Export const DayCell \= styled.div\`  
  Width: 32px;  
  Height: 32px;  
  Background: ${props \=\>   
    Props.selected ? ‘\#4F3097’ :   
    Props.unavailable ? ‘\#B2B2B2’ : ‘\#FFFFFF’};  
  Color: ${props \=\>   
    Props.selected ? ‘\#FFFFFF’ :   
    Props.unavailable ? ‘\#4D4D4D’ : ‘inherit’};  
  Border-radius: 10px;  
  Display: flex;  
  Align-items: center;  
  Justify-content: center;  
  Cursor: ${props \=\> props.disabled ? ‘not-allowed’ : ‘pointer’};  
  Opacity: ${props \=\> props.disabled ? 0.5 : 1};  
  Transition: all 0.2s ease;

  &:hover:not(:disabled) {  
    Transform: scale(1.05);  
    Box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);  
  }  
\`;  
\`\`\`

Tailwind CSS Approach:

\`\`\`javascript  
Const DayCell \= ({ day, isSelected, isUnavailable, onClick }) \=\> {  
  Const classes \= cn(  
    ‘W-8 h-8 rounded-lg flex items-center justify-center’,  
    ‘Transition-all duration-200 cursor-pointer’,  
    ‘Hover:scale-105 hover:shadow-sm’,  
    {  
      ‘Bg-purple-700 text-white’: isSelected,  
      ‘Bg-gray-400 text-gray-700 cursor-not-allowed’: isUnavailable,  
      ‘Bg-white’: \!isSelected && \!isUnavailable  
    }  
  );  
    
  Return (  
    \<div className={classes} onClick={onClick}\>  
      {isUnavailable ? ‘X’ : day.abbreviation}  
    \</div\>  
  );  
};  
\`\`\`

\================================================================================

10\. COMPLETE REACT IMPLEMENTATION EXAMPLE

\`\`\`javascript  
// ListingScheduleSelector.jsx  
Import React, { useState, useEffect, useCallback } from ‘react’;  
Import styles from ‘./ListingScheduleSelector.module.css’;  
Import ErrorOverlay from ‘./ErrorOverlay’;  
Import { validateDaySelection, checkContiguity } from ‘./utils’;

Const DAYS\_OF\_WEEK \= \[  
  { id: 0, name: ‘Sunday’, abbreviation: ‘S’ },  
  { id: 1, name: ‘Monday’, abbreviation: ‘M’ },  
  { id: 2, name: ‘Tuesday’, abbreviation: ‘T’ },  
  { id: 3, name: ‘Wednesday’, abbreviation: ‘W’ },  
  { id: 4, name: ‘Thursday’, abbreviation: ‘T’ },  
  { id: 5, name: ‘Friday’, abbreviation: ‘F’ },  
  { id: 6, name: ‘Saturday’, abbreviation: ‘S’ }  
\];

Const ListingScheduleSelector \= ({  
  Listing,  
  onSelectionChange,  
  initialSelectedDays \= \[\],  
  maxNights \= null,  
  limitToFiveNights \= false  
}) \=\> {  
  // State management  
  Const \[selectedDays, setSelectedDays\] \= useState(initialSelectedDays);  
  Const \[errors, setErrors\] \= useState({  
    tooManyNights: false,  
    nonContiguous: false,  
    unavailableDay: false  
  });  
    
  // Calculate available days from listing  
  Const availableDays \= listing?.daysAvailable || DAYS\_OF\_WEEK;  
    
  // Day click handler  
  Const handleDayClick \= useCallback((day) \=\> {  
    // Check if day is available  
    Const isAvailable \= availableDays.some(d \=\> [d.id](http://d.id) \=== [day.id](http://day.id));  
    If (\!isAvailable) {  
      setErrors(prev \=\> ({ …prev, unavailableDay: true }));  
      Return;  
    }  
      
    // Toggle day selection  
    Const isCurrentlySelected \= selectedDays.some(d \=\> [d.id](http://d.id) \=== [day.id](http://day.id));  
    Let newSelectedDays;  
      
    If (isCurrentlySelected) {  
      newSelectedDays \= selectedDays.filter(d \=\> [d.id](http://d.id) \!== [day.id](http://day.id));  
        
      // Check if less than 2 nights remain  
      If (newSelectedDays.length \< 2\) {  
        // Show info popup about how selector works  
        console.log(‘Minimum 2 nights required’);  
      }  
    } else {  
      newSelectedDays \= \[...selectedDays, day\];  
        
      // Check maximum nights constraint  
      Const effectiveMaxNights \= limitToFiveNights ? 5 : (maxNights || listing?.maximumNights);  
      If (effectiveMaxNights && newSelectedDays.length \> effectiveMaxNights) {  
        setErrors(prev \=\> ({ …prev, tooManyNights: true }));  
        Return;  
      }  
    }  
      
    // Validate contiguity  
    Const isContiguous \= checkContiguity(newSelectedDays);  
    If (\!isContiguous) {  
      setErrors(prev \=\> ({ …prev, nonContiguous: true }));  
      Return;  
    }  
      
    // Clear errors and update selection  
    setErrors({ tooManyNights: false, nonContiguous: false, unavailableDay: false });  
    setSelectedDays(newSelectedDays);  
      
    // Notify parent component  
    If (onSelectionChange) {  
      onSelectionChange(newSelectedDays);  
    }  
  }, \[selectedDays, availableDays, maxNights, limitToFiveNights, listing, onSelectionChange\]);  
    
  // Check if day is selected  
  Const isDaySelected \= useCallback((day) \=\> {  
    Return selectedDays.some(d \=\> [d.id](http://d.id) \=== [day.id](http://day.id));  
  }, \[selectedDays\]);  
    
  // Check if day is available  
  Const isDayAvailable \= useCallback((day) \=\> {  
    Return availableDays.some(d \=\> [d.id](http://d.id) \=== [day.id](http://day.id));  
  }, \[availableDays\]);  
    
  Return (  
    \<div className={styles.container}\>  
      {/\* Error overlays \*/}  
      {errors.tooManyNights && (  
        \<ErrorOverlay   
          message=”Too many nights selected. Please remove some days.”  
          onClose={() \=\> setErrors(prev \=\> ({ …prev, tooManyNights: false }))}  
        /\>  
      )}  
        
      {errors.nonContiguous && (  
        \<ErrorOverlay   
          message=”Days must be contiguous (consecutive).”  
          onClose={() \=\> setErrors(prev \=\> ({ …prev, nonContiguous: false }))}  
        /\>  
      )}  
        
      {errors.unavailableDay && (  
        \<ErrorOverlay   
          message=”This day is not available for the listing.”  
          onClose={() \=\> setErrors(prev \=\> ({ …prev, unavailableDay: false }))}  
        /\>  
      )}  
        
      {/\* Day grid \*/}  
      \<div className={styles.dayGrid}\>  
        {DAYS\_OF\_WEEK.map(day \=\> {  
          Const isSelected \= isDaySelected(day);  
          Const isAvailable \= isDayAvailable(day);  
            
          Return (  
            \<div  
              key={[day.id](http://day.id)}  
              className={\`${styles.dayCell} ${  
                isSelected ? styles.selected : ‘’  
              } ${\!isAvailable ? styles.unavailable : ‘’}\`}  
              onClick={() \=\> handleDayClick(day)}  
              role=”button”  
              tabIndex={0}  
              aria-label={\`${[day.name](http://day.name)}${isSelected ? ‘, selected’ : ‘’}${\!isAv

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

LISTING SCHEDULE SELECTOR \- COMPREHENSIVE BUBBLE TO REACT ANALYSIS  
\================================================================================

Document Version: 3.0 \- Deep Dive Reanalysis  
Date: \[Current Analysis\]  
Component: ⛶ Listing Schedule Selector (Reusable Element)

\================================================================================  
EXECUTIVE SUMMARY  
\================================================================================

This document provides an exhaustive analysis of the “Listing Schedule Selector” reusable element from the Bubble application, including detailed workflow examination, behavioral patterns, and a complete migration strategy to React.

\*\*Component Purpose\*\*: A sophisticated day-of-week selector for rental listings that:

- Allows users to select days/nights for booking  
- \- Calculates dynamic pricing based on selected nights  
- \- Supports multiple rental types (Monthly, Weekly, Nightly)  
- \- Validates contiguity of selected days  
- \- Manages discounts, markups, and multipliers  
- \- Handles host availability restrictions  
- \- Enforces minimum/maximum night requirements

\*\*Total Workflows\*\*: 26 workflows across 7 categories  
\*\*Complexity Level\*\*: High \- Complex pricing logic, multi-step validation, state management

\================================================================================

1. COMPONENT ARCHITECTURE  
2. \================================================================================  
1. Visual Structure  
2. —----------------  
3. Based on inspection, the component consists of:  
1. \*\*Main Container\*\* (Listing Schedule Selector)  
2.    \- Style: Custom, border with \#6B6B6B, 2px solid  
3.    \- Border Radius: 5px  
4.    \- Background: White  
5.    \- Layout: Row-based day selector

2\. \*\*Day Selector Row\*\*

- 7 Day buttons arranged horizontally  
-    \- Each button represents a day of the week (S, M, T, W, T, F, S)  
-    \- Single-letter display for compactness  
-    \- Visual states: Normal, Selected, Disabled, Hover

3\. \*\*Overlays\*\* (Error/Notification States)

- Days Selected Error  
-    \- Nights outside of host availability  
-    \- GF: Day selected not available  
-      
- 4\. \*\*Component Layers\*\*  
-    \- F: popupnumber (popup for number input)  
-    \- Floppy popupNumber (floating variant)  
-    \- JS2B-ChecksContiguity (JavaScript function runner)  
-    \- RG Days (Repeating Group displaying days)

5\. \*\*Visual Elements from Inspection\*\*

- P… buttons (likely representing days with parent group data)  
-    \- Custom states managing selection  
-    \- Conditional formatting based on availability

\================================================================================  
II. COMPREHENSIVE WORKFLOW ANALYSIS  
\================================================================================

\*\*WORKFLOW SUMMARY TABLE\*\*  
—------------------------------------------------------  
Category               | Count | Purpose  
—------------------------------------------------------  
Uncategorized         | 0     | None  
Adding Days           | 2     | Day selection logic  
Custom Events         | 10    | Reusable functions  
Do When Actions       | 5     | Reactive conditions  
Error Handling        | 6     | Validation & feedback  
Page is Loaded        | 2     | Initialization  
Removing Days         | 1     | Deselection logic  
—------------------------------------------------------  
TOTAL                 | 26    |  
—------------------------------------------------------

\========================================  
CATEGORY 1: ADDING DAYS (2 workflows)  
\========================================

\*\*Workflow 1.1: “adding nights in general”\*\*  
Trigger: When “Select Day of Week” is clicked  
Event Type: Element Click Event

Conditions (ALL must be true):

1. Listing Schedule Selector’s Selected Days (days) doesn’t contain Parent group’s Days  
2. 2\. Listing Schedule Selector’s Selected Days (days):count \< 8  
3. 3\. Listing Schedule Selector’s Listing’s Days Available (List of Days) doesn’t contain Parent group’s Days

Actions:

- Show Parent group’s Days’s Single Letter  
- \- Add day to selected days list  
- \- Trigger calculation workflows

Purpose: Handles the addition of a day when user clicks on a day button.   
Validates that:

- Day isn’t already selected  
- \- Selection hasn’t reached maximum (7 days)  
- \- Day is in the listing’s available days

\*\*Workflow 1.2: “adding nights in general” (variant)\*\*  
Trigger: When “Select Day of Week” is clicked  
Event Type: Element Click Event

Conditions (ALL must be true):

1. Same as above but with additional check  
2. 2\. Listing Schedule Selector’s Days Available (List of Days) validation

Actions:

- Similar to Workflow 1.1  
- \- Additional state updates

Purpose: Alternative path for day selection with slightly different availability check

Behavioral Notes:

- Uses “Parent group’s Days” pattern indicating nested repeating group structure  
- \- Single letter display (S, M, T, W, T, F, S)  
- \- Maximum 7 days can be selected (one week)  
- \- Validates against listing’s available days before allowing selection

\========================================  
CATEGORY 2: CUSTOM EVENTS (10 workflows)  
\========================================

Custom events are reusable workflow functions that can be triggered from multiple places in the application.

\*\*Custom Event 2.1: “Alerts General”\*\*  
Trigger: When “Alerts General is triggered”  
Parameters:

- Title (text, required)  
-   \- content (text, optional)  
-   \- time (ms) (number, optional)  
-   \- alert type (Alert Type, optional)  
-   \- Show on Live? (yes/no, optional)

Steps (6 total):  
  Step 1: Custom Toast ERROR  
    Condition: alert type is error AND Show on Live? Is yes  
      
  Step 2: Custom Toast INFORMATION  
    Condition: alert type is information AND Show on Live? Is yes  
      
  Step 3: Custom Toast WARNING  
    Condition: alert type is warning AND Show on Live? Is yes  
      
  Step 4: Custom Toast SUCCESS  
    Condition: alert type is success AND Show on Live? Is yes  
      
  Step 5: Custom Toast EMPTY ALERT TYPE  
    Condition: alert type is empty AND Show on Live? Is yes  
      
  Step 6: Custom Toast Version-Test ONLY  
    Condition: isn’t live version is yes AND Show on Live?:formatted as text

Purpose: Centralized toast notification system with conditional rendering based on alert type and environment (development vs production)

—

\*\*Custom Event 2.2: “calculate days, then sort days and set states”\*\*  
Trigger: When “calculate days, then sort days and set states is triggered”  
Parameters:

- Parent\_group\_day (Days, optional)  
-   \- add (yes/no, required)  
-   \- remove (yes/no, required)

Steps (21 total \- Complex workflow):  
  Step 1: add day and sort days  
    Condition: Listing Schedule Selector’s Selected Days (days):count is not 7 AND add is yes  
    Action: Adds day to selected list and sorts  
      
  Step 2: Remove the new day  
    Condition: remove is yes  
    Action: Removes day from selection  
      
  Step 3: Set NOT Selected days and Sort  
    Action: Updates unselected days list  
      
  Step 4: Set check out day including Sunday  
    Condition: Listing Schedule Selector’s Selected Days (days) contains Sunday  
      
  Step 5: Set check out day  
    Condition: Additional logic for checkout calculation  
      
  Step 6: (Corner case) Set check out day  
      
  Step 7: Set check in day  
      
  Step 8: (Corner case) Set check out day  
      
  Step 9: Create list of nights (take selected days, sort and remove last item)  
    Action: Generates nights list from selected days  
      
  Step 10: Set start night number  
      
  Step 11: (Corner Case) Set start night number  
    Condition: Listing Schedule Selector’s Not Selected Days doesn’t contain Sunday  
      
  Step 12: Set start night (num)\_duplicated on purpose  
      
  Step 13: (Corner Case) Set start night number\_duplicated on purpose  
      
  Step 14: Set end night  
      
  Step 15: Set end night number  
      
  Step 16: Set start day number  
      
  Step 17: Create unused nights list by removing selected nights  
    Action: Calculates which nights are unused  
      
  Step 18: set list of days as selected nights  
      
  Step 19: count number of selected nights and set nights number  
      
  Step 20: Set selected nights  
      
  Step 21: Trigger Run JS \- Check Contiguity  
    Action: Executes JavaScript to validate days are consecutive

Purpose: Core calculation engine that:

- Adds/removes days from selection  
- \- Sorts days in proper order  
- \- Calculates check-in and check-out days  
- \- Handles corner cases (Sunday transitions)  
- \- Creates night lists from day selections  
- \- Counts selected nights  
- \- Triggers contiguity validation

This is the MOST COMPLEX workflow in the component.

—

\*\*Custom Event 2.3: “calculate listing nightly price”\*\*  
Trigger: When “calculate listing nightly price is triggered”  
Parameters: None

Steps (13+ total \- Pricing calculation workflow):  
  Step 1: calculate monthly rental prorated nightly host rate  
    Condition: Listing Schedule Selector’s Listing’s rental type is Monthly  
    Action: Calculates nightly rate from monthly price  
      
  Step 2: calculate weekly rental listing nightly host rate  
    Condition: Listing’s rental type is Weekly  
      
  Step 3: calculate monthly rental listing nightly price  
    Condition: Listing’s rental type is Monthly  
      
  Step 4: calculate weekly rental listing nightly price  
    Condition: Listing’s rental type is Weekly  
      
  Step 5: set nightly host rate when 2 nights selected  
    Condition: Selected Nights (nights):count is 2  
      
  Step 6: set nightly host rate when 3 nights selected  
    Condition: Selected Nights (nights):count is 3  
      
  Step 7: set nightly host rate when 4 nights selected  
    Condition: Selected Nights (nights):count is 4  
      
  Step 8: set nightly host rate when 5 nights selected  
    Condition: Selected Nights (nights):count is 5  
      
  Step 9: set nightly host rate when 7 nights selected  
    Condition: Selected Nights (nights):count is 7  
      
  Step 10: calculate nightly rental listing nightly price  
    Condition: Listing’s rental type is Nightly  
      
  Step 11: calculate 4 week rent \- monthly and nightly  
      
  Step 12: calculate initial payment  
      
  Step 13: calculate total reservation price

Purpose: Complex pricing engine that:

- Handles 3 rental types: Monthly, Weekly, Nightly  
- \- Prorates monthly/weekly rates to nightly equivalents  
- \- Applies different rates based on number of nights (2-7)  
- \- Calculates total reservation price  
- \- Determines initial payment amount  
- \- Handles 4-week rental calculations

Key Insight: Different pricing logic for different night counts, suggesting length-of-stay discounts

—

\*\*Custom Event 2.4: “check error messages when removing”\*\*  
Trigger: When “check error messages when removing is triggered”  
Parameters: None

Conditions:

- Listing Schedule Selector’s Selected Days (days) contains day  
- \- Listing’s minimum nights validation

Purpose: Validates whether removing a day would:

- Violate minimum night requirements  
- \- Break contiguity  
- \- Leave an invalid selection

—

\*\*Custom Event 2.5: “Create reservation span variables”\*\*  
Trigger: When “Create reservation span variables is triggered”  
Parameters: None

Purpose:

- Sets up date range variables for reservation  
- \- Calculates span from check-in to check-out  
- \- Creates temporal boundaries for booking

—

\*\*Custom Event 2.6: “Run JS \- Check Contiguity”\*\*  
Trigger: When “Run JS \- Check Contiguity is triggered”  
Parameters: None

Purpose:

- Executes JavaScript function to validate consecutive days  
- \- Critical for ensuring valid booking periods  
- \- No gaps allowed in day selection  
- \- Element: JS2B-ChecksContiguity

JavaScript Logic (inferred):

- Takes array of selected days  
- \- Sorts by day number (0-6)  
- \- Checks that each subsequent day is exactly \+1 from previous  
- \- Returns boolean: true if contiguous, false if gaps exist

—

\*\*Custom Event 2.7: “save schedule”\*\*  
Trigger: When “save schedule is triggered”  
Parameters: None

Purpose:

- Persists selected schedule to database  
- \- Likely makes database call to save booking  
- \- Commits the selection

—

\*\*Custom Event 2.8: “set discounts and markups multiplier”\*\*  
Trigger: When “set discounts and markups multiplier is triggered”  
Parameters: None

Purpose:

- Applies discount calculations  
- \- Applies markup/fee calculations  
- \- Sets combined multiplier value  
- \- Used in final price calculation

—

\*\*Custom Event 2.9: “set price multipliers”\*\*  
Trigger: When “set price multipliers is triggered”  
Parameters: None

Purpose:

- Sets day-specific pricing multipliers  
- \- Weekend vs weekday pricing  
- \- Seasonal adjustments  
- \- Special event multipliers

—

\*\*Custom Event 2.10: “set unused nights discount”\*\*  
Trigger: When “set unused nights discount is triggered”  
Parameters: None

Purpose:

- Calculates discount for unused nights in billing period  
- \- Relevant for monthly/weekly rentals  
- \- Prorates based on actual usage

\========================================  
CATEGORY 3: DO WHEN ACTIONS (5 workflows)  
\========================================

Do When Actions are reactive workflows that run automatically when conditions change.

\*\*Workflow 3.1: “Every time condition”\*\*  
Trigger: Do when Listing Schedule Selector’s Recalculate States is yes  
Type: Reactive \- fires when condition becomes true

Actions:

- Recalculate component state  
- \- Update derived values  
- \- Refresh UI

Purpose: Triggers recalculation whenever the “Recalculate States” flag is set to yes. Acts as a central recalculation trigger.

—

\*\*Workflow 3.2: “Get weeks\&nights from page URL is not empty”\*\*  
Trigger: Do when Get weeks\&nights from page URL is not empty  
Type: Reactive \- fires when URL parameter contains data

Actions:

- Parse URL parameters for weeks and nights  
- \- Pre-populate selection based on URL  
- \- Initialize state from external source

Purpose: Allows deep linking or pre-population of selections via URL parameters. Useful for:

- Sharing specific selections  
- \- Returning users with saved preferences  
- \- External system integration

—

\*\*Workflow 3.3: “Just once condition”\*\*  
Trigger: Do when Listing Schedule Selector’s Clickable is no  
Type: Reactive, runs once

Actions:

- Disable interaction  
- \- Lock selection  
- \- Prevent further changes

Purpose: One-time trigger to disable the component when selection is finalized or locked.

—

\*\*Workflow 3.4: “Just once condition” (Disabled)\*\*  
Status: DISABLED  
Trigger: Do when Listing Schedule Selector’s Clickable is no

Purpose: Duplicate or variant of 3.3, currently disabled. May have been used for testing.

—

\*\*Workflow 3.5: “trigger when night selected is restricted night”\*\*  
Trigger: Do when Listing Schedule Selector’s Listing’s Days Not Available-filtered:count \> …  
Type: Reactive \- fires when restricted days are in selection

Actions:

- Show error overlay  
- \- Highlight restricted days  
- \- Prevent progression

Purpose: Real-time validation that selected nights don’t include restricted/unavailable days from host’s calendar.

Behavioral Notes:

- These “Do When” workflows create reactive, spreadsheet-like behavior  
- \- Automatically fire when watched conditions change  
- \- No explicit trigger needed \- Bubble monitors conditions continuously  
- \- Critical for keeping UI in sync with state

\========================================  
CATEGORY 4: ERROR HANDLING (6 workflows)  
\========================================

Error workflows provide user feedback and validation.

\*\*Workflow 4.1: “B: I Understand is clicked”\*\*  
Trigger: When “B: I Understand” button is clicked  
Type: Element Click Event

Actions:

- Dismiss error overlay  
- \- Reset error state  
- \- Allow user to continue

Purpose: Acknowledgment button for error messages. User must click to dismiss and continue.

—

\*\*Workflow 4.2: “prevent selecting more nights than available”\*\*  
Trigger: When user attempts to exceed available nights  
Condition: Listing Schedule Selector’s Selected Days (days) doesn’t contain Parent…

Actions:

- Show error toast  
- \- Block selection  
- \- Display message about availability limits

Purpose: Prevents selecting more nights than the listing allows or has available.

—

\*\*Workflow 4.3: “when adding a new day and too many nights are selected (more than host…)”\*\*  
Trigger: When adding day would exceed host’s maximum  
Condition: Listing Schedule Selector’s Selected Days (days) doesn’t contain Parent…

Actions:

- Block addition  
- \- Show error: “Maximum X nights allowed”  
- \- Toast notification

Purpose: Enforces host’s maximum night requirement. Different from workflow 4.2 which is about availability, this is about booking rules.

—

\*\*Workflow 4.4: “When adding a new day if selected days is 5 show days selected error ele…”\*\*  
Trigger: When selection reaches 5 days  
Condition: Selected days count check

Actions:

- Show warning overlay  
- \- Inform user they’re approaching maximum  
- \- Pre-emptive notification

Purpose: Warning message before hitting hard limit. UX improvement to prevent users from being surprised by limit.

—

\*\*Workflow 4.5: “When removing a day, if the selected nights is less than host minimum s…”\*\*  
Trigger: When removing day would violate minimum nights  
Condition: Listing Schedule Selector’s Selected Days (days) contains Parent group’s…

Actions:

- Block removal  
- \- Show error: “Minimum X nights required”  
- \- Keep day selected

Purpose: Enforces minimum night requirement. Prevents users from booking fewer nights than host requires.

—

\*\*Workflow 4.6: “When user removes a day, and nights is less than 2, show popup on how …”\*\*  
Trigger: When removal would result in less than 2 nights  
Condition: Listing Schedule Selector’s Selected Days (days) contains Parent g…

Actions:

- Show instructional popup  
- \- Explain minimum booking requirement  
- \- Provide guidance

Purpose: User education \- explains WHY they can’t remove the day. Better UX than just blocking.

Key Error Handling Patterns:

1. Pre-validation (prevent bad actions)  
2. 2\. Post-validation (check after action)  
3. 3\. User education (explain why something can’t be done)  
4. 4\. Graceful degradation (inform, don’t crash)

\========================================  
CATEGORY 5: PAGE IS LOADED (2 workflows)  
\========================================

Initialization workflows that run when component loads.

\*\*Workflow 5.1: Page is loaded\*\*  
Trigger: When Listing Schedule Selector is loaded  
Type: Initialization event

Actions:

- Fetch listing data  
- \- Load available days from database  
- \- Initialize selected days (if any)  
- \- Set default states  
- \- Calculate initial pricing  
- \- Setup UI elements

Purpose: Component initialization \- prepares all data and state for user interaction.

—

\*\*Workflow 5.2: Page is loaded (variant)\*\*  
Trigger: When component loads  
Type: Secondary initialization

Actions:

- Additional setup tasks  
- \- Load user preferences  
- \- Apply saved selections  
- \- Initialize secondary features

Purpose: Extended initialization for additional features or fallback logic.

Initialization Sequence (inferred):

1. Component mounts  
2. 2\. Fetch listing data from database  
3. 3\. Load host availability calendar  
4. 4\. Check for URL parameters (pre-population)  
5. 5\. Initialize empty selection or load saved selection  
6. 6\. Calculate available days  
7. 7\. Set up event listeners  
8. 8\. Render UI  
9. 9\. Mark component as ready

\========================================  
CATEGORY 6: REMOVING DAYS (1 workflow)  
\========================================

\*\*Workflow 6.1: Day Removal\*\*  
Trigger: When user clicks on already-selected day  
Type: Implicit from UI interaction

Actions:

- Validate removal (check minimum nights)  
- \- Remove day from selected list  
- \- Recalculate contiguity  
- \- Update pricing  
- \- Refresh UI  
- \- Check for errors

Purpose: Handles deselection of days. More complex than addition because must validate that removal doesn’t violate business rules.

Removal Validation Sequence:

1. User clicks selected day  
2. 2\. Check if removal would violate minimum nights  
3. 3\. If violation → show error, block removal  
4. 4\. If OK → remove from array  
5. 5\. Recalculate remaining selection  
6. 6\. Check contiguity of remaining days  
7. 7\. Update pricing calculations  
8. 8\. Update UI state

\================================================================================  
III. COMPONENT STATE MANAGEMENT  
\================================================================================

1. Custom States (Inferred from Workflows)  
2. —----------------------------------------

The component manages multiple custom states:

1. \*\*Selected Days (list of Days)\*\*  
2.    \- Type: List  
3.    \- Contents: Day objects for selected days  
4.    \- Max count: 7  
5.    \- Operations: Add, Remove, Sort, Count

2\. \*\*Not Selected Days (list of Days)\*\*

- Type: List  
-    \- Contents: Days NOT currently selected  
-    \- Derived from: All days minus selected days  
-    \- Used for: Inverse logic

3\. \*\*Selected Nights (list of Nights)\*\*

- Type: List  
-    \- Contents: Night objects (day-to-day periods)  
-    \- Derived from: Selected days minus last day  
-    \- Example: \[Mon, Tue, Wed\] selected → nights are \[Mon-Tue, Tue-Wed\]

4\. \*\*Unused Nights (list)\*\*

- Type: List  
-    \- Contents: Nights in billing period not selected  
-    \- Used for: Discount calculations

5\. \*\*Check In Day (Day)\*\*

- Type: Single Day object  
-    \- Contents: First selected day  
-    \- Special handling: Sunday corner case  
6. \*\*Check Out Day (Day)\*\*  
7.    \- Type: Single Day object  
8.    \- Contents: Last selected day \+ 1  
9.    \- Special handling: Week boundary logic

7\. \*\*Start Night Number (number)\*\*

- Type: Number (0-6)  
-    \- Contents: Numeric representation of first night

8\. \*\*End Night Number (number)\*\*

- Type: Number (0-6)  
-    \- Contents: Numeric representation of last night

9\. \*\*Start Day Number (number)\*\*

- Type: Number (0-6)  
-    \- Contents: Numeric representation of check-in day  
10. \*\*Nights Number (number)\*\*  
11.     \- Type: Number  
12.     \- Contents: Count of selected nights  
13.     \- Derived: selected\_days.count \- 1

11\. \*\*Recalculate States (yes/no)\*\*

- Type: Boolean  
-     \- Contents: Flag to trigger recalculation  
-     \- Used by: “Do when” workflow to reactively update

12\. \*\*Clickable (yes/no)\*\*

- Type: Boolean  
-     \- Contents: Whether component is interactive  
-     \- Usage: Disable during processing or after finalization

13\. \*\*Listing (Listing object)\*\*

- Type: Object reference  
-     \- Contents: Full listing data  
-     \- Properties used:  
-       \* rental\_type (Monthly/Weekly/Nightly)  
-       \* Days Available (list)  
-       \* Days Not Available (list)  
-       \* minimum\_nights  
-       \* maximum\_nights  
-       \* base\_price  
-       \* discounts  
-       \* markups  
14. \*\*Days Available (List of Days)\*\*  
15.     \- Type: List  
16.     \- Contents: Days host allows booking  
17.     \- Source: Listing object

15\. \*\*Price Calculations (numbers)\*\*

- Monthly\_prorated\_rate  
-     \- weekly\_prorated\_rate  
-     \- nightly\_rate  
-     \- total\_price  
-     \- initial\_payment  
-     \- four\_week\_rent

B. Data Type Definitions  
—---------------------

\*\*Day Object\*\*:  
{  
  Id: string  
  Day\_of\_week: number (0-6, 0=Sunday)  
  Single\_letter: string (‘S’,’M’,’T’,’W’,’T’,’F’,’S’)  
  Full\_name: string (‘Sunday’, ‘Monday’, …)  
  Is\_available: boolean  
}

\*\*Night Object\*\*:  
{  
  Start\_day: Day  
  End\_day: Day  
  Night\_number: number (0-6)  
}

\*\*Listing Object\*\*:  
{  
  Id: string  
  Rental\_type: ‘Monthly’ | ‘Weekly’ | ‘Nightly’  
  Days\_available: Day\[\]  
  Days\_not\_available: Day\[\]  
  Minimum\_nights: number  
  Maximum\_nights: number  
  Base\_monthly\_price: number  
  Base\_weekly\_price: number  
  Base\_nightly\_price: number  
  Discounts: Discount\[\]  
  Markups: Markup\[\]  
}

\================================================================================  
IV. BUSINESS LOGIC & CALCULATIONS  
\================================================================================

1. Day Selection Logic  
2. —-------------------

\*\*Selection Algorithm:\*\*  
\`\`\`  
Function selectDay(day):  
  // Validation  
  If day in selectedDays:  
    Return error(“Already selected”)  
    
  If selectedDays.length \>= 7:  
    Return error(“Maximum 7 days”)  
    
  If day not in listing.availableDays:  
    Return error(“Day not available”)  
    
  // Add and sort  
  selectedDays.push(day)  
  selectedDays.sort(byDayOfWeek)  
    
  // Check contiguity  
  If not isContiguous(selectedDays):  
    selectedDays.remove(day)  
    Return error(“Days must be consecutive”)  
    
  // Update calculations  
  calculateNights()  
  calculatePricing()  
  updateUI()  
\`\`\`

\*\*Contiguity Check:\*\*  
\`\`\`  
Function isContiguous(days):  
  If days.length \<= 1:  
    Return true  
    
  Sorted \= days.sortBy(day\_of\_week)  
    
  For i from 1 to sorted.length-1:  
    If sorted\[i\].day\_of\_week \- sorted\[i-1\].day\_of\_week \!= 1:  
      Return false  
    
  Return true  
\`\`\`

\*\*Corner Case: Sunday Transition\*\*  
When selection includes Sunday (day 0), special logic applies:

- If Saturday (6) and Sunday (0) both selected, they ARE contiguous  
- \- Requires week boundary logic  
- \- Multiple “corner case” workflow steps handle this

B. Night Calculation from Days  
—----------------------------

\*\*Algorithm:\*\*  
\`\`\`  
selectedDays \= \[Monday, Tuesday, Wednesday, Thursday\]  
selectedNights \= \[\]

For i from 0 to selectedDays.length \- 2:  
  Night \= {  
    Start: selectedDays\[i\],  
    End: selectedDays\[i+1\],  
    Number: selectedDays\[i\].day\_of\_week  
  }  
  selectedNights.push(night)

Result: \[Mon-Tue, Tue-Wed, Wed-Thu\] \= 3 nights  
\`\`\`

\*\*Key Insight\*\*: Nights \= Days \- 1

- 2 days selected \= 1 night  
- \- 7 days selected \= 6 nights  
3. Pricing Calculation Engine  
4. —---------------------------

\*\*Multi-Type Pricing System:\*\*

1. \*\*Monthly Rental → Nightly Rate\*\*  
2. \`\`\`  
3. Monthly\_price \= $3000  
4. Days\_in\_month \= 30  
5. Nightly\_rate \= monthly\_price / days\_in\_month  
6. Nightly\_rate \= $100/night  
7. \`\`\`

2\. \*\*Weekly Rental → Nightly Rate\*\*  
\`\`\`  
Weekly\_price \= $600  
Days\_in\_week \= 7  
Nightly\_rate \= weekly\_price / days\_in\_week  
Nightly\_rate \= $85.71/night  
\`\`\`

3\. \*\*Nightly Rental\*\*  
\`\`\`  
Nightly\_rate \= listing.base\_nightly\_price  
(no proration needed)  
\`\`\`

\*\*Length-of-Stay Pricing:\*\*  
The component has SPECIFIC rates for different night counts:

- 2 nights: rate\_2\_nights  
- \- 3 nights: rate\_3\_nights  
- \- 4 nights: rate\_4\_nights  
- \- 5 nights: rate\_5\_nights  
- \- 7 nights: rate\_7\_nights

This suggests a tiered pricing model where longer stays may have better rates.

\*\*Total Price Calculation:\*\*  
\`\`\`  
Function calculateTotalPrice():  
  Base\_rate \= getNightlyRate(rental\_type, nights\_count)  
    
  // Apply multipliers  
  Multiplied\_rate \= base\_rate \* price\_multiplier  
    
  // Calculate base total  
  Base\_total \= multiplied\_rate \* nights\_count  
    
  // Apply discounts  
  Discount\_amount \= calculateDiscounts(base\_total, nights\_count)  
    
  // Apply markups/fees  
  Markup\_amount \= calculateMarkups(base\_total)  
    
  // Final total  
  Total\_price \= base\_total \- discount\_amount \+ markup\_amount  
    
  Return {  
    Base: base\_total,  
    Discounts: discount\_amount,  
    Markups: markup\_amount,  
    Total: total\_price,  
    Per\_night: total\_price / nights\_count  
  }  
\`\`\`

D. Unused Nights Discount  
—-----------------------

For monthly/weekly rentals, if guest books fewer than full period:  
\`\`\`  
Billing\_period\_nights \= 30 (for monthly)  
Selected\_nights \= 10  
Unused\_nights \= 20

Unused\_discount \= (unused\_nights / billing\_period\_nights) \* period\_price  
\`\`\`

This prorates the cost fairly when booking partial periods.

\================================================================================  
V. REACT MIGRATION STRATEGY  
\================================================================================

Now that we have a complete understanding of the component, here’s the step-by-step migration plan:

1. Component Breakdown  
2. —-------------------

The Listing Schedule Selector should be decomposed into:

1. \*\*ListingScheduleSelector\*\* (Main Container)  
2. 2\. \*\*DayButton\*\* (Individual day selector)  
3. 3\. \*\*ErrorOverlay\*\* (Error display)  
4. 4\. \*\*ToastNotification\*\* (Alert system)  
5. 5\. \*\*PriceDisplay\*\* (Pricing breakdown)

B. State Management Architecture  
—------------------------------

\*\*Option 1: useState \+ useReducer (Recommended for this complexity)\*\*

\`\`\`typescript  
// Complex state → useReducer  
Const \[state, dispatch\] \= useReducer(scheduleReducer, initialState);

// Simple toggles → useState  
Const \[isClickable, setIsClickable\] \= useState(true);  
Const \[showError, setShowError\] \= useState(false);

Actions for reducer:

- SELECT\_DAY  
- \- REMOVE\_DAY  
- \- CALCULATE\_NIGHTS  
- \- SET\_PRICING  
- \- SET\_ERROR  
- \`\`\`

\*\*Option 2: Zustand (For easier state management)\*\*

\`\`\`typescript  
Const useScheduleStore \= create((set, get) \=\> ({  
  selectedDays: \[\],  
  selectedNights: \[\],  
  Listing: null,  
  Pricing: null,  
    
  selectDay: (day) \=\> {  
    // Complex logic here  
  },  
    
  removeDay: (day) \=\> {  
    // Complex logic here  
  }  
}));  
\`\`\`

\*\*Option 3: React Context (If needed across multiple components)\*\*

C. Custom Hooks Strategy  
—----------------------

Create these custom hooks to encapsulate complex logic:

1. \*\*useScheduleSelector\*\*  
2.    \- Manages day selection/removal  
3.    \- Handles validation  
4.    \- Triggers calculations

2\. \*\*usePriceCalculation\*\*

- Handles all pricing logic  
-    \- Rental type conversions  
-    \- Discount/markup application

3\. \*\*useContiguityCheck\*\*

- Validates consecutive days  
-    \- Handles Sunday edge case

4\. \*\*useNightCalculation\*\*

- Converts days to nights  
-    \- Calculates unused nights  
-    \- Determines check-in/check-out  
5. \*\*useURLParameters\*\*  
6.    \- Reads weeks\&nights from URL  
7.    \- Pre-populates selection  
8.    \- Enables deep linking

D. Critical Functions to Implement  
—--------------------------------

\*\*1. Contiguity Validator\*\*  
\`\`\`typescript  
Export const isContiguous \= (days: Day\[\]): boolean \=\> {  
  If (days.length \<= 1\) return true;  
    
  Const sorted \= \[...days\].sort((a, b) \=\> a.dayOfWeek \- b.dayOfWeek);  
    
  For (let i \= 1; i \< sorted.length; i++) {  
    Const diff \= sorted\[i\].dayOfWeek \- sorted\[i \- 1\].dayOfWeek;  
      
    // Normal case: consecutive days  
    If (diff \=== 1\) continue;  
      
    // Edge case: Saturday to Sunday  
    If (sorted\[i \- 1\].dayOfWeek \=== 6 && sorted\[i\].dayOfWeek \=== 0\) {  
      Continue;  
    }  
      
    Return false;  
  }  
    
  Return true;  
};  
\`\`\`

\*\*2. Night Calculator\*\*  
\`\`\`typescript  
Export const calculateNights \= (selectedDays: Day\[\]): Night\[\] \=\> {  
  If (selectedDays.length \< 2\) return \[\];  
    
  Const sorted \= sortDays(selectedDays);  
  Const nights: Night\[\] \= \[\];  
    
  For (let i \= 0; i \< sorted.length \- 1; i++) {  
    nights.push({  
      startDay: sorted\[i\],  
      endDay: sorted\[i \+ 1\],  
      nightNumber: sorted\[i\].dayOfWeek  
    });  
  }  
    
  Return nights;  
};  
\`\`\`

\*\*3. Rental Type Price Converter\*\*  
\`\`\`typescript  
Export const convertToNightlyRate \= (  
  rentalType: ‘Monthly’ | ‘Weekly’ | ‘Nightly’,  
  basePrice: number,  
  nightsCount: number  
): number \=\> {  
  Switch (rentalType) {  
    Case ‘Monthly’:  
      Return basePrice / 30; // Prorate monthly to daily  
        
    Case ‘Weekly’:  
      Return basePrice / 7; // Prorate weekly to daily  
        
    Case ‘Nightly’:  
      Return basePrice; // Already nightly rate  
  }  
};  
\`\`\`

\*\*4. Length-of-Stay Price Selector\*\*  
\`\`\`typescript  
Export const getLengthOfStayRate \= (  
  nightsCount: number,  
  rateTable: Record\<number, number\>,  
  baseRate: number  
): number \=\> {  
  // Check if specific rate exists for this night count  
  If (rateTable\[nightsCount\]) {  
    Return rateTable\[nightsCount\];  
  }  
    
  // Fall back to base rate  
  Return baseRate;  
};  
\`\`\`

\*\*5. Sunday Edge Case Handler\*\*  
\`\`\`typescript  
Export const handleSundayTransition \= (days: Day\[\]): {  
  checkInDay: Day;  
  checkOutDay: Day;  
} \=\> {  
  Const sorted \= sortDays(days);  
    
  Const checkInDay \= sorted\[0\];  
  Let checkOutDay: Day;  
    
  // If selection includes Sunday (0) and it’s not first day  
  If (sorted.some(d \=\> d.dayOfWeek \=== 0\) && sorted\[0\].dayOfWeek \!== 0\) {  
    // Sunday is checkout day, needs special handling  
    Const sundayIndex \= sorted.findIndex(d \=\> d.dayOfWeek \=== 0);  
    checkOutDay \= sorted\[sundayIndex\];  
  } else {  
    // Normal case: checkout is day after last selected  
    Const lastDay \= sorted\[sorted.length \- 1\];  
    checkOutDay \= getNextDay(lastDay);  
  }  
    
  Return { checkInDay, checkOutDay };  
};  
\`\`\`

\*\*6. Unused Nights Calculator\*\*  
\`\`\`typescript  
Export const calculateUnusedNights \= (  
  selectedNights: Night\[\],  
  billingPeriodDays: number  
): Night\[\] \=\> {  
  Const allNights \= generateAllNights(billingPeriodDays);  
  Const selectedNightNumbers \= selectedNights.map(n \=\> n.nightNumber);  
    
  Return allNights.filter(  
    Night \=\> \!selectedNightNumbers.includes(night.nightNumber)  
  );  
};  
\`\`\`

\================================================================================  
VI. DETAILED REACT IMPLEMENTATION  
\================================================================================

\*\*STEP 1: TypeScript Type Definitions\*\*

\`\`\`typescript  
// types/[index.ts](http://index.ts)

Export type DayOfWeek \= 0 | 1 | 2 | 3 | 4 | 5 | 6;

Export type RentalType \= ‘Monthly’ | ‘Weekly’ | ‘Nightly’;

Export type AlertType \= ‘error’ | ‘warning’ | ‘info’ | ‘success’;

Export interface Day {  
  Id: string;  
  dayOfWeek: DayOfWeek;  
  singleLetter: string;  
  fullName: string;  
  isAvailable: boolean;  
}

Export interface Night {  
  startDay: Day;  
  endDay: Day;  
  nightNumber: number;  
}

Export interface Listing {  
  Id: string;  
  rentalType: RentalType;  
  daysAvailable: DayOfWeek\[\];  
  daysNotAvailable: DayOfWeek\[\];  
  minimumNights: number;  
  maximumNights: number;  
  baseMonthlyPrice?: number;  
  baseWeeklyPrice?: number;  
  baseNightlyPrice?: number;  
  lengthOfStayRates?: Record\<number, number\>; // e.g., {2: 95, 3: 90, 4: 85}  
  Discounts?: Discount\[\];  
  Markups?: Markup\[\];  
}

Export interface Discount {  
  Id: string;  
  Type: ‘length\_of\_stay’ | ‘unused\_nights’ | ‘promotional’;  
  Value: number;  
  isPercentage: boolean;  
  minNights?: number;  
}

Export interface Markup {  
  Id: string;  
  Type: ‘service\_fee’ | ‘cleaning’ | ‘platform’;  
  Value: number;  
  isPercentage: boolean;  
}

Export interface PriceBreakdown {  
  basePrice: number;  
  nightlyRate: number;  
  discountAmount: number;  
  markupAmount: number;  
  totalPrice: number;  
  pricePerNight: number;  
  numberOfNights: number;  
}

Export interface ScheduleState {  
  selectedDays: Day\[\];  
  notSelectedDays: Day\[\];  
  selectedNights: Night\[\];  
  unusedNights: Night\[\];  
  checkInDay: Day | null;  
  checkOutDay: Day | null;  
  nightsCount: number;  
  isContiguous: boolean;  
  isClickable: boolean;  
  shouldRecalculate: boolean;  
}

Export interface ErrorState {  
  hasError: boolean;  
  errorType: ‘minimum\_nights’ | ‘maximum\_nights’ | ‘availability’ | ‘contiguity’ | null;  
  errorMessage: string;  
}  
\`\`\`

\*\*STEP 2: Utility Functions\*\*

\`\`\`typescript  
// utils/[dayHelpers.ts](http://dayHelpers.ts)

Export const DAY\_NAMES \= \[  
  ‘Sunday’, ‘Monday’, ‘Tuesday’, ‘Wednesday’, ‘Thursday’, ‘Friday’, ‘Saturday’  
\];

Export const DAY\_LETTERS \= \[‘S’, ‘M’, ‘T’, ‘W’, ‘T’, ‘F’, ‘S’\];

Export const createDay \= (dayOfWeek: DayOfWeek, isAvailable \= true): Day \=\> ({  
  Id: \`day-${dayOfWeek}\`,  
  dayOfWeek,  
  singleLetter: DAY\_LETTERS\[dayOfWeek\],  
  fullName: DAY\_NAMES\[dayOfWeek\],  
  isAvailable  
});

Export const sortDays \= (days: Day\[\]): Day\[\] \=\> {  
  Return \[...days\].sort((a, b) \=\> a.dayOfWeek \- b.dayOfWeek);  
};

Export const getNextDay \= (day: Day): Day \=\> {  
  Const nextDayOfWeek \= ((day.dayOfWeek \+ 1\) % 7\) as DayOfWeek;  
  Return createDay(nextDayOfWeek);  
};  
\`\`\`

\`\`\`typescript  
// utils/[validators.ts](http://validators.ts)

Export const validateDaySelection \= (  
  Day: Day,  
  selectedDays: Day\[\],  
  Listing: Listing  
): { isValid: boolean; error?: string } \=\> {  
  // Check if already selected  
  If (selectedDays.some(d \=\> d.dayOfWeek \=== day.dayOfWeek)) {  
    Return { isValid: false, error: ‘Day already selected’ };  
  }

  // Check maximum  
  If (selectedDays.length \>= 7\) {  
    Return { isValid: false, error: ‘Maximum 7 days can be selected’ };  
  }

  // Check availability in listing  
  If (\!listing.daysAvailable.includes(day.dayOfWeek)) {  
    Return { isValid: false, error: ‘Day not available for this listing’ };  
  }

  // Check if day is marked as available  
  If (\!day.isAvailable) {  
    Return { isValid: false, error: ‘This day is not available’ };  
  }

  // Check contiguity after adding  
  Const testSelection \= sortDays(\[...selectedDays, day\]);  
  If (\!isContiguous(testSelection)) {  
    Return { isValid: false, error: ‘Days must be consecutive’ };  
  }

  Return { isValid: true };  
};

Export const validateDayRemoval \= (  
  Day: Day,  
  selectedDays: Day\[\],  
  minimumNights: number  
): { isValid: boolean; error?: string } \=\> {  
  Const remainingDays \= selectedDays.filter(d \=\> d.dayOfWeek \!== day.dayOfWeek);  
    
  // Check minimum nights (days \- 1 \= nights)  
  If (remainingDays.length \- 1 \< minimumNights) {  
    Return {  
      isValid: false,  
      Error: \`Minimum ${minimumNights} nights required\`  
    };  
  }

  // Check contiguity after removal  
  If (remainingDays.length \> 1 && \!isContiguous(remainingDays)) {  
    Return {  
      isValid: false,  
      Error: ‘Removal would create non-consecutive selection’  
    };  
  }

  Return { isValid: true };  
};

Export const isContiguous \= (days: Day\[\]): boolean \=\> {  
  If (days.length \<= 1\) return true;

  Const sorted \= sortDays(days);

  For (let i \= 1; i \< sorted.length; i++) {  
    Const diff \= sorted\[i\].dayOfWeek \- sorted\[i \- 1\].dayOfWeek;

    // Normal consecutive  
    If (diff \=== 1\) continue;

    // Saturday (6) to Sunday (0) edge case  
    If (sorted\[i \- 1\].dayOfWeek \=== 6 && sorted\[i\].dayOfWeek \=== 0\) {  
      // This is contiguous across week boundary  
      Continue;  
    }

    // Gap found  
    Return false;  
  }

  Return true;  
};  
\`\`\`

\`\`\`typescript  
// utils/[nightCalculations.ts](http://nightCalculations.ts)

Export const calculateNightsFromDays \= (days: Day\[\]): Night\[\] \=\> {  
  If (days.length \< 2\) return \[\];  
    
  Const sorted \= sortDays(days);  
  Const nights: Night\[\] \= \[\];  
    
  For (let i \= 0; i \< sorted.length \- 1; i++) {  
    nights.push({  
      startDay: sorted\[i\],  
      endDay: sorted\[i \+ 1\],  
      nightNumber: sorted\[i\].dayOfWeek  
    });  
  }  
    
  Return nights;  
};

Export const calculateCheckInCheckOut \= (days: Day\[\]): {  
  checkIn: Day | null;  
  checkOut: Day | null;  
} \=\> {  
  If (days.length \=== 0\) {  
    Return { checkIn: null, checkOut: null };  
  }  
    
  Const sorted \= sortDays(days);  
  Const checkIn \= sorted\[0\];  
    
  // Check-out is the day after last selected day  
  Const lastDay \= sorted\[sorted.length \- 1\];  
  Const checkOut \= getNextDay(lastDay);  
    
  Return { checkIn, checkOut };  
};  
\`\`\`

\`\`\`typescript  
// utils/[priceCalculations.ts](http://priceCalculations.ts)

Export const calculatePrice \= (  
  selectedNights: Night\[\],  
  Listing: Listing  
): PriceBreakdown \=\> {  
  Const nightsCount \= selectedNights.length;  
    
  If (nightsCount \=== 0\) {  
    Return {  
      basePrice: 0,  
      nightlyRate: 0,  
      discountAmount: 0,  
      markupAmount: 0,  
      totalPrice: 0,  
      pricePerNight: 0,  
      numberOfNights: 0  
    };  
  }  
    
  // Step 1: Get base nightly rate based on rental type  
  Let nightlyRate: number;  
    
  Switch (listing.rentalType) {  
    Case ‘Monthly’:  
      nightlyRate \= (listing.baseMonthlyPrice || 0\) / 30;  
      Break;  
    Case ‘Weekly’:  
      nightlyRate \= (listing.baseWeeklyPrice || 0\) / 7;  
      Break;  
    Case ‘Nightly’:  
      nightlyRate \= listing.baseNightlyPrice || 0;  
      Break;  
  }  
    
  // Step 2: Check for length-of-stay specific rates  
  If (listing.lengthOfStayRates && listing.lengthOfStayRates\[nightsCount\]) {  
    nightlyRate \= listing.lengthOfStayRates\[nightsCount\];  
  }  
    
  // Step 3: Calculate base total  
  Const basePrice \= nightlyRate \* nightsCount;  
    
  // Step 4: Apply discounts  
  Const discountAmount \= calculateDiscounts(  
    basePrice,  
    nightsCount,  
    Listing.discounts || \[\]  
  );  
    
  // Step 5: Apply markups  
  Const markupAmount \= calculateMarkups(  
    basePrice,  
    Listing.markups || \[\]  
  );  
    
  // Step 6: Calculate final total  
  Const totalPrice \= basePrice \- discountAmount \+ markupAmount;  
  Const pricePerNight \= totalPrice / nightsCount;  
    
  Return {  
    basePrice,  
    nightlyRate,  
    discountAmount,  
    markupAmount,  
    totalPrice,  
    pricePerNight,  
    numberOfNights: nightsCount  
  };  
};

Const calculateDiscounts \= (  
  basePrice: number,  
  nightsCount: number,  
  Discounts: Discount\[\]  
): number \=\> {  
  Let total \= 0;  
    
  For (const discount of discounts) {  
    // Check if discount applies  
    If (discount.minNights && nightsCount \< discount.minNights) {  
      Continue;  
    }  
      
    If (discount.isPercentage) {  
      Total \+= (basePrice \* discount.value) / 100;  
    } else {  
      Total \+= discount.value;  
    }  
  }  
    
  Return total;  
};

Const calculateMarkups \= (  
  basePrice: number,  
  Markups: Markup\[\]  
): number \=\> {  
  Let total \= 0;  
    
  For (const markup of markups) {  
    If (markup.isPercentage) {  
      Total \+= (basePrice \* markup.value) / 100;  
    } else {  
      Total \+= markup.value;  
    }  
  }  
    
  Return total;  
};  
\`\`\`

\*\*STEP 3: Custom Hook \- useScheduleSelector\*\*

\`\`\`typescript  
// hooks/[useScheduleSelector.ts](http://useScheduleSelector.ts)

Import { useState, useCallback, useEffect, useMemo } from ‘react’;  
Import { Day, Listing, Night, PriceBreakdown, ErrorState } from ‘../types’;  
Import {   
  validateDaySelection,   
  validateDayRemoval,   
  sortDays,   
  isContiguous   
} from ‘../utils/validators’;  
Import { calculateNightsFromDays, calculateCheckInCheckOut } from ‘../utils/nightCalculations’;  
Import { calculatePrice } from ‘../utils/priceCalculations’;

Interface UseScheduleSelectorProps {  
  Listing: Listing;  
  initialSelectedDays?: Day\[\];  
  onSelectionChange?: (days: Day\[\]) \=\> void;  
  onPriceChange?: (pricing: PriceBreakdown) \=\> void;  
}

Export const useScheduleSelector \= ({  
  Listing,  
  initialSelectedDays \= \[\],  
  onSelectionChange,  
  onPriceChange  
}: UseScheduleSelectorProps) \=\> {  
  Const \[selectedDays, setSelectedDays\] \= useState\<Day\[\]\>(initialSelectedDays);  
  Const \[errorState, setErrorState\] \= useState\<ErrorState\>({  
    hasError: false,  
    errorType: null,  
    errorMessage: ‘’  
  });  
  Const \[isClickable, setIsClickable\] \= useState(true);

  // Derived state \- recalculated whenever selectedDays changes  
  Const selectedNights \= useMemo(() \=\>   
    calculateNightsFromDays(selectedDays),  
    \[selectedDays\]  
  );

  Const { checkIn, checkOut } \= useMemo(() \=\>   
    calculateCheckInCheckOut(selectedDays),  
    \[selectedDays\]  
  );

  Const priceBreakdown \= useMemo(() \=\>   
    calculatePrice(selectedNights, listing),  
    \[selectedNights, listing\]  
  );

  Const nightsCount \= selectedNights.length;

  // Notify parent of changes  
  useEffect(() \=\> {  
    onSelectionChange?.(selectedDays);  
  }, \[selectedDays, onSelectionChange\]);

  useEffect(() \=\> {  
    onPriceChange?.(priceBreakdown);  
  }, \[priceBreakdown, onPriceChange\]);

  Const handleDaySelect \= useCallback((day: Day) \=\> {  
    If (\!isClickable) return false;

    Const validation \= validateDaySelection(day, selectedDays, listing);

    If (\!validation.isValid) {  
      setErrorState({  
        hasError: true,  
        errorType: ‘availability’,  
        errorMessage: validation.error || ‘Cannot select this day’  
      });  
      Return false;  
    }

    // Add and sort  
    Const newSelection \= sortDays(\[...selectedDays, day\]);  
    setSelectedDays(newSelection);  
    setErrorState({ hasError: false, errorType: null, errorMessage: ‘’ });  
      
    Return true;  
  }, \[selectedDays, listing, isClickable\]);

  Const handleDayRemove \= useCallback((day: Day) \=\> {  
    If (\!isClickable) return false;

    Const validation \= validateDayRemoval(day, selectedDays, listing.minimumNights);

    If (\!validation.isValid) {  
      setErrorState({  
        hasError: true,  
        errorType: ‘minimum\_nights’,  
        errorMessage: validation.error || ‘Cannot remove this day’  
      });  
      Return false;  
    }

    Const newSelection \= selectedDays.filter(d \=\> d.dayOfWeek \!== day.dayOfWeek);  
    setSelectedDays(newSelection);  
    setErrorState({ hasError: false, errorType: null, errorMessage: ‘’ });  
      
    Return true;  
  }, \[selectedDays, listing.minimumNights, isClickable\]);

  Const handleDayClick \= useCallback((day: Day) \=\> {  
    Const isSelected \= selectedDays.some(d \=\> d.dayOfWeek \=== day.dayOfWeek);  
      
    If (isSelected) {  
      Return handleDayRemove(day);  
    } else {  
      Return handleDaySelect(day);  
    }  
  }, \[selectedDays, handleDaySelect, handleDayRemove\]);

  Const clearSelection \= useCallback(() \=\> {  
    setSelectedDays(\[\]);  
    setErrorState({ hasError: false, errorType: null, errorMessage: ‘’ });  
  }, \[\]);

  Const clearError \= useCallback(() \=\> {  
    setErrorState({ hasError: false, errorType: null, errorMessage: ‘’ });  
  }, \[\]);

  Const setClickableState \= useCallback((clickable: boolean) \=\> {  
    setIsClickable(clickable);  
  }, \[\]);

  Return {  
    selectedDays,  
    selectedNights,  
    checkInDay: checkIn,  
    checkOutDay: checkOut,  
    nightsCount,  
    priceBreakdown,  
    errorState,  
    isClickable,  
    isContiguous: isContiguous(selectedDays),  
    handleDayClick,  
    handleDaySelect,  
    handleDayRemove,  
    clearSelection,  
    clearError,  
    setClickableState  
  };  
};  
\`\`\`

\*\*STEP 4: Component Implementation\*\*

\`\`\`typescript  
// components/ListingScheduleSelector/DayButton.tsx

Import React from ‘react’;  
Import { Day } from ‘../../types’;  
Import ‘./DayButton.css’;

Interface DayButtonProps {  
  Day: Day;  
  isSelected: boolean;  
  isClickable: boolean;  
  onClick: (day: Day) \=\> void;  
}

Export const DayButton: [React.FC](http://React.FC)\<DayButtonProps\> \= ({  
  Day,  
  isSelected,  
  isClickable,  
  onClick  
}) \=\> {  
  Const handleClick \= () \=\> {  
    If (day.isAvailable && isClickable) {  
      onClick(day);  
    }  
  };

  Const classNames \= \[  
    ‘Day-button’,  
    isSelected && ‘selected’,  
    \!day.isAvailable && ‘disabled’,  
    \!isClickable && ‘not-clickable’  
  \].filter(Boolean).join(‘ ‘);

  Return (  
    \<button  
      className={classNames}  
      onClick={handleClick}  
      disabled={\!day.isAvailable || \!isClickable}  
      title={day.fullName}  
      aria-label={\`${day.fullName}, ${isSelected ? ‘selected’ : ‘not selected’}\`}  
      aria-pressed={isSelected}  
    \>  
      {day.singleLetter}  
    \</button\>  
  );  
};  
\`\`\`

\`\`\`css  
/\* components/ListingScheduleSelector/DayButton.css \*/

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

.day-button:hover:not(.disabled):not(.not-clickable) {  
  Background-color: \#f0f0f0;  
  Transform: scale(1.05);  
}

.day-button.selected {  
  Background-color: \#4CAF50;  
  Color: white;  
  Border-color: \#45a049;  
}

.day-button.disabled,  
.day-button.not-clickable {  
  Background-color: \#e0e0e0;  
  Color: \#9e9e9e;  
  Cursor: not-allowed;  
  Opacity: 0.5;  
}

.day-button:active:not(.disabled):not(.not-clickable) {  
  Transform: scale(0.95);  
}  
\`\`\`

\`\`\`typescript  
// components/ListingScheduleSelector/ListingScheduleSelector.tsx

Import React, { useMemo } from ‘react’;  
Import { Listing, Day, DayOfWeek } from ‘../../types’;  
Import { useScheduleSelector } from ‘../../hooks/useScheduleSelector’;  
Import { createDay } from ‘../../utils/dayHelpers’;  
Import { DayButton } from ‘./DayButton’;  
Import { ErrorOverlay } from ‘./ErrorOverlay’;  
Import { PriceDisplay } from ‘./PriceDisplay’;  
Import ‘./ListingScheduleSelector.css’;

Interface ListingScheduleSelectorProps {  
  Listing: Listing;  
  initialSelectedDays?: Day\[\];  
  onScheduleSave?: (selectedDays: Day\[\]) \=\> void;  
}

Export const ListingScheduleSelector: [React.FC](http://React.FC)\<ListingScheduleSelectorProps\> \= ({  
  Listing,  
  initialSelectedDays \= \[\],  
  onScheduleSave  
}) \=\> {  
  // Create all 7 days with availability flags  
  Const allDays \= useMemo(() \=\> {  
    Return Array.from({ length: 7 }, (\_, i) \=\> {  
      Const dayOfWeek \= i as DayOfWeek;  
      Const day \= createDay(dayOfWeek);  
      day.isAvailable \= listing.daysAvailable.includes(dayOfWeek);  
      Return day;  
    });  
  }, \[listing.daysAvailable\]);

  Const {  
    selectedDays,  
    nightsCount,  
    priceBreakdown,  
    errorState,  
    isClickable,  
    handleDayClick,  
    clearSelection,  
   
|---------|--------|-------|  
| State Management | Custom States | useState/useReducer |  
| Workflows | Visual workflows | Functions/Hooks |  
| Repeating Groups | Built-in RG | .map() |  
| Conditional Display | “Only when” | Conditional rendering |  
| Database | Built-in | API calls |  
| Reactivity | Automatic “Do when” | useEffect |  
| Custom Events | Reusable workflows | Custom hooks |  
| Validation | Workflow conditions | Validation functions |  
| Calculations | Formula fields | Computed values/useMemo |  
| UI Updates | Automatic | State-driven re-render |

\================================================================================  
XI. CONCLUSION  
\================================================================================

This component represents a sophisticated booking interface with:

\*\*Complex Features:\*\*

- 26 interconnected workflows  
- \- Multi-type pricing (Monthly/Weekly/Nightly)  
- \- Length-of-stay variations  
- \- Contiguity validation with edge cases  
- \- Reactive recalculation  
- \- Comprehensive error handling  
- \- Deep linking support

\*\*Migration Complexity: HIGH\*\*

\*\*Estimated Development Time:\*\*

- TypeScript setup & types: 2-4 hours  
- \- Utility functions: 4-6 hours  
- \- Custom hooks: 6-8 hours  
- \- Components: 6-8 hours  
- \- Styling: 2-4 hours  
- \- Testing: 6-10 hours  
- \- Integration & debugging: 8-12 hours

\*\*Total: 34-52 hours of development\*\*

\*\*Key Success Factors:\*\*

1. Thorough understanding of Bubble workflows  
2. 2\. Proper TypeScript typing  
3. 3\. Comprehensive testing (especially edge cases)  
4. 4\. Focus on Sunday boundary logic  
5. 5\. Multi-rental-type support  
6. 6\. Length-of-stay pricing variations

The React version will be more maintainable, testable, and performant than the Bubble version, with full control over every aspect of functionality.

\================================================================================  
END OF ANALYSIS  
\================================================================================  
