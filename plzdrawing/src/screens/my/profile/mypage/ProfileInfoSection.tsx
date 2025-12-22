import React, { useState } from "react";
import styled from "styled-components/native";

import { Col, Row } from "@/src/components/common/flex/Flex";
import Txt from "@/src/components/common/text/Txt";
import DefaultButton from "@/src/components/ui/button/DefaultButton";
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
  const [imageLoadError, setImageLoadError] = useState(false);
  console.log('Profile imageUrl:', profile.imageUrl);
  
  return (
    <Row gap={17} style={{ marginTop: 20 }}>
      {profile.imageUrl && !imageLoadError ? (
        <ProfileImg 
          // source={{ uri: profile.imageUrl }}
          onError={(error) => {
            console.log('Image load error:', error.nativeEvent.error);
            setImageLoadError(true);
          }}
          onLoad={() => console.log('Image loaded successfully')}
        />
      ) : (
        // <ProfileImgPlaceholder>
        //   <Txt variant="auxiliaryTextLight" color="dark_gray2">
        //     {imageLoadError ? '이미지 로드 실패' : '이미지 없음'}
        //   </Txt>
        // </ProfileImgPlaceholder>
        <ProfileImg
          source={{ uri: "https://i.namu.wiki/i/vDDaVK4wm1-vPZgAOI65rbhLhr1vPCzBgoRKSS7mEFx4IH2vtHvvMN41Umw-taptksIW_WqnjwOdcGbAMpAmrQ.webp" }}
        />
      )}
      <Col>
        <Txt variant="mainTitleBold">{profile.name}</Txt>
        <Row style={{ marginTop: 7, marginBottom: 17 }}>
          {profile.hashtag.map((item, index) => (
            <Txt key={index} variant="bodyText" color="dark_gray2" style={{ marginRight: 4 }}>
              {item.startsWith('#') ? item : `#${item}`}
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

const ProfileImgPlaceholder = styled.View`
  width: 102px;
  height: 102px;
  border-radius: 5px;
  border-width: 1px;
  border-color: ${colors.colors.light_gray2};
  background-color: ${colors.colors.light_gray1};
  justify-content: center;
  align-items: center;
`;

export default ProfileInfoSection;
