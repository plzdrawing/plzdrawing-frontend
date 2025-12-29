import tw from '@/src/lib/tailwind';

import React, { useEffect } from "react";
import styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";
import {
  AlarmIcon,
  BackArrowIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
} from "@/assets/images";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/ui/Txt";

interface HomeHeaderProps {
  title: string;
  title2?: string;
  selectedId?: number;
  setSelectedId?: (id: number) => void;
  onProfilePress?: () => void;
  onSettingsPress?: () => void;
}

const HomeHeader = ({
  title,
  title2,
  selectedId,
  setSelectedId,
  onProfilePress,
  onSettingsPress,
}: HomeHeaderProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleAlarmPress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      navigation.navigate("Alarm");
    }
  };

  const handleMenuPress = () => {
    if (onSettingsPress) {
      onSettingsPress();
    }
  };

  return (
    <Container>
      <View style={tw`flex-row gap-[30px]`} >
        <ButtonContainer onPress={() => setSelectedId && setSelectedId(0)}>
          <View style={tw`items-center gap-[10px] w-auto mb-[-2px]`}>
            <Txt
              variant={selectedId === 0 ? "mainTitleBold" : "mainTitleLight"}
            >
              {title}
            </Txt>
            {selectedId === 0 && <SelectBar />}
          </View>
        </ButtonContainer>
        {title2 && (
          <ButtonContainer onPress={() => setSelectedId && setSelectedId(1)}>
            <View style={tw`items-center gap-[10px] w-auto mb-[-2px]`}>
              <Txt
                variant={selectedId === 1 ? "mainTitleBold" : "mainTitleLight"}
              >
                {title2}
              </Txt>
              {selectedId === 1 && <SelectBar />}
            </View>
          </ButtonContainer>
        )}
      </View>
      <View style={tw`justify-center gap-15 w-auto`}>
        <TouchableOpacity onPress={handleAlarmPress}>
          <AlarmIcon width={20} height={20} style={{ marginBottom: 14 }} />
        </TouchableOpacity>
        {!title2 && (
          <TouchableOpacity onPress={handleMenuPress}>
            <MenuIcon width={20} height={20} style={{ marginBottom: 14 }} />
          </TouchableOpacity>
        )}
      </View>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 32px 0 32px;
  background-color: #fff;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.colors.seperator};
`;

const SelectBar = styled.View`
  width: 70px;
  height: 2px;
  background-color: ${Colors.colors.black};
  border-radius: 2px;
`;

const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HomeHeader;
