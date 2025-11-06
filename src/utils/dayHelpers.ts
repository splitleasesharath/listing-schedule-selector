import { Day, DayOfWeek, Night } from '../types';

export const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const DAY_LETTERS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
export const DAY_ABBREV = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const createDay = (dayOfWeek: DayOfWeek, isAvailable = true): Day => {
  const nextDay = ((dayOfWeek + 1) % 7) as DayOfWeek;
  const previousNight = ((dayOfWeek - 1 + 7) % 7) as DayOfWeek;
  return {
    id: `day-${dayOfWeek}`,
    name: DAY_NAMES[dayOfWeek],
    dayOfWeek,
    singleLetter: DAY_LETTERS[dayOfWeek],
    first3Letters: DAY_ABBREV[dayOfWeek],
    bubbleNumber: dayOfWeek,
    bubbleNumberText: dayOfWeek.toString(),
    nextDay,
    previousNight,
    associatedNight: dayOfWeek,
    isAvailable
  };
};

export const sortDays = (days: Day[]): Day[] => {
  return [...days].sort((a, b) => a.dayOfWeek - b.dayOfWeek);
};

export const getNextDay = (day: Day): Day => {
  const nextDayOfWeek = ((day.dayOfWeek + 1) % 7) as DayOfWeek;
  return createDay(nextDayOfWeek);
};

export const createAllDays = (availableDays: DayOfWeek[] = [0, 1, 2, 3, 4, 5, 6]): Day[] => {
  return Array.from({ length: 7 }, (_, i) => {
    const dayOfWeek = i as DayOfWeek;
    return createDay(dayOfWeek, availableDays.includes(dayOfWeek));
  });
};

export const createNight = (nightNumber: DayOfWeek): Night => {
  const nextDay = ((nightNumber + 1) % 7) as DayOfWeek;
  const nextNight = ((nightNumber + 1) % 7) as DayOfWeek;
  const previousDay = ((nightNumber - 1 + 7) % 7) as DayOfWeek;
  return {
    id: `night-${nightNumber}`,
    name: DAY_NAMES[nightNumber],
    nightNumber,
    bubbleNumber: nightNumber,
    bubbleNumberText: nightNumber.toString(),
    associatedCheckin: nightNumber,
    associatedCheckout: nextDay,
    nextDay,
    nextNight,
    previousDay,
    sameDay: nightNumber,
    first3Letters: DAY_ABBREV[nightNumber],
    singleLetter: DAY_LETTERS[nightNumber]
  };
};

export const createNightsFromDays = (days: Day[]): Night[] => {
  if (days.length < 2) return [];
  const sortedDays = sortDays(days);
  const nights: Night[] = [];
  for (let i = 0; i < sortedDays.length - 1; i++) {
    nights.push(createNight(sortedDays[i].dayOfWeek));
  }
  return nights;
};

export const getUnusedNights = (allNights: Night[], selectedNights: Night[]): Night[] => {
  const selectedIds = new Set(selectedNights.map(n => n.nightNumber));
  return allNights.filter(night => !selectedIds.has(night.nightNumber));
};

export const getNotSelectedDays = (allDays: Day[], selectedDays: Day[]): Day[] => {
  const selectedIds = new Set(selectedDays.map(d => d.dayOfWeek));
  return allDays.filter(day => !selectedIds.has(day.dayOfWeek));
};
