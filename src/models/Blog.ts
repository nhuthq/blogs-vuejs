import { User } from '@/models/User';
export interface Blog {
  id: string;
  title: string;
  content: string;
  coverPhoto: string;
  coverPhotoName: string;
  isPublished: boolean;
  createdDate: string;
  lastEditedDate: string;
  author: User;
  welcomeScreen: boolean | false;
}
