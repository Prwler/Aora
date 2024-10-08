import { UnknownOutputParams } from "expo-router";

declare interface TabIconProps {
  icon: ImageSourcePropType | undefined;
  color: string;
  name: string;
  focused: boolean;
}

declare interface CustomButtonProps {
  title: string;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles: string;
  textStyles?: string;
  isLoading?: boolean;
}

declare interface FormFieldProps {
  title?: string;
  value?: string;
  placeholder?: string;
  handleChangeText?: (e) => void;
  otherStyles?: string;
  keyboardType?: string;
  initialQuery?: any;
}

declare interface TrendingProps {
  posts: any;
}

declare interface EmptyStateProps {
  title: string;
  subtitle: string;
}