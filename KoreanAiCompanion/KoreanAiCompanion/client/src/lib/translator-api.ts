import { apiRequest } from "./queryClient";
import type { Conversation, Message, FeedbackEntry, LearningMetrics, LearningPattern } from "@shared/schema";
import { getErrorMessage } from "./utils";

/**
 * 번역기 API 클라이언트
 * 서버와의 통신을 담당하는 함수들을 제공합니다.
 */
export const translatorApi = {
  // Conversations
  /**
   * 모든 대화 목록을 가져옵니다.
   * @returns 대화 목록
   */
  getConversations: async (): Promise<Conversation[]> => {
    try {
      const response = await apiRequest("GET", "/api/conversations");
      return response.json();
    } catch (error) {
      console.error("대화 목록 조회 실패:", getErrorMessage(error));
      throw error;
    }
  },

  /**
   * 특정 ID의 대화를 가져옵니다.
   * @param id 대화 ID
   * @returns 대화 정보
   */
  getConversation: async (id: number): Promise<Conversation> => {
    try {
      const response = await apiRequest("GET", `/api/conversations/${id}`);
      return response.json();
    } catch (error) {
      console.error(`대화 ID ${id} 조회 실패:`, getErrorMessage(error));
      throw error;
    }
  },

  /**
   * 새 대화를 생성합니다.
   * @param title 대화 제목
   * @returns 생성된 대화 정보
   */
  createConversation: async (title: string): Promise<Conversation> => {
    try {
      const response = await apiRequest("POST", "/api/conversations", {
        title,
        totalExchanges: 0,
        accuracyImprovement: 0,
        status: "active",
      });
      return response.json();
    } catch (error) {
      console.error("대화 생성 실패:", getErrorMessage(error));
      throw error;
    }
  },

  // Messages
  /**
   * 특정 대화의 메시지 목록을 가져옵니다.
   * @param conversationId 대화 ID
   * @returns 메시지 목록
   */
  getMessages: async (conversationId: number): Promise<Message[]> => {
    try {
      const response = await apiRequest("GET", `/api/conversations/${conversationId}/messages`);
      return response.json();
    } catch (error) {
      console.error(`대화 ID ${conversationId}의 메시지 조회 실패:`, getErrorMessage(error));
      throw error;
    }
  },

  /**
   * 메시지를 전송합니다.
   * @param conversationId 대화 ID
   * @param content 메시지 내용
   * @param language 언어 코드 (ko, en)
   * @param isUser 사용자 메시지 여부
   * @returns 저장된 메시지 정보
   */
  sendMessage: async (
    conversationId: number,
    content: string,
    language: string,
    isUser: boolean = true
  ): Promise<Message> => {
    try {
      const response = await apiRequest("POST", "/api/messages", {
        conversationId,
        content,
        language,
        isUser,
        contextScore: 0,
      });
      return response.json();
    } catch (error) {
      console.error("메시지 전송 실패:", getErrorMessage(error));
      throw error;
    }
  },

  // Feedback
  /**
   * 피드백을 제출합니다.
   * @param messageId 메시지 ID
   * @param feedbackType 피드백 유형 (positive, negative, suggestion)
   * @param category 피드백 카테고리 (선택 사항)
   * @param suggestion 개선 제안 (선택 사항)
   * @returns 저장된 피드백 정보
   */
  submitFeedback: async (
    messageId: number,
    feedbackType: "positive" | "negative" | "suggestion",
    category?: string,
    suggestion?: string
  ): Promise<FeedbackEntry> => {
    try {
      const response = await apiRequest("POST", "/api/feedback", {
        messageId,
        feedbackType,
        category,
        suggestion,
      });
      return response.json();
    } catch (error) {
      console.error("피드백 제출 실패:", getErrorMessage(error));
      throw error;
    }
  },

  // Learning metrics
  /**
   * 학습 메트릭을 가져옵니다.
   * @returns 학습 메트릭 정보
   */
  getLearningMetrics: async (): Promise<LearningMetrics> => {
    try {
      const response = await apiRequest("GET", "/api/learning-metrics");
      return response.json();
    } catch (error) {
      console.error("학습 메트릭 조회 실패:", getErrorMessage(error));
      throw error;
    }
  },

  // Learning patterns
  /**
   * 학습 패턴을 가져옵니다.
   * @returns 학습 패턴 목록
   */
  getLearningPatterns: async (): Promise<LearningPattern[]> => {
    try {
      const response = await apiRequest("GET", "/api/learning-patterns");
      return response.json();
    } catch (error) {
      console.error("학습 패턴 조회 실패:", getErrorMessage(error));
      throw error;
    }
  },
};