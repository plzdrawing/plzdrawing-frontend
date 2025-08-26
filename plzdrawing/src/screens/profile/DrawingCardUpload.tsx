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
import { Row } from "@/src/components/common/flex/Flex";

type DrawingCardUploadScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "DrawingCardUpload"
>;

function DrawingCardUpload({
  route,
  navigation,
}: DrawingCardUploadScreenProps) {
  const [titleText, setTitleText] = useState("");
  const [titleState, setTitleState] = useState("");
  const [introduceText, setIntroduceText] = useState("");
  const [introduceState, setIntroduceState] = useState("");
  const [hashtagText, setHashtagText] = useState("");
  const [hashtagState, setHashtagState] = useState("");
  const [priceText, setPriceText] = useState("");
  const [priceState, setPriceState] = useState("");  
  const [timeText, setTimeText] = useState("");
  const [timeState, setTimeState] = useState("");
  const [referenceImages, setReferenceImages] = useState<string[]>([]);

  const filterList = ["수정불가", "수정가능"];
  const [filter, setFilter] = useState<string>("");

  return (
    <Container style={{ paddingBottom: 10 }}>
      <HomeDetailHeader
        type="drawingCardUpload"
        onBackPress={() => navigation.goBack()}
      />
      <StyledScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <ContentContainer>
          <Txt
            variant="mainTitleBold"
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            제목을 정해볼까요?
          </Txt>
          <TextField
            placeholder="제목을 작성해주세요"
            setState={setTitleState}
            value={titleText}
            onChangeText={setTitleText}
          />
          <Txt
            variant="mainTitleBold"
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            간단한 소개를 해볼까요?
          </Txt>
          <TextField
            placeholder="한줄로 그림 스타일을 소개해주세요"
            setState={setIntroduceState}
            value={introduceText}
            onChangeText={setIntroduceText}
          />
          <Txt
            variant="mainTitleBold"
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            해시태그로 표현해볼까요?
          </Txt>
          <TextField
            placeholder="#그림스타일 #해시태그작성"
            setState={setHashtagState}
            value={hashtagText}
            onChangeText={setHashtagText}
          />
          <Txt
            variant="mainTitleBold"
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            예상 금액을 작성해주세요
          </Txt>
          <TextField
            placeholder="예상금액을 작성해주세요"
            setState={setPriceState}
            value={priceText}
            onChangeText={setPriceText}
          />
          <Txt
            variant="mainTitleBold"
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            예상 소요시간을 작성해주세요.
          </Txt>
          <TextField
            placeholder="시간을 작성해주세요"
            setState={setTimeState}
            value={timeText}
            onChangeText={setTimeText}
          />
          <ImageUploader
            title="그림을 올려볼까요?"
            onImagesChange={setReferenceImages}
            maxImages={3}
          />
          <Txt variant="mainTitleBold" style={{ marginTop: 20 }}>
            그림 수정여부를 선택해주세요
          </Txt>
          <Txt
            variant="bodySubText"
            style={{ marginTop: 10, marginBottom: 15 }}
          >
            그림 수정 시, 추가금 요청이 가능합니다.
          </Txt>
          <Row gap={7} justifyContent="flex-start" alignItems="center">
            {filterList.map((item, index) => (
              <ButtonContainer
                key={index}
                isSelected={filter === item}
                onPress={() => setFilter(item)}
              >
                <Txt
                  variant="bodyText"
                  color={filter === item ? "black" : "dark_gray2"}
                >
                  {item}
                </Txt>
              </ButtonContainer>
            ))}
          </Row>
        </ContentContainer>
      </StyledScrollView>

      <FooterContainer>
        <DefaultButton title="보내기" onPress={() => {}} variant="primary" />
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


const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  width: auto;
  height: 41px;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? Colors.colors.sub_yellow : Colors.colors.white};
  border-radius: 15px;
  border-width: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? "2px" : "1px"};
  border-color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? Colors.colors.main_yellow : Colors.colors.seperator};
`;


export default DrawingCardUpload;
