import React from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import theme from '../../assets/theme';
import useSign from '../hooks/useSign';
import InputDefault from '../ui/InputDefault';
import {PASSWORD_REGEX} from '../../constants';

/** Exemplo com styled components */
import {Container, Body, Button, ButtonText} from './styled';

const validationSchema = () =>
  Yup.object().shape({
    name: Yup.string().required(`required_field`),
    email: Yup.string().required(`required_field`).email(`invalid_email`),
    password: Yup.string()
      .required(`required_field`)
      .test(`password`, `password_shoud_be_equeal_or_more_than_eight`, pw => {
        if (pw) {
          return String(pw).length >= 8 && !!pw?.match(PASSWORD_REGEX);
        }
        return true;
      }),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref(`password`), null], `passwords_must_match`)
      .required(`required_field`),
  });

const SignUpScreen = () => {
  const {t, handleSignUp} = useSign();

  const {values, handleSubmit, handleChange, errors} = useFormik({
    initialValues: {name: ``, email: ``, password: ``},
    validationSchema: validationSchema(),
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: handleSignUp,
  });

  return (
    <Container bgcolor={theme.colors.purple}>
      <Body>
        <InputDefault
          type="text"
          label="name"
          placeholder={t(`name`)}
          value={values.name}
          onChangeText={handleChange(`name`)}
          errors={errors}
          bordercolor={theme.colors.dark}
        />
        <InputDefault
          type="email"
          label="email"
          placeholder={t(`email`)}
          value={values.email}
          onChangeText={handleChange(`email`)}
          errors={errors}
          bordercolor={theme.colors.dark}
        />
        <InputDefault
          type="password"
          label="passowrd"
          placeholder={t(`password`)}
          value={values.password}
          onChangeText={handleChange(`password`)}
          errors={errors}
          bordercolor={theme.colors.dark}
          secureTextEntry
        />
        <InputDefault
          type="passwordConfirmation"
          label="passwordConfirmation"
          placeholder={t(`passwordConfirmation`)}
          value={values.passwordConfirmation}
          onChangeText={handleChange(`passwordConfirmation`)}
          errors={errors}
          bordercolor={theme.colors.dark}
          secureTextEntry
        />
        <Button bgcolor={theme.colors.dark} onPress={handleSubmit}>
          <ButtonText color={theme.colors.gray}>{t(`action:register`)}</ButtonText>
        </Button>
      </Body>
    </Container>
  );
};

export default SignUpScreen;
