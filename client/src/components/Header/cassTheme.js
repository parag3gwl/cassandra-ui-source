import { createMuiTheme } from '@material-ui/core/styles'

const muiAppBar = {
  root: {
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 60,
    boxSizing: 'border-box',
  },
   colorPrimary: {
     backgroundColor: '#424242'
   },
   positionFixed: {
    position: 'fixed',
    top: 0,
    left: '0 600px',
    right: 0,
  },
}

const muiIconButton = {
  root: {
    background: '#5d4037',
    borderRadius: '50%',
    color: 'black',
    padding: 0,
    minWidth: 0,
    width: 20,
    height: 20,
  }
}
const muiButton = {
  root: {
    background: '#9e9e9e',
    border: 0,
    color: 'white',
    padding: '0 30px',
    borderRadius: '10%',
    minWidth: 0,
    height: 20,
  },
  fab: {
    background: '#5d4037',
    borderRadius: '50%',
    color: 'white',
    padding: 0,
    minWidth: 0,
    width: 35,
    height: 35,
    boxShadow: '0 3px 5px 2px rgba( 39, 39, 39, 1)',
  },
  extendedFab: {
    background: '#5d4037',
    borderRadius: 20 / 2,
    padding: '0 16px',
    width: 'auto',
    minWidth: 20,
    height: 20,
    boxShadow: '0 3px 5px 2px rgba( 39, 39, 39, 1)',
  },
  // '&:hover': {
  //   //textDecoration: 'none',
  //   backgroundColor: '#ff5722',
  //   // Reset on touch devices, it doesn't add specificity
  // }
}

const muiTabs = {
  root: {
    flexGrow: 1,
    backgroundColor: '#efefef',
    tabSelected: {
      color: '#757575',
    },
     tabsRoot: {
       borderBottom: '5px solid #757575',
           },
  },
  indicator: {
      backgroundColor: '#757575',
  },
}

const muiTab = {
  root: { 
    maxWidth: 264,
    position: 'relative',
    minWidth: 72,
    padding: 0,
    minHeight: 48,
    flexShrink: 0,
    overflow: 'hidden',
    fontFamily: "Apple Chancery",
    fontSize: 20
  },
  textColorInherit: {
    color: 'black',
    opacity: 0.7,
  },
  selected: {
    color: '#1b1b1b',
    fontWeight: 1,
  },
}

const muiTable = {
  root: {
    border: '1px solid black',
    padding: '1px 7px black',
    borderBottom: '1px solid white',
    borderTop: '1px solid white',
    borderLeft: '1px solid white',
    borderRight: '1px solid white',
    width: '30%',
  },
}

const muiTableRow = {
  root: {
    border: '1px solid white'
  }
}
const muiTableCell = {
  root: {
    textAlign: 'left',
    padding: '4px 56px 4px 24px',
  },
  head: {
    color: 'white',
    backgroundColor: '#212121',
    fontSize: '12px',
      textAlign: 'left',
      paddingLeft: '5px',
      paddingRight: '1px',
      paddingTop: '1px',
      paddingBottom: '1px',
      borderTop: '1px solid black',
  },
}

const muiInputLabel = {
  root: {
    fontSize: '12px',
  }
}

const muiMenuItem = {
  root: {
    fontSize: '12px',
    height: '14px',
  },
  selected: {
    fontSize: '12px',
  },
}
export const theme = createMuiTheme({
    overrides: {
      MuiAppBar: muiAppBar,
      MuiButton: muiButton,
      MuiTabs: muiTabs,
      MuiTab: muiTab,
      MuiTable: muiTable,
      MuiTableCell: muiTableCell,
      MuiTableRow: muiTableRow,
      MuiInputLabel:muiInputLabel,
      MuiMenuItem: muiMenuItem,
      MuiIconButton: muiIconButton,
    },
    
  })
