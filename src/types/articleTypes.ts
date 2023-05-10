export type TGetArticle = {
  createdAt: string;
  region: string;
  temp_now: number;
  temp_feels: number;
  temp_min: number;
  temp_max: number;
  description: string;
  image: string;
  id: string;
  userId: string;
};

export type TPostArticle = {
  region: string;
  temp_now: number;
  temp_feels: number;
  temp_min: number;
  temp_max: number;
  description: string;
  image: File;
};

export type TSubmitForm = {
  description: string;
  image: FileList | null;
};

export type TPostProfile = {
  nickname: string;
  image: File | null;
};

export type TProfileForm = {
  nickname: string;
  image: FileList | null;
};
