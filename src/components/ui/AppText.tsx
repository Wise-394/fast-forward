import { Text as RNText, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export function AppText({ className, ...props }: TextProps) {
  return (
    <RNText className={twMerge("text-text-primary", className)} {...props} />
  );
}
