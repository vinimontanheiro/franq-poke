import styled from 'styled-components';
import theme from '../../assets/theme';

/** Exemplo com styled components */

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  background-color: ${({bgcolor}) => bgcolor};
`;

export const Body = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  width: 90%;
  height: 55px;
  padding: 5px;
  background-color: ${({bgcolor}) => bgcolor};
  margin-top: 25px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: ${({color}) => color};
  text-transform: uppercase;
  text-align: center;
`;

export const GoogleButton = styled(Button)`
  background-color: ${theme.colors.white};
  margin-top: 10px;
`;

export const GoogleImage = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const Logo = styled.Image`
  width: 170px;
  height: 100px;
`;

export const Footer = styled.View`
  flex: 0.3;
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  padding: 20px;
`;

export const NoAccountText = styled(ButtonText)`
  margin-right: 4px;
`;
