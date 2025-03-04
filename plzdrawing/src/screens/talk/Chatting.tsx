import { Container } from "../../components/common/container/Container";
import MainHeader from "@/src/components/common/header/MainHeader";
import Txt from "@/src/components/common/text/Txt";
import Colors from "@/src/constants/Colors";
import ChatInput from "@/src/components/chat/ChatInput";
import styled from "styled-components/native";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import SenderBox from "@/src/components/chat/SenderBox";
import ReceiverBox from "@/src/components/chat/ReceiverBox";
import AlertModal from "@/src/components/common/modal/AlertModal";

interface Message {
  message: string;
  isSender: boolean;
}

export default function Chatting() {
  const [modalVisible, setModalVisible] = useState(false);
  const handleClickModalButton = () => {
    setModalVisible(true);
  };
  const [sendMessage, setSendMessage] = useState("");
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const [messageList, setMessageList] = useState<Message[]>([
    { message: "안녕하세요", isSender: true },
    { message: "안녕하세요", isSender: false },
    { message: "안녕하세요", isSender: false },
    { message: "안녕하세요", isSender: false },
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

  useEffect(() => {
    const timeout = setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100); // 100ms 지연

    return () => clearTimeout(timeout);
  }, [messageList]);

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
      <MainHeader
        title="홍길동 님"
        subTitle="과의 그림톡"
        state="submitted"
      ></MainHeader>
      <KeyboardAvoidingView
        behavior="height"
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ContentContainer>
          <ScrollContainer
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                setIsOpenedMenu(false);
                Keyboard.dismiss();
              }}
            >
              <ChattingContainer>
                {messageList.map((message, index) =>
                  message.isSender ? (
                    <SenderBox key={index} message={message.message} />
                  ) : (
                    <ReceiverBox key={index} message={message.message} />
                  )
                )}
              </ChattingContainer>
            </TouchableWithoutFeedback>
          </ScrollContainer>
          <ChatInput
            message={sendMessage}
            setMessage={setSendMessage}
            handleSendMessage={() => setModalVisible(true)}
            isOpenMenu={isOpenedMenu}
            setIsOpenMenu={setIsOpenedMenu}
          />
        </ContentContainer>
      </KeyboardAvoidingView>
      {modalVisible && (
        <AlertModal
          title="모달"
          buttonTitle="확인"
          onClick={() => setModalVisible(false)}
        />
      )}
    </Container>
  );
}

const ScrollContainer = styled.ScrollView`
  flex: 1;
  width: 100%;
  background-color: ${Colors.colors.light_gray1};
`;

const ChattingContainer = styled.View`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 17px 32px;
  gap: 17px;
  width: 100%;
  flex: 1;
  background-color: ${Colors.colors.light_gray1};
`;

const ContentContainer = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;
