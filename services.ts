// /**

//  * @param time12h - Time string in format "9:00 AM" or "2:30 PM"
//  * @returns Object with hours and minutes in 24-hour format
//  */
// export const convertTo24Hour = (time12h: string): { hours: number; minutes: number } => {

//   const cleanTime = time12h.trim().toUpperCase();
  
//   // Match pattern like "9:00 AM" or "2:30 PM"
//   const match = cleanTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/);
  
//   if (!match) {
//     console.error("Could not parse time:", time12h);
//     return { hours: NaN, minutes: NaN };
//   }
  
//   let hours = parseInt(match[1], 10);
//   const minutes = parseInt(match[2], 10);
//   const modifier = match[3];
  
//   // Convert to 24-hour format
//   if (modifier === "PM" && hours !== 12) {
//     hours += 12;
//   }
//   if (modifier === "AM" && hours === 12) {
//     hours = 0;
//   }

//   return { hours, minutes };
// };

// /**
//  * Converts 24-hour time format to 12-hour format
//  * @param hours - Hour in 24-hour format (0-23)
//  * @param minutes - Minutes (0-59)
//  * @returns Time string in format "9:00 AM"
//  */
// export const convertTo12Hour = (hours: number, minutes: number): string => {
//   const modifier = hours >= 12 ? 'PM' : 'AM';
//   let displayHours = hours % 12;
//   if (displayHours === 0) displayHours = 12; // Convert 0 to 12 for midnight/noon
  
//   const displayMinutes = minutes.toString().padStart(2, '0');
  
//   return `${displayHours}:${displayMinutes} ${modifier}`;
// };