import tw from '@/src/lib/tailwind';
import { Pressable, PressableProps } from 'react-native';
import Txt from '@/src/components/common/text/Txt';
import { 
  KaKaoLoginIcon, 
  GoogleLoginIcon, 
  AppleLoginIcon 
} from '@/assets/images';

interface ButtonProps extends PressableProps {
  title?: string;
  isValid?: boolean;
  variant?: 'default' | 'auth';
  loginType?: 'email' | 'kakao' | 'google' | 'apple' | 'signup';
  onClick?: () => void;
  className?: string;
}

const loginStyles = {
  email: tw`bg-sub-yellow border-2 border-main-yellow`,
  kakao: tw`bg-[#FEE500] border-0`,
  google: tw`bg-white border-1 border-black`,
  apple: tw`bg-white border-1 border-black`,
  signup: tw`bg-white border-1 border-main-yellow`,
};

export default function Button({
  title,
  isValid = true,
  variant = 'default',
  loginType,
  onClick,
  className,
}: ButtonProps) {
  return (
    <Pressable
      style={[
        tw`w-full bg-sub-yellow border border-sub-yellow rounded-[12px] items-center justify-center`,
        variant=='default' ? tw`py-[12px]` : tw`py-[16px] border-1 border-main-yellow`,
        variant=='auth' && loginType ? loginStyles[loginType] : '',
        !isValid ? tw`bg-sub-yellow/35 border-1 border-main-yellow` : '',
        className && tw`${className}`
      ]}
      onPress={onClick}
      disabled={!isValid}
    >
      <Txt variant='bodyText' color='black' align='center'>
        {loginType ? (
          loginType === 'kakao' ? <KaKaoLoginIcon /> :
          loginType === 'google' ? <GoogleLoginIcon /> :
          loginType === 'apple' ? <AppleLoginIcon /> :
          title
        ) : (
          title
        )}
      </Txt>
    </Pressable>
  );
}
