import styled from "styled-components/native";
import HomeDetailHeader from "@/src/screens/home/home/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/ui/Txt";
import TextField from "@/src/components/ui/input/TextField";
import { useState, useEffect } from "react";
import { BaseProfile } from "@/src/types/profile";
import ProfileImageUploader from "@/src/components/ui/input/ProfileImgUploader";
import DefaultButton from "@/src/components/ui/button/DefaultButton";

import { memberController } from "@/src/apis/controller/member";

type ProfileEditProps = NativeStackScreenProps<
  RootStackParamList,
  "ProfileEdit"
>;

export default function ProfileEdit({ route, navigation }: ProfileEditProps) {
  const [nickname, setNickname] = useState("");
  const [nicknameState, setNicknameState] = useState<"empty" | "filled" | "error" | 'failed'>("empty");
  const [introduction, setIntroduction] = useState("");
  const [introductionState, setIntroductionState] = useState<"empty" | "filled" | "error" | 'failed'>("empty");
  const [hashtags, setHashtags] = useState("");
  const [hashtagState, setHashtagState] = useState<"empty" | "filled" | "error" | 'failed'>("empty");
  const [newImageUri, setNewImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // 초기 데이터
  const [initialData, setInitialData] = useState({
    nickname: "",
    introduction: "",
    hashtags: [] as string[],
    imageUrl: "",
  });

  // 사용자 데이터 불러오기
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await memberController.checkMyPage();
        const data = response as any;
        
        if (data && data.nickname) {
          const hashtagsStr = (data.hashtags || []).join(" ");
          setNickname(data.nickname || "");
          setIntroduction(data.introduction || "");
          setHashtags(hashtagsStr);
          
          setInitialData({
            nickname: data.nickname || "",
            introduction: data.introduction || "",
            hashtags: hashtagsStr,
            imageUrl: data.profileImageUrl || "",
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // 변경사항 확인
  const hasChanges = () => {
    return (
      nickname !== initialData.nickname ||
      introduction !== initialData.introduction ||
      hashtags !== initialData.hashtags.join(" ") ||
      newImageUri !== null
    );
  };

  // 저장 처리
  const handleSave = async () => {
    if (!hasChanges()) return;
    
    setIsSaving(true);
    try {
      const imageFile = newImageUri 
        ? { uri: newImageUri, name: 'profile.jpg', type: 'image/jpeg' } as unknown as File 
        : undefined;
      
      if (imageFile) {
        await memberController.editProfile(
          imageFile,
          {
            nickname: nickname || initialData.nickname,
            introduce: introduction || initialData.introduction,
            hashTag: hashtags.split(" ") || initialData.hashtags,
          }
        );
      } else {
        await memberController.editProfile(
          {} as File,
          {
            nickname: nickname || initialData.nickname,
            introduce: introduction || initialData.introduction,
            hashTag: hashtags.split(" ") || initialData.hashtags,
          }
        );
      }
      
      // 성공 후 Profile 페이지로 이동
      navigation.goBack();
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('프로필 수정에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <HomeDetailHeader
          title="프로필 수정"
          onBackPress={() => navigation.goBack()}
        />
        <Txt variant="bodyText" style={{ textAlign: 'center', marginTop: 50 }}>
          로딩 중...
        </Txt>
      </Container>
    );
  }

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
          initialImageUrl={initialData.imageUrl}
          onImageSelected={setNewImageUri}
        />
        <Txt variant="bodySubText" style={{ marginBottom: 20, marginTop: 20 }}>
          닉네임
        </Txt>
        <TextField
          placeholder={initialData.nickname || "닉네임을 입력하세요"}
          state={nicknameState}
          setState={setNicknameState}
          value={nickname}
          onChangeText={setNickname}
        />
        <Txt variant="bodySubText" style={{ marginBottom: 20, marginTop: 20 }}>
          한 줄 소개
        </Txt>
        <TextField
          placeholder={initialData.introduction || "자기소개를 입력하세요"}
          state={introductionState}
          setState={setIntroductionState}
          value={introduction}
          onChangeText={setIntroduction}
        />
        <Txt variant="bodySubText" style={{ marginBottom: 20, marginTop: 20 }}>
          해시태그
        </Txt>
        <TextField
          placeholder={initialData.hashtags.join(" ") || "#태그를 입력하세요"}
          state={hashtagState}
          setState={setHashtagState}
          value={hashtags}
          onChangeText={setHashtags}
        />
        
        <ButtonContainer>
          <DefaultButton
            title={isSaving ? "저장 중..." : "확인"}
            onPress={handleSave}
            disabled={!hasChanges() || isSaving}
            isLoading={isSaving}
            isValid={hasChanges()}
            variant="primary"
          />
        </ButtonContainer>
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

const ButtonContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 20px;
  width: 100%;
`;
