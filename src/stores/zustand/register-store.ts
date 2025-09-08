import { create } from "zustand";

interface RegisterState {
  step: 1 | 2 | 3;
  email: string;
  setEmail: (value: string) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  step: 1,
  email: "",
  setEmail: (value: string) => set({ email: value }),
  nextStep: () =>
    set((state) => ({
      step: state.step === 3 ? 3 : ((state.step + 1) as 1 | 2 | 3),
    })),
  previousStep: () =>
    set((state) => ({
      step: state.step === 1 ? 1 : ((state.step - 1) as 1 | 2 | 3),
    })),
  reset: () => set({ step: 1, email: "" }),
}));
