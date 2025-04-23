import React from "react";
import { View } from "react-native";

import Text from "components/Text";
import {
  useStyleSheet,
  StyleService,
  Avatar,
  useTheme,
} from "@ui-kitten/components";
import { UserProps } from "constants/Types";
import Flex from "components/Flex";
export interface ApplicationItemProps {
  id: number;
  user: UserProps;
  title: string;
  jobCare: string;
  nonRead: boolean;
  time: string;
}
interface NotificationProps {
  item: ApplicationItemProps;
  onPress?(): void;
}

const ApplicationItem = ({ item, onPress }: NotificationProps) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  return (
    <Flex style={styles.container} justify="flex-start" onPress={onPress}>
      <View
        style={[
          styles.dot,
          {
            backgroundColor: item.nonRead
              ? theme["color-danger-100"]
              : undefined,
          },
        ]}
      />
      <Avatar
        source={item.user.avatar}
        shape="rounded"
        size={"tiny"}
        /* @ts-ignore */
        style={styles.avatar}
      />
      <View>
        <Text category="h7" mr={100}>
          {item.user.name}
          <Text category="h7-s"> {item.title}</Text>
        </Text>

        <Text category="h8" mv={8}>
          Job care:
          <Text category="h8-s"> {item.jobCare}</Text>
        </Text>
        <Text category="h8-s" status={"placeholder"}>
          {item.time}
        </Text>
      </View>
    </Flex>
  );
};

export default ApplicationItem;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 22,
  },
  avatar: {
    marginTop: 4,
    marginRight: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 24,
    marginHorizontal: 8,
    marginTop: 22,
  },
});
