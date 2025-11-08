# Listing Schedule Selector - Mathematical Expressions & Calculations

**Last Updated:** 2025-11-08
**Purpose:** Detailed documentation of all mathematical expressions and calculations used in pricing and state management

---

## Table of Contents

1. [Overview](#overview)
2. [calculate listing nightly price - 13 Steps](#calculate-listing-nightly-price---13-steps)
3. [set price multipliers - 4 Steps](#set-price-multipliers---4-steps)
4. [set discounts and markups multiplier - 2 Steps](#set-discounts-and-markups-multiplier---2-steps)
5. [set unused nights discount - 8 Steps](#set-unused-nights-discount---8-steps)
6. [calculate days, then sort days and set states - 21 Steps](#calculate-days-then-sort-days-and-set-states---21-steps)
7. [Key Variables Reference](#key-variables-reference)
8. [Expression Patterns](#expression-patterns)

---

## Overview

This document contains the mathematical expressions used to calculate prices, discounts, and manage state in the Listing Schedule Selector. The scheduler supports three rental types (Monthly, Weekly, Nightly) and dynamically calculates prices based on:

- Number of nights selected
- Rental type
- Unused nights (for Monthly/Weekly)
- Discounts and markups
- Host-configured pricing

### Key Calculation Flow:

```
1. User selects days → calculate days and nights
2. Determine rental type (Monthly/Weekly/Nightly)
3. Calculate base price multiplier
4. Calculate unused nights discount (if applicable)
5. Apply discounts and markups
6. Calculate final nightly price
7. Calculate total reservation price
8. Calculate initial payment
```

---

## calculate listing nightly price - 13 Steps

**Workflow ID:** cngxe0
**Custom Event:** `calculate listing nightly price is triggered`
**Parameters:** None (reads from element states)

### Step 1: Calculate monthly rental prorated nightly host rate

**Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Monthly`

**Purpose:** For monthly rentals, calculate what the nightly rate should be based on the monthly rate

**Action Type:** Set state

**Expected Expression Pattern:**
```
Nightly Host Rate = (Monthly Rate / 30) * some adjustment factor
```

**📝 To Extract:**
- Element: ⛴ Listing Schedule Selector
- Custom State: (needs to be identified - likely "Nightly Host Rate" or similar)
- Value: Expression calculating monthly to nightly conversion

---

### Step 2: Calculate weekly rental prorated nightly host rate

**Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Weekly`

**Purpose:** For weekly rentals, calculate what the nightly rate should be based on the weekly rate

**Action Type:** Set state

**Expected Expression Pattern:**
```
Nightly Host Rate = (Weekly Rate / 7) * some adjustment factor
```

**📝 To Extract:**
- Element: ⛴ Listing Schedule Selector
- Custom State: Nightly Host Rate (or equivalent)
- Value: Expression calculating weekly to nightly conversion

---

### Step 3: Calculate monthly rental listing nightly price

**Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Monthly`

**Purpose:** Calculate the listing nightly price for monthly rentals

**Action Type:** Set state

**Expected Expression Pattern:**
```
Listing Nightly Price = Nightly Host Rate * Price Multiplier * Discount Multiplier
```

**📝 To Extract:**
- Element: ⛴ Listing Schedule Selector
- Custom State: Listing Nightly Price
- Value: Expression combining host rate, multipliers, and discounts

---

### Step 4: Calculate weekly rental listing nightly price

**Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Weekly`

**Purpose:** Calculate the listing nightly price for weekly rentals

**Action Type:** Set state

**Expected Expression Pattern:**
```
Listing Nightly Price = Nightly Host Rate * Price Multiplier * Discount Multiplier
```

---

### Step 5: Set nightly host rate when 2 nights selected

**Condition:** `⛴ Listing Schedule Selector's Selected Nights (nights):count is 2`

**Purpose:** Apply special 2-night pricing

**Expected Expression:**
```
Nightly Host Rate = Listing's 2-night rate (or calculated rate)
```

---

### Step 6: Set nightly host rate when 3 nights selected

**Condition:** `⛴ Listing Schedule Selector's Selected Nights (nights):count is 3`

**Purpose:** Apply special 3-night pricing

---

### Step 7: Set nightly host rate when 4 nights selected

**Condition:** `⛴ Listing Schedule Selector's Selected Nights (nights):count is 4`

**Purpose:** Apply special 4-night pricing

---

### Step 8: Set nightly host rate when 5 nights selected

**Condition:** `⛴ Listing Schedule Selector's Selected Nights (nights):count is 5`

**Purpose:** Apply special 5-night pricing

---

### Step 9: Set nightly host rate when 7 nights selected

**Condition:** `⛴ Listing Schedule Selector's Selected Nights (nights):count is 7`

**Purpose:** Apply special 7-night pricing (typically weekly rate)

---

### Step 10: Calculate nightly rental listing nightly price

**Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Nightly`

**Purpose:** Calculate price for true nightly rentals

**Expected Expression:**
```
Listing Nightly Price = Listing's Nightly Rate * Discount Multiplier * Markup Multiplier
```

---

### Step 11: Calculate 4 week rent - monthly and nightly

**Condition:** None (runs for all)

**Purpose:** Calculate what 4 weeks of rent would cost

**Expected Expression:**
```
4 Week Rent = Listing Nightly Price * 28
```

---

### Step 12: Calculate initial payment

**Condition:** None

**Purpose:** Calculate the initial payment amount required

**Expected Expression:**
```
Initial Payment = Total Reservation Price * Initial Payment Percentage
OR
Initial Payment = First Month Rent + Security Deposit
```

---

### Step 13: Calculate total reservation price

**Condition:** None

**Purpose:** Calculate the final total price for the entire reservation

**Expected Expression:**
```
Total Reservation Price = Listing Nightly Price * Selected Nights:count
```

---

## set price multipliers - 4 Steps

**Workflow ID:** cngxZ0
**Custom Event:** `set price multiplier by rental type (1. monthly, 2. weekly, or 3. nightly) is triggered`
**Parameters:** None

### Step 1: Nightly price multiplier for monthly rental types

**Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Monthly`

**Purpose:** Set the multiplier for converting monthly rate to nightly

**Expected Expression:**
```
Price Multiplier = Selected Nights:count / 30
OR
Price Multiplier = (Selected Nights:count / 30) * Monthly Adjustment Factor
```

**Common Patterns:**
- If selecting 7 nights from a monthly rental: `7/30 = 0.233`
- If selecting 14 nights from a monthly rental: `14/30 = 0.467`

---

### Step 2: Nightly price multiplier for weekly rental types

**Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Weekly`

**Purpose:** Set the multiplier for converting weekly rate to nightly

**Expected Expression:**
```
Price Multiplier = Selected Nights:count / 7
OR
Price Multiplier = (Selected Nights:count / 7) * Weekly Adjustment Factor
```

**Common Patterns:**
- If selecting 3 nights from a weekly rental: `3/7 = 0.429`
- If selecting 7 nights from a weekly rental: `7/7 = 1.0` (full week)

---

### Step 3: Nightly price multiplier for nightly rental types

**Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Nightly`

**Purpose:** Set the multiplier for nightly rentals (typically 1.0)

**Expected Expression:**
```
Price Multiplier = 1.0
OR
Price Multiplier = Some base multiplier
```

---

### Step 4: Nightly price multiplier for nightly rental types (7 nights)

**Condition:** `⛴ Listing Schedule Selector's Listing's rental type is Nightly AND Selected Nights:count is 7`

**Purpose:** Special case for week-long nightly rentals

**Expected Expression:**
```
Price Multiplier = 1.0 * Weekly Discount Factor
OR
Price Multiplier = 0.9 (10% discount for weekly stays in nightly mode)
```

---

## set discounts and markups multiplier - 2 Steps

**Workflow ID:** cnhib0
**Custom Event:** `set discounts and markups multipliers for adding is triggered`

**Parameters:**
- `listing`: Listing (required)
- `number of nights`: number (required)

### Step 1: Set markups and discounts multiplier

**Condition:** None (runs for all)

**Purpose:** Calculate the combined discount/markup multiplier

**Expected Expression:**
```
Markups and Discounts Multiplier =
  (1 - Length of Stay Discount) *
  (1 + Seasonal Markup) *
  (1 - Early Bird Discount) *
  (1 + Last Minute Markup)
```

**Common Discount Factors:**
- Length of stay: 0-20% based on nights
- Seasonal: -20% to +50% based on season
- Early bird: 5-15% for booking in advance
- Last minute: 10-30% markup for last-minute bookings

---

### Step 2: (Corner case) Add weekly markup to markups and discounts multiplier

**Condition:** `listing's rental type is Weekly`

**Purpose:** Apply additional markup for weekly rentals in certain cases

**Expected Expression:**
```
Markups and Discounts Multiplier =
  Previous Multiplier * (1 + Weekly Markup Percentage)
```

---

## set unused nights discount - 8 Steps

**Workflow ID:** cngwk0
**Custom Event:** `set unused nights discount is triggered`

**Parameters:**
- `listing`: Listing (required)
- `number of nights`: number (required)
- `unused nights mult`: number (required)

**Core Concept:** When a user selects fewer nights than the full rental period (monthly or weekly), they get a discount based on the unused nights.

### Calculation Logic:

```
Unused Nights = Total Available Nights - Selected Nights
Unused Nights Discount = Unused Nights * Unused Night Discount Rate
```

### Step 1: Set 0 night discount

**Condition:** `listing's # of nights available - number of nights is 0`

**Purpose:** No discount when all nights are used

**Expression:**
```
Unused Nights Discount = 0
OR
Unused Nights Multiplier = 1.0
```

---

### Step 2: Set 1 night discount

**Condition:** `listing's # of nights available - number of nights is 1`

**Purpose:** Discount for 1 unused night

**Expected Expression:**
```
Unused Nights Multiplier = 1 - (1 * Unused Night Discount Rate)
```

---

### Step 3: Set 2 night discount

**Condition:** `listing's # of nights available - number of nights is 2`

**Expected Expression:**
```
Unused Nights Multiplier = 1 - (2 * Unused Night Discount Rate)
```

---

### Step 4: Set 3 night discount

**Condition:** `listing's # of nights available - number of nights is 3`

**Expected Expression:**
```
Unused Nights Multiplier = 1 - (3 * Unused Night Discount Rate)
```

---

### Step 5: Set 4 night discount

**Condition:** `listing's # of nights available - number of nights is 4`

**Expected Expression:**
```
Unused Nights Multiplier = 1 - (4 * Unused Night Discount Rate)
```

---

### Step 6: Set 5 night discount

**Condition:** `listing's # of nights available - number of nights is 5`

**Expected Expression:**
```
Unused Nights Multiplier = 1 - (5 * Unused Night Discount Rate)
```

---

### Step 7: Set 6 unused nights discount

**Condition:** `listing's # of nights available - number of nights is 6`

**Expected Expression:**
```
Unused Nights Multiplier = 1 - (6 * Unused Night Discount Rate)
```

---

### Step 8: Set full-time discount

**Condition:** `number of nights is 7 AND listing's rental type is not Nightly`

**Purpose:** Special case for full-week usage in monthly/weekly rentals

**Expected Expression:**
```
Unused Nights Multiplier = 1.0 (no discount, using full week)
OR
Unused Nights Multiplier = 0.95 (5% discount for full week booking)
```

---

## calculate days, then sort days and set states - 21 Steps

**Workflow ID:** cnhes0
**Custom Event:** `calculate days, then sort days and set states is triggered`

**Parameters:**
- `parent_group_day`: Days (optional)
- `add`: yes / no (required)
- `remove`: yes / no (required)

**Purpose:** Core state management workflow that handles adding/removing days, sorting, and calculating all derived states

### Step 1: Add day and sort days

**Condition:** `Selected Days:count is not 7 AND add is yes`

**Purpose:** Add the clicked day to Selected Days list and sort

**Expression:**
```
Selected Days = Selected Days:plus item (parent_group_day):sorted by (Day Number)
```

---

### Step 2: Remove the new day and then sort days

**Condition:** `remove is yes`

**Purpose:** Remove the clicked day from Selected Days list and sort

**Expression:**
```
Selected Days = Selected Days:minus item (parent_group_day):sorted by (Day Number)
```

---

### Step 3: Set NOT Selected days and Sort

**Condition:** None

**Purpose:** Calculate which days are NOT selected (inverse list)

**Expression:**
```
Not Selected Days = All Days:minus list (Selected Days):sorted by (Day Number)
```

**Where All Days** = List of 7 days (Monday through Sunday)

---

### Step 4: Set check out day (number) - only when including Sunday

**Condition:** `Selected Days contains Sunday`

**Purpose:** Handle special case when Sunday is selected

**Expression:**
```
Check Out Day Number = (Selected Days:last item's Day Number + 1) modulo 7
```

---

### Step 5: Set check out day

**Condition:** None

**Purpose:** Set the check-out day (day after last selected day)

**Expression:**
```
Check Out Day = Get day from (Selected Days:last item's Day Number + 1)
```

---

### Step 6: (Corner case) Set check out day

**Condition:** `Not Selected Days doesn't contain Sunday`

**Purpose:** Handle edge case for check-out day calculation

---

### Step 7: Set check in day

**Condition:** None

**Purpose:** Set the check-in day (first selected day)

**Expression:**
```
Check In Day = Selected Days:first item
```

---

### Step 8: (Corner case) Set check in day

**Condition:** `Not Selected Days doesn't contain Sunday`

**Purpose:** Handle edge case for check-in day calculation

---

### Step 9: Create list of nights

**Condition:** None

**Purpose:** Create list of nights from selected days (days minus last day = nights)

**Expression:**
```
Selected Nights = Selected Days:sorted by (Day Number):minus last item
```

**Logic:** If you select Mon, Tue, Wed (3 days), you get Mon-Tue night, Tue-Wed night (2 nights)

---

### Step 10: Set start night number

**Condition:** None

**Purpose:** Set the numeric value of the start night

**Expression:**
```
Start Night Number = Selected Nights:first item's Day Number
```

---

### Step 11: (Corner Case) Set start night number

**Condition:** `Not Selected Days doesn't contain Sunday`

**Purpose:** Handle Sunday edge case for start night

---

### Step 12: Set start night (num) _duplicated on purpose

**Condition:** None

**Purpose:** Secondary setting of start night number (intentionally duplicated)

---

### Step 13: (Corner Case) Set start night number _duplicated on purpose

**Condition:** `Not Selected Days doesn't contain Sunday`

**Purpose:** Secondary Sunday edge case handling (intentionally duplicated)

---

### Step 14: Set end night number

**Condition:** None

**Purpose:** Set the numeric value of the end night

**Expression:**
```
End Night Number = Selected Nights:last item's Day Number
```

---

### Step 15: Set end night

**Condition:** None

**Purpose:** Set the end night (last selected night)

**Expression:**
```
End Night = Selected Nights:last item
```

---

### Step 16: Set start day number

**Condition:** None

**Purpose:** Set the numeric value of the start day

**Expression:**
```
Start Day Number = Selected Days:first item's Day Number
```

---

### Step 17: Create unused nights list by removing selected nights

**Condition:** None

**Purpose:** Calculate which nights are unused (for unused nights discount)

**Expression:**
```
Unused Nights = All Nights:minus list (Selected Nights)
```

**Where All Nights** = All 7 nights of the week

---

### Step 18: Set list of days as numbers

**Condition:** None

**Purpose:** Convert Selected Days to list of numbers for calculations

**Expression:**
```
Selected Days As Numbers = Selected Days:each item's Day Number
```

**Result:** [1, 2, 3] for Mon, Tue, Wed

---

### Step 19: Count number of selected nights and set nights number

**Condition:** None

**Purpose:** Count how many nights are selected

**Expression:**
```
Number of Nights = Selected Nights:count
```

---

### Step 20: Set selected nights (num list)

**Condition:** None

**Purpose:** Convert Selected Nights to list of numbers

**Expression:**
```
Selected Nights As Numbers = Selected Nights:each item's Day Number
```

---

### Step 21: Trigger Run JS - Check Contiguity

**Condition:** None

**Purpose:** Run JavaScript to validate contiguous selection

**Action:** Trigger custom event `Run JS - Check Contiguity`

---

## Key Variables Reference

### Custom States

| State Name | Type | Description |
|------------|------|-------------|
| Selected Days | List of Days | Days selected by user (e.g., [Mon, Tue, Wed]) |
| Selected Nights | List of Nights | Nights calculated from days (days - 1) |
| Not Selected Days | List of Days | Days NOT selected (inverse of Selected Days) |
| Unused Nights | List of Nights | Nights not in selection |
| Nightly Host Rate | Number | Base nightly rate from listing |
| Listing Nightly Price | Number | Final calculated nightly price |
| Price Multiplier | Number | Rental type multiplier (monthly/weekly/nightly) |
| Markups and Discounts Multiplier | Number | Combined discount/markup factor |
| Unused Nights Multiplier | Number | Discount for unused nights |
| Total Reservation Price | Number | Total cost = Nightly Price × Nights |
| Initial Payment | Number | First payment required |
| Check In Day | Day | First selected day |
| Check Out Day | Day | Day after last selected day |
| Start Night Number | Number | Numeric value of first night |
| End Night Number | Number | Numeric value of last night |

### Listing Properties

| Property | Type | Description |
|----------|------|-------------|
| rental type | Option Set | Monthly, Weekly, or Nightly |
| Monthly Rate | Number | Monthly rental price |
| Weekly Rate | Number | Weekly rental price |
| Nightly Rate | Number | Nightly rental price |
| # of nights available | Number | Total nights available for rental |
| Minimum Nights | Number | Minimum stay requirement |
| Maximum Nights | Number | Maximum stay allowed |
| Days Available | List of Days | Days that can be selected |
| Days Not Available | List of Days | Blocked days |

---

## Expression Patterns

### Common Bubble Expressions

#### List Operations
```
Add item to list:
Selected Days:plus item (New Day)

Remove item from list:
Selected Days:minus item (Day to Remove)

Remove list from list:
All Days:minus list (Selected Days)

Sort list:
Selected Days:sorted by (Day Number)

Count items:
Selected Days:count

First item:
Selected Days:first item

Last item:
Selected Days:last item

Remove last item:
Selected Days:minus last item

Map list to numbers:
Selected Days:each item's Day Number
```

#### Mathematical Operations
```
Division:
Monthly Rate / 30

Multiplication:
Nightly Rate * Price Multiplier

Addition:
Base Price + Fees

Subtraction:
Total Nights - Used Nights

Modulo:
(Day Number + 1) % 7
```

#### Conditional Logic
```
Only when:
rental type is Monthly
rental type is not Nightly
Selected Nights:count > 5
Selected Days contains Sunday
```

---

## Pricing Formula Summary

### Final Price Calculation (Conceptual):

```javascript
// Step 1: Determine base nightly rate based on rental type
if (rentalType === 'Monthly') {
  nightlyHostRate = (monthlyRate / 30) * priceMultiplier;
} else if (rentalType === 'Weekly') {
  nightlyHostRate = (weeklyRate / 7) * priceMultiplier;
} else if (rentalType === 'Nightly') {
  nightlyHostRate = nightlyRate;
}

// Step 2: Apply special night-count rates
if (selectedNights === 2 || selectedNights === 3 || /* etc */) {
  nightlyHostRate = specialRateForNightCount;
}

// Step 3: Calculate price multiplier
if (rentalType === 'Monthly') {
  priceMultiplier = selectedNights / 30;
} else if (rentalType === 'Weekly') {
  priceMultiplier = selectedNights / 7;
} else {
  priceMultiplier = 1.0;
}

// Step 4: Calculate unused nights discount
unusedNights = totalAvailableNights - selectedNights;
unusedNightsMultiplier = 1 - (unusedNights * unusedNightDiscountRate);

// Step 5: Apply discounts and markups
discountsMarkupsMultiplier =
  (1 - lengthOfStayDiscount) *
  (1 + seasonalMarkup) *
  (1 - earlyBirdDiscount);

// Step 6: Calculate final nightly price
listingNightlyPrice =
  nightlyHostRate *
  priceMultiplier *
  unusedNightsMultiplier *
  discountsMarkupsMultiplier;

// Step 7: Calculate total
totalReservationPrice = listingNightlyPrice * selectedNights;

// Step 8: Calculate initial payment
initialPayment = totalReservationPrice * initialPaymentPercentage;
```

---

## Notes for Complete Expression Extraction

To get the EXACT expressions for each step, you must:

1. Open Bubble.io editor
2. Navigate to the Workflow tab
3. Click on each workflow
4. Click on each step
5. In the property editor panel (right side):
   - Click on the blue dynamic expression text
   - Copy the entire expression
   - Note which custom state is being set
   - Note the element being modified

### Example of What to Capture:

```
Step 3: Calculate monthly rental listing nightly price
Action: Set state
Element: ⛴ Listing Schedule Selector
Custom state: Listing Nightly Price
Value: [DYNAMIC EXPRESSION - Click to see full expression]
  ⛴ Listing Schedule Selector's Nightly Host Rate *
  ⛴ Listing Schedule Selector's Price Multiplier *
  ⛴ Listing Schedule Selector's Unused Nights Multiplier *
  ⛴ Listing Schedule Selector's Markups and Discounts Multiplier
```

---

**Status:** Structural documentation complete. Exact expressions require manual extraction from Bubble editor.

**Priority:** Focus on the 4 critical pricing workflows first, then the calculate days workflow.

**Screenshots Available:** All critical workflows have been screenshotted and saved in `.playwright-mcp/listing-schedule-selector/`
