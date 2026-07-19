import { InquiryResponseDto } from '@/src/apis/api';

export interface InquiryItem extends InquiryResponseDto {}

let inquirySeed = 3;

let inquiryStore: InquiryItem[] = [
  {
    id: 1,
    category: 'PAYMENT',
    title: '결제가 되지 않아요',
    content: '결제 했는데 상대방이 받지 못했다고 합니다. 어떻게 하면 될까요 ?',
    status: 'PENDING',
    answer: null,
    memberId: 10,
    memberNickname: '홍길동',
    memberEmail: 'user@example.com',
    memberProfileUrl: null,
    createdAt: '2026-05-14T10:00:00.000Z',
    answeredAt: null,
    imageUrls: [],
  },
  {
    id: 2,
    category: 'PAYMENT',
    title: '결제가 되지 않아요. 어떻게 하나요?',
    content: '홍길동 님에게 새로운 요청서가 도착했어요.\n지금 확인해볼까요 ?',
    status: 'ANSWERED',
    answer:
      '안녕하세요. 그리앱입니다.\n기다려주셔서 감사합니다.\n\n사용중인 결제수단을 확인한 이후 제공되는 결제수단은 현재 카카오, 네이버입니다. 사용중인 결제수단을 확인한 이후 제공되는 결제수단은 현재 카카오, 네이버입니다. 사용중인 결제수단을 확인한 이후 제공되는 결제수단은 현재 카카오, 네이버입니다.\n\n사용중인 결제수단을 확인한 이후 제공되는 결제수단은 현재 카카오, 네이버입니다.',
    memberId: 10,
    memberNickname: '홍길동',
    memberEmail: 'user@example.com',
    memberProfileUrl: null,
    createdAt: '2026-05-02T10:00:00.000Z',
    answeredAt: '2026-05-03T10:00:00.000Z',
    imageUrls: [],
  },
];

export function getInquiryList() {
  return [...inquiryStore].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getInquiryById(id: number) {
  return inquiryStore.find((item) => item.id === id) ?? null;
}

export function addInquiry(params: {
  category: InquiryResponseDto['category'];
  content: string;
  imageUrls?: string[];
}) {
  const content = params.content.trim();
  const title = content.split('\n').find(Boolean)?.slice(0, 30) || '문의 내용';

  const created: InquiryItem = {
    id: inquirySeed,
    category: params.category,
    title,
    content,
    status: 'PENDING',
    answer: null,
    memberId: 10,
    memberNickname: '홍길동',
    memberEmail: 'user@example.com',
    memberProfileUrl: null,
    createdAt: new Date().toISOString(),
    answeredAt: null,
    imageUrls: params.imageUrls ?? [],
  };

  inquirySeed += 1;
  inquiryStore = [created, ...inquiryStore];

  return created;
}

export function deleteInquiry(id: number) {
  const before = inquiryStore.length;
  inquiryStore = inquiryStore.filter((item) => item.id !== id);
  return inquiryStore.length < before;
}
