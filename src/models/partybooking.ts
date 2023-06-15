export enum IdValues {}

export enum CreatedAtValues {}

export enum UpdatedAtValues {}

export enum UserIdValues {}

export enum PartyIdValues {}

export enum StatusValues {
  Approve = "Approve",
  Reject = "Reject",
  Unvalue = "Unvalue",
}

export type PartybookingModel = {
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  party_id: string;
  status: StatusValues;
};

export type PartybookingModels = PartybookingModel[];
