import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import colors from "@/src/constants/Colors";
import Txt from "../text/Txt";
import TextAreaField from "../input/TextAreaField";
import PriceTextField from "../input/PriceTextField";
import DefaultButton from "../button/DefaultButton";
import { Col, Row } from "../flex/Flex";
import { CloseIcon } from "@/assets/images";

interface CheckRequirementPriceProps {
  title?: string;
  initialDescription?: string;
  initialAmount?: string;
  readOnly?: boolean;
  fieldLabel?: string;
  fieldPlaceholder?: string;
  amountLabel?: string;
  isLoading?: boolean;
  onClose?: () => void;
  onSubmit?: (description: string, amount: string) => void;
}

const CheckRequirementPrice = ({
  title = "견적서 작성",
  initialDescription = "",
  initialAmount = "",
  readOnly = false,
  fieldLabel = "요구 사항 확인",
  fieldPlaceholder = "요구 사항을 확인해주세요.",
  amountLabel = "요청 금액",
  isLoading = false,
  onClose,
  onSubmit,
}: CheckRequirementPriceProps) => {
  const [description, setDescription] = useState(initialDescription);
  const [amount, setAmount] = useState(initialAmount);
  const [fieldState, setFieldState] = useState<"empty" | "filled" | "error">(
    initialDescription ? "filled" : "empty"
  );
  const [amountState, setAmountState] = useState<"empty" | "filled" | "error">(
    initialAmount ? "filled" : "empty"
  );

  const handleCancel = () => {
    console.log("취소하기 버튼 클릭");
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = () => {
    console.log("견적서:", description, "가격:", amount);
    if (onSubmit) {
      onSubmit(description, amount);
    }
  };

  const buttons = [
    {
      title: "취소하기",
      onPress: handleCancel,
      variant: "default" as "default" | "primary",
    },
    {
      title: "제출하기",
      onPress: handleSubmit,
      variant: "primary" as "default" | "primary",
    },
  ];

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Col gap={21}>
              <Row alignItems="center" justifyContent="space-between">
                <Txt variant="subtitleBold">{title}</Txt>
                <CloseIcon onPress={handleCancel} />
              </Row>

              <Col gap={7}>
                <Txt variant="bodyText" style={styles.text}>
                  요구 사항 확인
                </Txt>
                <TextAreaField
                  label={fieldLabel}
                  placeholder={fieldPlaceholder}
                  value={description}
                  onChange={setDescription}
                  onClear={() => setDescription("")}
                  readOnly={readOnly}
                />
              </Col>

              <Col gap={7}>
                <Txt variant="bodyText" style={styles.text}>
                  요청 금액
                </Txt>
                <PriceTextField
                  label={amountLabel}
                  placeholder="5000원"
                  value={amount}
                  onChange={setAmount}
                  onClear={() => setAmount("")}
                  readOnly={readOnly}
                  state={amountState}
                  setState={setAmountState}
                />
              </Col>
            </Col>
            <View style={styles.buttonContainer}>
              {buttons.map((button, index) => (
                <DefaultButton
                  key={index}
                  title={button.title}
                  onPress={button.onPress}
                  variant={button.variant}
                  disabled={
                    isLoading ||
                    (button.variant === "primary" &&
                      (fieldState === "empty" || amountState === "empty"))
                  }
                  isLoading={isLoading && button.variant === "primary"}
                />
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 21,
    paddingVertical: 21,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.colors.light_gray2,
  },
  spacer: {
    height: 16,
  },
  buttonContainer: {
    marginTop: 17,
    flexDirection: "row",
    width: "100%",
    justifyContent: "flex-end",
    gap: 7,
  },
  text: {
    marginLeft: 3,
  },
});

export default CheckRequirementPrice;
