import React from 'react';
// import initialData from './initialData';

  // // // Put the object into storage
  // localStorage.setItem('myTreeData', JSON.stringify(initialData));

  // Retrieve the object from storage
  const retrievedObject = localStorage.getItem('myTreeData');
  const myTreeData = JSON.parse(retrievedObject)

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

// const readFromLS= () => JSON.parse(localStorage.getItem('myTreeData'));

// Root component -> Manages all app state
class TreeTest extends React.Component {    
  state = {
    options: myTreeData,
    selectedFile: null
  }

  downloadFile = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  exportJSON = () => {
    this.downloadFile(JSON.stringify(this.state.options), "data.json", "text/plain");
  }

  onChangeHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0,
    })
  }

  render() {

    writeToLS(this.state.options);

     return (
       <div>
         <div>
          <label>Select Json file to import</label>
         </div>
         <div>
          <input type="file" name="file" onChange={this.onChangeHandler} accept=".json"/>
         </div>
         <button
          onClick={() => this.exportJSON()}
          >Export Data
         </button>
         <h1>My Tree</h1>
         <OptionsList 
           options={this.state.options}
           textChange={(options) => this.setState({options})}
         />
       </div>
     )
  }
}

class OptionsList extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = []
  }

  state = {
    isLastNew : false,
  }

  render(){
    const { options, textChange } = this.props;

    this.textInput = [];

    for(let i=0; i<options.length; i++){
      this.textInput.push(React.createRef());
    }
    const handleCheckboxClicked = (optionId) => {
      for(let i=0;i<options.length;i++){
        if(options[i].id === optionId){
          options[i].selected = !options[i].selected
        }
      }
      textChange(options);
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

    const uuidv4 = () => {
      return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
  
    const handleAdd = (index) => {
      const newOption = {
        name:"",
        id: uuidv4(),
        subOptions: []
      }
      options.splice(index+1, 0, newOption )
      textChange(options)
    }
  
    const handleAddSub = (optionId) => {
      const newSubOption = {
        name:"",
        id: uuidv4(),
        subOptions: []
      }
      for(let i=0;i<options.length;i++){
        if(options[i].id === optionId){
          options[i].subOptions.push(newSubOption)
          options[i].selected = true
        }
      }
      textChange(options)
    }
  
    const handleDelete = (optionId) => {
      for(let i=0;i<options.length;i++){
        if(options[i].id === optionId){
          options.splice(i, 1)
        }
      }
      textChange(options)
    }
  
    const handleReturn = (e, index) => {
      if(e.key === 'Enter'){
        handleAdd(index);
      if(this.textInput[index+1] !== undefined){
        this.setState({
          isLastNew: false
        })
        this.textInput[index+1].current.focus()
      } else{
        this.setState({
          isLastNew: true
        })
      }
      }
    }

    return(
      <div>
      {options.map((option, index) => {
        return (
        <ul>
          <TextNode
            selected={option.selected} 
            label={option.name} 
            onChange={() => handleCheckboxClicked(option.id)}
            handleTextChange={(event) => handleChange(event.target.value, option.id)}
            handleAdd={() => handleAdd(index)}
            handleAddSub={() => handleAddSub(option.id)}
            handleDelete={() => handleDelete(option.id)}
            handleReturn={(e) => handleReturn(e, index)}
            myRef={this.textInput[index]}
            isMaxNew={this.state.isLastNew}
           />
          {/* Base Case */}
          {(option.subOptions.length > 0 && option.selected === true) &&
            <OptionsList
              options={option.subOptions}
              textChange={(subOptions) => handleSubOptionsTextChange(option.name, subOptions)}
             />
          }
        </ul>
      )}
      )}
    </div>
  )
  }
}

class TextNode extends React.Component {
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
      handleAdd, 
      handleAddSub, 
      handleDelete,
      handleReturn,
      myRef
    } = this.props;
    return(
      <React.Fragment>
      <input
        style={styles.addNode}
        value="+"
        type="button"
        onClick={handleAdd} 
      /> 
      <input
        type="checkbox"
        checked = {selected}
        onClick={onChange} 
      /> 
      <input 
        type="text"
        value={label}
        onChange={handleTextChange}
        onKeyPress={handleReturn}
        ref={myRef}
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
}

export default TreeTest;