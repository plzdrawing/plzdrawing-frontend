import tw from '@/src/lib/tailwind';
import { useState, useEffect } from 'react';

import { View } from 'react-native';
import ChipButton from '@/src/components/common/button/ChipButton';

interface HomeFilterProps {
  selectedId: number;
  className?: string;
  onFilterChange?: (filter: string) => void;
}

export default function HomeFilter({
  selectedId,
  className = '',
  onFilterChange,
}: HomeFilterProps) {
  const filterList = selectedId === 0 ? ['최신순', '내가찜한'] : ['최신순', '별점높은순'];
  const [filter, setFilter] = useState<string>('최신순');

  useEffect(() => {
    setFilter('최신순');
    onFilterChange?.('최신순');
  }, [selectedId]);

  const handleFilterSelect = (item: string) => {
    setFilter(item);
    onFilterChange?.(item);
  };

  return (
    <View style={tw`flex-row gap-[17px] justify-start items-center ${className}`}>
      {filterList.map((item, index) => (
        <ChipButton
          key={index}
          title={item}
          isSelected={filter === item}
          onClick={() => handleFilterSelect(item)}
        />
      ))}
    </View>
  );
}
