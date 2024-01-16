import {Picker} from '@react-native-picker/picker';
import React, {FC} from 'react';
import {LoginAccountType} from '../models/login-payload';
import {StyleSheet, View} from 'react-native';
import {COLORS, METRICS} from '../style/common-styles';

type AccountTypePickerProps = {
  selectedType: LoginAccountType;
  onNewTypeSelected: (newType: LoginAccountType) => void;
};

export const AccountTypePicker: FC<AccountTypePickerProps> = ({
  onNewTypeSelected,
  selectedType,
}) => {
  return (
    <View style={styles.container}>
      <Picker selectedValue={selectedType} onValueChange={onNewTypeSelected}>
        {Object.values(LoginAccountType).map(accountType => (
          <Picker.Item
            label={accountType}
            value={accountType}
            key={accountType}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.line,
    borderBottomLeftRadius: METRICS.baseBorderRadius,
    margin: METRICS.baseMargin,
  },
});
