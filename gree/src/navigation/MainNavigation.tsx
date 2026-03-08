import React from 'react';
import { View } from 'react-native';
import tw from '@/src/lib/tailwind';
import Txt from '@/src/components/common/Txt';

export default function MainNavigation() {
  return (
    <View style={tw`flex-1 bg-white items-center justify-center`}>
      <Txt variant="headLineBold">메인 화면</Txt>
    </View>
  );
}
