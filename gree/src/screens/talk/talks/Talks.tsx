import tw from '@/src/lib/tailwind';
import { View } from 'react-native';
import Container from '@/src/components/layout/Container';
import Txt from '@/src/components/common/Txt';

export default function Talks() {
  return (
    <Container className='items-center justify-center'>
      <Txt variant='headLineBold' color='dark_gray1'>준비 중입니다</Txt>
    </Container>
  );
}
