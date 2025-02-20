import { Container } from "../../components/common/container/Container";
import MainHeader from "@/src/components/common/header/MainHeader";
import Txt from "@/src/components/common/text/Txt";
import Colors from "@/src/constants/Colors";
import ChatInput from "@/src/components/chat/ChatInput";
import styled from "styled-components/native";
import { useEffect, useRef, useState } from "react";
import {
  InteractionManager,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

export default function Chatting() {
  const [message, setMessage] = useState("");
  const [isOpenedMenu, setIsOpenedMenu] = useState(false);
  const [messageList, setMessageList] = useState(["안녕하세요", "안녕하세요"]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = () => {
    if (message && message !== "") setMessageList([...messageList, message]);
    setMessage("");
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
                {messageList.map((message, index) => (
                  <ChattingTextBox key={index}>
                    <Txt>{message}</Txt>
                  </ChattingTextBox>
                ))}
              </ChattingContainer>
            </TouchableWithoutFeedback>
          </ScrollContainer>
          <ChatInput
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            isOpenMenu={isOpenedMenu}
            setIsOpenMenu={setIsOpenedMenu}
          />
        </ContentContainer>
      </KeyboardAvoidingView>
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

const ChattingTextBox = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  color: ${Colors.colors.black};
  background-color: ${Colors.colors.sub_yellow};
  border-radius: 10px;
  padding: 10px 20px;
`;
