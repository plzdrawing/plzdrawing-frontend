import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "@/src/screens/home/Home";
import Talk from "@/src/screens/talk/talks/Talks";
import My from "@/src/screens/my/My";
import Txt from "../components/ui/Txt";
import { FooterTalk, FooterHome, FooterMy } from "@/assets/images";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="그림홈"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          paddingTop: 8,
          height: 70 + insets.bottom,
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
        component={My}
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
