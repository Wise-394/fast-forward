import { CapsuleItem } from "@/components/features/capsuleItem";
import { Screen } from "@/components/Screen";
import { AppText } from "@/components/ui/appText";
import { WideButton } from "@/components/ui/wideButton";
import { selectAllMetadatas } from "@/services/storage/video/metadataQueries";
import { VideoMetadataType } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, View } from "react-native";

export default function Timeline() {
  const [data, setData] = useState<VideoMetadataType[]>([]);

  const handleDeleted = (id: number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRedirect = () => {
    router.replace("/");
  };

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
      <AppText className="mb-4 text-center text-2xl font-bold">
        Video Messages
      </AppText>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CapsuleItem metadata={item} onDeleted={handleDeleted} />
        )}
        contentContainerStyle={{ flexGrow: 1, gap: 15 }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center gap-3 px-8">
            <View className="mb-2 h-20 w-20 items-center justify-center rounded-full bg-surface-raised">
              <Ionicons name="mail-open-outline" size={36} color="#2a5acc" />
            </View>
            <AppText className="text-center text-lg font-semibold text-text-primary">
              No video messages yet
            </AppText>
            <AppText className="mb-4 text-center text-text-muted">
              Record a message for your future self and it'll show up here.
            </AppText>
            <WideButton label="Record Video" onClick={() => handleRedirect()} />
          </View>
        }
      />
    </Screen>
  );
}
