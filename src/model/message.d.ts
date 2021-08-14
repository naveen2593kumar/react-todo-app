/**
 * Message type
 */
export type MessageType = 'success' | 'info' | 'error' | 'warning';

export interface IMessage {
    type: MessageType,
    text: string,
}