import { CapsuleItem } from "@/components/features/capsuleItem";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { selectAllMetadatas } from "@/services/storage/video/metadataQueries";
import { VideoMetadataType } from "@/types/types";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

export default function Timeline() {
  const [data, setData] = useState<VideoMetadataType[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const metadata = await selectAllMetadatas();
        setData(metadata);
      };
      loadData();
    }, []),
  );

  return (
    <Screen>
      <AppText className="mb-4 text-center text-2xl">Timeline</AppText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CapsuleItem metadata={item} />}
        contentContainerStyle={{ flexGrow: 1, gap: 15 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center">
            <AppText className="text-center">No time capsules yet</AppText>
          </View>
        }
      />
    </Screen>
  );
}
