import React from 'react';
import Paper from 'material-ui/Paper';
import classNames from 'classnames';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import './PaperOrg.css';

const theme = createMuiTheme ({
  overrides: {
    muiPaper: {
      root: {
        margin: 'auto',
        boxShadow:'none',
        background: 'yellow',
        height: 48,
      },
    },
  },
  
});

function PaperSheet(props) {
  return (
    <MuiThemeProvider theme={theme}>
      <Paper 
        className={classNames(props.label)}
        elevation={2}
        {...props}
      />
    </MuiThemeProvider>
  );
}



export default PaperSheet;
