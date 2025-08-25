import React from "react";
import Colors from "@/src/constants/Colors";
import styled from "styled-components/native";
import HomeDetailHeader from "@/src/components/home/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import DefaultButton from "@/src/components/common/button/DefaultButton";
import Txt from "@/src/components/common/text/Txt";
import DrawingInfoCard from "@/src/components/home/detail/DrawingInfoCard";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import { DrawingInfo } from "@/src/types/post";
import TextAreaField from "@/src/components/common/input/TextAreaField";
import ImageUploader from "@/src/components/common/input/ImgUploader";

type HomeRequestScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "HomeRequest"
>;

function HomeRequest({ route, navigation }: HomeRequestScreenProps) {
  const [requestText, setRequestText] = React.useState("");
  const [referenceImages, setReferenceImages] = React.useState<string[]>([]);
  const [selectedCardId, setSelectedCardId] = React.useState<string | null>(
    null
  );

  const handleButtonPress = () => {
    // [todo] : dummy 네비게이션 수정해야 함
    navigation.navigate("ProfileUpload");
  };

  // const { cardId } = route.params; // You'll use this to fetch data

  // Dummy data
  const cardData: DrawingInfo[] = [
    {
      id: "card_abc_1",
      image: "https://placehold.co/60x60/FFE18D/000000?text=1",
      title: "귀여운 그림",
      price: "1000원",
      description: "30분 예상 / 수정 불가",
    },
    {
      id: "card_abc_2",
      image: "https://placehold.co/60x60/A9C8E8/000000?text=2",
      title: "캐릭터 스케치",
      price: "2500원",
      description: "1시간 예상 / 수정 1회",
    },
  ];

  return (
    <Container style={{ paddingBottom: 10 }}>
      <HomeDetailHeader
        type="request"
        onBackPress={() => navigation.goBack()}
      />
      <StyledScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ContentContainer>
          <Txt variant="mainTitleBold" style={{ marginBottom: 20 }}>
            그림 카드를 선택해주세요
          </Txt>
          {cardData.map((info) => (
            <TouchableOpacity key={info.id}>
              <DrawingInfoCard key={info.id} info={info} />
            </TouchableOpacity>
          ))}

          <Txt
            variant="mainTitleBold"
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            요청 내용을 입력해주세요
          </Txt>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <TextAreaField
                placeholder="텍스트"
                value={requestText}
                maxLength={200}
                onChange={(text) => setRequestText(text)}
              />
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

          <ImageUploader onImagesChange={setReferenceImages} maxImages={5} />
        </ContentContainer>
      </StyledScrollView>

      <FooterContainer>
        <DefaultButton
          title="보내기"
          variant="primary"
          onPress={() => handleButtonPress()}
        />
      </FooterContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.colors.white};
`;

const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

const ContentContainer = styled.View`
  padding: 30px;
`;

const FooterContainer = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 92px;
  padding: 9px 57px;
  padding-bottom: 20px;
  background-color: ${Colors.colors.white};
  border-top-width: 1px;
  border-top-color: #f9f9f9;
`;

export default HomeRequest;