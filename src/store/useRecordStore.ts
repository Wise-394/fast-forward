import { CameraView } from "expo-camera";
import { File } from "expo-file-system";
import { create } from "zustand";

interface RecordStore {
  recordedVideo: { uri: string } | null;
  isRecording: boolean;
  recordPromise: Promise<{ uri: string } | undefined> | null;
  startTime: number | null;
  facing: "front" | "back";
  startRecording: (camera: CameraView | null) => void;
  stopRecording: (camera: CameraView | null) => Promise<void>;
  deleteRecordedVideo: () => void;
  cleanUpStore: () => void;
  toggleFacing: () => void;
}

const MAX_RECORDING_LIMIT = 3600; // 1hour

export const useRecordStore = create<RecordStore>((set, get) => ({
  recordedVideo: null,
  isRecording: false,
  recordPromise: null,
  startTime: null,
  facing: "front",

  startRecording: (camera) => {
    if (!camera || get().isRecording) return;
    const startTime = Date.now();
    set({ isRecording: true, startTime });
    const promise = camera.recordAsync({ maxDuration: MAX_RECORDING_LIMIT });
    set({ recordPromise: promise });
    promise.then((video) => set({ recordedVideo: video, isRecording: false }));
  },

  stopRecording: async (camera) => {
    if (!camera) return;
    camera.stopRecording();
    await get().recordPromise;
  },

  deleteRecordedVideo: () => {
    const video = get().recordedVideo;
    if (!video) return;
    try {
      new File(video.uri).delete();
    } catch (e) {
      console.warn("Failed to delete recorded video:", e);
    }
    set({ recordedVideo: null });
  },

  cleanUpStore: () => {
    get().deleteRecordedVideo();
    set({
      recordedVideo: null,
      isRecording: false,
      recordPromise: null,
      startTime: null,
      facing: "front",
    });
  },
  toggleFacing: () => {
    if (get().isRecording) return;
    set((state) => ({ facing: state.facing === "front" ? "back" : "front" }));
  },
}));
