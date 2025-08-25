import React from "react";
import styled from "styled-components/native";
import { Col } from "@/src/components/common/flex/Flex";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/common/text/Txt";

interface DrawingInfoCardProps {
  info: {
    id: string; // Unique identifier for the drawing info
    image: string;
    title: string;
    price: string;
    description: string;
  };
}

const DrawingInfoCard: React.FC<DrawingInfoCardProps> = ({ info }) => {
  return (
    <CardContainer>
      <InfoImage source={{ uri: info.image }} />
      <Col style={{ flex: 1 }}>
        <Txt variant="subtitleBold" style={{ marginBottom: 7 }}>
          {info.title}
        </Txt>
        <Txt variant="auxiliaryTextLight">
          {info.price}
          {"\n"}
          {info.description}
        </Txt>
      </Col>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  background-color: ${Colors.colors.white};
  border-radius: 5px;
  border: 0.5px solid #d9d9d9;
  padding: 7px;
  flex-direction: row;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const InfoImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 5px;
`;

export default DrawingInfoCard;
