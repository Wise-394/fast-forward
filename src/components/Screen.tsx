import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: React.ReactNode;
}

export default function Screen({ children }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-background p-4 pb-12 ">
      {children}
    </SafeAreaView>
  );
}
