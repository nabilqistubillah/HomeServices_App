export type Business = {
  images: { url: string }[];
  contactPerson: string;
  name: string;
  address: string;
};

export type RootStackParamList = {
  'business-detail': { business: Business };
  HomeScreen: undefined;
  LoginScreen: undefined;
  ProfileScreen: undefined;
};
