# Listing Schedule Selector - Complete Workflow Documentation

**Reusable Element:** ⛴ Listing Schedule Selector
**Total Workflows:** 26
**Documentation Date:** 2025-11-08
**Purpose:** This document provides comprehensive documentation of all workflows in the Listing Schedule Selector reusable element, including pricing calculations, day selection logic, error handling, and state management.

---

## Table of Contents

1. [Overview](#overview)
2. [Workflow Categories](#workflow-categories)
3. [Adding Days Workflows](#adding-days-workflows)
4. [Custom Events (Price Calculations & Logic)](#custom-events-price-calculations--logic)
5. [Do When Actions](#do-when-actions)
6. [Error Handling Workflows](#error-handling-workflows)
7. [Page Load Workflows](#page-load-workflows)
8. [Removing Days Workflows](#removing-days-workflows)
9. [Key Data Structures & States](#key-data-structures--states)
10. [Price Calculation Flow](#price-calculation-flow)

---

## Overview

The Listing Schedule Selector is a complex reusable element that manages:
- Day/night selection for rental properties
- Dynamic pricing based on rental type (Monthly, Weekly, Nightly)
- Discount and markup calculations
- Validation and error handling
- State management for user selections

### Key Features:
- Supports 3 rental types: Monthly, Weekly, and Nightly
- Calculates prorated prices based on selected nights
- Applies discounts for unused nights (non-nightly rentals)
- Validates against host minimum/maximum night requirements
- Handles contiguous day selection requirements
- Manages complex pricing multipliers and discounts

---

## Workflow Categories

| Category | Count | Purpose |
|----------|-------|---------|
| Adding Days | 2 | Handle adding days to selection |
| Custom Events | 10 | Core calculation and state management |
| Do When Actions | 5 | Reactive conditions and triggers |
| Error Handling | 6 | Validation and user feedback |
| Page is loaded | 2 | Initialization logic |
| Removing Days | 1 | Handle removing days from selection |

---

## Adding Days Workflows

### Workflow 1: adding nights in general (ID: cngvc0)

**Trigger:**
- Element: 🔘Select Day of Week
- Event: is clicked

**Conditions:**
```
⛴ Listing Schedule Selector's Selected Days (days) doesn't contain Parent group's Days
AND
⛴ Listing Schedule Selector's Selected Days (days):count < 8
AND
⛴ Listing Schedule Selector's Listing's Days Available (List of Days) contains Parent group's Days
```

**Flow:** This is the main workflow when a user clicks to add a day to their selection.

**Steps:**

1. **Trigger custom event:** `calculate days, then sort days and set states`
   - Parameters:
     - `parent_group_day`: Parent group's Days
     - `add`: "yes"
     - `remove`: "no"
   - Purpose: Recalculate selected days and update UI states

2. **Trigger custom event:** `save schedule`
   - Purpose: Persist the selected schedule

3. **Trigger custom event:** `set unused nights discount`
   - Condition: `⛴ Listing Schedule Selector's Listing's rental type is not Nightly`
   - Purpose: Calculate discount for unused nights in weekly/monthly rentals

4. **Trigger custom event:** `set price multipliers`
   - Purpose: Apply rental type-specific pricing multipliers (monthly, weekly, or nightly)

5. **Trigger custom event:** `set discounts and markups multiplier`
   - Purpose: Apply discounts and markups based on selection

6. **Trigger custom event:** `Create reservation span variables`
   - Purpose: Create variables for reservation date range

7. **Trigger custom event:** `calculate listing nightly price`
   - Purpose: Calculate the final nightly price

8. **Set state:** Sets scheduler to know its been updated ("clicked on")
   - Element: ⛴ Listing Schedule Selector
   - Custom state: `Clicked-on`
   - Value: "yes"

9. **Trigger custom event:** `Run JS - Check Contiguity`
   - Purpose: Validate that selected days are contiguous

---

### Workflow 2: adding nights in general - unavailable variant (ID: couLu)

**Trigger:**
- Element: 🔘Select Day of Week
- Event: is clicked

**Conditions:**
```
⛴ Listing Schedule Selector's Listing's Days Available (List of Days) doesn't contain Parent group's Days
AND
⛴ Listing Schedule Selector's Listing is not empty
```

**Flow:** Handles when user tries to select an unavailable day.

**Steps:**

1. **Set state:** Set states of "GF: Day selected not available"
   - Purpose: Update error message state

2. **Show element:** Show "GF: Day selected not available"
   - Purpose: Display error popup to user

---

## Custom Events (Price Calculations & Logic)

These 10 custom events contain the core business logic for the scheduler.

---

### Event 1: Alerts General (ID: cthrv)

**Trigger:** Custom Event

**Purpose:** General alert handling system

**Parameters:** TBD (requires manual inspection)

**Steps:** TBD (requires manual inspection)

---

### Event 2: calculate days, then sort days and set states (ID: cnhes0)

**Trigger:** Custom Event

**Purpose:** Core logic for managing selected days, sorting them, and updating UI states

**Parameters:**
- `parent_group_day`: Day being added/removed
- `add`: "yes" or "no"
- `remove`: "yes" or "no"

**Expected Functionality:**
- Adds or removes day from Selected Days list
- Sorts selected days chronologically
- Calculates Selected Nights count
- Updates UI states for all day buttons
- Sets First Selected Day and Last Selected Day

---

### Event 3: calculate listing nightly price ⚠️ CRITICAL (ID: cngxe0)

**Trigger:** Custom Event

**Purpose:** Main price calculation engine - calculates nightly price based on rental type and selection

**Steps Overview:**

1. **Step 1:** Calculate monthly rental prorated nightly host rate
   - **Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Monthly`
   - **Purpose:** Calculate what the nightly rate should be for monthly rental based on selected nights

2. **Step 2:** Calculate weekly rental prorated nightly host rate
   - **Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Weekly`
   - **Purpose:** Calculate what the nightly rate should be for weekly rental based on selected nights

3. **Step 3:** Calculate monthly rental listing nightly price
   - **Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Monthly`
   - **Purpose:** Calculate total nightly price for monthly rental

4. **Step 4:** Calculate weekly rental listing nightly price
   - **Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Weekly`
   - **Purpose:** Calculate total nightly price for weekly rental

5. **Step 5:** Set nightly host rate when 2 nights selected
   - **Condition:** `⛴ Listing Schedule Selector's Selected Nights (nights):count is 2`
   - **Purpose:** Apply specific pricing for 2-night selections

6. **Step 6:** Set nightly host rate when 3 nights selected
   - **Condition:** `⛴ Listing Schedule Selector's Selected Nights (nights):count is 3`
   - **Purpose:** Apply specific pricing for 3-night selections

7. **Step 7:** Set nightly host rate when 4 nights selected
   - **Condition:** `⛴ Listing Schedule Selector's Selected Nights (nights):count is 4`
   - **Purpose:** Apply specific pricing for 4-night selections

8. **Step 8:** Set nightly host rate when 5 nights selected
   - **Condition:** `⛴ Listing Schedule Selector's Selected Nights (nights):count is 5`
   - **Purpose:** Apply specific pricing for 5-night selections

9. **Step 9:** Set nightly host rate when 7 nights selected
   - **Condition:** `⛴ Listing Schedule Selector's Selected Nights (nights):count is 7`
   - **Purpose:** Apply specific pricing for 7-night selections (weekly rate)

10. **Step 10:** Calculate nightly rental listing nightly price
    - **Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Nightly`
    - **Purpose:** Calculate price for true nightly rentals

11. **Step 11:** Calculate 4 week rent - monthly and nightly
    - **Purpose:** Calculate what 4 weeks of rent would cost

12. **Step 12:** Calculate initial payment
    - **Purpose:** Calculate the initial payment amount required

13. **Step 13:** Calculate total reservation price
    - **Purpose:** Calculate the final total price for the entire reservation

**Key Pricing Logic:**
- Different calculations for Monthly, Weekly, and Nightly rental types
- Night-count-specific pricing (2, 3, 4, 5, 7 nights have special rates)
- Prorates monthly/weekly rates to nightly equivalents
- Calculates both initial payment and total reservation price

**📝 NOTE:** To get the exact expressions for each step, you need to click on each step in the Bubble editor and copy the expressions from the dynamic expression builder.

---

### Event 4: check error messages when removing (ID: cninE0)

**Trigger:** Custom Event

**Conditions:**
```
⛴ Listing Schedule Selector's Selected Days (days) contains day
AND
⛴ Listing Schedule Selector's Selected Nights (nights):count ≤ ⛴ Listing Schedule Selector's Listing's Minimum Nights
```

**Purpose:** Validates that removing a day won't violate minimum night requirements

---

### Event 5: Create reservation span variables (ID: cnhlH0)

**Trigger:** Custom Event

**Purpose:** Creates and sets variables for the reservation date span

**Expected Variables:**
- Check-in date (first selected day)
- Check-out date (last selected day + 1)
- Total nights
- Date range text

---

### Event 6: Run JS - Check Contiguity (ID: crjio2)

**Trigger:** Custom Event

**Purpose:** Runs JavaScript to verify selected days are contiguous (no gaps)

**Expected Behavior:**
- Validates that selected days form a continuous range
- Likely uses the "Javascript to Bubble" plugin
- Returns contiguity status to Bubble

---

### Event 7: save schedule (ID: cnhfL0)

**Trigger:** Custom Event

**Purpose:** Saves the current schedule selection to the database or custom state

**Expected Actions:**
- Persist Selected Days list
- Persist Selected Nights count
- May update URL parameters
- May save to user profile

---

### Event 8: set discounts and markups multiplier ⚠️ CRITICAL (ID: cnhib0)

**Trigger:** Custom Event

**Purpose:** Calculates and applies discount/markup multipliers

**Expected Logic:**
- Length of stay discounts (longer stays = bigger discount)
- Last-minute booking markups
- Early bird discounts
- Seasonal adjustments
- Host-configured discounts

**📝 NOTE:** This contains critical pricing formulas that need to be captured from the Bubble editor.

---

### Event 9: set price multipliers ⚠️ CRITICAL (ID: cngxZ0)

**Trigger:** Custom Event

**Purpose:** Sets rental type-specific price multipliers

**Expected Logic:**
- **Monthly rental:** Multiplier based on nights selected vs. full month
- **Weekly rental:** Multiplier based on nights selected vs. full week
- **Nightly rental:** Standard nightly multiplier

**Common Patterns:**
- Monthly: `(days selected / 30) * monthly rate`
- Weekly: `(days selected / 7) * weekly rate`
- Nightly: `days selected * nightly rate`

**📝 NOTE:** Exact formulas need to be extracted from Bubble editor.

---

### Event 10: set unused nights discount ⚠️ CRITICAL (ID: cngwk0)

**Trigger:** Custom Event

**Purpose:** Calculates discount for unused nights in monthly/weekly rentals

**Expected Logic:**
- Only applies to Monthly and Weekly rentals
- If user selects fewer nights than the full period, apply discount
- Formula likely: `(unused nights / total nights) * discount rate`

**Example:**
- Monthly rental (30 nights), user selects 20 nights
- Unused nights: 10
- Discount applied based on those 10 unused nights

**📝 NOTE:** Exact formula needs to be extracted from Bubble editor.

---

## Do When Actions

These workflows run automatically when certain conditions become true.

---

### Workflow 1: Every time condition (ID: cngxS0)

**Trigger:** Do when condition is true (Every time)

**Condition:**
```
⛴ Listing Schedule Selector's Recalculate States is yes
```

**Purpose:** Recalculates states whenever the "Recalculate States" flag is set to yes

**Expected Behavior:**
- Runs every time the condition becomes true
- Likely resets states and recalculates prices
- Sets "Recalculate States" back to "no" after completion

---

### Workflow 2: Get weeks&nights from page URL (ID: cngtt0)

**Trigger:** Do when condition is true

**Condition:**
```
Get weeks&nights from page URL is not empty
```

**Purpose:** Loads schedule from URL parameters (for sharing links or deep linking)

**Expected Parameters:**
- Weeks parameter in URL
- Nights parameter in URL
- Parses and sets selected days accordingly

---

### Workflow 3: Just once condition (ID: crjhg)

**Trigger:** Do when condition is true (Just once)

**Condition:**
```
⛴ Listing Schedule Selector's Clickable is no
```

**Purpose:** Runs once when the scheduler becomes non-clickable

**Expected Use Case:**
- Disables interaction when listing is not available
- May grey out or hide selection interface

---

### Workflow 4: Just once condition - DISABLED (ID: crjhn)

**Trigger:** Do when condition is true (Just once) - **DISABLED**

**Condition:**
```
⛴ Listing Schedule Selector's Clickable is no
```

**Status:** This workflow is disabled (duplicate of workflow 3?)

---

### Workflow 5: trigger when night selected is restricted (ID: cngxo0)

**Trigger:** Do when condition is true

**Condition:**
```
⛴ Listing Schedule Selector's Listing's Days Not Available:filtered:count > 0
AND
⛴ Listing Schedule Selector's Listing is not empty
```

**Purpose:** Handles when user tries to select a restricted/unavailable night

**Expected Behavior:**
- Shows error message
- Prevents selection
- May suggest alternative dates

---

## Error Handling Workflows

These 6 workflows manage validation and user feedback.

---

### Workflow 1: B: I Understand is clicked (ID: cnguy0)

**Trigger:**
- Element: B: I Understand
- Event: is clicked

**Purpose:** Handles when user acknowledges an error message

**Expected Actions:**
- Hides error popup
- Resets error states
- May clear invalid selection

---

### Workflow 2: prevent selecting more nights than available (ID: cnguO0)

**Trigger:**
- Element: 🔘Select Day of Week
- Event: is clicked

**Conditions:**
```
⛴ Listing Schedule Selector's Selected Days (days) doesn't contain Parent group's Days
AND
⛴ Listing Schedule Selector's Selected Nights (nights):count ≥ ⛴ Listing Schedule Selector's Listing's Maximum Nights
AND
⛴ Listing Schedule Selector's Listing's Maximum Nights is not empty
```

**Purpose:** Prevents user from selecting more nights than the host allows

**Expected Actions:**
- Shows error popup: "Maximum nights exceeded"
- Doesn't add the day to selection
- May suggest reducing nights

---

### Workflow 3: when adding a new day and too many nights are selected (ID: cnguR0)

**Trigger:**
- Element: 🔘Select Day of Week
- Event: is clicked

**Conditions:**
```
⛴ Listing Schedule Selector's Selected Days (days) doesn't contain Parent group's Days
AND
⛴ Listing Schedule Selector's Selected Nights (nights):count > ⛴ Listing Schedule Selector's Listing's Maximum Nights
```

**Purpose:** Handles edge case where selection already exceeds maximum

**Expected Actions:**
- Shows error about exceeding maximum nights
- Prevents adding more days

---

### Workflow 4: When adding a new day if selected days is 5 (ID: cngtc0)

**Trigger:**
- Element: 🔘Select Day of Week
- Event: is clicked

**Conditions:**
```
⛴ Listing Schedule Selector's Selected Days (days) doesn't contain Parent group's Days
AND
⛴ Listing Schedule Selector's Selected Days (days):count is 5
```

**Purpose:** Special error handling when 5 days are selected (nightly rental limit?)

**Expected Actions:**
- Shows "💥Days Selected Error" element
- May explain limit on number of selectable days

---

### Workflow 5: When removing a day, if selected nights is less than minimum (ID: cngsz0)

**Trigger:**
- Element: 🔘Select Day of Week
- Event: is clicked

**Conditions:**
```
⛴ Listing Schedule Selector's Selected Days (days) contains Parent group's Days
AND
⛴ Listing Schedule Selector's Selected Nights (nights):count ≤ ⛴ Listing Schedule Selector's Listing's Minimum Nights
AND
⛴ Listing Schedule Selector's Selected Nights (nights):count > 2
```

**Purpose:** Warns user when removing a day would violate minimum night requirement

**Expected Actions:**
- Shows popup suggesting to increase nights instead
- Shows "💥Nights outside of host desired range" popup
- Allows removal but warns user

---

### Workflow 6: When user removes a day, and nights is less than 2 (ID: cngvZ0)

**Trigger:**
- Element: 🔘Select Day of Week
- Event: is clicked

**Conditions:**
```
⛴ Listing Schedule Selector's Selected Days (days) contains Parent group's Days
AND
⛴ Listing Schedule Selector's Selected Nights (nights):count ≤ 2
```

**Purpose:** Educational popup when user has very few nights selected

**Expected Actions:**
- Shows popup explaining how the selector works
- Minimum 2 nights required
- Teaches user about the selection interface

---

## Page Load Workflows

These workflows run when the page loads.

---

### Workflow 1: Page is loaded (ID: cnjZu0)

**Trigger:** Page is loaded

**Purpose:** General initialization of the schedule selector

**Expected Actions:**
- Initialize custom states
- Load listing data
- Set default values
- May load saved schedule from user profile

---

### Workflow 2: Set saved schedule into profile on account page (ID: cngtu0)

**Trigger:** Page is loaded

**Condition:**
```
This URL contains account
```

**Purpose:** On account page, loads user's saved schedule preferences

**Expected Actions:**
- Loads Selected Days from user profile
- Loads Selected Nights from user profile
- Pre-populates the scheduler with saved data

---

## Removing Days Workflows

---

### Workflow 1: removing nights-general (ID: cngwH0)

**Trigger:**
- Element: 🔘Select Day of Week
- Event: is clicked

**Conditions:**
```
⛴ Listing Schedule Selector's Selected Days (days) contains Parent group's Days
AND
⛴ Listing Schedule Selector's Selected Days (days):count > 2
```

**Purpose:** Handles removing a day from selection (inverse of adding workflow)

**Expected Steps:**
1. Trigger `calculate days, then sort days and set states` (with remove: "yes")
2. Trigger `check error messages when removing`
3. Trigger `save schedule`
4. Trigger `set unused nights discount`
5. Trigger `set price multipliers`
6. Trigger `set discounts and markups multiplier`
7. Trigger `Create reservation span variables`
8. Trigger `calculate listing nightly price`
9. Set state: `Clicked-on` = "yes"
10. Trigger `Run JS - Check Contiguity`

---

## Key Data Structures & States

### Custom States on ⛴ Listing Schedule Selector:

| State Name | Type | Purpose |
|------------|------|---------|
| Selected Days | List of Days | Stores all currently selected days |
| Selected Nights | List of Nights | Stores all nights in selection |
| Clicked-on | yes/no | Tracks if scheduler has been interacted with |
| Recalculate States | yes/no | Flag to trigger state recalculation |
| Clickable | yes/no | Whether scheduler is interactive |
| Listing | Listing (thing) | The listing being scheduled |

### Calculated Values:

| Value | Calculation | Purpose |
|-------|-------------|---------|
| Selected Nights:count | List count | Number of nights selected |
| Selected Days:count | List count | Number of days selected |
| First Selected Day | Selected Days:first item | Check-in day |
| Last Selected Day | Selected Days:last item | Check-out day |

### Listing Properties Referenced:

| Property | Type | Purpose |
|----------|------|---------|
| rental type | Monthly/Weekly/Nightly | Determines pricing calculation method |
| Days Available | List of Days | Days that can be selected |
| Days Not Available | List of Days | Days that cannot be selected |
| Minimum Nights | Number | Host's minimum night requirement |
| Maximum Nights | Number | Host's maximum night requirement |
| Monthly Rate | Number | Price for monthly rental |
| Weekly Rate | Number | Price for weekly rental |
| Nightly Rate | Number | Price per night |

---

## Price Calculation Flow

Here's the high-level flow of how prices are calculated:

```
User Clicks Day
    ↓
1. Add/Remove day from Selected Days
    ↓
2. Calculate Selected Nights count
    ↓
3. Set Rental Type Multipliers
   - Monthly: prorate based on days/30
   - Weekly: prorate based on days/7
   - Nightly: use nightly rate
    ↓
4. Apply Unused Nights Discount (if Monthly/Weekly)
   - Calculate unused nights
   - Apply discount percentage
    ↓
5. Apply Discounts & Markups
   - Length of stay discounts
   - Seasonal adjustments
   - Host-configured rates
    ↓
6. Calculate Night-Count-Specific Rates
   - Special rates for 2, 3, 4, 5, 7 nights
    ↓
7. Calculate Nightly Price
    ↓
8. Calculate Total Reservation Price
   = Nightly Price × Number of Nights
    ↓
9. Calculate Initial Payment
   (May be partial or full payment)
    ↓
10. Display to User
```

---

## Priority Actions to Complete Documentation

To complete this documentation with exact expressions, you need to manually click through these critical workflows in the Bubble editor:

### 🔴 Critical Priority (Contains Pricing Formulas):

1. **calculate listing nightly price** - All 13 steps
   - Click each step and copy the exact expression
   - Document all state values being set
   - Note any dynamic expressions in conditions

2. **set discounts and markups multiplier**
   - Document discount calculation formulas
   - Note which discounts apply when

3. **set price multipliers**
   - Document exact rental type multiplier formulas
   - Monthly, weekly, nightly calculations

4. **set unused nights discount**
   - Document unused night discount formula
   - When it applies and how it's calculated

### 🟡 High Priority (Core Logic):

5. **calculate days, then sort days and set states**
   - How days are added/removed from list
   - Sorting logic
   - State updates

6. **Create reservation span variables**
   - What variables are created
   - How dates are calculated

### 🟢 Medium Priority (Supporting Logic):

7. **save schedule** - How schedule is persisted
8. **Run JS - Check Contiguity** - JavaScript code
9. **Alerts General** - Alert handling logic
10. Error handling workflows - Exact error messages and conditions

---

## How to Extract Missing Expressions

For each workflow step that needs documentation:

1. Open Bubble.io editor
2. Navigate to Workflow tab
3. Click the workflow in the left panel
4. Click each step card
5. In the property editor on the right:
   - Copy the action type
   - Copy all parameter values and expressions
   - Click the dynamic expression button (blue text) to see full expression
   - Copy the entire expression exactly as written
6. Note any conditions ("Only when") with full expressions

---

## Notes

- This scheduler handles complex pricing for 3 rental types
- Key insight: Monthly and Weekly rentals are prorated to nightly rates
- Unused nights in partial-period rentals receive discounts
- Different night counts (2,3,4,5,7) have special pricing rules
- Extensive validation prevents invalid selections
- JavaScript is used for contiguity checking
- All selections are saved for later retrieval

---

## Related Files

- `bubble_scheduler_workflows_documentation.json` - Structured workflow data
- `WORKFLOW_DOCUMENTATION_STATUS.md` - Documentation progress tracker
- Screenshots in `.playwright-mcp/` directory

---

**Documentation Status:** Structural complete, expressions require manual extraction

**Last Updated:** 2025-11-08

**For Questions:** Review the workflow in Bubble.io editor or check the screenshots captured during this documentation process.
