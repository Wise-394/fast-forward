import { useVideoPlayer, VideoView } from "expo-video";
import { View } from "react-native";
import { AppText } from "../ui/appText";

export function VidPreview({ uri }: { uri: string }) {
  if (!uri) return <AppText> Invalid recorded video</AppText>;
  return <VidPlayer uri={uri} />;
}

function VidPlayer({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri);

  return (
    <View className="relative h-[30vh] w-full items-center justify-center rounded-lg bg-text-primary">
      <VideoView
        player={player}
        nativeControls
        style={{ width: "100%", height: "100%", borderRadius: 8 }}
      />
    </View>
  );
}
