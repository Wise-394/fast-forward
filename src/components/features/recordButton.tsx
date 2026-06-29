import { useRef, useState } from "react";
import { Animated, Pressable } from "react-native";

export function RecordButton() {
  const [recording, setRecording] = useState(false);
  const innerScale = useRef(new Animated.Value(1)).current;
  const borderRadius = useRef(new Animated.Value(28)).current;

  function toggleRecord() {
    const toRecording = !recording;
    setRecording(toRecording);

    Animated.parallel([
      Animated.spring(innerScale, {
        toValue: toRecording ? 0.5 : 1,
        useNativeDriver: false,
      }),
      Animated.spring(borderRadius, {
        toValue: toRecording ? 6 : 28,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <Pressable
      onPress={toggleRecord}
      className="w-18 h-18 items-center justify-center rounded-full border-[3px] border-text-primary p-1"
    >
      <Animated.View
        style={{ transform: [{ scale: innerScale }], borderRadius }}
        className="h-14 w-14 bg-danger"
      />
    </Pressable>
  );
}
