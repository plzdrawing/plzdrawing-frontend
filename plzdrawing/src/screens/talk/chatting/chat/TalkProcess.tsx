import React from "react";
import styled from "styled-components/native";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/ui/Txt";
import { View } from "react-native";

interface TalkProcessProps {
  imageUrl: string;
  title: string;
  price: number;
  process: "request" | "paying" | "inProgress" | "complete" | "review";
}

const processSteps = [
  { key: "request", label: "요청" },
  { key: "paying", label: "결제" },
  { key: "inProgress", label: "작업중" },
  { key: "complete", label: "완료" },
  { key: "review", label: "후기" },
];

export default function TalkProcess({
  imageUrl,
  title,
  price,
  process
}: TalkProcessProps) {
  const currentStepIndex = processSteps.findIndex(step => step.key === process);

  return (
    <ProcessContainer>
      <RequestImage source={{ uri: imageUrl }} />

      <ContentContainer>
        <TitlePriceRow>
          <Txt variant="auxiliaryTextBold" color="black">
            {title}
          </Txt>
          <Txt variant="secondaryText" color="black">
            {price.toLocaleString()}원
          </Txt>
        </TitlePriceRow>

        <ProgressContainer>
          <ProgressBarContainer>
            {processSteps.map((step, index) => (
              <React.Fragment key={step.key}>
                {index > 0 && (
                  <ProgressLine 
                    isActive={index <= currentStepIndex}
                  />
                )}
                <ProgressDot 
                  isActive={index <= currentStepIndex}
                />
              </React.Fragment>
            ))}
          </ProgressBarContainer>

          <ProgressLabelsContainer>
            {processSteps.map((step, index) => (
              <React.Fragment key={step.key}>
                {index > 0 && <LabelSpacer />}
                <ProgressLabel 
                  align={index === 0 ? 'flex-start' : index === processSteps.length - 1 ? 'flex-end' : 'center'}
                >
                  <Txt 
                    variant="auxiliaryTextLight" 
                    color={index === currentStepIndex ? "black" : "light_gray2"}
                  >
                    {step.label}
                  </Txt>
                </ProgressLabel>
              </React.Fragment>
            ))}
          </ProgressLabelsContainer>
        </ProgressContainer>
      </ContentContainer>
    </ProcessContainer>
  );
}

const ProcessContainer = styled.View`
  flex-direction: row;
  padding: 12px 32px;
  width: 100%;
  background-color: ${Colors.colors.white};
  border-bottom-width: 1;
  border-bottom-color: ${Colors.colors.light_gray2};
`;

const RequestImage = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 5px;
  background-color: ${Colors.colors.light_gray2};
  margin-right: 7px;
`;

const ContentContainer = styled.View`
  flex: 1;
  gap: 7px;
`;

const TitlePriceRow = styled.View`
  flex-direction: row;
  gap: 7px;
  align-items: center;
  padding-left: 4px;
`;

const ProgressContainer = styled.View`
  width: 100%;
  gap: 7px;
`;

const ProgressBarContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 8px;
  position: relative;
  justify-content: space-between;
`;

const ProgressLine = styled.View<{ isActive: boolean }>`
  flex: 1;
  height: 2px;
  background-color: ${(props: { isActive: boolean }) => props.isActive ? Colors.colors.main_yellow : Colors.colors.light_gray3};
`;

const ProgressDot = styled.View<{ isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background-color: ${(props: { isActive: boolean }) => props.isActive ? Colors.colors.main_yellow : Colors.colors.white};
  border-width: 1;
  border-color: ${(props: { isActive: boolean }) => props.isActive ? Colors.colors.main_yellow : Colors.colors.light_gray3};
`;

const ProgressLabelsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LabelSpacer = styled.View`
  flex: 1;
`;

const ProgressLabel = styled.View<{ align: 'flex-start' | 'center' | 'flex-end' }>`
  align-items: ${(props: { align: 'flex-start' | 'center' | 'flex-end' }) => props.align};
`;
