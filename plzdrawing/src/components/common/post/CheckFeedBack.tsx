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
import DefaultButton from "../button/DefaultButton";
import { Col, Row } from "../flex/Flex";
import { CloseIcon } from "@/assets/images";

interface CheckFeedBackProps {
  title?: string;
  buttonTitle?: string;
  initialDescription?: string;
  feedbackOptions?: string[];
  readOnly?: boolean;
  fieldLabel?: string;
  fieldPlaceholder?: string;
  isLoading?: boolean;
  onClose?: () => void;
  onSubmit?: (description: string) => void;
}

const CheckFeedBack = ({
  title = "거절사유 확인",
  buttonTitle = "확인하기",
  initialDescription = "",
  feedbackOptions = ["크하하", "크하하", "크하하", "크하하", "크하하"],
  readOnly = false,
  fieldLabel = "요구 사항 확인",
  fieldPlaceholder = "요구 사항을 확인해주세요.",
  isLoading = false,
  onClose,
  onSubmit,
}: CheckFeedBackProps) => {
  const [description, setDescription] = useState(initialDescription);
  const [fieldState, setFieldState] = useState<"empty" | "filled" | "error">(
    initialDescription ? "filled" : "empty"
  );

  const handleCancel = () => {
    console.log("취소하기 버튼 클릭");
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = () => {
    console.log("피드백:", description);
    if (onSubmit) {
      onSubmit(description);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Col>
              <Row
                alignItems="center"
                justifyContent="space-between"
                margin={"0 0 21px 0"}
              >
                <Txt variant="subtitleBold">{title}</Txt>
                <CloseIcon onPress={handleCancel} />
              </Row>
              <Col gap={17}>
                <View style={styles.feedbackContainer}>
                  {feedbackOptions.map((option, index) => (
                    <Txt
                      key={index}
                      style={styles.feedBack}
                      variant="bodyText"
                      color="icon_default"
                    >
                      {option}
                    </Txt>
                  ))}
                </View>

                <TextAreaField
                  label={fieldLabel}
                  placeholder={fieldPlaceholder}
                  value={description}
                  onChange={setDescription}
                  onClear={() => setDescription("")}
                  readOnly={readOnly}
                />
              </Col>
            </Col>
            <View style={styles.buttonContainer}>
              <DefaultButton
                title={buttonTitle}
                onPress={handleSubmit}
                variant="primary"
                isLoading={isLoading}
                disabled={fieldState === "empty" || isLoading}
              />
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
  feedbackContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },
  feedBack: {
    backgroundColor: colors.colors.white,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.colors.light_gray3,
  },
});

export default CheckFeedBack;
