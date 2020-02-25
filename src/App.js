import React, { Component } from 'react';
import TreeView from './components/TreeView';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from "@material-ui/core";
import { blue } from '@material-ui/core/colors';
import { BrowserRouter as Router, Route} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: blue
  },
  typography: {

  }
});

class App extends Component {

  state = { count: 0 }

  render() {
    return (
      <Router>
      <ThemeProvider theme={theme}>
        <Route exact path="/react-sandbox-1" render={() => (
              <TreeView />
            )} />
        <Route path="/react-sandbox-1/:id" component={TreeView} />
      </ThemeProvider>
      </Router>
    );
  }
}

export default App;