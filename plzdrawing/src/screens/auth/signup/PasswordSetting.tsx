import tw from '@/src/lib/tailwind';

import React, { useState, useEffect } from "react";
import { Keyboard, View } from "react-native";
import BottomFixedArea from "@/src/components/layout/BottomFixedArea";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Container from "@/src/components/layout/Container";
import Header from "@/src/components/layout/header/Header";
import Txt from "@/src/components/ui/Txt";
import { NavigationProp, useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import TextField from "@/src/components/ui/input/TextField";
import AlertModal from "@/src/components/ui/modal/AlertModal";
import { EmptyCheck, FilledCheck } from "@/assets/images";

type PasswordSettingRouteProp = RouteProp<RootStackParamList, 'PasswordSetting'>;

export default function PasswordSetting() {
  const route = useRoute<PasswordSettingRouteProp>();
  const { email, agreements } = route.params;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordState, setPasswordState] = useState<
    "empty" | "filled" | "error" | "failed"
  >("empty");
  const [confirmState, setConfirmState] = useState<
    "empty" | "filled" | "error" | "failed"
  >("empty");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [lengthCheck, setLengthCheck] = useState(false);
  const [combinationCheck, setCombinationCheck] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const validatePassword = (
    pwd: string
  ): { isValid: boolean; message: string } => {
    if (!pwd) {
      return { isValid: false, message: "" };
    }

    // 8자 이상 체크
    const lengthValid = pwd.length >= 8;
    setLengthCheck(lengthValid);

    // 영문, 숫자, 특수문자 조합 체크
    const hasLetter = /[A-Za-z]/.test(pwd);
    const hasDigit = /\d/.test(pwd);
    const hasSpecial = /[@$!%*#?&]/.test(pwd);
    const combinationValid = hasLetter && hasDigit && hasSpecial;
    setCombinationCheck(combinationValid);

    // 영문, 숫자, 특수문자 조합 8자 이상
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!regex.test(pwd)) {
      return {
        isValid: false,
        message: "영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요.",
      };
    }
    return { isValid: true, message: "" };
  };

  const validateConfirmPassword = (
    pwd: string,
    confirmPwd: string
  ): { isValid: boolean; message: string } => {
    if (!confirmPwd) {
      return { isValid: false, message: "" };
    }

    if (pwd !== confirmPwd) {
      return {
        isValid: false,
        message: "비밀번호가 일치하지 않습니다.",
      };
    }
    return { isValid: true, message: "" };
  };

  useEffect(() => {
    const passwordResult = validatePassword(password);
    if (!password) {
      setPasswordState("empty");
    } else {
      setPasswordState("filled");
    }
    setPasswordError(passwordResult.message);

    const confirmResult = validateConfirmPassword(password, confirmPassword);
    if (!confirmPassword) {
      setConfirmState("empty");
    } else {
      setConfirmState(confirmResult.isValid ? "filled" : "error");
    }
    setConfirmError(confirmResult.message);

    setIsValid(passwordResult.isValid && confirmResult.isValid);
  }, [password, confirmPassword]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handlePasswordFocus = () => {
    setShowPasswordChecks(true);
  };

  const handleConfirmButton = () => {
    if (isValid) {
      console.log("비밀번호 설정 완료");
      setModalVisible(true);
    }
  };

  return (
    <Container>
      <Header />
      <View style={tw`gap-[${isKeyboardVisible ? 28 : 98}px] p-[43px_32px]`}>
        <Txt variant="headLineBold" align="left">
          비밀번호를 설정해주세요.
        </Txt>
        <View style={tw`gap-[37px]`}>
          <View style={tw`gap-[17px]`}>
            <Txt variant="bodySubText" align="left">
              비밀번호
            </Txt>
            <TextField
              placeholder="영문, 숫자, 특수문자 8자 이상."
              state={passwordState}
              setState={setPasswordState}
              value={password}
              onChangeText={setPassword}
              type="password"
              onFocus={handlePasswordFocus}
            />

            {showPasswordChecks && (
              <View style={tw`gap-[7px] p-[0_0_0_20px]`}>
                <View style={tw`flex-row gap-[17px]`}>
                  {lengthCheck ? <FilledCheck /> : <EmptyCheck />}
                  <Txt variant="bodySubText" color="icon_default">
                    최소 8자 이상
                  </Txt>
                </View>
                <View style={tw`flex-row gap-[17px]`}>
                  {combinationCheck ? <FilledCheck /> : <EmptyCheck />}
                  <Txt variant="bodySubText" color="icon_default">
                    영문, 숫자, 특수문자 3가지 조합
                  </Txt>
                </View>
              </View>
            )}
          </View>
          <View style={tw`gap-[17px]`}>
            <Txt variant="bodySubText" align="left">
              비밀번호 확인
            </Txt>
            <TextField
              placeholder="영문, 숫자, 특수문자 8자 이상."
              state={confirmState}
              setState={setConfirmState}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage="비밀번호가 일치하지 않아요"
              type="password"
            />
          </View>
        </View>
      </View>
      <BottomFixedArea>
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton
            isValid={isValid}
            title="다음"
            color="sub_yellow"
            disabled={!isValid}
            onClick={handleConfirmButton}
          />
        </View>
      </BottomFixedArea>
      {modalVisible && (
        <AlertModal
          modalTitle="비밀번호 설정이 완료되었어요 :)"
          buttonTitle="확인"
          onClickButton={() => {
            setModalVisible(false);
            navigation.navigate('NicknameSettingSplash', {
              email,
              password,
              agreements
            });
          }}
        />
      )}
    </Container>
  );
}
