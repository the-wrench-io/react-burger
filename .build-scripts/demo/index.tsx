import React from 'react';
import ReactDOM from 'react-dom';

import { ThemeProvider, StyledEngineProvider } from '@material-ui/core';
import { IntlProvider } from 'react-intl';

import Layout from './core';

const locale = "en";

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={Object.values(Layout.themes)[0]}>
        <IntlProvider locale={locale} messages={Layout.intl[locale]}>

        </IntlProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
