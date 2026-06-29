import { AppText } from "@/components/ui/appText";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export function CameraLoading({ visible }: { visible: boolean }) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!visible) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Animated.View
      style={{ opacity }}
      className="absolute inset-0 items-center justify-center bg-background"
      pointerEvents={visible ? "auto" : "none"}
    >
      <AppText>Loading Camera...</AppText>
    </Animated.View>
  );
}
