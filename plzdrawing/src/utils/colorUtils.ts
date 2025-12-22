/**
 * HEX 색상 코드를 RGBA로 변환합니다.
 * @param hexColor HEX 색상 코드 (예: '#FFCC00')
 * @param alpha 투명도 (0-1 사이의 값)
 * @returns RGBA 문자열 (예: 'rgba(255, 204, 0, 0.35)')
 */
export const hexToRgba = (hexColor: string, alpha: number): string => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * isValid 상태에 따라 배경색을 반환합니다.
 * @param baseColor 기본 HEX 색상 코드
 * @param isValid 유효 상태
 * @param disabledAlpha disabled 상태일 때의 투명도 (기본값: 0.35)
 * @returns 색상 문자열 (HEX 또는 RGBA)
 */
export const getBackgroundColor = (
  baseColor: string,
  isValid: boolean,
  disabledAlpha: number = 0.35
): string => {
  if (isValid) return baseColor;
  return hexToRgba(baseColor, disabledAlpha);
};
