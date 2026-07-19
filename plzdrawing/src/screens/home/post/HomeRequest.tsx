import tw from '@/src/lib/tailwind';
import React from "react";
import Colors from "@/src/constants/Colors";
import HomeDetailHeader from "@/src/screens/home/components/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import DefaultButton from "@/src/components/ui/button/DefaultButton";
import Txt from "@/src/components/ui/Txt";
import DrawingInfoCard from "@/src/screens/home/components/detail/DrawingInfoCard";
import {
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  View,
  ScrollView,
} from "react-native";
import { DrawingInfo } from "@/src/types/post";
import TextAreaField from "@/src/components/ui/input/TextAreaField";
import ImageUploader from "@/src/components/ui/input/ImgUploader";

type HomeRequestScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "HomeRequest"
>;

function HomeRequest({ route, navigation }: HomeRequestScreenProps) {
  const [requestText, setRequestText] = React.useState("");
  const [referenceImages, setReferenceImages] = React.useState<string[]>([]);
  const [selectedCardId, setSelectedCardId] = React.useState<string | null>(
    null
  );

  const handleButtonPress = () => {
    // [todo] : dummy 네비게이션 수정해야 함
    navigation.navigate("ProfileUpload");
  };

  // const { cardId } = route.params; // You'll use this to fetch data

  // Dummy data
  const cardData: DrawingInfo[] = [
    {
      id: "card_abc_1",
      image: "https://placehold.co/60x60/FFE18D/000000?text=1",
      title: "귀여운 그림",
      price: "1000원",
      description: "30분 예상 / 수정 불가",
    },
    {
      id: "card_abc_2",
      image: "https://placehold.co/60x60/A9C8E8/000000?text=2",
      title: "캐릭터 스케치",
      price: "2500원",
      description: "1시간 예상 / 수정 1회",
    },
  ];

  return (
    <View style={[tw`flex-1`, { paddingBottom: 10, backgroundColor: Colors.colors.white }]}>
      <HomeDetailHeader
        type="request"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={tw`flex-1`} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={tw`p-[30px]`}>
          <Txt variant="mainTitleBold" style={{ marginBottom: 20 }}>
            그림 카드를 선택해주세요
          </Txt>
          {cardData.map((info) => (
            <TouchableOpacity key={info.id}>
              <DrawingInfoCard key={info.id} info={info} />
            </TouchableOpacity>
          ))}

          <Txt
            variant="mainTitleBold"
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            요청 내용을 입력해주세요
          </Txt>
          <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
            <TouchableWithoutFeedback
              onPress={Keyboard.dismiss}
              accessible={false}
            >
              <TextAreaField
                placeholder="텍스트"
                value={requestText}
                maxLength={200}
                onChange={(text) => setRequestText(text)}
              />
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>

          <ImageUploader onImagesChange={setReferenceImages} maxImages={5} />
        </View>
      </ScrollView>

      <View
        style={[tw`absolute bottom-0 w-full`, {
          height: 92,
          paddingTop: 9,
          paddingHorizontal: 57,
          paddingBottom: 20,
          backgroundColor: Colors.colors.white,
          borderTopWidth: 1,
          borderTopColor: '#f9f9f9',
        }]}
      >
        <DefaultButton
          title="보내기"
          variant="primary"
          onPress={() => handleButtonPress()}
        />
      </View>
    </View>
  );
}

export default HomeRequest;