import tw from '@/src/lib/tailwind';

import colors from "@/src/constants/Colors";
import BottomFixedArea from "@/src/components/layout/BottomFixedArea";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import Container from "@/src/components/layout/Container";
import Header from "@/src/components/layout/header/Header";
import Txt from "@/src/components/ui/Txt";
import React, { useState, useEffect, useRef } from "react";
import { View, TextInput } from "react-native";
import { NavigationProp, useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "@/src/types/navigation";
import AlertModal from "@/src/components/ui/modal/AlertModal";

import { emailController } from '@/src/apis/controller/email';

type PasswordFindVerificationRouteProp = RouteProp<RootStackParamList, 'PasswordFindVerification'>;

export default function PasswordFindVerification() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const route = useRoute<PasswordFindVerificationRouteProp>();
  const { email } = route.params;

  const [verificationCode, setVerificationCode] = useState([
    "", "", "", "", "", "",
  ]);
  const [timeLeft, setTimeLeft] = useState(300);
  const inputRefs = useRef<Array<TextInput | null>>([
    null, null, null, null, null, null,
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleInputChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = text;
    setVerificationCode(newVerificationCode);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace") {
      if (!verificationCode[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleResendCode = async () => {
    setTimeLeft(300);
    setVerificationCode(["", "", "", "", "", ""]);
    // [추가] 인증번호 재전송 API 호출
    try {
      await emailController.sendPasswordResetCode(email);
    } catch (error) {
      console.error("Resend code failed:", error);
    }
  };

  const handleVerificationButtonClick = async () => {
    const code = verificationCode.join("");
    if (!code || code.length !== 6) {
      return;
    }

    try {
      await emailController.verifyPasswordResetCode(email, code);

      // API 성공
      setModalVisible(true);
    } catch (error) {
      // API 실패
      console.error("Verification failed:", error);
      setErrorModalVisible(true);
    }
  };

  const isVerificationComplete = verificationCode.every((code) => code !== "");

  return (
    <Container>
      <Header />
      <View style={tw`gap-[98px] p-[43px_32px]`}>
        <Txt variant="headLineBold" align="left">
          비밀번호 찾기
        </Txt>
        <View style={{ gap: 8 }}>
        <View style={tw`w-full flex-row justify-between w-full`}>
            {verificationCode.map((code, index) => (
              <TextInput
                key={index}
                ref={(el: any) => (inputRefs.current[index] = el)}
                maxLength={1}
                keyboardType="numeric"
                value={code}
                onChangeText={(text: string) => handleInputChange(text, index)}
                onKeyPress={(e: any) => handleKeyPress(e, index)}
                style={{
                  width: 48,
                  height: 52,
                  borderWidth: 1,
                  borderColor: code !== '' ? colors.colors.main_yellow : colors.colors.light_gray3,
                  borderRadius: 12,
                  textAlign: 'center',
                  fontSize: 20,
                }}
              />
            ))}
        </View>

          <View style={{ justifyContent: "space-between", marginTop: 8 }}>
            <Txt variant="bodySubText" color="error_red">
              {formatTime(timeLeft)}
            </Txt>
            <Txt
              variant="bodySubText"
              align="right"
              style={{ textDecorationLine: "underline" }}
              onPress={handleResendCode}
            >
              인증번호 재전송
            </Txt>
          </View>
        </View>
      </View>
      <BottomFixedArea>
        <View style={tw`w-full py-[10px] px-[57px]`}>
          <PrimaryButton
            title="확인"
            color="sub_yellow"
            disabled={!isVerificationComplete}
            onClick={handleVerificationButtonClick}
            isValid={isVerificationComplete}
          />
        </View>
      </BottomFixedArea>
      {errorModalVisible && (
        <AlertModal
          modalTitle="인증번호가 일치하지 않아요."
          buttonTitle="확인"
          onClickButton={() => {
            setErrorModalVisible(false);
          }}
        />
      )}
      {modalVisible && (
        <AlertModal
          modalTitle={`인증에 성공했어요!\n임시 비밀번호가 발급되었어요 :)`}
          buttonTitle="확인"
          onClickButton={() => {
            setModalVisible(false);
            navigation.navigate("Login");
          }}
        />
      )}
    </Container>
  );
}

