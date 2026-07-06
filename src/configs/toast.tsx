import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";

const colors = {
  surfaceRaised: "#0a1628",
  primaryBright: "#2a5acc",
  textPrimary: "#d0e8ff",
  textSecondary: "#5a8ab0",
  success: "#60b8ff",
  warning: "#d4aa50",
  danger: "#e05a5a",
};

const toastBaseStyle = {
  backgroundColor: colors.surfaceRaised,
  borderLeftWidth: 4,
  borderRadius: 12,
  height: "auto",
  paddingVertical: 12,
};

const text1Style = {
  fontSize: 15,
  fontWeight: "600" as const,
  color: colors.textPrimary,
};
const text2Style = { fontSize: 13, color: colors.textSecondary };

const iconWrap = { paddingLeft: 12, justifyContent: "center" as const };

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ ...toastBaseStyle, borderLeftColor: colors.success }}
      text1Style={text1Style}
      text2Style={text2Style}
      renderLeadingIcon={() => (
        <View style={iconWrap}>
          <Ionicons name="checkmark-circle" size={22} color={colors.success} />
        </View>
      )}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ ...toastBaseStyle, borderLeftColor: colors.danger }}
      text1Style={text1Style}
      text2Style={text2Style}
      renderLeadingIcon={() => (
        <View style={iconWrap}>
          <Ionicons name="close-circle" size={22} color={colors.danger} />
        </View>
      )}
    />
  ),
  info: (props: any) => (
    <BaseToast
      {...props}
      style={{ ...toastBaseStyle, borderLeftColor: colors.primaryBright }}
      text1Style={text1Style}
      text2Style={text2Style}
      renderLeadingIcon={() => (
        <View style={iconWrap}>
          <Ionicons
            name="information-circle"
            size={22}
            color={colors.primaryBright}
          />
        </View>
      )}
    />
  ),
  warning: (props: any) => (
    <BaseToast
      {...props}
      style={{ ...toastBaseStyle, borderLeftColor: colors.warning }}
      text1Style={text1Style}
      text2Style={text2Style}
      renderLeadingIcon={() => (
        <View style={iconWrap}>
          <Ionicons name="warning" size={22} color={colors.warning} />
        </View>
      )}
    />
  ),
};
