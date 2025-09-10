import React from "react";
import styled from "styled-components/native";
import Colors from "@/src/constants/Colors";
import Txt from "@/src/components/common/text/Txt";

interface UserInfoProps {
  profileImage: string;
  name: string;
  stats: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ profileImage, name, stats }) => {
  return (
    <UserInfoContainer>
      <ProfileImage source={{ uri: profileImage }} />
      <Txt variant="subtitleBold">
        {name}
      </Txt>
      <Txt variant="secondaryText" color="dark_gray2">
        {stats}
      </Txt>
    </UserInfoContainer>
  );
};

const UserInfoContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 7px;
  margin-bottom: 16px;
`;

const ProfileImage = styled.Image`
  width: 38px;
  height: 38px;
  border-radius: 5px;
  background-color: ${Colors.colors.light_gray2};
`;

export default UserInfo;