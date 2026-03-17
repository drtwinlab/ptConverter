
import { Preset } from './types';

export const HOURS_PER_PT = 8;
export const HOURS_PER_WEEK = 40;

export const PRESETS: Preset[] = [
  { label: 'Half Day', hours: 4 },
  { label: 'Full Day', hours: 8 },
  { label: 'Full Week', hours: 40 },
  { label: 'Sprint (2 Weeks)', hours: 80 },
  { label: 'Month (Avg)', hours: 160 },
];
