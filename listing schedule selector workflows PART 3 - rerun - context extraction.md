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