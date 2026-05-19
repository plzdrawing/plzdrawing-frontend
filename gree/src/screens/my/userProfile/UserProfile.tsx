import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/src/navigation/types';

import Container from '@/src/components/layout/Container';
import Header from '@/src/components/layout/Header';
import Profile from '@/src/screens/my/profile/Profile';

type RouteProps = RouteProp<RootStackParamList, 'UserProfile'>;

export default function UserProfile() {
  const route = useRoute<RouteProps>();
  const { memberId } = route.params;

  return (
    <Container className='w-full'>
      <Header title='프로필' />
      <Profile isFromMyPage={false} userId={memberId} />
    </Container>
  );
}
