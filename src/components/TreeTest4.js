import React from 'react';
import toppingData from './toppingData';

  // // Put the object into storage
  // localStorage.setItem('myTreeData', JSON.stringify(toppingData));

  // Retrieve the object from storage
  const retrievedObject = localStorage.getItem('myTreeData');
  const toppingOptions = JSON.parse(retrievedObject)

const styles = {
  addNode: {
    backgroundColor:'dodgerBlue',
    color:'white'
  },
  addSubButton: {
    backgroundColor:'forestGreen',
    color:'white'
  },
  deleteSubButton:{
    backgroundColor: 'fireBrick',
    color: 'white'
  }
}

const writeToLS = (newData) => {
  localStorage.setItem('myTreeData', JSON.stringify(newData));
};

const readFromLS= () => JSON.parse(localStorage.getItem('myTreeData'));

// Root component -> Manages all app state
class TreeTest extends React.Component {    
  state = {
    selectedOptions: {},
    options: toppingOptions,
    lastId: 11
  }

  render() {
    console.log(this.refs)

    writeToLS(this.state.options);

     return (
       <div>
         <a
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(this.state.options)
            )}`}
            download="data.json"
         >Download Data
         </a>
         <h1>My Tree</h1>
         <OptionsList 
           options={this.state.options}
           selectedOptions={this.state.selectedOptions}
           onChange={(selectedOptions) => this.setState({selectedOptions})}
           textChange={(options) => this.setState({options})}
           lastId={this.state.lastId}
           updateLastID={(lastId) => this.setState({lastId})}
         />
       </div>
     )
  }
}

// Recursive component
const OptionsList = ({ options, selectedOptions, onChange, textChange, lastId, updateLastID }) => {
 
  const handleCheckboxClicked = (selectedOptionId) => {
    // is currently selected
    if(selectedOptions[selectedOptionId]){
      // remove selected key from options list
      delete selectedOptions[selectedOptionId]; 
    } else { // is not currently selected
      // Add selected key to optionsList
      selectedOptions[selectedOptionId] = {} 
    }
    // call onChange function given by parent
    onChange(selectedOptions) 
  }
  
  const handleSubOptionsListChange = (optionId, subSelections) => {
    // add sub selections to current optionId
    selectedOptions[optionId] = subSelections;
    // call onChange function given by parent
    onChange(selectedOptions);
  }

  const handleChange = (newValue, optionId) => {
    for(let i=0;i<options.length;i++){
      if(options[i].id === optionId){
        options[i].name = newValue
      }
    }
    textChange(options);
  }

  const handleSubOptionsTextChange = (optionName, subOptions) => {
    options[optionName] = subOptions
    textChange(options);
  }

  const handleAdd = (index) => {
    const newOption = {
      name:"",
      id: lastId,
      subOptions: []
    }
    options.splice(index+1, 0, newOption )
    // options.push(newOption)
    textChange(options)
    updateLastID(lastId+1)
  }

  const handleAddSub = (optionId) => {
    const newSubOption = {
      name:"",
      id: lastId,
      subOptions: []
    }
    for(let i=0;i<options.length;i++){
      if(options[i].id === optionId){
        options[i].subOptions.push(newSubOption)
      }
    }
    textChange(options)
    updateLastID(lastId+1)
  }

  const handleDelete = (optionId) => {
    for(let i=0;i<options.length;i++){
      if(options[i].id === optionId){
        options.splice(i, 1)
        delete selectedOptions[optionId];
      }
    }
    textChange(options)
  }

  const handleReturn = (e, index) => {
    if(e.key === 'Enter'){
      handleAdd(index);
    }
  }
  
  return (
    <div>
      {options.map((option, index) => (
        <ul>
          <TextNode
            selected={selectedOptions[option.id]} 
            label={option.name} 
            onChange={() => handleCheckboxClicked(option.id)}
            handleTextChange={(event) => handleChange(event.target.value, option.id)}
            handleAdd={() => handleAdd(index)}
            handleAddSub={() => handleAddSub(option.id)}
            handleDelete={() => handleDelete(option.id)}
            handleReturn={(e) => handleReturn(e, index)}
           />
          {/* Base Case */}
          {(option.subOptions.length > 0 && selectedOptions[option.id]) &&
            <OptionsList
              options={option.subOptions}
              selectedOptions={selectedOptions[option.id]} 
              onChange={(subSelections) => handleSubOptionsListChange(option.id, subSelections)}
              textChange={(subOptions) => handleSubOptionsTextChange(option.name, subOptions)}
              lastId={lastId}
              updateLastID={updateLastID}
             />
          }
        </ul>
      ))}
    </div>
  )
}

// Dumb checkbox component, completly controlled by parent
const TextNode = (
  { 
    selected, 
    label, 
    onChange, 
    handleTextChange,
    handleAdd, 
    handleAddSub, 
    handleDelete,
    handleReturn,
   }
  ) => {
  return (
    <React.Fragment>
      <input
        style={styles.addNode}
        value="+"
        type="button"
        onClick={handleAdd} 
      /> 
      <input
        type="checkbox"
        onClick={() => onChange(!selected)} 
      /> 
      <input 
        type="text"
        value={label}
        onChange={handleTextChange}
        onKeyPress={handleReturn}
      />
      <input
        style={styles.addSubButton}
        value="+"
        type="button"
        onClick={handleAddSub} 
      /> 
      <input
        style={styles.deleteSubButton}
        value="-"
        type="button"
        onClick={handleDelete} 
      /> 
    </React.Fragment>
  )
}

export default TreeTest;