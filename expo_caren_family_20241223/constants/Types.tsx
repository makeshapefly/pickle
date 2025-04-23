import {EvaStatus} from '@ui-kitten/components/devsupport';
import {ImageRequireSource, TextStyle, ViewStyle} from 'react-native';
import {AnimatedRegion, LatLng} from 'react-native-maps';
import * as ImagePicker from 'react-native-image-picker';

export enum EKeyAsyncStorage {
  theme = 'theme',
  intro = 'intro',
}
export enum Animation_Types_Enum {
  SlideTop,
  SlideBottom,
  SlideInRight,
  SlideInLeft,
}
export interface ButtonType {
  status?: EvaStatus;
  title: string;
  onPress: () => void;
}
export interface UserProps {
  name: string;
  id: number | string;
  avatar: ImageRequireSource;
  age: number;
  onlineState?: Onl_State_Types_Enum;
  gender?: Gender_Type;
  experience?: string;
  backgroundCheck?: boolean;
  carePro?: boolean;
  rate?: number;
  address?: string;
  distance?: string;
  reviews?: number;
  hourlyRate?: string;
  cared?: number;
  mapLocation: LatLng | AnimatedRegion;
}
export interface SuccessScreenType {
  image?: ImageRequireSource;
  title?: string;
  description?: string;
  children?: ButtonType[] | null;
  buttonsViewStyle?: ViewStyle;
  logo?: boolean;
}
export interface WeekdaysProps {
  title: string;
  isActive: boolean;
}
export interface JobItemProps {
  id: number;
  title: string;
  avatar: ImageRequireSource;
  children: number;
  ageType: string;
  name: string;
  location: string;
  startTime: string;
  hour: string;
  applicants: number;
  price: string;
  howOften?: string;
  dayInWeek?: WeekdaysProps[];
  online: boolean;
  mile: number;
  coordinate?: LatLng | AnimatedRegion;
}

export interface MessagesItemProps {
  id: number;
  name: string;
  title: string;
  readed: boolean;
  time: string;
  isWeb: boolean;
  onlineState: Onl_State_Types_Enum;
  avatar: ImageRequireSource;
}
export enum Onl_State_Types_Enum {
  Online,
  Offline,
  LiveStream,
  JustLeave,
}
export interface RequestInterviewItemProps {
  type: Request_Status_Type_Enum;
  avatar: ImageRequireSource;
  name: string;
  dateIn: string;
  time: Date | number; // number is time stamp
  status: Onl_State_Types_Enum;
}
export interface PlanProps {
  id: number | string;
  type?: Request_Type_Enum;
  date?: number | Date;
  meeting_time?: string;
  title?: string;
  user?: UserProps;
}

export interface CaregiverCardProps {
  name: string;
  age: number;
  avatar: ImageRequireSource;
  yearExp: number;
  location: string;
  rate: {rateNumber: number; review: number};
  price: string;
  caredFamily: number;
  gender: 'male' | 'female';
  backgroundCheck: boolean;
  carePro: boolean;
  onlineStatus: Onl_State_Types_Enum;
}

export enum Request_Status_Type_Enum {
  Accepted = 'Accepted',
  Unconfirmed = 'Unconfirmed',
  Completed = 'Completed',
  Declined = 'Declined',
  Canceled = 'Canceled',
}
export enum Request_Type_Enum {
  Interview = 'Interview',
  Booking = 'Booking',
  Application = 'Application',
}
// Credit Card type
export interface FormModel {
  holderName: string;
  cardNumber: string;
  expiration: string;
  cvv: string;
}
export enum Gender_Type {
  Male = 'male',
  Female = 'female',
}
export enum CardFields {
  CardNumber,
  CardHolderName,
  Expiration,
  CVV,
}

export type TranslationsNonNull = {
  cardNumber: string;
  cardHolderName: string;
  nameSurname: string;
  mmYY: string;
  expiration: string;
  securityCode: string;
  next: string;
  done: string;
  cardNumberRequired: string;
  cardNumberInvalid: string;
  cardHolderNameRequired: string;
  cardHolderNameInvalid: string;
  expirationRequired: string;
  expirationInvalid: string;
  securityCodeRequired: string;
  securityCodeInvalid: string;
};
type Partial<T> = {
  [P in keyof T]?: T[P];
};
export type Translations = Partial<TranslationsNonNull>;

type Style = ViewStyle | TextStyle;
export type Overrides = {
  cardPreview?: Style;
  labelText?: TextStyle;
  cardHolderPreview?: TextStyle;
  expirationPreview?: Style;
  outline?: ViewStyle;
  input?: ViewStyle;
  button?: ViewStyle;
  labelContainer?: ViewStyle;
  inputLabel?: TextStyle;
  errorText?: TextStyle;
};

export type InputColors = {
  focused?: string;
  errored?: string;
  regular?: string;
};

export type Fonts = {
  regular?: string;
  bold?: string;
};

export type LibraryProps = {
  LottieView?: any;
  horizontalStart?: boolean;
  formOnly?: boolean;
  requiresName?: boolean;
  backgroundImage?: React.ReactNode;
  translations?: Translations;
  inputColors?: InputColors;
  fonts?: Fonts;
  overrides?: Overrides;
};
export interface CreatPostChildren {
  name: string;
  typeAge: string;
  checked:boolean
}
export interface ActionPickerImage {
  title?: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}
