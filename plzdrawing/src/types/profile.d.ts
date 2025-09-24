export type BaseProfile = {
  name: string,
  imageUrl: string,
  hashtag: string[],
  description?: string,
};

export type ProfileMenuItem = {
  text: string;
  icon?: React.ReactNode;
  onPress: () => void;
}