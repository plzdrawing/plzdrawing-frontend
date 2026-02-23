import tw from '@/src/lib/tailwind';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "@/src/constants/Colors";
import React from "react";
import Txt from "../../components/ui/Txt";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import Container from "../../components/layout/Container";
import Header from "../../components/layout/header/Header";

interface PainterProfileProps {
  profile: string;
  username?: string;
  description?: string;
  hashtags?: string[];
}

export default function PainterProfile({
  profile = "https://i.pinimg.com/736x/22/6e/ab/226eab96db865ae998703008c2b36d7b.jpg",
  username = "올림동",
  description = "안녕하세요. 동물 그림입니다.(⁠^⁠ᴗ⁠^⁠)",
  hashtags = ["#기린픽", "#나나", "#동물그림"],
}: PainterProfileProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Container>
      <Header />
      <View style={{ alignItems: "center" }}>
        <View style={styles.profileImageContainer}>
          <Image source={{ uri: profile }} style={styles.profileImage} />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", margin: 9 }}>
          <Txt variant="subtitleBold">{username}</Txt>
          <Txt variant="subtitleBold"> 님</Txt>
        </View>
        <View style={{ alignItems: "center" }}>
          <Txt variant="bodyText">{description}</Txt>
          <View style={styles.hashtagsContainer}>
            {hashtags.map((tag, index) => (
              <Txt variant="bodyText" color="dark_gray2" key={index}>
                {tag}
              </Txt>
            ))}
          </View>
        </View>
        <View style={tw`px-[58px] pt-[20px] pb-[42px]`}>
          <TouchableOpacity style={styles.buttonContainer}>
            <Txt>게시글 보러가기</Txt>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.activeTab}>
            <Txt variant="bodyText">그림</Txt>
          </View>
          <View style={styles.tab}>
            <Txt variant="bodyText">후기</Txt>
          </View>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colors.light_gray1,
  },
  profileImageContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.colors.light_gray2,
    width: 120,
    height: 120,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    marginTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
  },
  hashtagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  buttonContainer: {
    backgroundColor: colors.colors.sub_yellow,
    paddingVertical: 12,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  tabContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  activeTab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#422222",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
  },
});
