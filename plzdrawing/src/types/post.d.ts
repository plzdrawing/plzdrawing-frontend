export type BasePost = {
  author: string;
  hashtags: string;
  body: string;
  mainImage: string;
  drawingInfos: DrawingInfo[];
};

export type DrawingInfo = {
  id: string;
  image: string;
  title: string;
  price: string;
  description: string;
};

export type DrawingCardData = BasePost & {
  title: string;
  price: number;
  estimatedTime: number;
  revisions: boolean;
};

export type PostData = BasePost & {
  authorStats: string;
  profileImage: string;
};