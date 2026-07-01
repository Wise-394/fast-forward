import { useRecordStore } from "@/store/useRecordStore";
import { useVideoPlayer, VideoView } from "expo-video";
import { View } from "react-native";
import { AppText } from "../ui/appText";

export function VidPreview() {
  const recordedVideo = useRecordStore((state) => state.recordedVideo);

  if (!recordedVideo) return <AppText> Invalid recorded video</AppText>;
  return <VidPlayer uri={recordedVideo.uri} />;
}

function VidPlayer({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri);
  return (
    <View className="relative h-[30%] w-full items-center justify-center rounded-lg bg-text-primary">
      <VideoView
        player={player}
        nativeControls
        style={{ width: "100%", height: "100%", borderRadius: 10 }}
      />
    </View>
  );
}
