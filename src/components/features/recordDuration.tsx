import { useRecordStore } from "@/store/useRecordStore";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { formatDuration } from "../../services/helpers/formatDuration";
import { AppText } from "../ui/appText";

export function RecordDuration() {
  const isRecording = useRecordStore((state) => state.isRecording);
  const startTime = useRecordStore((state) => state.startTime);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isRecording || !startTime) {
      setElapsed(0);
      return;
    }

    setElapsed((Date.now() - startTime) / 1000);
    const id = setInterval(() => {
      setElapsed((Date.now() - startTime) / 1000);
    }, 500);

    return () => clearInterval(id);
  }, [isRecording, startTime]);

  return (
    <View className="flex-row items-center gap-1.5">
      {isRecording && (
        <>
          <View className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <AppText className="text-lg">{formatDuration(elapsed)}</AppText>
        </>
      )}
    </View>
  );
}
