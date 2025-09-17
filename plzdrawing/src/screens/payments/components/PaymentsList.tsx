import React, { useState } from 'react';
import { SectionList } from 'react-native';
import styled from 'styled-components/native';
import colors from '@/src/constants/Colors';
import Txt from '@/src/components/common/text/Txt';
import PaymentsItem from './PaymentsItem';
import PaymentsDetail from './PaymentsDetail';
import { GreeSad } from '@/assets/images';

type FilterType = '보낸 내역' | '받은 내역';

// mock 데이터
const paymentsData = [
  {
    id: '1',
    amount: 1300,
    painterProfile: '',
    painterName: '홍길동',
    date: '2025-09-23',
  },
  {
    id: '2',
    amount: 2300,
    painterProfile: '',
    painterName: '홍길동',
    date: '2025-09-11',
  },
  {
    id: '3',
    amount: 3300,
    painterProfile: '',
    painterName: '홍길동',
    date: '2025-09-11',
  },
  {
    id: '4',
    amount: 4300,
    painterProfile: '',
    painterName: '홍길동',
    date: '2025-09-10',
  },
  {
    id: '5',
    amount: 4300,
    painterProfile: '',
    painterName: '고길동',
    date: '2025-09-10',
  },
  {
    id: '6',
    amount: 4300,
    painterProfile: '',
    painterName: '고길동',
    date: '2025-09-10',
  },
];

function getMonthString(date: Date) {
  return `${date.getMonth() + 1}월`;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}.${mm}.${dd}`;
}

function groupByDate(items: typeof paymentsData) {
  const groups: { [date: string]: typeof paymentsData } = {};
  items.forEach(item => {
    if (!groups[item.date]) groups[item.date] = [];
    groups[item.date].push(item);
  });
  return Object.entries(groups).map(([date, data]) => ({ title: formatDate(date), data }));
}

interface PaymentsListProps {
  setSelectedPayment: (payment: any) => void;
  selectedPayment: any;
}

export default function PaymentsList({ setSelectedPayment, selectedPayment }: PaymentsListProps) {
  const [selectedFilter, setFilter] = useState<FilterType>('보낸 내역');
  const [currentDate, setCurrentDate] = useState(new Date());

  // 현재 월에 해당하는 payments만 필터링
  const filteredPayments = paymentsData.filter(p => {
    const d = new Date(p.date);
    return (
      d.getFullYear() === currentDate.getFullYear() &&
      d.getMonth() === currentDate.getMonth() &&
      selectedFilter === '보낸 내역'
    );
  });
  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const sections = groupByDate(filteredPayments);
  const monthStr = getMonthString(currentDate);

  // 월 이동 핸들러
  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };
  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  // 상세 결제내역 화면
  if (selectedPayment) {
    // 해당 painterName과 일치하는 모든 거래 내역 필터링
    const painterPayments = paymentsData.filter(p => p.painterName === selectedPayment.painterName);
    
    return (
      <ListWrapper>
        <PaymentsDetail 
          amount={selectedPayment.amount}
          painterProfile={selectedPayment.painterProfile}
          painterName={selectedPayment.painterName}
          date={selectedPayment.date}
          painterPayments={painterPayments}
        />
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <FilterContainer>
        <Filter>
          <FilterButton
            isSelected={selectedFilter === '보낸 내역'}
            onPress={() => setFilter('보낸 내역')}
          >
            <Txt variant={selectedFilter === '보낸 내역' ? 'subtitleBold' : 'bodyText'} align="center">보낸 내역</Txt>
          </FilterButton>
          <FilterButton
            isSelected={selectedFilter === '받은 내역'}
            onPress={() => setFilter('받은 내역')}
          >
            <Txt variant={selectedFilter === '받은 내역' ? 'subtitleBold' : 'bodyText'} align="center">받은 내역</Txt>
          </FilterButton>
        </Filter>
      </FilterContainer>

      <MonthContainer>
        <MonthRow>
          <MonthNavButton onPress={handlePrevMonth}>
            <Txt variant="bodyText">{'<'}</Txt>
          </MonthNavButton>
          <Txt variant="auxiliaryTextLight">
            {monthStr}
          </Txt>
          <MonthNavButton onPress={handleNextMonth}>
            <Txt variant="bodyText">{'>'}</Txt>
          </MonthNavButton>
        </MonthRow>
        <Txt variant="bodyText">
          {selectedFilter === '보낸 내역'
            ? <Txt variant="mainTitleBold">- {totalAmount.toLocaleString()}원</Txt>
            : <Txt variant="mainTitleBold">+ {totalAmount.toLocaleString()}원</Txt>
          } 
        </Txt>
      </MonthContainer>

      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader>
            <Txt variant="auxiliaryTextLight">{title}</Txt>
          </SectionHeader>
        )}
        renderItem={({ item }) => (
          <PaymentsItem {...item} onPress={() => setSelectedPayment(item)} />
        )}
        ListEmptyComponent={
          <NoPlayments>
            <GreeSad width={120} height={120} />
            <Txt align="center" style={{ marginTop: 32 }}>
              {selectedFilter === '보낸 내역'
                ? '아직 보낸 내역이 없어요'
                : '아직 받은 내역이 없어요'}
            </Txt>
          </NoPlayments>
        }
        style={{ flex: 1, paddingHorizontal: 32 }}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </ListWrapper>
  );
}


const ListWrapper = styled.View`
  flex: 1;
  width: 100%;
`;

const FilterContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.colors.seperator};
`;

const Filter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 79px;
`;

const FilterButton = styled.TouchableOpacity<{ isSelected: boolean }>`
  padding: 8px 0;
  border-bottom-width: 2px;
  border-bottom-color: ${({ isSelected }: { isSelected: boolean }) => (isSelected ? colors.colors.black : 'transparent')};
`;

const MonthContainer = styled.View`
  padding: 37px 32px 20px 32px;
  gap: 17px;
`;

const MonthRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 17px;
`;

const MonthNavButton = styled.TouchableOpacity``;

const SectionHeader = styled.View`
  padding: 19px 0 9px 0;
`;

const NoPlayments = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 145px
`;
