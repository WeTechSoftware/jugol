export interface IConversationProps {
  profilePic: string;
  name: string;
  lastMessage: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  unread: number;
  userID: string;
  firebaseID: string;
  files: string[];
  currentUser: string;
  isBlocked: boolean;
  blockedByYou: boolean;
  blockedBySomeone: boolean;
  isActive?: boolean;
  currentUserFirebaseId: string;
}