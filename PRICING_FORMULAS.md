# Pricing Formulas and Calculations Reference

**Component:** Listing Schedule Selector
**Date:** 2025-11-08
**Purpose:** Complete reference for all pricing calculations across Monthly, Weekly, and Nightly rental types

---

## Table of Contents

1. [Monthly Rental Calculations](#monthly-rental-calculations)
2. [Weekly Rental Calculations](#weekly-rental-calculations)
3. [Nightly Rental Calculations](#nightly-rental-calculations)
4. [Shared Calculations](#shared-calculations)
5. [ZAT Price Configuration Values](#zat-price-configuration-values)
6. [Reservation Span Periods](#reservation-span-periods)

---

## Monthly Rental Calculations

### Overview
Monthly rentals use a three-step prorated calculation to convert the monthly rate into a nightly price, then apply markups and discounts.

### Step 1: Calculate Monthly Average Nightly Price

```
Monthly Avg Nightly Price = Monthly Host Rate ÷ Average Days Per Month
```

**Example:**
```
Monthly Host Rate: $3,100
Average Days Per Month: 31
Monthly Avg Nightly Price = $3,100 ÷ 31 = $100
```

---

### Step 2: Calculate Average Weekly Price

```
Average Weekly Price = Monthly Avg Nightly Price × 7
```

**Example:**
```
Monthly Avg Nightly Price: $100
Average Weekly Price = $100 × 7 = $700
```

---

### Step 3: Calculate Prorated Nightly Host Rate

```
Nightly Host Rate = Average Weekly Price ÷ Selected Nights Count
```

**Example:**
```
Average Weekly Price: $700
Selected Nights: 3
Nightly Host Rate = $700 ÷ 3 = $233.33
```

---

### Step 4: Calculate Unused Nights Discount

```
Unused Nights = Number of Nights Available - Selected Nights Count
Unused Nights Discount Value = Unused Nights × Unused Nights Discount Multiplier
```

**Example:**
```
Number of Nights Available: 7
Selected Nights: 3
Unused Nights = 7 - 3 = 4
Unused Nights Discount Multiplier: 0.03
Unused Nights Discount Value = 4 × 0.03 = 0.12
```

---

### Step 5: Calculate Markup & Discount Multiplier

```
Markup & Discount Multiplier = Overall Site Markup + Unit Markup - Unused Nights Discount Value + 1
```

**Example:**
```
Overall Site Markup: 0.17
Unit Markup: 0.05
Unused Nights Discount Value: 0.12
Multiplier = 0.17 + 0.05 - 0.12 + 1 = 1.10
```

**Note:** Monthly rentals do NOT include Weekly Markup in this formula.

---

### Step 6: Calculate Total Weekly Price

```
Total Weekly Price = Nightly Host Rate × Selected Nights × Markup & Discount Multiplier
```

**Example:**
```
Nightly Host Rate: $233.33
Selected Nights: 3
Multiplier: 1.10
Total Weekly Price = $233.33 × 3 × 1.10 = $770
```

---

### Step 7: Calculate Price Per Night (Guest-Facing)

```
Price Per Night = Total Weekly Price ÷ Selected Nights
```

**Example:**
```
Total Weekly Price: $770
Selected Nights: 3
Price Per Night = $770 ÷ 3 = $256.67
```

---

### Step 8: Calculate Weekly Schedule Period

Determine the period based on the weekly pattern:

| Pattern | Period Value |
|---------|--------------|
| Every Week | 1 |
| 1 on 1 off / One week on, one week off | 2 |
| 2 on 2 off / Two weeks on, two weeks off | 2 |
| 1 on 3 off / One week on, three weeks off | 4 |

**Example:**
```
Weeks Offered: "Every Week"
Weekly Schedule Period = 1
```

---

### Step 9: Calculate 4-Week Rent

```
4-Week Rent = (Price Per Night × Selected Nights × 4) ÷ Weekly Schedule Period
```

**Example:**
```
Price Per Night: $256.67
Selected Nights: 3
Weekly Schedule Period: 1
4-Week Rent = ($256.67 × 3 × 4) ÷ 1 = $3,080
```

**Example with Period > 1:**
```
Price Per Night: $315
Selected Nights: 3
Weekly Schedule Period: 2 (for "1 on 1 off")
4-Week Rent = ($315 × 3 × 4) ÷ 2 = $1,890
```

---

### Step 10: Calculate Initial Payment

```
Initial Payment = 4-Week Rent + Cleaning Cost + Damage Deposit
```

**Example:**
```
4-Week Rent: $3,080
Cleaning Cost: $150
Damage Deposit: $500
Initial Payment = $3,080 + $150 + $500 = $3,730
```

---

### Step 11: Calculate Total Reservation Price

#### Substep A: Calculate "Actual Weeks During 4 Week"

Based on weekly pattern:

| Pattern | Actual Weeks During 4 Week |
|---------|----------------------------|
| Every Week | 4 |
| 1 on 1 off | 2 |
| 2 on 2 off | 2 |
| 1 on 3 off | 1 |

**Example:**
```
Weeks Offered: "Every Week"
Actual Weeks During 4 Week = 4
```

#### Substep B: Get "4 Weeks per Period" from Reservation Span

See [Reservation Span Periods](#reservation-span-periods) table.

**Example:**
```
Reservation Span: 13 weeks
4 Weeks per Period = 3.25
```

#### Substep C: Calculate "Actual Weeks During Reservation Span"

```
Actual Weeks During Reservation Span = CEILING(Actual Weeks During 4 Week × 4 Weeks per Period)
```

**Example:**
```
Actual Weeks During 4 Week: 4
4 Weeks per Period: 3.25
Actual Weeks During Reservation Span = CEILING(4 × 3.25) = CEILING(13) = 13
```

**Example with "1 on 1 off" pattern:**
```
Actual Weeks During 4 Week: 2
4 Weeks per Period: 3.25
Actual Weeks During Reservation Span = CEILING(2 × 3.25) = CEILING(6.5) = 7
```

#### Substep D: Calculate Total Reservation Price

```
Total Reservation Price = Price Per Night × Selected Nights × Actual Weeks During Reservation Span
```

**Example:**
```
Price Per Night: $256.67
Selected Nights: 3
Actual Weeks During Reservation Span: 13
Total Reservation Price = $256.67 × 3 × 13 = $10,010
```

---

## Weekly Rental Calculations

### Overview
Weekly rentals follow a similar pattern to Monthly rentals but start with the Weekly Host Rate instead of Monthly Host Rate.

### Step 1: Calculate Prorated Nightly Host Rate

```
Nightly Host Rate = Weekly Host Rate ÷ Selected Nights Count
```

**Example:**
```
Weekly Host Rate: $900
Selected Nights: 3
Nightly Host Rate = $900 ÷ 3 = $300
```

**Note:** Unlike earlier implementations, we do NOT divide by 7 first. We prorate directly based on selected nights.

---

### Step 2: Calculate Unused Nights Discount

```
Unused Nights = Number of Nights Available - Selected Nights Count
Unused Nights Discount Value = Unused Nights × Unused Nights Discount Multiplier
```

**Example:**
```
Number of Nights Available: 7
Selected Nights: 3
Unused Nights = 7 - 3 = 4
Unused Nights Discount Multiplier: 0.03
Unused Nights Discount Value = 4 × 0.03 = 0.12
```

---

### Step 3: Calculate Markup & Discount Multiplier

```
Markup & Discount Multiplier = Overall Site Markup + Unit Markup - Unused Nights Discount Value + Weekly Markup + 1
```

**Example:**
```
Overall Site Markup: 0.17
Unit Markup: 0
Unused Nights Discount Value: 0.12
Weekly Markup: 0 (from ZAT config, typically 0)
Multiplier = 0.17 + 0 - 0.12 + 0 + 1 = 1.05
```

**Important:** Weekly rentals INCLUDE Weekly Markup in the multiplier formula (unlike Monthly rentals).

---

### Step 4: Calculate Total Weekly Price

```
Total Weekly Price = Nightly Host Rate × Selected Nights × Markup & Discount Multiplier
```

**Example:**
```
Nightly Host Rate: $300
Selected Nights: 3
Multiplier: 1.05
Total Weekly Price = $300 × 3 × 1.05 = $945
```

---

### Step 5: Calculate Price Per Night (Guest-Facing)

```
Price Per Night = Total Weekly Price ÷ Selected Nights
```

**Example:**
```
Total Weekly Price: $945
Selected Nights: 3
Price Per Night = $945 ÷ 3 = $315
```

---

### Step 6: Calculate Weekly Schedule Period

Same as Monthly rentals (see Monthly Step 8).

**Example:**
```
Weeks Offered: "One week on, one week off"
Weekly Schedule Period = 2
```

---

### Step 7: Calculate 4-Week Rent

```
4-Week Rent = (Price Per Night × Selected Nights × 4) ÷ Weekly Schedule Period
```

**Example:**
```
Price Per Night: $315
Selected Nights: 3
Weekly Schedule Period: 2
4-Week Rent = ($315 × 3 × 4) ÷ 2 = $1,890
```

---

### Step 8: Calculate Initial Payment

```
Initial Payment = 4-Week Rent + Cleaning Cost + Damage Deposit
```

**Example:**
```
4-Week Rent: $1,890
Cleaning Cost: $100
Damage Deposit: $400
Initial Payment = $1,890 + $100 + $400 = $2,390
```

---

### Step 9: Calculate Total Reservation Price

Follows the same logic as Monthly rentals (see Monthly Step 11).

#### Example:

**Given:**
- Price Per Night: $315
- Selected Nights: 3
- Weeks Offered: "One week on, one week off"
- Reservation Span: 13 weeks

**Calculate:**
```
Actual Weeks During 4 Week = 2 (for "1 on 1 off")
4 Weeks per Period = 3.25 (for 13 weeks)
Actual Weeks During Reservation Span = CEILING(2 × 3.25) = CEILING(6.5) = 7
Total Reservation Price = $315 × 3 × 7 = $6,615
```

---

## Nightly Rental Calculations

### Overview
Nightly rentals use the simplest calculation method with direct nightly rates and standard markups/discounts.

### Step 1: Get Nightly Host Rate

Nightly rate is retrieved from the listing's pricing list based on the number of nights selected.

**Lookup Logic:**
1. Check if exact match exists for selected nights count
2. If not, find closest rate for nights ≤ selected nights
3. Fallback to starting nightly price

**Example:**
```
Selected Nights: 3
Pricing List:
  - 2 nights: $120/night
  - 3 nights: $110/night
  - 4 nights: $105/night
  - 5 nights: $100/night
  - 7 nights: $90/night

Nightly Host Rate = $110 (exact match for 3 nights)
```

**Example with no exact match:**
```
Selected Nights: 6
Pricing List (same as above)
Nightly Host Rate = $100 (closest rate ≤ 6 nights is the 5-night rate)
```

---

### Step 2: Calculate Base Price

```
Base Price = Nightly Host Rate × Selected Nights
```

**Example:**
```
Nightly Host Rate: $110
Selected Nights: 3
Base Price = $110 × 3 = $330
```

---

### Step 3: Calculate Discounts

#### Full-Time Discount (7 nights only)

```
IF Selected Nights = 7 THEN
  Full-Time Discount = Base Price × Full Time Discount Rate
ELSE
  Full-Time Discount = 0
```

**Example:**
```
Selected Nights: 7
Base Price: $630
Full Time Discount Rate: 0.13
Full-Time Discount = $630 × 0.13 = $81.90
```

**Note:** Nightly rentals do NOT get unused nights discount (only Monthly/Weekly get this).

---

### Step 4: Calculate Price After Discounts

```
Price After Discounts = Base Price - Total Discounts
```

**Example:**
```
Base Price: $630
Total Discounts: $81.90
Price After Discounts = $630 - $81.90 = $548.10
```

---

### Step 5: Calculate Markups

#### Site Markup

```
Site Markup = Price After Discounts × Overall Site Markup
```

**Example:**
```
Price After Discounts: $548.10
Overall Site Markup: 0.17
Site Markup = $548.10 × 0.17 = $93.18
```

**Note:** Nightly rentals do NOT apply Weekly Price Adjust.

---

### Step 6: Calculate Total Price

```
Total Price = Base Price - Total Discounts + Total Markups
```

**Example:**
```
Base Price: $630
Total Discounts: $81.90
Total Markups: $93.18
Total Price = $630 - $81.90 + $93.18 = $641.28
```

---

### Step 7: Calculate Price Per Night (Guest-Facing)

```
Price Per Night = Total Price ÷ Selected Nights
```

**Example:**
```
Total Price: $641.28
Selected Nights: 7
Price Per Night = $641.28 ÷ 7 = $91.61
```

---

### Step 8: Calculate 4-Week Rent

```
4-Week Rent = Price Per Night × Selected Nights × 4
```

**Example:**
```
Price Per Night: $91.61
Selected Nights: 7
4-Week Rent = $91.61 × 7 × 4 = $2,565.08
```

**Note:** Nightly rentals typically have "Every Week" pattern (period = 1), so no period division is needed. If a Nightly rental has a different pattern, the division would apply:

```
4-Week Rent = (Price Per Night × Selected Nights × 4) ÷ Weekly Schedule Period
```

---

### Step 9: Calculate Initial Payment

```
Initial Payment = 4-Week Rent + Cleaning Cost + Damage Deposit
```

**Example:**
```
4-Week Rent: $2,565.08
Cleaning Cost: $75
Damage Deposit: $300
Initial Payment = $2,565.08 + $75 + $300 = $2,940.08
```

---

### Step 10: Calculate Total Reservation Price

Follows the same logic as Monthly/Weekly rentals (see Monthly Step 11).

**Note:** Nightly rentals typically have "Every Week" pattern, resulting in:
- Actual Weeks During 4 Week = 4
- Actual Weeks During Reservation Span = 4 × (4 weeks per period from option set)

**Example:**
```
Price Per Night: $91.61
Selected Nights: 7
Reservation Span: 13 weeks
4 Weeks per Period: 3.25
Actual Weeks During 4 Week: 4 (Every Week pattern)
Actual Weeks During Reservation Span = CEILING(4 × 3.25) = CEILING(13) = 13
Total Reservation Price = $91.61 × 7 × 13 = $8,337.71
```

---

## Shared Calculations

### Weekly Schedule Period Detection

Used by all rental types to determine the period value for 4-week rent and total reservation calculations.

**Pattern Matching (Case-Insensitive):**

| Pattern String | Period Value |
|----------------|--------------|
| "Every Week" | 1 |
| "One week on" AND "one week off" | 2 |
| "1 on 1 off" | 2 |
| "1on1off" | 2 |
| "1 week on" AND "1 week off" | 2 |
| "Two weeks on" AND "two weeks off" | 2 |
| "2 on 2 off" | 2 |
| "2on2off" | 2 |
| "2 week on" AND "2 week off" | 2 |
| "One week on" AND "three weeks off" | 4 |
| "1 on 3 off" | 4 |
| "1on3off" | 4 |
| "1 week on" AND "3 week off" | 4 |

**Code Implementation:**
```typescript
const weeksOfferedLower = weeksOffered.toLowerCase();
let weeklySchedulePeriod = 1; // Default

if (weeksOfferedLower.includes('one week on') && weeksOfferedLower.includes('one week off') ||
    weeksOfferedLower.includes('1 on 1 off') || weeksOfferedLower.includes('1on1off') ||
    weeksOfferedLower.includes('1 week on') && weeksOfferedLower.includes('1 week off')) {
  weeklySchedulePeriod = 2;
} else if (weeksOfferedLower.includes('two week') && weeksOfferedLower.includes('two week') ||
           weeksOfferedLower.includes('2 on 2 off') || weeksOfferedLower.includes('2on2off') ||
           weeksOfferedLower.includes('2 week on') && weeksOfferedLower.includes('2 week off')) {
  weeklySchedulePeriod = 2;
} else if (weeksOfferedLower.includes('1 on 3 off') || weeksOfferedLower.includes('1on3off') ||
           weeksOfferedLower.includes('one week on') && weeksOfferedLower.includes('three week') ||
           weeksOfferedLower.includes('1 week on') && weeksOfferedLower.includes('3 week off')) {
  weeklySchedulePeriod = 4;
}
```

---

### Actual Weeks During 4 Week Calculation

Used in total reservation price calculation for all rental types.

**Based on Weekly Pattern:**

| Pattern | Actual Weeks During 4 Week | Explanation |
|---------|----------------------------|-------------|
| Every Week | 4 | Present all 4 weeks |
| 1 on 1 off | 2 | Present 2 weeks out of 4 |
| 2 on 2 off | 2 | Present 2 weeks out of 4 |
| 1 on 3 off | 1 | Present 1 week out of 4 |

**Code Implementation:**
```typescript
let actualWeeksDuring4Week = 4; // Default for "Every Week"

if (weeksOfferedLower.includes('one week on') && weeksOfferedLower.includes('one week off') ||
    weeksOfferedLower.includes('1 on 1 off') || weeksOfferedLower.includes('1on1off')) {
  actualWeeksDuring4Week = 2;
} else if (weeksOfferedLower.includes('two week') && weeksOfferedLower.includes('two week') ||
           weeksOfferedLower.includes('2 on 2 off') || weeksOfferedLower.includes('2on2off')) {
  actualWeeksDuring4Week = 2;
} else if (weeksOfferedLower.includes('1 on 3 off') || weeksOfferedLower.includes('1on3off') ||
           weeksOfferedLower.includes('one week on') && weeksOfferedLower.includes('three week')) {
  actualWeeksDuring4Week = 1;
}
```

---

## ZAT Price Configuration Values

These are global configuration values fetched from Bubble's `zat-price_configuration` data type.

### Default Values:

| Field | Default Value | Description |
|-------|---------------|-------------|
| Unused Nights Discount Multiplier | 0.03 | Applied per unused night for Monthly/Weekly |
| Weekly Price Adjust | 0 | Additional markup for Weekly rentals |
| Overall Site Markup | 0.17 | Global markup (17%) applied to all rentals |
| Average Days Per Month | 31 | Used in Monthly prorated calculations |
| Full Time Discount | 0.13 | Discount for 7-night Nightly rentals (13%) |

### Fetched from Bubble:

```typescript
const zatConfig = {
  unusedNightsDiscountMultiplier: config['Unused nights discount multiplier'] || 0.03,
  weeklyPriceAdjust: config['Weekly Price Adj'] || 0,
  overallSiteMarkup: config['Overall Site Markup'] || 0.17,
  averageDaysPerMonth: config['Average days per month'] || 31,
  fullTimeDiscount: config['Full Time (7 Nights)'] || 0.13
};
```

---

## Reservation Span Periods

These values map reservation span (in weeks) to the "4 Weeks per Period (rent cycle)" values from Bubble's option set.

### Mapping Table:

| Reservation Span (Weeks) | 4 Weeks per Period | Months (Approx) |
|--------------------------|-------------------|-----------------|
| 6 | 1.5 | ~1.5 months |
| 7 | 1.75 | ~1.75 months |
| 8 | 2 | 2 months |
| 9 | 2.25 | ~2.25 months |
| 10 | 2.5 | ~2.5 months |
| 12 | 3 | 3 months |
| 13 | 3.25 | ~3.25 months |
| 16 | 4 | 4 months |
| 17 | 4.25 | ~4.25 months |
| 20 | 5 | 5 months |
| 22 | 5.5 | ~5.5 months |
| 26 | 6.5 | 6 months |

### Code Implementation:

```typescript
const RESERVATION_SPAN_PERIODS: Record<number, number> = {
  6: 1.5,
  7: 1.75,
  8: 2,
  9: 2.25,
  10: 2.5,
  12: 3,
  13: 3.25,
  16: 4,
  17: 4.25,
  20: 5,
  22: 5.5,
  26: 6.5
};

const fourWeeksPerPeriod = RESERVATION_SPAN_PERIODS[reservationSpanWeeks] || (reservationSpanWeeks / 4);
```

### Usage in Calculation:

```
Actual Weeks During Reservation Span = CEILING(Actual Weeks During 4 Week × 4 Weeks per Period)
```

**Example:**
```
Reservation Span: 13 weeks
4 Weeks per Period: 3.25
Actual Weeks During 4 Week: 4 (Every Week)
Actual Weeks During Reservation Span = CEILING(4 × 3.25) = CEILING(13) = 13
```

---

## Quick Reference: Calculation Differences

### Monthly vs Weekly vs Nightly

| Calculation | Monthly | Weekly | Nightly |
|-------------|---------|--------|---------|
| **Base Rate Source** | Monthly Host Rate | Weekly Host Rate | Nightly Price List |
| **Prorated Rate** | (Monthly/31 × 7) / Nights | Weekly / Nights | Lookup by nights count |
| **Unused Nights Discount** | ✅ Yes | ✅ Yes | ❌ No |
| **Weekly Markup in Multiplier** | ❌ No | ✅ Yes | ❌ No |
| **Full-Time Discount (7 nights)** | ❌ No | ❌ No | ✅ Yes |
| **Site Markup Applied** | ✅ Yes (in multiplier) | ✅ Yes (in multiplier) | ✅ Yes (separately) |
| **Period Division (4-week rent)** | ✅ Yes | ✅ Yes | ✅ Yes (if not Every Week) |
| **Typical Weekly Pattern** | Varies | Varies | Every Week |

---

## Implementation File Reference

All calculations are implemented in:
**`src/utils/priceCalculations.ts`**

### Key Functions:

- **`calculatePrice()`** - Main pricing engine (lines 3-212)
  - Monthly: lines 32-131
  - Weekly: lines 46-131 (shares logic with Monthly)
  - Nightly: lines 52-56 (rate), 134-211 (calculations)

- **`calculateTotalReservationPrice()`** - Total reservation calculation (lines 234-287)

- **`getMonthlyRate()`** - Extract monthly rate (lines 289-291)

- **`getWeeklyRate()`** - Extract weekly rate (lines 293-295)

- **`getNightlyRateForNights()`** - Nightly rate lookup (lines 297-338)

---

## End of Documentation

**Last Updated:** 2025-11-08
**Version:** 1.0
**Status:** Complete and verified against Bubble.io implementation

For questions or updates, refer to the source code or Bubble workflows.
