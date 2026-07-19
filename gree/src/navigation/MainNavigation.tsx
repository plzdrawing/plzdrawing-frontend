import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Home from '@/src/screens/home/Home';
import Talks from '@/src/screens/talk/talks/Talks';
import My from '@/src/screens/my/My';
import Txt from '@/src/components/common/Txt';
import { FooterTalk, FooterHome, FooterMy } from '@/assets/images';

const Tab = createBottomTabNavigator();

export default function MainNavigation() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName='그림홈'
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        tabBarStyle: {
          paddingTop: 8,
          height: 70 + insets.bottom,
        },
      }}
    >
      <Tab.Screen
        name='그림톡'
        component={Talks}
        options={{
          tabBarIcon: () => <FooterTalk />,
          tabBarLabel: ({ focused }) => (
            <Txt
              variant={focused ? 'auxiliaryTextBold' : 'auxiliaryTextLight'}
              align='center'
              style={{ marginTop: 5 }}
            >
              그림톡
            </Txt>
          ),
        }}
      />
      <Tab.Screen
        name='그림홈'
        component={Home}
        options={{
          tabBarIcon: () => <FooterHome />,
          tabBarLabel: ({ focused }) => (
            <Txt
              variant={focused ? 'auxiliaryTextBold' : 'auxiliaryTextLight'}
              align='center'
              style={{ marginTop: 5 }}
            >
              그림홈
            </Txt>
          ),
        }}
      />
      <Tab.Screen
        name='마이'
        component={My}
        options={{
          tabBarIcon: () => <FooterMy />,
          tabBarLabel: ({ focused }) => (
            <Txt
              variant={focused ? 'auxiliaryTextBold' : 'auxiliaryTextLight'}
              align='center'
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
