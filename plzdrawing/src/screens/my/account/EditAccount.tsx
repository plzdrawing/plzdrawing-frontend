import tw from '@/src/lib/tailwind';
import React, { useState } from "react";
import { Alert, View, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/types/navigation';
import Txt from "@/src/components/ui/Txt";
import TextField from "@/src/components/ui/input/TextField";
import DefaultButton from "@/src/components/ui/button/DefaultButton";
import ProfileEditHeader from "./components/EditHeader";
import Colors from "@/src/constants/Colors";

type EditAccountNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function EditAccount() {
  const navigation = useNavigation<EditAccountNavigationProp>();

  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // 생년월일 포맷팅 (yyyy.mm.dd)
  const formatBirthDate = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    const limitedNumbers = numbers.slice(0, 8);
    
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

  // 휴대폰 번호 포맷팅 (000-0000-0000)
  const formatPhoneNumber = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    const limitedNumbers = numbers.slice(0, 11);

    if (limitedNumbers.length <= 3) {
      return limitedNumbers;
    } else if (limitedNumbers.length <= 7) {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3)}`;
    } else {
      return `${limitedNumbers.slice(0, 3)}-${limitedNumbers.slice(3, 7)}-${limitedNumbers.slice(7)}`;
    }
  };

  const handleBirthDateChange = (text: string) => {
    const formatted = formatBirthDate(text);
    setBirthDate(formatted);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhone(formatted);
  };

  const handleSubmit = () => {
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

    if (!isValidEmail(email)) {
      Alert.alert("알림", "올바른 이메일 형식으로 입력해주세요.");
      return;
    }

    const phoneNumbers = phone.replace(/\D/g, '');
    if (phoneNumbers.length !== 11) {
      Alert.alert("알림", "휴대폰 번호를 올바른 형식으로 입력해주세요. (000-0000-0000)");
      return;
    }
    
    navigation.navigate('EditSuccess', { type: 'profile' });
  };

  return (
    <View style={[tw`flex-1`, { backgroundColor: Colors.colors.white }]}>
      <ProfileEditHeader type="userProfile" onBack={() => {}} />

      <View style={tw`flex-col w-full px-[32px] pt-[20px] flex-1`}>
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

        <Txt variant="bodySubText" style={{ marginTop: 27, marginBottom: 17 }}>
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

        <Txt variant="bodySubText" style={{ marginTop: 27, marginBottom: 17 }}>
          휴대폰 번호
        </Txt>
        <TextField 
          placeholder="000-0000-0000"
          value={phone}
          onChangeText={handlePhoneChange}
          setState={(state) => {}}
          keyboardType="numeric"
        />
      </View>

      <View style={tw`absolute bottom-0 left-0 right-0 mx-[40px] mb-[20px]`}>
        <DefaultButton 
          title="확인" 
          variant="primary"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

export default EditAccount;
