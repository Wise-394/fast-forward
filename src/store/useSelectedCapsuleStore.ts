import { VideoMetadataType } from "@/types/types";
import { create } from "zustand";

interface SelectedCapsuleState {
  metadata: VideoMetadataType | null;
  setMetadata: (metadata: VideoMetadataType) => void;
  clearMetaData: () => void;
}

export const useSelectedCapsuleStore = create<SelectedCapsuleState>()(
  (set) => ({
    metadata: null,
    setMetadata: (metadata) => set({ metadata: metadata }),
    clearMetaData: () => set({ metadata: null }),
  }),
);
