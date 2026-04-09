export type PostStatus = "pending" | "approved" | "rejected";

export interface Client {
  id: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface Post {
  id: string;
  client_id: string;
  date: string;
  theme: string;
  description: string;
  hashtags: string;
  media_url: string | null;
  docs_url: string | null;
  status: PostStatus;
  created_at: string;
}

export interface ApprovalToken {
  id: string;
  client_id: string;
  token: string;
  expires_at: string;
  used: boolean;
}

export interface ApprovalCode {
  id: string;
  client_id: string;
  code: string;
  expires_at: string;
  used: boolean;
}

export interface Approval {
  id: string;
  post_id: string;
  client_id: string;
  status: "approved" | "rejected";
  note: string | null;
  approved_at: string;
}
