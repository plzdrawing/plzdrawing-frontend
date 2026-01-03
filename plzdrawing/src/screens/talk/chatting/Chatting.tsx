import tw from '@/src/lib/tailwind';
import { useEffect, useRef, useState } from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
} from 'react-native';

import Container from '@/src/components/layout/Container';
import ChatInput from '@/src/screens/talk/chatting/chat/ChatInput';

import SenderBox from "@/src/screens/talk/chatting/chat/SenderBox";
import ReceiverBox from "@/src/screens/talk/chatting/chat/ReceiverBox";
import AlertModal from "@/src/components/ui/modal/AlertModal";
import TalkProcess from "@/src/screens/talk/chatting/chat/TalkProcess";
import RequestBox from "@/src/screens/talk/chatting/chat/RequestBox";
import * as ScreenCapture from "expo-screen-capture";

interface Message {
  isSender: boolean;
  message: string;
  imageUri?: string;
  type?: "request" | "accept" | "reject" | "completePayment" | "check" | "feedback";
}

export default function Chatting() {
  const [modalVisible, setModalVisible] = useState(false);
  const handleClickModalButton = () => {
    setModalVisible(true);
  };
  const [sendMessage, setSendMessage] = useState("");
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const [messageList, setMessageList] = useState<Message[]>([
    // { isSender: false, message: "안녕하세요" },
    // { isSender: false, message: "안녕하세요" },
    // { isSender: true, message: "안녕하세요" },
    // { isSender: true, message: "안녕하세요", type: "request" },
    // { isSender: false, message: "안녕하세요", type: "accept" },
    // { isSender: false, message: "안녕하세요", type: "reject" },
    // { isSender: true, message: "안녕하세요", type: "completePayment"},
    // { isSender: false, message: "안녕하세요", type: "check" },
    // { isSender: true, message: "안녕하세요", type: "feedback" },
  ]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = () => {
    if (sendMessage && sendMessage !== "")
      setMessageList([
        ...messageList,
        { message: sendMessage, isSender: true },
      ]);
    setSendMessage("");
  };

  const handleSendImage = (imageUri: string) => {
    setMessageList([
      ...messageList,
      { message: "", isSender: true, imageUri },
    ]);
    setIsOpenedMenu(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100); // 100ms 지연

    return () => clearTimeout(timeout);
  }, [messageList]);

  useEffect(() => {
    // 스크린샷 방지 활성화
    const preventScreenCapture = async () => {
      const hasPermissions = await ScreenCapture.preventScreenCaptureAsync();
    };
    
    preventScreenCapture();

    // 컴포넌트 언마운트 시 스크린샷 방지 해제
    return () => {
      ScreenCapture.allowScreenCaptureAsync();
    };
  }, []);

  useEffect(() => {
    // 📌 키보드가 올라올 때 → 즉시 스크롤을 아래로 이동
    const keyboardShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => {
        requestAnimationFrame(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        });
      }
    );

    // 📌 키보드가 사라질 때 → 플랫폼에 따라 다르게 처리
    const keyboardHideListener = Keyboard.addListener("keyboardDidHide", () => {
      requestAnimationFrame(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      });
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [scrollViewRef]);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior="height"
        style={tw`flex-1 w-full flex flex-col`}
      >
        <SafeAreaView style={tw`flex flex-col justify-between flex-1`}>
          <TalkProcess 
            imageUrl=""
            title="귀여운 그림"
            price={500}
            process="inProgress"
          />
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            style={tw`flex-1 w-full bg-light_gray1`}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setIsOpenedMenu(false);
                Keyboard.dismiss();
              }}
            >
              <View style={tw`flex items-end p-[17px_32px] gap-[17px] w-full bg-light_gray1`}>
                {messageList.map((message, index) => {
                  if (message.type) {
                    return (
                      <RequestBox
                        key={index}
                        type={message.type}
                        imageUrl=""
                        title="귀여운 그림"
                        price={1000}
                        description="30분 예상 / 수정..."
                      />
                    );
                  }
                  return message.isSender ? (
                    <SenderBox key={index} message={message.message} imageUri={message.imageUri} />
                  ) : (
                    <ReceiverBox key={index} message={message.message} />
                  );
                })}
              </View>
            </TouchableWithoutFeedback>
          </ScrollView>
          <ChatInput
            message={sendMessage}
            setMessage={setSendMessage}
            handleSendMessage={handleSendMessage}
            handleSendImage={handleSendImage}
            isOpenMenu={isOpenedMenu}
            setIsOpenMenu={setIsOpenedMenu}
          />
        </SafeAreaView>
      </KeyboardAvoidingView>
      {modalVisible && (
        <AlertModal
          modalTitle="모달"
          buttonTitle="확인"
          onClickButton={() => setModalVisible(false)}
        />
      )}
    </Container>
  );
}
