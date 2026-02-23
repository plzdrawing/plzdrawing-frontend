/**
 * ISO 날짜 문자열 → 상대 시간 표현 (예: "2분 전", "3시간 전", "2일 전")
 */
export function formatRelativeTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return '방금';
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}주 전`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}달 전`;
  return `${Math.floor(months / 12)}년 전`;
}

/**
 * 채팅방 상태 → TalkProcess의 process 키로 변환
 */
export function mapStatusToProcess(
  status: 'REQUESTED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'REVIEWED' | 'CANCELLED',
): 'request' | 'paying' | 'inProgress' | 'complete' | 'review' {
  switch (status) {
    case 'REQUESTED':  return 'request';
    case 'PAID':       return 'paying';
    case 'IN_PROGRESS': return 'inProgress';
    case 'COMPLETED':  return 'complete';
    case 'REVIEWED':   return 'review';
    case 'CANCELLED':  return 'request'; // fallback
  }
}
