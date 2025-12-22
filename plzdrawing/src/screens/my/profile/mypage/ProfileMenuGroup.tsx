import React from "react";
import { View, StyleSheet } from "react-native";
import Txt from "@/src/components/common/text/Txt";
import MenuRow from "@/src/screens/my/profile/mypage/ProfileMenuRow";
import colors from "@/src/constants/Colors";
import { ProfileMenuItem } from "@/src/types/profile";

interface MenuGroupProps {
  title: string;
  items: ProfileMenuItem[];
  showSeparator?: boolean;
}

const MenuGroup = ({ title, items, showSeparator = true }: MenuGroupProps) => {
  return (
    <>
      {showSeparator && <View style={styles.separator} />}
      <Txt variant="auxiliaryTextLight">{title}</Txt>
      {items.map((item) => (
        <MenuRow
          key={item.text}
          text={item.text}
          icon={item.icon}
          onPress={item.onPress}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: colors.colors.seperator,
  },
});

export default MenuGroup;
