import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 클래스 이름을 병합하는 유틸리티 함수
 * clsx와 tailwind-merge를 사용하여 클래스 이름을 효율적으로 병합합니다.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 날짜를 포맷팅하는 유틸리티 함수
 * @param date 포맷팅할 날짜
 * @param options 포맷 옵션
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date | string, options: Intl.DateTimeFormatOptions = {}) {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  };
  
  return new Date(date).toLocaleDateString(undefined, defaultOptions);
}

/**
 * 에러 메시지를 추출하는 유틸리티 함수
 * @param error 에러 객체
 * @returns 에러 메시지 문자열
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

/**
 * 텍스트를 자르는 유틸리티 함수
 * @param text 원본 텍스트
 * @param maxLength 최대 길이
 * @returns 잘린 텍스트
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * 디바운스 함수
 * @param fn 실행할 함수
 * @param delay 지연 시간 (ms)
 * @returns 디바운스된 함수
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}