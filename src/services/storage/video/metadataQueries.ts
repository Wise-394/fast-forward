import { getDb } from "@/configs/Sqlite";
import { VideoMetadataType } from "@/types/types";

export const insertMetadata = async (
  video: Omit<VideoMetadataType, "id" | "createdAt">,
) => {
  try {
    const db = await getDb();
    await db.runAsync(
      `INSERT INTO videos(title, description, file_path, unlock_date, created_at) VALUES(?, ?, ?,?, ?)`,
      [
        video.title,
        video.description,
        video.filepath,
        video.unlockDate,
        new Date().toISOString(),
      ],
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const selectAllMetadatas = async (): Promise<VideoMetadataType[]> => {
  try {
    const db = await getDb();
    const rows = await db.getAllAsync<any>(
      "SELECT * FROM videos ORDER BY unlock_date DESC",
    );
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      filepath: row.file_path,
      unlockDate: row.unlock_date,
      createdAt: row.created_at,
    }));
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const selectMetadata = async (
  id: number,
): Promise<VideoMetadataType | null> => {
  try {
    const db = await getDb();
    const row = await db.getFirstAsync<any>(
      "SELECT * FROM videos WHERE id = ?",
      [id],
    );
    if (!row) return null;

    return {
      id: row.id,
      title: row.title,
      description: row.description,
      filepath: row.file_path,
      unlockDate: row.unlock_date,
      createdAt: row.created_at,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteMetadata = async (id: number) => {
  try {
    const db = await getDb();
    const result = await db.runAsync("DELETE FROM videos WHERE id = ?", [id]);
    return result;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const deleteAllMetadatas = async () => {
  try {
    const db = await getDb();
    await db.runAsync("DELETE FROM videos");
  } catch (err) {
    console.error(err);
    throw err;
  }
};
