import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
import { AppText } from "../ui/appText";

export function FutureNotes({ description }: { description: string }) {
  return (
    <View className="rounded-2xl border border-blue-500/30 bg-[#0d1a3a] shadow-lg">
      <View className="flex-row items-center gap-2 p-2">
        <Ionicons name="mail-open-outline" size={20} color="#93c5fd" />
        <AppText className="text-xs font-semibold uppercase tracking-wide text-blue-300">
          A message from your past self
        </AppText>
      </View>

      <View className="rounded-xl border border-blue-500/10 bg-[#0a1230] p-4">
        <AppText className="font-mono text-sm leading-6 text-blue-100">
          {description}
        </AppText>
      </View>
    </View>
  );
}
