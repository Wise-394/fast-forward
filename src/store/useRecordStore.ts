import { CameraView } from "expo-camera";
import { create } from "zustand";

interface RecordStore {
  recordedVideo: { uri: string } | undefined;
  startRecording: (camera: CameraView) => void;
  stopRecording: (camera: CameraView) => void;
}

export const useRecordStore = create<RecordStore>((set) => ({
  recordedVideo: undefined,
  startRecording: async (camera) => {
    try {
      if (!camera) return;
      const video = await camera.recordAsync();
      set({ recordedVideo: video });
    } catch (err) {
      console.error("test"); //TODO ADD ERROR MODAL
    }
  },
  stopRecording: (camera) => {
    if (!camera) return;
    camera.stopRecording();
  },
}));
