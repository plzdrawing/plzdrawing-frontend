import React, { useState } from "react";
import Colors from "@/src/constants/Colors";
import styled from "styled-components/native";
import HomeDetailHeader from "@/src/components/home/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import DefaultButton from "@/src/components/common/button/DefaultButton";
import Txt from "@/src/components/common/text/Txt";
import ImageUploader from "@/src/components/common/input/ImgUploader";
import TextField from "@/src/components/common/input/TextField";
import AlertModal from "@/src/components/common/modal/AlertModal";

type ProfileUploadScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ProfileUpload"
>;

function ProfileUpload({ route, navigation }: ProfileUploadScreenProps) {
  const [introduceText, setIntroduceText] = useState("");
  const [introduceState, setIntroduceState] = useState("");
  const [keywordText, setKeywordText] = useState("");
  const [keywordState, setKeywordState] = useState("");
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [profileImages, setProfileImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    // [todo] : dummy 네비게이션 수정해야 함
    setModalVisible(false);
    navigation.navigate("DrawingCardUpload");
  };

  const handleButtonPress = () => {
    setModalVisible(true);
  };

  return (
    <Container style={{ paddingBottom: 10 }}>
      <HomeDetailHeader
        type="profileUpload"
        onBackPress={() => navigation.goBack()}
      />
      <StyledScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ContentContainer>
          <ImageUploader
            title="프로필 그림을 올려볼까요?"
            onImagesChange={setProfileImages}
            maxImages={1}
          />
          <Txt
            variant="mainTitleBold"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            간단한 소개를 해볼까요?
          </Txt>
          <TextField
            placeholder="한줄로 나를 어필해볼까요?"
            setState={setIntroduceState}
            value={introduceText}
            onChangeText={setIntroduceText}
          />
          <Txt
            variant="mainTitleBold"
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            해시태그로 자신을 표현해주세요
          </Txt>
          <TextField
            placeholder="키워드로 나를 어필해볼까요?"
            setState={setKeywordState}
            value={keywordText}
            onChangeText={setKeywordText}
          />

          <ImageUploader
            title="그림을 올려볼까요?"
            onImagesChange={setReferenceImages}
            maxImages={5}
          />
        </ContentContainer>
      </StyledScrollView>

      <FooterContainer>
        <DefaultButton
          title="보내기"
          onPress={handleButtonPress}
          variant="primary"
        />
      </FooterContainer>
      {modalVisible && (
        <AlertModal
          title={"프로필 업로드가 완료되었어요!\n그림카드를 업로드해볼까요?"}
          buttonTitle="확인"
          onClick={handleConfirm}
          textVariant="thirdText"
        />
      )}
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

export default ProfileUpload;
