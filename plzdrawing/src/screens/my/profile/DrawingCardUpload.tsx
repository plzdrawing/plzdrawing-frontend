import tw from '@/src/lib/tailwind';
import React, { useState } from "react";

import { View, TouchableOpacity, ScrollView } from "react-native";
import Colors from "@/src/constants/Colors";
import HomeDetailHeader from "@/src/screens/home/components/detail/HomeDetailHeader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/types/navigation";
import DefaultButton from "@/src/components/ui/button/DefaultButton";
import Txt from "@/src/components/ui/Txt";
import ImageUploader from "@/src/components/ui/input/ImgUploader";
import TextField from "@/src/components/ui/input/TextField";

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
    <View style={[tw`flex-1`, { paddingBottom: 10, backgroundColor: Colors.colors.white }]}>
      <HomeDetailHeader
        type="drawingCardUpload"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView style={tw`flex-1`} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={tw`p-[30px]`}>
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
          <View style={tw`flex-row gap-[7px] justify-start items-center`}>
            {filterList.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setFilter(item)}
                style={[tw`justify-center items-center py-[10px] px-[20px] rounded-[15px]`, {
                  height: 41,
                  backgroundColor: filter === item ? Colors.colors.sub_yellow : Colors.colors.white,
                  borderWidth: filter === item ? 2 : 1,
                  borderColor: filter === item ? Colors.colors.main_yellow : Colors.colors.seperator,
                }]}
              >
                <Txt
                  variant="bodyText"
                  color={filter === item ? "black" : "dark_gray2"}
                >
                  {item}
                </Txt>
              </TouchableOpacity>
            ))}
          </View>
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
        <DefaultButton title="보내기" onPress={() => {}} variant="primary" />
      </View>
    </View>
  );
}




export default DrawingCardUpload;
