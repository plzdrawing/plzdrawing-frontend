import { CardVariant } from "../types/card";

interface CardVariantConfig {
  buttonText: string;
  showImage: boolean;
  showPrice: boolean;
  showDescription: boolean;
}

export const CARD_VARIANTS: Record<CardVariant, CardVariantConfig> = {
  notice: {
    buttonText: "게시글 보기",
    showImage: true,
    showPrice: true,
    showDescription: false,
  },
  check: {
    buttonText: "확인하기",
    showImage: true,
    showPrice: false,
    showDescription: true,
  },
  request: {
    buttonText: "확인하기",
    showImage: true,
    showPrice: false,
    showDescription: true,
  },
  requestDetail: {
    buttonText: "사유 확인하기",
    showImage: true,
    showPrice: false,
    showDescription: true,
  },
  requestResult: {
    buttonText: "확인하기",
    showImage: true,
    showPrice: false,
    showDescription: true,
  },
} as const;
