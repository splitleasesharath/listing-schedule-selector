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