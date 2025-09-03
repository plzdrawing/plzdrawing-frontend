import React from "react";
import styled from "styled-components/native";

import { Col, Row } from "@/src/components/common/flex/Flex";
import Txt from "@/src/components/common/text/Txt";
import DefaultButton from "@/src/components/common/button/DefaultButton";
import { BaseProfile } from "@/src/types/profile";
import colors from "@/src/constants/Colors";

interface ProfileInfoSectionProps {
  profile: BaseProfile;
  onEditPress: () => void;
}

const ProfileInfoSection = ({
  profile,
  onEditPress,
}: ProfileInfoSectionProps) => {
  return (
    <Row gap={17} style={{ marginTop: 20 }}>
      <ProfileImg source={profile.imageUrl} />
      <Col>
        <Txt variant="mainTitleBold">{profile.name}</Txt>
        <Row style={{ marginTop: 7, marginBottom: 17 }}>
          {profile.hashtag.map((item, index) => (
            <Txt key={index} variant="bodyText" color="dark_gray2">
              {item}
            </Txt>
          ))}
        </Row>
        <DefaultButton
          title="프로필 수정"
          onPress={onEditPress}
          variant="default"
        />
      </Col>
    </Row>
  );
};

const ProfileImg = styled.Image`
  width: 102px;
  height: 102px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.colors.light_gray2};
`;

export default ProfileInfoSection;
