import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {I18nextProvider} from 'react-i18next';
import i18next from './services/i18n/i18next';
import {persistor, store} from './services/redux/store';
import Loading from './modules/ui/Loading';
import Navigator from './Navigator';
import useBootstrap from './modules/hooks/useBootstrap';
import theme from './assets/theme';

const App = () => {
  useBootstrap();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18next}>
          <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={theme.colors.purple} />
            <Navigator />
            <Loading />
          </SafeAreaView>
        </I18nextProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
