import React, { useEffect } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
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
import { Col, Row } from "../common/flex/Flex";
import Txt from "../common/text/Txt";

interface HomeHeaderProps {
  title: string;
  title2?: string;
  selectedId?: number;
  setSelectedId?: (id: number) => void;
}

const HomeHeader = ({
  title,
  title2,
  selectedId,
  setSelectedId,
}: HomeHeaderProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleAlarmPress = () => {
    navigation.navigate("Alarm");
  };

  const handleToggle = () => {
    setSelectedId && setSelectedId(selectedId === 0 ? 1 : 0);
    console.log(selectedId);
  };

  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);

  return (
    <Container>
      <Row gap={30} style={{ width: "auto" }}>
        <ButtonContainer onPress={handleToggle}>
          <Col
            alignItems="center"
            gap={10}
            style={{ width: "auto", marginBottom: -2 }}
          >
            <Txt
              variant={selectedId === 0 ? "mainTitleBold" : "mainTitleLight"}
            >
              {title}
            </Txt>
            {selectedId === 0 && <SelectBar />}
          </Col>
        </ButtonContainer>
        {title2 && (
          <ButtonContainer onPress={handleToggle}>
            <Col
              alignItems="center"
              gap={10}
              style={{ width: "auto", marginBottom: -2 }}
            >
              <Txt
                variant={selectedId === 1 ? "mainTitleBold" : "mainTitleLight"}
              >
                {title2}
              </Txt>
              {selectedId === 1 && <SelectBar />}
            </Col>
          </ButtonContainer>
        )}
      </Row>
      <Row justifyContent="center" gap={15} style={{ width: "auto" }}>
        <AlarmIcon width={20} height={20} style={{ marginBottom: 14 }} onPress={handleAlarmPress} />
        {!title2 && (
          <MenuIcon width={20} height={20} style={{ marginBottom: 14 }} />
        )}
      </Row>
    </Container>
  );
};

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 30px 32px 0 32px;
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
