import { CameraView } from "expo-camera";
import { File } from "expo-file-system";
import { create } from "zustand";

interface RecordStore {
  recordedVideo: { uri: string } | null;
  isRecording: boolean;
  recordPromise: Promise<{ uri: string } | undefined> | null;
  startRecording: (camera: CameraView | null) => void;
  stopRecording: (camera: CameraView | null) => Promise<void>;
  deleteRecordedVideo: () => void;
}

export const useRecordStore = create<RecordStore>((set, get) => ({
  recordedVideo: null,
  isRecording: false,
  recordPromise: null,

  startRecording: (camera) => {
    if (!camera) return;
    set({ isRecording: true });
    const promise = camera.recordAsync();
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
    new File(video.uri).delete();
    set({ recordedVideo: null });
  },
}));
