import React, {FC, useCallback, useState} from 'react';
import {Input, InputProps} from '@rneui/base';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
} from 'react-native';

import {COLORS, METRICS} from '../style/common-styles';

const FOCUSED_STYLE = {
  borderColor: COLORS.primary,
  borderWidth: 1,
  borderRadius: METRICS.baseBorderRadius,
};
const UNFOCUSED_STYLE = {borderColor: COLORS.line};

export const StyledInput: FC<InputProps> = ({
  onFocus,
  onBlur,
  ...restOfProps
}) => {
  const [isFocused, setFocused] = useState(false);

  const handleOnFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onFocus?.(e);
      setFocused(true);
    },
    [onFocus],
  );

  const handleOnBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      onBlur?.(e);
      setFocused(false);
    },
    [onBlur],
  );

  return (
    // @ts-expect-error Has a problem with ref passing.
    <Input
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      inputContainerStyle={[
        styles.inputContainer,
        isFocused ? FOCUSED_STYLE : UNFOCUSED_STYLE,
      ]}
      {...restOfProps}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {padding: METRICS.halfBasePadding},
});
