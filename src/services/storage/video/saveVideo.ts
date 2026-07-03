import { Directory, File, Paths } from "expo-file-system";

export function saveVideo(uri: string): string {
  try {
    const videoDir = new Directory(Paths.document, "videos");
    if (!videoDir.exists) videoDir.create();
    const file = new File(uri);
    const ext = uri.split(".").pop();
    const newPath = new File(videoDir, `video_${Date.now()}.${ext}`);
    file.move(newPath);
    return newPath.uri;
  } catch (err) {
    console.error("Failed to save video:", err);
    throw err;
  }
}

export const deleteVideoFile = (filepath: string) => {
  try {
    const file = new File(filepath);
    if (file.exists) file.delete();
  } catch (err) {
    console.error("Failed to delete video:", err);
    throw err;
  }
};
