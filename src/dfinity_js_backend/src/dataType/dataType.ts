/**
 * Message record
 */
export type Message = {
    role: string;
    content: string;
    id: string;
  };
  
export type BaseMessage = {
    role: string;
    content: string;
  };
  
export type ConversationPayload = { userIdentity: string };
  
export type AddMessgeToConversationPayload = {
    userIdentity: string;
    conversationId: string;
    message: BaseMessage;
  };
  
export type Conversation = {
    id: string;
    conversation: Message[];
  };
  
export type ErrorMessage = { message: string };