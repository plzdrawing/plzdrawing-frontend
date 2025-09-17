import styled from "styled-components/native";
import HomeDetailHeader from "@/src/components/home/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import colors from "@/src/constants/Colors";
import { View, StyleSheet } from "react-native";
import Txt from "@/src/components/common/text/Txt";
import { Col, Row } from "@/src/components/common/flex/Flex";
import ToggleSwitch from "@/src/components/common/button/TogleSwitch";
import { useState } from "react";

type AlarmSettingProps = NativeStackScreenProps<
  RootStackParamList,
  "AlarmSetting"
>;

export default function AlarmSetting({ route, navigation }: AlarmSettingProps) {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isMarketingEnabled, setIsMarketingEnabled] = useState(false);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);

  return (
    <Container>
      <HomeDetailHeader
        title="알림 설정"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 32, marginTop: 36 }}
      >
        <Row style={[styles.rowContainer, { marginBottom: 17 }]}>
          <Txt variant="bodyText">푸시 알림 동의</Txt>
          <ToggleSwitch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
          />
        </Row>
        <View style={styles.separator} />
        <Row style={[styles.rowContainer, { marginTop: 17, marginBottom: 17 }]}>
          <Col style={{ width: "80%" }}>
            <Txt variant="bodyText" style={{ marginBottom: 7 }}>
              광고성 수신 약관 동의
            </Txt>
            <Txt
              variant="auxiliaryTextLight"
              color="dark_gray2"
              style={{ textDecorationLine: "underline" }}
            >
              약관보기
            </Txt>
          </Col>
          <ToggleSwitch
            value={isMarketingEnabled}
            onValueChange={setIsMarketingEnabled}
          />
        </Row>
        <View style={styles.separator} />
        <Row style={[styles.rowContainer, { marginTop: 17, marginBottom: 17 }]}>
          <Col style={{ width: "80%" }}>
            <Txt variant="bodyText" style={{ marginBottom: 7 }}>
              위치 서비스 약관 동의
            </Txt>
            <Txt
              variant="auxiliaryTextLight"
              color="dark_gray2"
              style={{ textDecorationLine: "underline" }}
            >
              약관보기
            </Txt>
          </Col>
          <ToggleSwitch
            value={isLocationEnabled}
            onValueChange={setIsLocationEnabled}
          />
        </Row>
        <View style={styles.separator} />
      </ScrollContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${colors.colors.white};
`;

const ScrollContainer = styled.ScrollView`
  width: 100%;
  flex: 1;
`;

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: colors.colors.seperator,
  },
  rowContainer: {
    justifyContent: "space-between",
    alignItems: "center",
  },
});