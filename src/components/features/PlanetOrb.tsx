import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

export default function PlanetOrb() {
  const rotateOrbit = useRef(new Animated.Value(0)).current;
  const rotateRing = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // orbit dot spinning around
    Animated.loop(
      Animated.timing(rotateOrbit, {
        toValue: 1,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // outer ring slow counter-rotation
    Animated.loop(
      Animated.timing(rotateRing, {
        toValue: 1,
        duration: 20000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // planet glow pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const orbitSpin = rotateOrbit.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const ringSpin = rotateRing.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "-360deg"],
  });

  const glowScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });

  return (
    <View className="h-[55vw] w-[55vw] items-center justify-center">
      {/* outer faint ring */}
      <Animated.View
        style={{ transform: [{ rotate: ringSpin }] }}
        className="absolute h-[55vw] w-[55vw] rounded-full border border-blue-500/20"
      >
        <View className="absolute left-10 top-2 h-1 w-1 rounded-full bg-white" />
        <View className="absolute bottom-3 right-5 h-1 w-1 rounded-full bg-white" />
      </Animated.View>

      {/* inner ring with orbiting dot */}
      <Animated.View
        style={{ transform: [{ rotate: orbitSpin }] }}
        className="absolute h-[48vw] w-[48vw] items-center rounded-full border border-blue-500/40"
      >
        <View className="absolute -top-1 h-2 w-2 rounded-full bg-blue-500" />
      </Animated.View>

      {/* planet with glow pulse */}
      <Animated.View
        style={{ transform: [{ scale: glowScale }] }}
        className="h-[27vw] w-[27vw] items-center justify-center"
      >
        <View className="h-[27vw] w-[27vw] overflow-hidden rounded-full border border-blue-500 bg-blue-950">
          <View className="absolute left-6 top-5 h-6 w-10 rounded-full bg-blue-400/25" />
        </View>
      </Animated.View>
    </View>
  );
}
