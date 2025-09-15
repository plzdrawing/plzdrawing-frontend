import React from "react";
import { TouchableOpacity } from "react-native";
import { Row } from "@/src/components/common/flex/Flex";
import Txt from "@/src/components/common/text/Txt";
import { ProfileMenuItem } from "@/src/types/profile";

const MenuRow = ({ text, icon, onPress }: ProfileMenuItem) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Row>
        {icon}
        <Txt variant="bodySubText" style={{ marginLeft: icon ? 17 : 0 }}>
          {text}
        </Txt>
      </Row>
    </TouchableOpacity>
  );
};

export default MenuRow;
