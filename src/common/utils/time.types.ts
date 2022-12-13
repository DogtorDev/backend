export const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export interface WorkingHour {
  day: string;
  from: string;
  to: string;
}

export interface AvailableTime {
  days: WorkingHour[];
  timezone: string;
}
