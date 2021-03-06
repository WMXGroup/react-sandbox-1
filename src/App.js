import React, { Component } from 'react';
import TreeView from './components/TreeView';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core";
import { blue } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {

  },
  overrides: {
    MuiBadge: {
      badge: {
        height: 13,
        minWidth: 13,
        padding: 0,
        
      },
      colorPrimary: {
        backgroundColor: 'Navy'
      }
    },
  },
});

class App extends Component {

  state = { count: 0 }

  render() {
    return (
      <ThemeProvider theme={theme}>
          <TreeView />
      </ThemeProvider>
    );
  }
}

export default App;