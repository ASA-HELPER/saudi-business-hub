export interface Title {
  id: number;
  token: string;
  identifier: string;
  created_at: string;
  updated_at: string;
}

export interface TitleState {
  titles: Title[];
  loading: boolean;
  error: string | null;
}
