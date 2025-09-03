import styled from "styled-components/native";
import HomeDetailHeader from "@/src/components/home/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/common/text/Txt";
import TextField from "@/src/components/common/input/TextField";
import { useState } from "react";
import { BaseProfile } from "@/src/types/profile";
import ProfileImageUploader from "@/src/components/common/input/ProfileImgUploader";

type ProfileEditProps = NativeStackScreenProps<
  RootStackParamList,
  "ProfileEdit"
>;

export default function ProfileEdit({ route, navigation }: ProfileEditProps) {
  const [nicknameText, setNicknameText] = useState("");
  const [nicknameState, setNicknameState] = useState("");
  const [newImageUri, setNewImageUri] = useState<string | null>(null);

  const profleData: BaseProfile = {
    name: "똥강아지",
    imageUrl: "",
    description: "나는야 그림쟁이",
    hashtag: ["#귀여운", "#낙서"],
  };

  return (
    <Container>
      <HomeDetailHeader
        title="프로필 수정"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollContainer
        showsVerticalScrollIndicator={false}
        style={{ padding: 32 }}
      >
        <ProfileImageUploader
          initialImageUrl={profleData.imageUrl}
          onImageSelected={setNewImageUri}
        />
        <Txt variant="bodySubText" style={{ marginBottom: 20, marginTop: 20 }}>
          닉네임
        </Txt>
        <TextField
          placeholder={profleData.name}
          setState={setNicknameState}
          value={nicknameText}
          onChangeText={setNicknameText}
        />
        <Txt variant="bodySubText" style={{ marginBottom: 20, marginTop: 20 }}>
          한 줄 소개
        </Txt>
        <TextField
          placeholder={profleData.description}
          setState={setNicknameState}
          value={nicknameText}
          onChangeText={setNicknameText}
        />
        <Txt variant="bodySubText" style={{ marginBottom: 20, marginTop: 20 }}>
          해시태그
        </Txt>
        <TextField
          placeholder={profleData.hashtag.join(" ")}
          setState={setNicknameState}
          value={nicknameText}
          onChangeText={setNicknameText}
        />
      </ScrollContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.colors.white};
`;

const ScrollContainer = styled.ScrollView`
  width: 100%;
  flex: 1;
`;
