import { VidPreview } from "@/components/features/vidPreview";
import { Screen } from "@/components/Screen";
import { AppDatePicker } from "@/components/ui/AppdatePicker";
import { AppInput } from "@/components/ui/appInput";
import { AppText } from "@/components/ui/appText";
import { BackButton } from "@/components/ui/backButton";
import { AppMultiLine } from "@/components/ui/multiLineInput";
import { WideButton } from "@/components/ui/wideButton";
import { insertMetadata } from "@/services/storage/video/metadataQueries";
import { saveVideo } from "@/services/storage/video/saveVideo";
import { useRecordStore } from "@/store/useRecordStore";
import { VideoMetadataType } from "@/types/types";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function SaveRecording() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const recordedVideo = useRecordStore((state) => state.recordedVideo);
  const [inputFields, setInputFields] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    return () => {
      useRecordStore.getState().cleanUpStore();
    };
  }, []);

  const handleSaveVideo = (): string | null => {
    const video = useRecordStore.getState().recordedVideo;
    if (!video) return null;
    const filePath = saveVideo(video.uri);
    return filePath;
  };

  const handleSaveMetadata = (filePath: string) => {
    const metadata: Omit<VideoMetadataType, "id"> = {
      title: inputFields.title,
      description: inputFields.description,
      createdAt: new Date().toISOString(),
      filepath: filePath,
      unlockDate: date.toISOString(),
    };
    insertMetadata(metadata);
  };

  const handleSave = () => {
    const filePath = handleSaveVideo();
    if (!filePath) return;

    handleSaveMetadata(filePath);
    router.replace("/");
  };

  return (
    <Screen>
      {/* HEADER */}
      <View className="relative flex flex-row items-center justify-center">
        <View className="absolute left-1">
          <BackButton />
        </View>
        <AppText className="text-center text-2xl font-bold">
          New Capsule
        </AppText>
      </View>

      {/* BODY */}
      <View className="mt-5 flex-1 gap-5">
        <VidPreview uri={recordedVideo?.uri ?? ""} />
        <View>
          <AppText>Title</AppText>
          <AppInput
            value={inputFields.title}
            onChange={(text) =>
              setInputFields((state) => ({ ...state, title: text }))
            }
            placeholder="Sample title"
            textAlign="left"
          />
        </View>
        <View>
          <AppText>
            Note to future self
            <AppText className="text-sm text-text-muted"> (Optional)</AppText>
          </AppText>
          <AppMultiLine
            placeholder="Sample"
            multiline={true}
            lines={10}
            value={inputFields.description}
            onchange={(text) =>
              setInputFields((state) => ({ ...state, description: text }))
            }
          />
        </View>
        <View>
          <AppText>Date</AppText>
          <AppDatePicker
            date={date}
            setDate={setDate}
            open={open}
            setOpen={setOpen}
          />
        </View>
      </View>
      <WideButton label="Send to future" onClick={() => handleSave()} />
    </Screen>
  );
}
