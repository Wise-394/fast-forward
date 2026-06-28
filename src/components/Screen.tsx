import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

export function Screen({ children }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-background p-4">{children}</SafeAreaView>
  );
}
