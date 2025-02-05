import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Community from "@/src/screens/Community";
import Home from "@/src/screens/Home";
import Talk from "@/src/screens/Talk";
import Profile from "@/src/screens/Profile";
import Txt from "../components/common/text/Txt";
import { EmptyBox } from "@/assets/images";

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="커뮤니티"
        component={Community}
        initialParams={{ screenType: "Community" }}
        options={{
          tabBarIcon: ({ focused, color, size }) => <EmptyBox />,
          tabBarLabel: ({ focused, color }) => (
            <Txt
              variant={focused ? "auxiliaryTextBold" : "auxiliaryTextLight"}
              align="center"
              style={{ marginTop: 5 }}
            >
              커뮤니티
            </Txt>
          ),
        }}
      />
      <Tab.Screen
        name="그림홈"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => <EmptyBox />,
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
        name="그림톡"
        component={Talk}
        options={{
          tabBarIcon: ({ focused, color, size }) => <EmptyBox />,
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
        name="마이"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => <EmptyBox />,
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
