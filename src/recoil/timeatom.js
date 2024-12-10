import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

// Create an instance of recoilPersist
const { persistAtom } = recoilPersist();

export const timeAtom = atom({
  key: "time",  // Unique ID for this atom
  default: {
    mode: '',
    selectedSlot: null
  },
  effects_UNSTABLE: [persistAtom],  // This will persist the atom state
});
