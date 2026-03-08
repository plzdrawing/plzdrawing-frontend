import tw from '@/src/lib/tailwind';
import { useEffect } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BottomFixedAreaProps {
  children: React.ReactNode;
}

const { width } = Dimensions.get('window');

export default function BottomFixedArea({ children }: BottomFixedAreaProps) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
      style={[tw`absolute bottom-0 w-full flex-col z-100`, styles.fixedContainer]}
    >
      <SafeAreaView>{children}</SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  fixedContainer: {
    left: width * 0.5,
    right: 'auto',
    transform: [{ translateX: -width * 0.5 }],
    maxWidth: 840,
  },
});
