import React from 'react';

const styles = {
  textNode:{
    border: '1px solid #ccc',
    display:'flex',
    flex: 1,
    height: '100%'
  },
  nodeText:{
    border: 'none',
    resize: 'none',
    height: '100%',
    overflow: 'hidden',
    overflowWrap: 'break-word',
  },
  nodeCount:{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px #ccc solid'
  }
}

class OldTextNode extends React.Component {
  componentDidMount(){
    if(this.props.isMaxNew === true){
      this.props.myRef.current.focus()
    }
  }
  render(){
    const {    
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
      <div style={styles.textNode}>
        <input
          type="checkbox"
          checked = {selected}
          onClick={onChange} 
        /> 
        {/* <input 
          style={styles.nodeText}
          type="text"
          value={label}
          onChange={handleTextChange}
          onKeyPress={handleReturn}
          ref={myRef}
        /> */}
        <textarea
          style={styles.nodeText}
          type="text"
          value={label}
          onChange={handleTextChange}
          onKeyPress={handleReturn}
          ref={myRef}
        />
        <label style={styles.nodeCount}>
          {nodeCount}
        </label>
        <input
          value="+"
          type="button"
          onClick={handleAddSub} 
        />
        <input
          value="-"
          type="button"
          onClick={handleDelete} 
        /> 
    </div>
    )
  }
}

export default OldTextNode;