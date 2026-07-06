import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { AppText } from "../ui/appText";

export function CapsuleMenu({ onDelete }: { onDelete: () => void }) {
  return (
    <Menu
      style={styles.menu}
      renderer={renderers.Popover}
      rendererProps={{
        placement: "bottom",
        anchorStyle: { display: "none" },
      }}
    >
      <MenuTrigger customStyles={{ triggerWrapper: styles.triggerWrapper }}>
        <Ionicons name="ellipsis-vertical" color="white" size={18} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: styles.optionsContainer,
        }}
      >
        <MenuOption
          onSelect={onDelete}
          customStyles={{
            optionWrapper: styles.optionWrapper,
          }}
        >
          <Ionicons name="trash-outline" size={18} color="#ff5c5c" />
          <AppText className="text-base text-danger">Delete</AppText>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  triggerWrapper: {
    padding: 8,
  },
  optionsContainer: {
    backgroundColor: "#161f2e",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#2a3548",
    padding: 6,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  optionWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
