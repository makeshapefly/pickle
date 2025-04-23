import React, { memo } from "react";
import {
  Bubble,
  GiftedChat,
  IMessage,
  Send,
  InputToolbarProps,
  InputToolbar,
  SendProps,
  MessageImage,
  BubbleProps,
} from "react-native-gifted-chat";
import {
  Icon,
  StyleService,
  TopNavigation,
  useStyleSheet,
  useTheme,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { DATA_CHAT } from "constants/Data";
import { globalStyle } from "styles/globalStyle";
import { Platform } from "react-native";
import Flex from "components/Flex";
import Composer from "./Components/Composer";
import useKeyboard from "hooks/useKeyboard";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";
import AttachItem from "./Components/AttachItem";

const Chat = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { width, bottom } = useLayout();
  const { keyboardShow } = useKeyboard();
  const [messages, setMessages] = React.useState<IMessage[]>([]);
  const theme = useTheme();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const [showAction, setShowAction] = React.useState(false);

  React.useEffect(() => {
    setMessages(DATA_CHAT);
    if (keyboardShow) {
      setShowAction(false);
    }
  }, [keyboardShow]);
  const onSend = React.useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  const renderBubble = React.useCallback((props: BubbleProps<IMessage>) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: [
            styles.wrapperLeftStyle,
            {
              backgroundColor: props.currentMessage?.image
                ? "transparent"
                : theme["background-basic-color-3"],
            },
            { maxWidth: 267 * (width / 375) },
          ],
          right: [
            styles.wrapperRightStyle,
            {
              backgroundColor: props.currentMessage?.image
                ? "transparent"
                : theme["button-basic-color"],
            },
            { maxWidth: 267 * (width / 375) },
          ],
        }}
        textStyle={{
          left: styles.leftTextStyle,
          right: styles.rightTextStyle,
        }}
      />
    );
  }, []);
  const renderSend = (props: SendProps<IMessage>) => (
    <Send {...props} containerStyle={styles.containerSend}>
      <Icon pack="assets" name="send" style={styles.iconSend} />
    </Send>
  );

  const renderInputToolbar = React.useCallback(
    (props: InputToolbarProps) => (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: theme["background-basic-color-2"],
        }}
        primaryStyle={{
          alignItems: "center",
          backgroundColor: theme["background-basic-color-3"],
          borderRadius: 8,
          marginRight: 16,
          marginTop: 8,
          marginBottom: Platform.OS === "android" ? 8 : 24,
          marginLeft: keyboardShow ? 56 : 144,
        }}
        accessoryStyle={{
          position: "absolute",
          bottom: 0,
        }}
        renderAccessory={() => (
          <Composer
            onShowAction={() => setShowAction(!showAction)}
            style={[
              styles.composer,
              {
                bottom: Platform.OS == "ios" ? bottom : 16,
              },
            ]}
          />
        )}
      />
    ),
    [showAction, Platform.OS, keyboardShow]
  );

  const onAttach = React.useCallback(() => {}, []);
  const onMakeCall = React.useCallback(() => {
    navigate("MessagesStack", { screen: "VideoCall" });
  }, []);
  const onRequestPayment = React.useCallback(() => {}, []);

  return (
    <Container style={[styles.container, { marginBottom: -bottom }]}>
      <TopNavigation
        title={"Marian Ramsey"}
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="option" />}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        extraScrollHeight={28}
      >
        <GiftedChat
          user={{ _id: 1 }}
          messages={messages}
          onSend={onSend}
          renderBubble={renderBubble}
          imageStyle={{}}
          renderTime={() => null}
          renderSend={renderSend}
          messagesContainerStyle={{ paddingBottom: 32 }}
          renderInputToolbar={renderInputToolbar}
          showUserAvatar
          alwaysShowSend
          renderMessageImage={(props) => {
            return (
              <MessageImage
                {...props}
                containerStyle={{ width: 247, height: 160 }}
                imageStyle={{ width: 247, height: 160 }}
              />
            );
          }}
        />
        {showAction === true ? (
          <Layout level={"3"}>
            <Flex margin={32}>
              <AttachItem
                title={"Attach Files"}
                icon={"attach"}
                _onPress={onAttach}
              />
              <AttachItem
                title={"Make a Call"}
                icon={"call"}
                _onPress={onMakeCall}
              />
              <AttachItem
                title={"Request a Payment"}
                icon={"payment"}
                _onPress={onRequestPayment}
              />
            </Flex>
          </Layout>
        ) : null}
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default Chat;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  composer: {
    position: "absolute",
    left: 0,
    zIndex: 10,
  },
  containerSend: {
    backgroundColor: "transparent",
  },
  leftTextStyle: {
    color: "text-basic-color",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 24,
    fontFamily: "GothamPro",
  },
  rightTextStyle: {
    color: "text-primary-color",
    fontSize: 15,
    fontWeight: "400",
    lineHeight: 24,
    fontFamily: "GothamPro",
  },
  wrapperLeftStyle: {
    borderBottomLeftRadius: 4,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  wrapperRightStyle: {
    borderBottomRightRadius: 4,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8
  },
  iconSend: {
    tintColor: "button-basic-color",
    ...globalStyle.icon24,
    marginBottom: 10,
    marginRight: 12,
  },
});
