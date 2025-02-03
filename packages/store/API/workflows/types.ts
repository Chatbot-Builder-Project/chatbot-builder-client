export interface Chatbot {
  id: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  description: string;
  isPublic: boolean;
  avatarImage: string | null;
  visual: {
    data: any;
  };
}

export interface ChatbotsPage {
  page: {
    totalCount: number;
    items: Chatbot[];
  };
}
