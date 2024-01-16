import React, {FC, ReactNode} from 'react';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {METRICS} from '../style/common-styles';

export const ScreenContainer: FC<{
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}> = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.safeArea, style]}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: METRICS.basePadding},
  safeArea: {
    flex: 1,
  },
});
