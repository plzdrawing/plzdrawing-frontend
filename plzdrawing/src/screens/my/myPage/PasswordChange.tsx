import tw from '@/src/lib/tailwind';

import { View } from "react-native";
import Header from "@/src/components/layout/header/Header";
import React, { useState } from "react";
import Txt from "@/src/components/ui/Txt";
import Container from "@/src/components/layout/Container";
import TextField from "@/src/components/ui/input/TextField";
import BottomFixedArea from "@/src/components/layout/BottomFixedArea";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import {
  CommonActions,
  NavigationProp,
  useNavigation,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";

import AlertModal from "@/src/components/ui/modal/AlertModal";

import { emailController } from '@/src/apis/controller/email';

type PasswordChangeRouteProp = RouteProp<RootStackParamList, 'PasswordChange'>;

export default function PasswordChange() {
  const [pwdTextFieldState, setPwdTextFieldState] = useState<
    "empty" | "filled" | "error" | 'failed'
  >("empty");

  const [newPwdtextFieldState, setNewPwdTextFieldState] = useState<
    "empty" | "filled" | "error" | 'failed'
  >("empty");

  const [newPwdChecktextFieldState, setNewPwdCheckTextFieldState] = useState<
    "empty" | "filled" | "error" | 'failed'
  >("empty");

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const route = useRoute<PasswordChangeRouteProp>();
  const { email } = route.params;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [newPwderrorMessage, setNewPwdErrorMessage] = useState("");
  const [newPwdCheckErrorMessage, setNewPwdCheckErrorMessage] = useState("");

  const handleNextButtonOnClick = async () => {
    if (!currentPassword.trim()) {
      console.error("현재 비밀번호를 입력해주세요.");
      return;
    }
    if (newPwdtextFieldState !== "filled") {
      console.error("새 비밀번호를 올바르게 입력해주세요.");
      return;
    }
    if (newPwdChecktextFieldState !== "filled") {
      console.error("비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      await emailController.changePassword(currentPassword, newPassword);

      // 성공 처리
    } catch (error) {
      // 에러 처리
      console.error("Password update failed:", error);
      console.error("비밀번호 변경에 실패했습니다.\n입력 정보를 확인해주세요.");
    }
  };

  const validatePassword = (text: string) => {
    setNewPassword(text); // [수정]
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
    setConfirmPassword(text); // [추가]
    if (text === "") {
      setNewPwdCheckTextFieldState("empty");
      setNewPwdCheckErrorMessage(""); // [추가]
    } else if (text !== newPassword) { // [수정]
      setNewPwdCheckTextFieldState("error");
      setNewPwdCheckErrorMessage("비밀번호가 일치하지 않아요.");
    } else {
      setNewPwdCheckTextFieldState("filled");
      setNewPwdCheckErrorMessage(""); // [추가]
    }
  };

  return (
    <Container>
      <Header />
      <View style={tw`gap-[73px] p-[43px_32px]`}>
        <View style={tw`gap-[7px]`}>
          <Txt variant="headLineBold" align="left">
            비밀번호 변경하기
          </Txt>
          <Txt variant="bodySubText" align="left">
            영문 + 숫자 + 특수문자 8자 이상 설정해주세요.
          </Txt>
        </View>

        <View style={tw`gap-[17px]`}>
          <Txt variant="bodySubText" align="left">
            비밀번호
          </Txt>
          <TextField
            placeholder="기존 비밀번호를 입력해주세요."
            type="password"
            state={pwdTextFieldState}
            setState={setPwdTextFieldState}
          />
          <Txt variant="bodySubText" align="left">
            새 비밀번호
          </Txt>
          <TextField
            placeholder="새로운 비밀번호를 입력해주세요."
            type="password"
            state={newPwdtextFieldState}
            setState={setNewPwdTextFieldState}
            validation={validatePassword}
            errorMessage={newPwderrorMessage}
          />
          <Txt variant="bodySubText" align="left">
            새 비밀번호 확인
          </Txt>
          <TextField
            placeholder="새로운 비밀번호를 확인해주세요."
            type="password"
            state={newPwdChecktextFieldState}
            setState={setNewPwdCheckTextFieldState}
            validation={validatePasswordCheck}
            errorMessage={newPwdCheckErrorMessage}
          />
        </View>
      </View>
      <BottomFixedArea>
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton
            title="완료"
            color="sub_yellow"
            onClick={handleNextButtonOnClick}
          />
        </View>
      </BottomFixedArea>
    </Container>
  );
}
