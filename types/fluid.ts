export interface FluidEntry {
  id: string;
  amount: string;
  type: string;
  created_at?: string;
}

export type FluidLimitStore = {
  fluidLimit: number;
  setFluidLimit: (limit: number) => void;
};

export type FluidTakenStore = {
  fluidTakenToday: number;
  setFluidTakenToday: (amount: number) => void;
  resetFluidTakenToday: () => void;
};
