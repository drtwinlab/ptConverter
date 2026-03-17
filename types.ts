
export interface ConversionResult {
  hours: number;
  pt: number; // Changed to number to support decimals like 0.5
  timestamp: number;
}

export interface Preset {
  label: string;
  hours: number;
}
