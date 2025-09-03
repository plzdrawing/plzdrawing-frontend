import React, { useState } from 'react';
import { SectionList } from 'react-native';
import styled from 'styled-components/native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/common/text/Txt';
import DefaultButton from '@/src/components/common/button/DefaultButton';
import PrimaryButton from '@/src/components/common/button/PrimaryButton';
import PaymentsItem from './PaymentsItem';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

interface PaymentsDetailProps {
  amount: number;
  painterProfile: string;
  painterName: string;
  date: string;
  painterPayments: Array<{
    id: string;
    amount: number;
    painterProfile: string;
    painterName: string;
    date: string;
  }>;
}

export default function PaymentsDetail({ 
  amount, 
  painterProfile, 
  painterName, 
  date,
  painterPayments
}: PaymentsDetailProps) {
  // 날짜별로 그룹화
  const groupedPayments = painterPayments.reduce((groups: { [date: string]: typeof painterPayments }, payment) => {
    if (!groups[payment.date]) groups[payment.date] = [];
    groups[payment.date].push(payment);
    return groups;
  }, {});
  
  const sections = Object.entries(groupedPayments).map(([date, data]) => ({ 
    title: formatDate(date), 
    data 
  }));

  return (
    <DetailWrapper>
      <Details>
        <PaymentHistory>
          <PainterProfile>
            {/* <img src={painterProfile} alt='' /> */}
          </PainterProfile>
          <PaymentDetail>
            <Txt variant='auxiliaryTextLight'>
              {painterName} 님
            </Txt>
            <Txt variant='mainTitleBold'>
              - {amount.toLocaleString()} 원
            </Txt>
          </PaymentDetail>
        </PaymentHistory>

        <DetailContainer>
          <Detail>
            <Txt variant='auxiliaryTextLight'>메모</Txt>
            <Txt variant='auxiliaryTextLight' onPress={() => {}}>메모를 남겨보세요 &gt;</Txt>
          </Detail>
          <Detail>
            <Txt variant='auxiliaryTextLight'>결제수단</Txt>
            <Txt variant='auxiliaryTextLight' onPress={() => {}}>네이버 페이 &gt;</Txt>
          </Detail>
          <Detail>
            <Txt variant='auxiliaryTextLight'>결제방법</Txt>
            <Txt variant='auxiliaryTextLight' onPress={() => {}}>네이버 페이 &gt;</Txt>
          </Detail>
          <Detail>
            <Txt variant='auxiliaryTextLight'>결제일시</Txt>
            <Txt variant='auxiliaryTextLight' onPress={() => {}}>{formatDate(date)} &gt;</Txt>
          </Detail>
        </DetailContainer>

        <ButtonContainer>
          <DefaultButton title='프로필 확인하기' onPress={() => {}} />
          <DefaultButton title='톡방 확인하기' onPress={() => {}} />
        </ButtonContainer>
      </Details>
      
      <HistoryDetail>
        <Txt variant='auxiliaryTextLight'>{painterName} 님과의 거래 내역</Txt>
        <Histories>
          <History>
            <Txt variant='auxiliaryTextLight'>거래 횟수</Txt>
            <Txt variant='auxiliaryTextBold'>{painterPayments.length} 회</Txt>
          </History>
          <History>
            <Txt variant='auxiliaryTextLight'>총 금액</Txt>
            <Txt variant='auxiliaryTextBold'>{painterPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}원</Txt>
          </History>
        </Histories>

        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section: { title } }) => (
            <SectionHeader>
              <Txt variant="auxiliaryTextLight">{title}</Txt>
            </SectionHeader>
          )}
          renderItem={({ item }) => (
            <PaymentsItem {...item} />
          )}
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 32 }}
        />
      </HistoryDetail>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Details = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.colors.seperator};
`;

const PaymentHistory = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 12px 0;
  padding: 0 30px;
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

const DetailContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  margin: 27px 0;
  padding: 8px 30px;
`;

const Detail = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 7px;
  width: 100%;
  margin-bottom: 22px;
`;

const HistoryDetail = styled.View`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 27px 30px 0 30px;
`;

const Histories = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 107px;
  width: 100%;
  margin: 27px 0 8px 0;
`;

const History = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const SectionHeader = styled.View`
  padding: 19px 0 9px 0;
`;

