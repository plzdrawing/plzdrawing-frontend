import styled from "styled-components/native";
import Txt from "@/src/components/common/text/Txt";

type DrawingCardInfoBoxProps = {
  label: string;
  value: string;
};

const DrawingCardInfoBox = ({ label, value }:DrawingCardInfoBoxProps) => (
  <InfoBoxContainer>
    <Txt variant="bodyText">
      {label}
    </Txt>
    <Txt variant="bodyTextBold" style={{ marginTop: 4 }}>
      {value}
    </Txt>
  </InfoBoxContainer>
);

const InfoBoxContainer = styled.View`
  align-items: start;
  flex: 1;
`;

export default DrawingCardInfoBox;
