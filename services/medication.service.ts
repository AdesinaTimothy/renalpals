import { fetchMedications } from "@/api/medication";
import { Medication } from "@/types/medication";
import { convertTo24Hour } from "./time";

 
 export const getNextMedication = async ():Promise<Medication | null> => {
    const medications = await fetchMedications();
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    let nextMed = null;
    let smallestDiff = Infinity;

    for (const med of medications) {
      if (!med.time) continue;

      const { hours, minutes } = convertTo24Hour(med.time);

      const medTotalMinutes = hours * 60 + minutes;
      const nowTotalMinutes = currentHour * 60 + currentMinute;
      const diff = medTotalMinutes - nowTotalMinutes;

      if (diff > 0 && diff < smallestDiff) {
        smallestDiff = diff;
        nextMed = med;
      }
    }

    if (!nextMed && medications.length > 0) {
      nextMed = medications[0];
    }

    return nextMed;
  };