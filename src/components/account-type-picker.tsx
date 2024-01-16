import {Picker} from '@react-native-picker/picker';
import React, {FC} from 'react';
import {LoginAccountType} from '../models/login-payload';

type AccountTypePickerProps = {
  selectedType: LoginAccountType;
  onNewTypeSelected: (newType: LoginAccountType) => void;
};

export const AccountTypePicker: FC<AccountTypePickerProps> = ({
  onNewTypeSelected,
  selectedType,
}) => {
  return (
    <Picker selectedValue={selectedType} onValueChange={onNewTypeSelected}>
      {Object.values(LoginAccountType).map(accountType => (
        <Picker.Item
          label={accountType}
          value={accountType}
          key={accountType}
        />
      ))}
    </Picker>
  );
};
