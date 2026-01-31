
import { FluidLimitStore, FluidTakenStore } from "@/types/fluid";
import { create } from "zustand";



export const useFluidLimitStore = create<FluidLimitStore>((set) => ({
  fluidLimit: 1500, // default

  setFluidLimit: (fluidLimit: number) =>
    set({ fluidLimit }),
}));

export const useFluidTakenStore = create<FluidTakenStore>((set) => ({
  fluidTakenToday: 0,

  setFluidTakenToday: (amount) =>
    set({ fluidTakenToday: amount }),

  resetFluidTakenToday: () =>
    set({ fluidTakenToday: 0 }),
}));


