import tw from '@/src/lib/tailwind';
import { useState } from "react";

import styled from "styled-components/native";

import { View, ScrollView } from "react-native";
import Txt from "@/src/components/ui/Txt";
import Colors from "@/src/constants/Colors";

const ScrollFilter = () => {
  const filterList = [
    { image: "", name: "귀여운" },
    { image: "", name: "웃긴" },
    { image: "", name: "낙서" },
    { image: "", name: "반려동물" },
    { image: "", name: "캐릭터" },
    { image: "", name: "캐릭터" },
    { image: "", name: "캐릭터" },
  ];
  const [filter, setFilter] = useState<string>("귀여운");

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return (
    <Container>
      <ScrollContainer horizontal={true} showsHorizontalScrollIndicator={false}>
        {filterList.map((item, index) => (
          <View key={index} style={tw`mr-5 gap-[5px] justify-center items-center`}>
            <FilterImage
              source={{ uri: item.image }}
              selected={filter === item.name}
            />
            <Txt
              variant={filter === item.name ? "bodyTextBold" : "bodyText"}
              align="center"
              color="black"
            >
              {item.name}
            </Txt>
          </View>
        ))}
      </ScrollContainer>
    </Container>
  );
};

export default ScrollFilter;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  elevation: 4; /* 안드로이드 */
  shadow-color: #000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.05;
  shadow-radius: 5px;
`;

const ScrollContainer = styled.ScrollView`
  flex-direction: row;
  background-color: #fff;
  padding: 25px 22px 22px 32px;
`;

const FilterImage = styled.Image`
  width: 52px;
  height: 46px;
  border-radius: 5px;
  background-color: #f6f6f7;
  border: ${({ selected }: { selected: boolean }) =>
    selected ? `2px solid ${Colors.colors.main_yellow}` : "none"};
`;
