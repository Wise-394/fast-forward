import { Directory, File, Paths } from "expo-file-system";

export function saveVideo(uri: string): string {
  const videoDir = new Directory(Paths.document, "videos");
  if (!videoDir.exists) videoDir.create();
  const file = new File(uri);
  const ext = uri.split(".").pop();
  const newPath = new File(videoDir, `video_${Date.now()}.${ext}`);
  file.move(newPath);
  return newPath.uri;
}

export const deleteVideoFile = (filepath: string) => {
  try {
    const file = new File(filepath);
    if (file.exists) file.delete();
  } catch (e) {
    console.warn("Failed to delete video:", e);
  }
};
