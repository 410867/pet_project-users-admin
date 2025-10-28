export type Option = { name: string; value: string };

export type StatusValue = "ALL" | "ACTIVE" | "DISABLED";

export type UserItem = {
  name: string;
  status: Option;
  department: Option;
  country: Option;
};
