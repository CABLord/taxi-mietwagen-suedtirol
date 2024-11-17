
export function calculateFare(distance: number): number {
  const baseRate = 3.50; // Base rate in euros
  const ratePerKm = 2.00; // Rate per kilometer in euros
  
  return baseRate + (distance * ratePerKm);
}
