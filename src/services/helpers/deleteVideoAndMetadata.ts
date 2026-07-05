import { VideoMetadataType } from "@/types/types";
import { deleteMetadata } from "../storage/video/metadataQueries";
import { deleteVideoFile } from "../storage/video/saveVideo";

export const deleteVideoAndMetadata = async (metadata: VideoMetadataType) => {
  try {
    deleteVideoFile(metadata.filepath);
    await deleteMetadata(metadata.id);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
