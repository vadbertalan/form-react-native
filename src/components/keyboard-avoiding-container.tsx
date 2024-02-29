import React, {FC} from 'react';

import {
  KeyboardAvoidingView,
  View,
  Platform,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type KeyboardAvoidingContainerProps = {
  style?: StyleProp<ViewStyle>;
} & React.PropsWithChildren;

/**
 * A container component which resolves the input field covered by the Keyboard issue on iOS.
 *
 * If the keyboard covers an input field on Android then check if the `windowSoftInputMode`
 * is properly set in the `AndroidManifest.xml` file. Android documentation can be found
 * [here](https://developer.android.com/guide/topics/manifest/activity-element#wsoft).
 *
 * If the keyboard covers the selected input field on iOS then check if the `keyboardVerticalOffset`
 * property is correctly set to the distance between the top of the screen and the
 * container and make sure that the children are nested into scrollable component.
 */
export const KeyboardAvoidingContainer: FC<KeyboardAvoidingContainerProps> = ({
  style,
  children,
}) => {
  // TODO: header height must be accounted for
  // const headerHeight = useHeaderHeight();

  const topInset = useSafeAreaInsets().top;

  const containerStyle = StyleSheet.flatten([styles.container, style]);

  return Platform.select({
    ios: (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={topInset}
        style={containerStyle}>
        {children}
      </KeyboardAvoidingView>
    ),
    /**
     * NOTE: on Android the children property it's wrapped in a view,
     * so the same style applies for the container as it is on iOS.
     */
    android: <View style={containerStyle}>{children}</View>,
    default: null,
  });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
