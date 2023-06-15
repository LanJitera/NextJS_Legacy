export enum IdValues {}

export enum CreatedAtValues {}

export enum UpdatedAtValues {}

export enum NamepartyValues {}

export enum PartystarttimeValues {}

export enum PartylocationValues {}

export enum NumberofpeopleValues {}

export enum IsstatusValues {
  Public = "Public",
  Draft = "Draft",
  Close = "Close",
  Private = "Private",
}

export enum AdminIdValues {}

export enum DescribeValues {}

export enum RequiredageValues {}

export enum ImgValues {}

export type PartyModel = {
  id: number;
  created_at: Date;
  updated_at: Date;
  nameparty: string;
  partystarttime: Date;
  partylocation: string;
  numberofpeople: number;
  isstatus: IsstatusValues;
  admin_id: string;
  describe: string;
  requiredage: number;
  img: any;
};

export type PartyModels = PartyModel[];
