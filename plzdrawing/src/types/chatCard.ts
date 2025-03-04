// types/chatCard.ts

export type ChatCardVariant =
  | "nextVisit"
  | "feedbackAccepted"
  | "requestAccepted"
  | "resultDelivered"
  | "itemRegistered" // 홍길동
  | "requestProcessing"
  | "requestCompleted";

interface ChatCardConfig {
  title: string;
  description?: string;
  buttonText: string;
  showImage: boolean;
  showHashtags: boolean;
  showPrice: boolean;
}

export const CHAT_CARD_VARIANTS: Record<ChatCardVariant, ChatCardConfig> = {
  nextVisit: {
    title: "다음 기회에 만나요!",
    description:
      "죄송합니다. 그림쟁이의 사정으로 이번 거래 성사는 어려울 것 같아요. ",
    buttonText: "사유 확인하기",
    showImage: true,
    showHashtags: false,
    showPrice: false,
  },
  feedbackAccepted: {
    title: "그림요청이 도착했습니다.",
    description: "요청자님의 피드백을 확인해볼까요?",
    buttonText: "확인하기",
    showImage: true,
    showHashtags: false,
    showPrice: false,
  },
  requestAccepted: {
    title: "요청서가 도착했어요 :)!",
    description: "도착한 요청서를 확인해보세요!",
    buttonText: "확인하기",
    showImage: true,
    showHashtags: false,
    showPrice: false,
  },
  resultDelivered: {
    title: "결제가 완료되었습니다.",
    description: "거래 확정후, 1시간 내에 그림쟁이에게 입금됩니다:)",
    buttonText: "확인하기",
    showImage: true,
    showHashtags: false,
    showPrice: false,
  },
  itemRegistered: {
    title: "홍길동",
    description: "",
    buttonText: "게시글 보기",
    showImage: true,
    showHashtags: true,
    showPrice: true,
  },
  requestProcessing: {
    title: "견적서가 도착했어요 :)!",
    description: "나와 그림쟁이의 거래조건을 꼼꼼하게 확인해주세요!",
    buttonText: "확인하기",
    showImage: true,
    showHashtags: false,
    showPrice: false,
  },
  requestCompleted: {
    title: "그림과정이 도착했습니다",
    description:
      "요청하신 그림이 도착했습니다 :) 확인 후 편하게 피드백을 남겨주세요.",
    buttonText: "",
    showImage: true,
    showHashtags: false,
    showPrice: false,
  },
} as const;
