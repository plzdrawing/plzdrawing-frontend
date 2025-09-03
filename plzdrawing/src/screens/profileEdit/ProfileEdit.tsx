import React, { useState } from "react";
import Colors from "@/src/constants/Colors";
import styled from "styled-components/native";
import Txt from "@/src/components/common/text/Txt";
import TextField from "@/src/components/common/input/TextField";
import DefaultButton from "@/src/components/common/button/DefaultButton";
import ProfileEditHeader from "./components/ProfileEditHeader";
import { Alert } from "react-native";

export default function ProfileEdit() {
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // 생년월일 포맷팅 함수 (yyyy.mm.dd)
  const formatBirthDate = (text: string) => {
    // 숫자만 추출
    const numbers = text.replace(/\D/g, '');
    
    // 최대 8자리까지만 허용
    const limitedNumbers = numbers.slice(0, 8);
    
    // 포맷팅 적용
    if (limitedNumbers.length <= 4) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 6) {
      return `${limitedNumbers.slice(0, 4)}.${limitedNumbers.slice(4)}`;
    } else {
      return `${limitedNumbers.slice(0, 4)}.${limitedNumbers.slice(4, 6)}.${limitedNumbers.slice(6)}`;
    }
  };

  // 이메일 유효성 검사
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 휴대폰 번호 포맷팅 함수 (000-0000-0000)
  const formatPhoneNumber = (text: string) => {
    // 숫자만 추출
    const numbers = text.replace(/\D/g, '');
    
    // 최대 11자리까지만 허용
    const limitedNumbers = numbers.slice(0, 11);
    
    // 포맷팅 적용
    if (limitedNumbers.length <= 3) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
    } else {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  // 생년월일 변경 핸들러
  const handleBirthDateChange = (text: string) => {
    const formatted = formatBirthDate(text);
    setBirthDate(formatted);
  };

  // 이메일 변경 핸들러
  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  // 휴대폰 번호 변경 핸들러
  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);
  };

  // 폼 유효성 검사 및 제출
  const handleSubmit = () => {
    // 생년월일 유효성 검사 (8자리 숫자 + 올바른 날짜)
    const birthNumbers = birthDate.replace(/\D/g, '');
    if (birthNumbers.length !== 8) {
      Alert.alert("알림", "생년월일을 올바른 형식으로 입력해주세요. (yyyy.mm.dd)");
      return;
    }

    const year = parseInt(birthNumbers.slice(0, 4));
    const month = parseInt(birthNumbers.slice(4, 6));
    const day = parseInt(birthNumbers.slice(6, 8));

    if (year < 1900 || year > new Date().getFullYear()) {
      Alert.alert("알림", "올바른 년도를 입력해주세요.");
      return;
    }

    if (month < 1 || month > 12) {
      Alert.alert("알림", "올바른 월을 입력해주세요.");
      return;
    }

    if (day < 1 || day > 31) {
      Alert.alert("알림", "올바른 일을 입력해주세요.");
      return;
    }

    // 이메일 유효성 검사
    if (!isValidEmail(email)) {
      Alert.alert("알림", "올바른 이메일 형식으로 입력해주세요.");
      return;
    }

    // 휴대폰 번호 유효성 검사 (11자리 숫자)
    const phoneNumbers = phone.replace(/\D/g, '');
    if (phoneNumbers.length !== 11) {
      Alert.alert("알림", "휴대폰 번호를 올바른 형식으로 입력해주세요. (000-0000-0000)");
      return;
    }

    // 모든 유효성 검사 통과
    console.log('Birth Date:', birthDate);
    console.log('Email:', email);
    console.log('Phone:', phone);
    Alert.alert("성공", "정보가 성공적으로 입력되었습니다.");
  };

  return (
    <Container>
      <ProfileEditHeader type="userProfile" onBack={() => {}} />

      <ProfileInputWrapper>
        <Txt variant="bodySubText" style={{ marginVertical: 17 }}>
          생년월일
        </Txt>
        <TextField 
          placeholder="yyyy.mm.dd"
          value={birthDate}
          onChangeText={handleBirthDateChange}
          setState={(state) => {}}
          keyboardType="numeric"
        />

        <Txt variant="bodySubText" style={{ marginVertical: 17 }}>
          이메일
        </Txt>
        <TextField 
          placeholder="example@email.com"
          value={email}
          onChangeText={handleEmailChange}
          setState={(state) => {}}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Txt variant="bodySubText" style={{ marginVertical: 17 }}>
          휴대폰 번호
        </Txt>
        <TextField 
          placeholder="000-0000-0000"
          value={phone}
          onChangeText={handlePhoneChange}
          setState={(state) => {}}
          keyboardType="numeric"
        />
      </ProfileInputWrapper>

      <ButtonContainer>
        <DefaultButton 
          title="확인" 
          variant="primary"
          onPress={handleSubmit}
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
