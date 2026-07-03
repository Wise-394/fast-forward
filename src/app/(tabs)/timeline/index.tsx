import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { selectAllVideos } from "@/services/storage/video/videoQueries";
import { VideoMetadataType } from "@/types/types";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export default function Timeline() {
  const [data, setData] = useState<VideoMetadataType[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const metadata = await selectAllVideos();
      setData(metadata);
    };
    loadData();
  }, []);

  return (
    <Screen>
      <AppText className="text-center text-lg">Timeline</AppText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <AppText> {item.title}</AppText>}
        ListEmptyComponent={<AppText>No time capsules yet </AppText>}
      />
    </Screen>
  );
}
