import { TextInput } from "react-native";

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  textAlign?: "center" | "left" | "right";
}

export function AppInput({
  placeholder,
  value,
  onChange,
  textAlign = "center",
}: Props) {
  return (
    <TextInput
      textAlign={textAlign}
      value={value}
      onChangeText={onChange}
      placeholder={placeholder ?? ""}
      defaultValue=""
      className="rounded-lg bg-surface-raised p-5 text-lg text-text-primary placeholder:text-text-muted"
    />
  );
}
