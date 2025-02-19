import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import Txt from "../text/Txt";
import colors from "@/src/constants/Colors";
import { Col, Row } from "../flex/Flex";
import { CHAT_CARD_VARIANTS, ChatCardVariant } from "@/src/types/chatCard";

interface ChatCardProps {
  variant: ChatCardVariant;
  imageUrl?: string;
  hashtags?: string[];
  price?: string;
  onPress?: () => void;
}

const Card = ({
  variant,
  imageUrl,
  hashtags,
  price,
  onPress,
}: ChatCardProps) => {
  const config = CHAT_CARD_VARIANTS[variant];

  return (
    <Row style={styles.container} padding="15px" gap={14}>
      {config.showImage && (
        <Col style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} />
        </Col>
      )}

      <Col style={[styles.contentContainer]}>
        <Col gap={7} style={styles.topContent}>
          <Txt variant="thirdText" style={styles.boldText}>
            {config.title}
          </Txt>
          {config.showHashtags && hashtags && (
            <Txt variant="bodySubText" color="icon_default">
              {hashtags.join(" ")}
            </Txt>
          )}
          {config.description && (
            <Txt variant="secondaryText" color="icon_default">
              {config.description}
            </Txt>
          )}
        </Col>

        <Row
          style={styles.bottomContent}
          justifyContent={config.showPrice ? "space-between" : "flex-end"}
        >
          {config.showPrice && price && (
            <Txt variant="thirdText" style={styles.boldText}>
              {price}₩
            </Txt>
          )}
          {config.buttonText === "" ? null : (
            <TouchableOpacity style={styles.button} onPress={onPress}>
              <Txt variant="bodyText" color="icon_default">
                {config.buttonText}
              </Txt>
            </TouchableOpacity>
          )}
        </Row>
      </Col>
    </Row>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.colors.background,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.colors.light_gray2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
  },
  contentContainer: {
    flex: 1,
    height: 90,
    justifyContent: "space-between",
  },
  topContent: {
    flex: 0,
  },
  bottomContent: {
    alignItems: "flex-end",
    width: "100%",
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 5,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  boldText: {
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colors.colors.background,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.colors.seperator,
  },
});

export default Card;
