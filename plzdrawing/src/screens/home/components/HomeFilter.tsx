import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { View } from 'react-native';
import ChipButton from '@/src/components/ui/button/ChipButton';

interface SearchFilterProps {
  selectedId: number;
  className?: string;
}

export default function HomeFilter({ 
  selectedId, 
  className = '',
 }: SearchFilterProps) {
  // 탭에 따라 다른 필터 리스트 사용
  const filterList = selectedId === 0 
    ? ['최신순', '내가찜한']
    : ['최신순', '별점높은순'];
  const [filter, setFilter] = useState<string>('최신순');

  // 탭이 변경될 때마다 필터를 "최신순"으로 초기화
  useEffect(() => {
    setFilter('최신순');
  }, [selectedId]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <View style={tw`flex-row gap-[17px] justify-start items-center ${className}`}>
      {filterList.map((item, index) => (
        <ChipButton
          key={index}
          title={item}
          isSelected={filter === item}
          onClick={() => setFilter(item)}
        />
      ))}
    </View>
  );
};
