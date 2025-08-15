import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Community from "@/src/screens/Community";
import Home from "@/src/screens/Home";
import Talk from "@/src/screens/talk/Talk";
import Profile from "@/src/screens/Profile";
import Txt from "../components/common/text/Txt";
import { FooterTalk, FooterHome, FooterMy } from "@/assets/images";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="그림톡"
        component={Talk}
        options={{
          tabBarIcon: ({ focused, color, size }) => <FooterTalk />,
          tabBarLabel: ({ focused, color }) => (
            <Txt
              variant={focused ? "auxiliaryTextBold" : "auxiliaryTextLight"}
              align="center"
              style={{ marginTop: 5 }}
            >
              그림톡
            </Txt>
          ),
        }}
      />
      <Tab.Screen
        name="그림홈"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => <FooterHome />,
          tabBarLabel: ({ focused, color }) => (
            <Txt
              variant={focused ? "auxiliaryTextBold" : "auxiliaryTextLight"}
              align="center"
              style={{ marginTop: 5 }}
            >
              그림홈
            </Txt>
          ),
        }}
      />

      <Tab.Screen
        name="마이"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => <FooterMy />,
          tabBarLabel: ({ focused, color }) => (
            <Txt
              variant={focused ? "auxiliaryTextBold" : "auxiliaryTextLight"}
              align="center"
              style={{ marginTop: 5 }}
            >
              마이
            </Txt>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
