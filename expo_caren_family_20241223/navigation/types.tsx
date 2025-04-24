import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {
  CreatPostChildren,
  Request_Status_Type_Enum,
  Request_Type_Enum,
  SuccessScreenType,
} from 'constants/Types';

export type RootStackParamList = {
  Intro: undefined;
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  NewJob: NavigatorScreenParams<NewJobStackParamList>;
  FavoritesFilter: undefined;
  SelectLanguage: undefined;
  FavoritesMap: undefined;
  Notification: undefined;
  ViewOnMap: undefined;
  CaregiverProfile: undefined;
  ProfileGallery: undefined;
  WriteReview: undefined;
  AddMorePayment: undefined;
  CaregiverPostDetails: undefined;
  MoreNavigator: NavigatorScreenParams<MoreStackParamList>;
  AddChild: undefined;
  CreateJobStack: NavigatorScreenParams<CreateJobStackParamList>;
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  FindStack: NavigatorScreenParams<FindStackParamList>;
  MessagesStack: NavigatorScreenParams<MessagesStackParamList>;
  RequestStack: NavigatorScreenParams<RequestsStackParamList>;
  MainBottomTab: undefined;
  ChangeCareType: undefined;
  FaqScreen: undefined;
  PolicyScreen: undefined;
  AboutScreen: undefined;
  SuccessScr: {
    successScr: SuccessScreenType;
  };
};
export type CreateJobStackParamList = {
  TypeOfCare: undefined;
  FrequencyDate: undefined;
  AboutYourFamily: {children: CreatPostChildren[]};
  AboutYourChild: undefined;
  HourlyRate: undefined;
  Qualifications: undefined;
  SelectResponsibilities: undefined;
  CreateJob: undefined;
  CreatePostDetails: undefined;
};
export type MainBottomTabStackParamList = {
  Home: undefined;
  Sessions: undefined;
  Messages: undefined;
  Requests: NavigatorScreenParams<RequestsBottomStackParamList>;
  More: NavigatorScreenParams<MoreStackParamList>;
};
export type AuthStackParamList = {
  Login: undefined;
  SignupFirstStep: undefined;
  SignupSecondStep: undefined;
  SignupThirdStep: undefined;
  ForgetPassword: undefined;
  NewPassword: undefined;
};
export type NewJobStackParamList = {
  TypeOfCare: undefined;
  FrequencyDate: undefined;
  AboutYourFamily: undefined;
};
export type FindStackParamList = {
  FindSrc: undefined;
  ViewOnMap: undefined;
  JobDetails: {name: string};
};
export type MessagesStackParamList = {
  Chat: undefined;
  VideoCall: undefined;
};
export type RequestsBottomStackParamList = {
  RequestsSrc: undefined;
  RequestsInPast: {requestType: Request_Type_Enum};
};
export type RequestsStackParamList = {
  RequestInterview: undefined;
  BookingRequest: undefined;
  ReviewRequestInterview: undefined;
  ReviewRequestBooking: undefined;
  ConfirmHour: undefined;
  SelectCard: undefined;
  InterviewDetails: {type: Request_Status_Type_Enum};
  BookingDetails: {type: Request_Status_Type_Enum};
  ApplicationDetails: {type: Request_Status_Type_Enum};
};

export type HomeStackParamList = {
  HomeSrc: undefined;
  MyFavorites: undefined;
};
export type MoreStackParamList = {
  MoreSrc: undefined;
  MyPost: undefined;
  EditProfile: undefined;
  PaymentMethod: undefined;
  MyChildren: undefined;
  ProfileSrc: undefined;
  ReferFriend: undefined;
};
export type ModalScreenNavigationProp = RouteProp<
  RootStackParamList,
  'SuccessScr'
>;
export type RequestsInPassScreenNavigationProp = RouteProp<
  RequestsBottomStackParamList,
  'RequestsInPast'
>;

export type JobDetailsScreenNavigationProp = RouteProp<
  FindStackParamList,
  'JobDetails'
>;
export type AboutYourFamilyScreenNavigationProp = RouteProp<
  CreateJobStackParamList,
  'AboutYourFamily'
>;
export type InterviewDetailsScreenNavigationProp = RouteProp<
  RequestsStackParamList,
  'InterviewDetails'
>;
export type BookingDetailsScreenNavigationProp = RouteProp<
  RequestsStackParamList,
  'BookingDetails'
>;
export type ApplicationDetailsScreenNavigationProp = RouteProp<
  RequestsStackParamList,
  "ApplicationDetails"
>;
