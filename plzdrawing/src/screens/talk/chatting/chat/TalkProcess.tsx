import tw from '@/src/lib/tailwind';
import React from "react";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/ui/Txt";
import { View, Image } from "react-native";

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
    <View
      style={[
        tw`flex-row p-[12px_32px] w-full`,
        { backgroundColor: Colors.colors.white, borderBottomWidth: 1, borderBottomColor: Colors.colors.light_gray2 },
      ]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={[tw`w-[52px] h-[52px] rounded-[5px] mr-[7px]`, { backgroundColor: Colors.colors.light_gray2 }]}
      />

      <View style={tw`flex-1 gap-[7px]`}>
        <View style={tw`flex-row gap-[7px] items-center pl-[4px]`}>
          <Txt variant="auxiliaryTextBold" color="black">
            {title}
          </Txt>
          <Txt variant="secondaryText" color="black">
            {price.toLocaleString()}원
          </Txt>
        </View>

        <View style={tw`w-full gap-[7px]`}>
          <View style={tw`flex-row items-center h-[8px] justify-between`}>
            {processSteps.map((step, index) => (
              <React.Fragment key={step.key}>
                {index > 0 && (
                  <View
                    style={[
                      tw`flex-1 h-[2px]`,
                      { backgroundColor: index <= currentStepIndex ? Colors.colors.main_yellow : Colors.colors.light_gray3 },
                    ]}
                  />
                )}
                <View
                  style={[
                    tw`w-[8px] h-[8px] rounded-[999px]`,
                    {
                      backgroundColor: index <= currentStepIndex ? Colors.colors.main_yellow : Colors.colors.white,
                      borderWidth: 1,
                      borderColor: index <= currentStepIndex ? Colors.colors.main_yellow : Colors.colors.light_gray3,
                    },
                  ]}
                />
              </React.Fragment>
            ))}
          </View>

          <View style={tw`flex-row items-center`}>
            {processSteps.map((step, index) => (
              <React.Fragment key={step.key}>
                {index > 0 && <View style={tw`flex-1`} />}
                <View
                  style={{
                    alignItems: index === 0 ? 'flex-start' : index === processSteps.length - 1 ? 'flex-end' : 'center',
                  }}
                >
                  <Txt
                    variant="auxiliaryTextLight"
                    color={index === currentStepIndex ? "black" : "light_gray2"}
                  >
                    {step.label}
                  </Txt>
                </View>
              </React.Fragment>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}
