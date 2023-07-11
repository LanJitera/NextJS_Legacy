export enum IdValues {}

export enum CreatedAtValues {}

export enum UpdatedAtValues {}

export enum PartyIdValues {}

export enum UserIdValues {}

export enum CommentValues {}

export enum IdCmtrepValues {}

export type CommentModel = {
  id: number;
  created_at: Date;
  updated_at: Date;
  party_id: string;
  user_id: string;
  comment: string;
  id_cmtrep: number;
};

export type CommentModels = CommentModel[];
