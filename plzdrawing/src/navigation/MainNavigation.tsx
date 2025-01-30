import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Community from "@/src/screens/Community";
import Home from "@/src/screens/Home";
import Talk from "@/src/screens/Talk";
import Profile from "@/src/screens/Profile";
import Login from "@/src/screens/auth/Login";
import colors from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Txt from "../components/common/text/Txt";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "커뮤니티") {
            iconName = "people";
          } else if (route.name === "그림홈") {
            iconName = "home";
          } else if (route.name === "그림톡") {
            iconName = "chatbubble";
          } else if (route.name === "마이") {
            iconName = "person";
          }

          return (
            <IconContainer>
              <Ionicons
                name={iconName as keyof typeof Ionicons.glyphMap}
                size={35}
                color={
                  focused ? colors.tab.icon_selected : colors.tab.icon_default
                }
              />
              <Txt
                variant={focused ? "auxiliaryTextBold" : "auxiliaryTextLight"}
                style={{ width: "100%" }}
              >
                {route.name}
              </Txt>
            </IconContainer>
          );
        },
        tabBarShowLabel: false, // 기본 라벨 숨김
        tabBarStyle: {
          height: 70, // 탭 바 높이 조정
          paddingTop: 14,
          paddingBottom: 5,
          backgroundColor: "#fff",
        },
      })}
    >
      <Tab.Screen
        name="커뮤니티"
        component={Community}
        initialParams={{ screenType: "Community" }}
      />
      <Tab.Screen name="그림홈" component={Home} />
      <Tab.Screen name="그림톡" component={Talk} />
      <Tab.Screen name="마이" component={Profile} />
    </Tab.Navigator>
  );
}

const IconContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4;
`;
