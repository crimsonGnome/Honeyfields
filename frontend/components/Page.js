import React, { Component } from 'react';
import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import Header from './Header';
import Meta from './Meta';
import AdminFooter from './AdminFooter';

const theme = {
  red: `url('/static/hexellence.png')`,
  brown: '#261d1a',
  black: '#393939',
  honey: '#ffae00',
  honeyButton: 'linear-gradient(180deg,#f79000,#ffae00,#f79000)',
  grey: '#261d1a',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs:
    '0 8px 17px 2px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12),0 5px 5px -3px rgba(0,0,0,0.2)',
  tabletView: 'max-width: 1015px',
  phoneView: 'max-width: 600px'
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  grid-gap: 20px;
  margin: 0 auto;
`;

injectGlobal`
  @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
      font-family: 'scriptCookie';
      src: url('/static/Lucian Schoenschrift CAT.ttf');
    }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    line-height: 2;
    font-family: 'radnika_next';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  .script{
    font-family: scriptCookie;
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
          <AdminFooter />
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
