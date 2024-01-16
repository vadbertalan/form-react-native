export enum LoginAccountType {
  Manual = 'Manual',
  Advanced = 'Advanced',
}

export type LoginFormData = {
  accountType: LoginAccountType;
  username: string;
  password: string;
  serverAddress?: string;
  serverPath?: string;
  port?: number;
  useSsl: boolean;
};

export type LoginPayload = {
  username: string;
  password: string;
};
