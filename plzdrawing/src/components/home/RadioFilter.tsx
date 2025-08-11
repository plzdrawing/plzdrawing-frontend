import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Col, Row } from "../common/flex/Flex";
import Txt from "../common/text/Txt";
import Colors from "@/src/constants/Colors";

interface RadioFilterProps {
  selectedId: number;
}

const RadioFilter = ({ selectedId }: RadioFilterProps) => {
  // 탭에 따라 다른 필터 리스트 사용
  const filterList = selectedId === 0 ? ["최신순", "내가찜한"] : ["최신순", "별점높은순"];
  const [filter, setFilter] = useState<string>("최신순");

  // 탭이 변경될 때마다 필터를 "최신순"으로 초기화
  useEffect(() => {
    setFilter("최신순");
  }, [selectedId]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <Row gap={9} justifyContent="flex-start" alignItems="center">
      {filterList.map((item, index) => (
        <ButtonContainer
          key={index}
          isSelected={filter === item}
          onPress={() => setFilter(item)}
        >
          <Txt
            variant="bodyText"
            color={filter === item ? "black" : "dark_gray2"}
          >
            {item}
          </Txt>
        </ButtonContainer>
      ))}
    </Row>
  );
};

export default RadioFilter;

const ButtonContainer = styled.TouchableOpacity`
  display: flex;
  width: auto;
  height: 31px;
  justify-content: center;
  align-items: center;
  padding: 0 15px;
  background-color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? Colors.colors.sub_yellow : Colors.colors.white};
  border-radius: 12px;
  border-width: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? "2px" : "1px"}; /* 선택되었을 때만 border를 보여줌 */
  border-color: ${({ isSelected }: { isSelected: boolean }) =>
    isSelected ? Colors.colors.main_yellow : Colors.colors.seperator};
`;
