import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import GOOGLE_IMG from '../../assets/img/google.png';
import LogoSRC from '../../assets/img/logo.png';
import theme from '../../assets/theme';
import useSign from '../hooks/useSign';
import InputDefault from '../ui/InputDefault';

/** Exemplo com styled components */
import {
  Container,
  Body,
  Logo,
  Button,
  ButtonText,
  GoogleButton,
  GoogleImage,
  Footer,
  NoAccountText,
} from './styled';

const validationSchema = () =>
  Yup.object().shape({
    email: Yup.string().required(`required_field`).email(`invalid_email`),
    password: Yup.string().required(`required_field`),
  });

const SignInScreen = () => {
  const {t, handleSignIn, handleGoogleSignIn, handleGoToSignUp} = useSign();

  const {values, handleSubmit, handleChange, errors} = useFormik({
    initialValues: {email: ``, password: ``},
    validationSchema: validationSchema(),
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: handleSignIn,
  });

  return (
    <Container bgcolor={theme.colors.purple}>
      <Logo resizeMode="contain" source={LogoSRC} />
      <Body>
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
        <Button bgcolor={theme.colors.dark} onPress={handleSubmit}>
          <ButtonText color={theme.colors.gray}>{t(`login`)}</ButtonText>
        </Button>

        <GoogleButton onPress={handleGoogleSignIn}>
          <GoogleImage source={GOOGLE_IMG} />
          <ButtonText color={theme.colors.dark}>{t(`sign_in_with_google`)}</ButtonText>
        </GoogleButton>
      </Body>
      <Footer>
        <TouchableOpacity onPress={handleGoToSignUp}>
          <NoAccountText color={theme.colors.white}>{t(`has_no_account`)}</NoAccountText>
          <ButtonText color={theme.colors.white}>{t(`sign_up`)}</ButtonText>
        </TouchableOpacity>
      </Footer>
    </Container>
  );
};

export default SignInScreen;
