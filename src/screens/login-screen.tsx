import React, {FC, useCallback} from 'react';
import {Button, ScrollView, StyleSheet, View} from 'react-native';
import * as Yup from 'yup';
import {useFormik} from 'formik';

import {ScreenContainer} from '../components/screen-container';
import {LoginAccountType, LoginFormData} from '../models/login-payload';
import {
  ApiClient,
  DEFAULT_SERVER_ADDRESS,
  DEFAULT_SERVER_PATH,
  DEFAULT_SERVER_PORT,
} from '../services/api-client';
import {Input, Switch, Text} from '@rneui/base';
import {METRICS} from '../style/common-styles';
import {AccountTypePicker} from '../components/account-type-picker';

const SSL_PORT = 443;

const PORT_MIN = 0;
const PORT_MAX = 65353;

const USERNAME_INPUT_MAX_LENGTH = 50;
const PASSWORD_INPUT_MAX_LENGTH = 50;
const SERVER_ADDRESS_INPUT_MAX_LENGTH = 50;
const SERVER_PATH_INPUT_MAX_LENGTH = 50;

const initialValues: LoginFormData = {
  accountType: LoginAccountType.Manual,
  username: '',
  password: '',
  serverAddress: DEFAULT_SERVER_ADDRESS,
  serverPath: DEFAULT_SERVER_PATH,
  port: DEFAULT_SERVER_PORT,
  useSsl: false,
};

const initialValidationSchema = Yup.object({
  accountType: Yup.string().oneOf(Object.values(LoginAccountType)),
  username: Yup.string()
    .required('Username is mandatory')
    .max(
      USERNAME_INPUT_MAX_LENGTH,
      `Must be ${USERNAME_INPUT_MAX_LENGTH} characters or less`,
    )
    .email('Must have valid email format'),
  password: Yup.string()
    .required('Password is mandatory')
    .max(
      PASSWORD_INPUT_MAX_LENGTH,
      `Must be ${PASSWORD_INPUT_MAX_LENGTH} characters or less`,
    ),
  serverAddress: Yup.string().max(
    SERVER_ADDRESS_INPUT_MAX_LENGTH,
    `Must be ${SERVER_ADDRESS_INPUT_MAX_LENGTH} characters or less`,
  ),
  serverPath: Yup.string()
    .matches(
      /^[a-zA-Z0-9]+$/,
      'Must be a valid server path (alphanumeric, `/`)',
    )
    .max(
      SERVER_PATH_INPUT_MAX_LENGTH,
      `Must be ${SERVER_PATH_INPUT_MAX_LENGTH} characters or less`,
    ),
  port: Yup.number()
    .min(PORT_MIN, `Port must be at least ${PORT_MIN}`)
    .max(PORT_MAX, `Port must be at least ${PORT_MAX}`),
  useSsl: Yup.bool().required(),
});

const onSubmit = async (values: LoginFormData) => {
  if (values.accountType === LoginAccountType.Manual) {
    values.serverPath = DEFAULT_SERVER_PATH;
    values.serverAddress = DEFAULT_SERVER_ADDRESS;
    values.port = DEFAULT_SERVER_PORT;
  }

  if (values.useSsl) {
    values.port = 443;
  }
  await ApiClient.login(values);
};

export const LoginScreen: FC = () => {
  const {setFieldValue, handleChange, values, errors, isValid, submitForm} =
    useFormik<LoginFormData>({
      initialValues,
      onSubmit,
      validationSchema: initialValidationSchema,
    });

  const proxySubmit = useCallback(async () => {
    try {
      // This Formik function sets the isValid state var that is returned
      // by Formik. Initially the submit button isn't disabled.
      await submitForm();
    } catch (error) {
      console.debug('Error happened while submitting the CM form', error);
      // TODO tell user error message (toast?)
    }
  }, [submitForm]);

  const setAccountType = useCallback(
    (newAccountType: LoginAccountType) => {
      if (newAccountType !== values.accountType) {
        setFieldValue('accountType', newAccountType);
      }
    },
    [setFieldValue, values.accountType],
  );

  const toggleUseSslCheckbox = useCallback(() => {
    setFieldValue('useSsl', !values.useSsl);
  }, [setFieldValue, values.useSsl]);

  return (
    <ScreenContainer>
      <ScrollView style={styles.scrollViewContainer}>
        <Text style={styles.label}>Account type:</Text>
        <AccountTypePicker
          onNewTypeSelected={setAccountType}
          selectedType={values.accountType}
        />

        <Input
          label={'User Name:'}
          value={values.username}
          maxLength={USERNAME_INPUT_MAX_LENGTH + 1}
          onChangeText={handleChange('username')}
          errorMessage={errors.username}
          placeholder="Name@example.com"
        />

        <Input
          label={'Password:'}
          value={values.password}
          maxLength={PASSWORD_INPUT_MAX_LENGTH + 1}
          onChangeText={handleChange('password')}
          errorMessage={errors.password}
          secureTextEntry
          placeholder="Required"
        />

        <Input
          label={'Server Address:'}
          value={values.serverAddress}
          maxLength={SERVER_ADDRESS_INPUT_MAX_LENGTH + 1}
          onChangeText={handleChange('serverAddress')}
          errorMessage={errors.serverAddress}
          placeholder="example.com"
        />

        {values.accountType === LoginAccountType.Advanced && (
          <>
            <Input
              label={'Server Path:'}
              value={values.serverPath}
              maxLength={SERVER_PATH_INPUT_MAX_LENGTH + 1}
              onChangeText={handleChange('serverPath')}
              errorMessage={errors.serverPath}
              placeholder="/calendars/user"
            />

            <View style={styles.portContainer}>
              <Input
                disabled={values.useSsl}
                keyboardType="number-pad"
                label={'Port:'}
                value={String(values.useSsl ? SSL_PORT : values.port)}
                maxLength={SERVER_PATH_INPUT_MAX_LENGTH + 1}
                onChangeText={handleChange('port')}
                errorMessage={errors.port}
                containerStyle={styles.portInputContainer}
              />

              <View style={styles.switchContainer}>
                <Text style={styles.useSslText}>Use SSL</Text>
                <Switch
                  value={values.useSsl}
                  onValueChange={toggleUseSslCheckbox}
                />
              </View>
            </View>
          </>
        )}

        <Button title={'Submit'} onPress={proxySubmit} disabled={!isValid} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {flex: 1},
  portContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: METRICS.basePadding,
  },
  portInputContainer: {width: '50%'},
  useSslText: {fontSize: 16},
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#88939d',
    marginLeft: METRICS.baseMargin,
  },
});
