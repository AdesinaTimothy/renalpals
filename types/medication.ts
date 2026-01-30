export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  withDialysis: boolean;
  notification_id?: string;
}