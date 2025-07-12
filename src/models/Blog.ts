import { User } from '@/models/User';
export interface Blog {
  id: string;
  title: string;
  shortDescription: string;
  htmlContent: string;
  coverPhotoURL: string;
  coverPhotoName: string;
  isPublished: boolean;
  createdDate: string;
  lastEditedDate: string;
  authorID: String;
  welcomeScreen: boolean | false;
}
