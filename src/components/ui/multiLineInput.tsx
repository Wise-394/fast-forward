import { TextInput } from "react-native";

interface Props {
  value?: string;
  onchange?: (text: string) => void;
  placeholder: string;
  lines?: number;
  multiline?: boolean;
}

export function AppMultiLine({
  value,
  onchange,
  placeholder,
  lines = 1,
  multiline,
}: Props) {
  const lineHeight = 24;
  return (
    <TextInput
      value={value}
      onChangeText={onchange}
      multiline={multiline ?? false}
      numberOfLines={lines}
      placeholder={placeholder}
      textAlignVertical="top"
      style={{ minHeight: lineHeight * lines }}
      className="rounded-lg bg-surface-raised p-5 text-lg text-text-primary placeholder:text-text-muted"
    />
  );
}
