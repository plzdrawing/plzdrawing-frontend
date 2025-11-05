import React, { useState } from "react";
import Colors from "@/src/constants/Colors";
import styled from "styled-components/native";
import Txt from "@/src/components/common/text/Txt";
import TextField from "@/src/components/common/input/TextField";
import DefaultButton from "@/src/components/common/button/DefaultButton";
import ProfileEditHeader from "./components/EditHeader";
import { Alert } from "react-native";
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';
import { authApi } from "@/src/apis/auth";

type EditPasswordNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type EditPasswordRouteProp = RouteProp<RootStackParamList, 'EditPassword'>;

export default function EditPassword() {
  const navigation = useNavigation<EditPasswordNavigationProp>();
  const route = useRoute<EditPasswordRouteProp>();
  const { email: currentUserEmail } = route.params;

  const [isLoading, setIsLoading] = useState(false);

  const [pwdTextFieldState, setPwdTextFieldState] = useState<
    "empty" | "filled" | "error"
  >("empty");

  const [newPwdtextFieldState, setNewPwdTextFieldState] = useState<
    "empty" | "filled" | "error"
  >("empty");

  const [newPwdChecktextFieldState, setNewPwdCheckTextFieldState] = useState<
    "empty" | "filled" | "error"
  >("empty");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPwderrorMessage, setNewPwdErrorMessage] = useState("");
  const [newPwdCheckErrorMessage, setNewPwdCheckErrorMessage] = useState("");

  const validateCurrentPassword = (text: string) => {
    setCurrentPassword(text);
  };

  const validatePassword = (text: string) => {
    setNewPassword(text);
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (text === "") {
      setNewPwdTextFieldState("empty");
      setNewPwdErrorMessage("");
    } else if (!regex.test(text)) {
      setNewPwdTextFieldState("error");
      setNewPwdErrorMessage(
        "영문, 숫자, 특수문자 조합으로 8자 이상 입력해주세요."
      );
    } else {
      setNewPwdTextFieldState("filled");
      setNewPwdErrorMessage("");
    }
  };

  const validatePasswordCheck = (text: string) => {
    setConfirmPassword(text);
    if (text === "") {
      setNewPwdCheckTextFieldState("empty");
      setNewPwdCheckErrorMessage("");
    } else if (text !== newPassword) {
      setNewPwdCheckTextFieldState("error");
      setNewPwdCheckErrorMessage("비밀번호가 일치하지 않아요.");
    } else {
      setNewPwdCheckTextFieldState("filled");
      setNewPwdCheckErrorMessage("");
    }
  };

  const handleSubmit = async () => {
    if (!currentPassword.trim()) {
      Alert.alert("알림", "기존 비밀번호를 입력해주세요.");
      return;
    }

    if (newPwdtextFieldState !== "filled") {
      Alert.alert("알림", "새 비밀번호를 올바르게 입력해주세요.");
      return;
    }

    if (newPwdChecktextFieldState !== "filled") {
      Alert.alert("알림", "비밀번호 확인을 올바르게 입력해주세요.");
      return;
    }

    if (!currentUserEmail) {
      Alert.alert("오류", "사용자 정보가 없습니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // API 호출
      await authApi.updatePassword({
        email: currentUserEmail,
        nowPassword: currentPassword,
        newPassword: newPassword,
      });

      // 성공 시
      navigation.navigate('EditSuccess', { type: 'password' });

    } catch (error) {
      // 실패 시
      console.error("Password update failed:", error);
      Alert.alert("오류", "비밀번호 변경에 실패했습니다. 기존 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ProfileEditHeader type="password" onBack={() => {}} />

      <ProfileInputWrapper>
        <Txt variant="bodySubText" style={{ marginVertical: 17 }}>
          기존 비밀번호
        </Txt>
        <TextField
            placeholder="기존 비밀번호를 입력해주세요."
            type="password"
            value={currentPassword}
            state={pwdTextFieldState}
            setState={setPwdTextFieldState}
            validation={validateCurrentPassword}
          />

        <Txt variant="bodySubText" style={{ marginTop: 27, marginBottom: 17 }}>
          새 비밀번호
        </Txt>
        <TextField
          placeholder="새로운 비밀번호를 입력해주세요."
          type="password"
          value={newPassword}
          state={newPwdtextFieldState}
          setState={setNewPwdTextFieldState}
          validation={validatePassword}
          errorMessage={newPwderrorMessage}
        />

        <Txt variant="bodySubText" style={{ marginTop: 27, marginBottom: 17 }}>
          비밀번호 확인
        </Txt>
        <TextField
          placeholder="새로운 비밀번호를 확인해주세요."
          type="password"
          value={confirmPassword}
          state={newPwdChecktextFieldState}
          setState={setNewPwdCheckTextFieldState}
          validation={validatePasswordCheck}
          errorMessage={newPwdCheckErrorMessage}
        />
      </ProfileInputWrapper>

      <ButtonContainer>
        <DefaultButton
          title="확인"
          variant="primary"
          onPress={handleSubmit}
          isLoading={isLoading}
          isValid={
            pwdTextFieldState === "filled" &&
            newPwdtextFieldState === "filled" &&
            newPwdChecktextFieldState === "filled"
          }
        />
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.colors.white};
`;

const ProfileInputWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 32px 0 32px;
  flex: 1;
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 40px 20px 40px;
`;
