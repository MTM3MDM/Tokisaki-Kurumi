import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, MessageSquare, TrendingUp, Clock } from "lucide-react";
import type { Conversation } from "@shared/schema";

interface ConversationHistoryProps {
  conversations: Conversation[];
  currentConversationId: number | null;
  onSelectConversation: (id: number) => void;
  onNewConversation: () => void;
}

export function ConversationHistory({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
}: ConversationHistoryProps) {
  const formatDate = (date: string | Date) => {
    const now = new Date();
    const conversationDate = typeof date === 'string' ? new Date(date) : date;
    const diffInDays = Math.floor((now.getTime() - conversationDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return `오늘, ${conversationDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
    } else if (diffInDays === 1) {
      return `어제, ${conversationDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
    } else {
      return `${diffInDays}일 전, ${conversationDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "learning":
        return "bg-orange-100 text-orange-600";
      case "completed":
        return "bg-green-100 text-green-600";
      default:
        return "bg-blue-100 text-blue-600";
    }
  };

  const getAccuracyBadgeColor = (improvement: number) => {
    if (improvement > 1.5) return "bg-green-100 text-green-600";
    if (improvement > 0) return "bg-blue-100 text-blue-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">대화 기록</h2>
        <Button size="sm" onClick={onNewConversation} className="shrink-0">
          <Plus className="w-4 h-4 mr-1" />
          새 대화
        </Button>
      </div>
      
      <ScrollArea className="h-full">
        <div className="space-y-3">
          {conversations.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 text-sm">아직 대화가 없습니다</p>
              <p className="text-gray-500 text-xs">새 대화를 시작해보세요</p>
            </div>
          ) : (
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  currentConversationId === conversation.id
                    ? "bg-blue-50 border border-blue-200"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium text-gray-900">
                    {formatDate(conversation.updatedAt)}
                  </span>
                  <div className="flex items-center space-x-1">
                    {conversation.accuracyImprovement > 0 ? (
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getAccuracyBadgeColor(conversation.accuracyImprovement)}`}
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +{conversation.accuracyImprovement.toFixed(1)}% 정확도
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getStatusColor(conversation.status)}`}
                      >
                        {conversation.status === "learning" ? "학습중" : 
                         conversation.status === "completed" ? "완료됨" : "활성화"}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 truncate mb-2">
                  {conversation.title}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 bg-blue-500 rounded-full border border-white"></div>
                      <div className="w-4 h-4 bg-green-500 rounded-full border border-white"></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {conversation.totalExchanges}회 대화
                    </span>
                  </div>
                  
                  {currentConversationId === conversation.id && (
                    <Badge variant="default" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      활성화
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
