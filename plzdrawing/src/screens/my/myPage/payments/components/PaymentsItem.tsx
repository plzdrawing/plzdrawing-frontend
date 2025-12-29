import React from 'react';
import styled from 'styled-components/native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/ui/Txt';

interface PaymentsItemProps {
  id: string;
  amount: number;
  painterProfile: string;
  painterName: string;
  date: string;
  onPress?: () => void;
}

export default function PaymentsItem({ 
  id, 
  amount, 
  painterProfile, 
  painterName, 
  date, 
  onPress 
}: PaymentsItemProps) {
  // 날짜 포맷 적용
  function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
  }
  return (
    <PaymentsItemContainer onPress={onPress}>
      <PainterProfile>
        {/* <img src={painterProfile} alt='' /> */}
      </PainterProfile>
      <PaymentDetail>
        <Txt variant='auxiliaryTextBold'>
          - {amount.toLocaleString()} 원
        </Txt>
        <Txt variant='auxiliaryTextLight'>
          {painterName} 님 | {formatDate(date)}
        </Txt>
      </PaymentDetail>
    </PaymentsItemContainer>
  )
}

const PaymentsItemContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 8px 0;
`;

const PainterProfile = styled.View`
  width: 52px;
  height: 52px;
  background-color: ${colors.colors.light_gray1};
  border-radius: 5px;
  border: 1px solid ${colors.colors.light_gray2};
  overflow: hidden;
  margin-right: 17px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PaymentDetail = styled.View`
  flex: 1;
  justify-content: center;
  gap: 7px;
`;
