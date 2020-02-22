import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  optionList:{
    margin: 0,
  },
  nodeContainer:{
    borderLeft: '1px solid #ccc',
    display:'flex',
    // flex: 1,
  },
  nodeText:{
    // border: 'none',
  },
  addButton:{
    fontSize: '17px',
    color: 'green',
  },
  deleteButton:{
    fontSize: '17px',
    color: 'red',
  },
  nodeCount:{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox:{
    height: 0
  },
});

class TextNode extends React.Component {
  componentDidMount(){
    if(this.props.isMaxNew === true){
      this.props.myRef.current.focus()
    }
  }
  render(){
    const {
      classes,    
      selected, 
      label, 
      onChange, 
      handleTextChange,
      handleAddSub, 
      handleDelete,
      handleReturn,
      nodeCount,
      myRef
    } = this.props;
    return(
      <div className={classes.nodeContainer}>
        <Checkbox
          checked={selected}
          className={classes.checkbox}
          onChange={onChange}
          color="primary"
          size='small'
        />
        <TextField
          className={classes.nodeText}
          InputProps={{
            disableUnderline: true,
            style: {
              padding: 0,
            }
          }}
          value={label}
          onChange={handleTextChange}
          onKeyPress={handleReturn}
          inputRef={myRef}
          multiline
        />
        <label className={classes.nodeCount}>
          {nodeCount}
        </label>
        <IconButton
          onClick={handleAddSub}
          size='small'
        >
          <AddCircleIcon
            className={classes.addButton}
          />
        </IconButton>
        <IconButton
          onClick={handleDelete} 
          size='small'
        >
          <HighlightOffIcon
            className={classes.deleteButton}
          />
        </IconButton>
    </div>
    )
  }
}

export default withStyles(styles)(TextNode)