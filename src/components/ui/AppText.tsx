import { Text as RNText, TextProps } from "react-native";

export function AppText({ className, ...props }: TextProps) {
  return <RNText className={`text-text-primary ${className}`} {...props} />;
}
