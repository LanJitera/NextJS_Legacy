export enum IdValues {}

export enum CreatedAtValues {}

export enum UpdatedAtValues {}

export enum NameValues {}

export enum EncryptedPasswordValues {}

export enum EmailValues {}

export enum ResetPasswordTokenValues {}

export enum ResetPasswordSentAtValues {}

export enum RememberCreatedAtValues {}

export enum CurrentSignInAtValues {}

export enum LastSignInAtValues {}

export enum CurrentSignInIpValues {}

export enum LastSignInIpValues {}

export enum SignInCountValues {}

export enum PasswordValues {}

export enum PasswordConfirmationValues {}

export enum LockedAtValues {}

export enum FailedAttemptsValues {}

export enum UnlockTokenValues {}

export enum ConfirmationTokenValues {}

export enum UnconfirmedEmailValues {}

export enum ConfirmedAtValues {}

export enum ConfirmationSentAtValues {}

export type AdminModel = {
  id: number;
  created_at: Date;
  updated_at: Date;
  name: string;
  encrypted_password: string;
  email: string;
  reset_password_token: string;
  reset_password_sent_at: Date;
  remember_created_at: Date;
  current_sign_in_at: Date;
  last_sign_in_at: Date;
  current_sign_in_ip: string;
  last_sign_in_ip: string;
  sign_in_count: number;
  password: string;
  password_confirmation: string;
  locked_at: Date;
  failed_attempts: number;
  unlock_token: string;
  confirmation_token: string;
  unconfirmed_email: string;
  confirmed_at: Date;
  confirmation_sent_at: Date;
};

export type AdminModels = AdminModel[];
