export interface PostSummary {
  id: string;
  title: string;
  content: string;
  isAnnouncement: boolean;
  isAnonymous: boolean;
  isPinned: boolean;
  isHidden: boolean;
  isEvent?: boolean | undefined;
  lastModified: Date;
  author: string;
  // upvoteCount: number;
}
