import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
  WhereFilterOp,
} from "firebase/firestore";

// alert type
export interface AlertType {
  title?: string;
  content?: React.ReactNode;
  callback?: () => void;
  confirm?: () => void;
  show: boolean;
}

// lastvisible type
export type LastVisibleType =
  | QueryDocumentSnapshot<DocumentData>
  | DocumentSnapshot<DocumentData>
  | string
  | null;

// user type
export type UserType = {
  uid: string;
  name: string;
  email: string;
} | null;

// where config type
export type WhereConfigType = {
  field: string;
  operator: WhereFilterOp;
  value: any;
};

export type DiaryType = {
  text: string | null;
  id: string | null;
  weather: string | null;
  date: string | null;
} | null;
