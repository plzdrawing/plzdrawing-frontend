import tw from '@/src/lib/tailwind';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <SafeAreaView
      style={[
        tw`flex-1 bg-white relative`,
        className ? tw`${className}` : tw`items-start justify-start`,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}
