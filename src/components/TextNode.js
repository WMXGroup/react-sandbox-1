import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  optionList:{
    margin: 0,
  },
  nodeContainer:{
    borderLeft: '1px solid #ccc',
    display:'flex',
  },
  nodeText:{
    width:'500px',
    borderBottom: '1px dashed #ccc'
  },
  addButton:{
    fontSize: '17px',
    color: 'green'
  },
  deleteButton:{
    fontSize: '17px',
    color: 'red',
  },
  nodeCount:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkbox:{
    height: 0,
    width: '5px'
  },
  // valueCount:{
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   border: '1px solid #ccc',
  //   width:'50px',
  //   height: '20px'
  // }
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
      myRef,
      // count,
      // handleCountChange,
      // subCount
    } = this.props;
    return(
      <div className={classes.nodeContainer}>
        <Badge
          badgeContent={nodeCount}
          color='primary'
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          >
          <Checkbox
            checked={selected}
            className={classes.checkbox}
            onChange={onChange}
            color="primary"
            size='small'
          />
        </Badge>
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
        {/* <TextField
          className={classes.valueCount}
          InputProps={{
            disableUnderline: true,
            style: {
              padding: 0,
            }
          }}
          onChange={handleCountChange}
          value={subCount === 0 ? count : subCount}
          disabled={subCount === 0 ? false: true}
        /> */}
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