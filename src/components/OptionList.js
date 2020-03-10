import React from 'react';
import TextNode from './TextNode';

class OptionList extends React.Component {
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
      ('handle Change triggered')
      for(let i=0;i<options.length;i++){
        if(options[i].id === optionId){
          options[i].name = newValue
        }
      }
      textChange(options);
    }
  
    const handleSubOptionsTextChange = (optionId, subOptions) => {
      for(let i=0;i<options.length;i++){
        if(options[i].id === optionId){
          options[i].subOptions = subOptions
        }
      }
      textChange(options);
    }

    const uuidv4 = () => {
      return Math.random().toString(36).substring(2) + Date.now().toString(36);
    }
  
    const handleAdd = (index) => {
      const newOption = {
        name:"",
        id: uuidv4(),
        subOptions: [],
        selected: false,
        depth: options[index].depth,
        // count: 0
      }
      options.splice(index+1, 0, newOption )
      textChange(options)
    }
  
    const handleAddSub = (optionId) => {
      const newSubOption = {
        name:"",
        id: uuidv4(),
        subOptions: [],
        selected: false,
        // count: 0
      }
      for(let i=0;i<options.length;i++){
        if(options[i].id === optionId){
          newSubOption.depth = options[i].depth + 1
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
        e.preventDefault()
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

    const handleCountChange = (newValue, optionId) => {
      for(let i=0;i<options.length;i++){
        if(options[i].id === optionId){
          options[i].count = newValue
        }
      }
      textChange(options);
    }

    const getNodeCount = (optionId) => {
      let optionCount = 0;
      for(let i=0;i<options.length;i++){
        if(options[i].id === optionId){
          optionCount = options[i].subOptions.length
        }
      }
      return optionCount;
    }

    // const getSubOptionCount = (optionId) => {
    //   let subCount = 0;
    //   for(let i=0;i<options.length;i++){
    //     if(options[i].id === optionId){
    //       for(let j=0;j<options[i].subOptions.length;j++){
    //         subCount = subCount + parseInt(options[i].subOptions[j].count)
    //       }
    //     }
    //   }
    //   return subCount;
    // }

    return(
      <React.Fragment>
      {options.map((option, index) => {
        return (
        <ul style={{
          margin: 0,
          paddingLeft: option.depth === 0 ? 0 : '20px',
          borderLeft: option.depth === 0 ?'none': '1px #ccc dashed'
        }}>
          <TextNode
            selected={option.selected} 
            label={option.name} 
            onChange={() => handleCheckboxClicked(option.id)}
            handleTextChange={(event) => handleChange(event.target.value, option.id)}
            handleAdd={() => handleAdd(index)}
            handleAddSub={() => handleAddSub(option.id)}
            handleDelete={() => {if (window.confirm(`Are you sure you want to delete "${option.name}"?`)) handleDelete(option.id)}}
            handleReturn={(e) => handleReturn(e, index)}
            myRef={this.textInput[index]}
            isMaxNew={this.state.isLastNew}
            nodeCount={getNodeCount(option.id)}
            count={option.count}
            // handleCountChange={(event) => handleCountChange(event.target.value, option.id)}
            // subCount={getSubOptionCount(option.id)}
           />
          {/* Base Case */}
          {(option.subOptions.length > 0 && option.selected === true) &&
            <OptionList
              options={option.subOptions}
              textChange={(subOptions) => handleSubOptionsTextChange(option.id, subOptions)}
             />
          }
        </ul>
      )}
      )}
    </React.Fragment>
  )
  }
}

export default OptionList;