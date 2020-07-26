import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  optionList:{
    margin: 0,
  },
  nodeContainer:{
    borderLeft: '1px dashed #ccc',
    display:'flex',
  },
  checkbox:{
    height: 0,
    width: '5px'
  },
  nodeText:{
    width:'700px',
    borderBottom: '1px dashed #ccc'
  },
  options:{
    border: '1px dashed #ccc',
    display:'flex',
    height: '21px',
  },
  addButton:{
    fontSize: '17px',
    color: 'green'
  },
  deleteButton:{
    fontSize: '17px',
    color: 'red',
  },
  moveButtons:{
    fontSize: '17px',
    color: 'gray',
  },
  nodeCount:{
    justifyContent: 'center',
    alignItems: 'center',
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

  state = {
    showOptions: false,
  }

  componentDidMount(){
    if(this.props.isMaxNew === true){
      this.props.myRef.current.focus()
    }
  }

  toggleOptions = (methodName) => {

    if(methodName){
      methodName();
    }

    this.setState({
      showOptions: !this.state.showOptions
    })
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
      handleMoveIn,
      handleMoveOut,
      handleMoveUp,
      handleMoveDown,
      index,
      depth,
      count,
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
        {this.state.showOptions === true &&
          <div
            className={classes.options}
            >
            {index > 0 &&
              <IconButton
              onClick={handleMoveUp}
              size='small'
              >
                <ArrowUpward
                  className={classes.moveButtons}
                />
              </IconButton>
            }
            {index < count &&
              <IconButton
                onClick={handleMoveDown}
                size='small'
              >
                <ArrowDownward
                  className={classes.moveButtons}
                />
              </IconButton>
            }
            {depth > 0 &&
              <IconButton
                onClick={handleMoveIn} 
                size='small'
                >
                <ArrowBack
                  className={classes.moveButtons}
                />
              </IconButton>
            }
            {index !== 0 &&
              <IconButton
                onClick={handleMoveOut}
                size='small'
                >
                <ArrowForward
                  className={classes.moveButtons}
                />
              </IconButton>
            }
            <IconButton
              onClick={() => this.toggleOptions(handleAddSub)}
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
        }
        <IconButton
          onClick={() => this.toggleOptions()} 
          size='small'
          >
          <MoreHoriz
            className={classes.moveButtons}
          />
        </IconButton>
    </div>
    )
  }
}

export default withStyles(styles)(TextNode)