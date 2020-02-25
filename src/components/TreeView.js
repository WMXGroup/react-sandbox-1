import React from 'react';
import OptionList from './OptionList';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class TreeView extends React.Component {    
  state = {
    options: [],
    selectedFile: null,
    isLoading: true
  }

  componentDidMount = () => {
    // this.getServerData();
    const treeData = this.getData();
    
    this.setState({
      options: treeData,
      isLoading: false
    })
  }

  getServerData = () => {
    axios
    .get('https://guarded-mesa-76047.herokuapp.com/api/lists')
    .then(res => console.log(res));
    // .then(res => this.setState({ options: res.list }));
  }

  getData = () => {
    const retrievedStorage = localStorage.getItem('myTreeData');
    if(retrievedStorage === null || retrievedStorage === []) {
      localStorage.setItem('myTreeData', JSON.stringify([
        {
            name: "Start Here",
            id: 1,
            selected: false,
            subOptions: [],
            depth: 0
          }
        ]));
    }

    return (JSON.parse(localStorage.getItem('myTreeData')))
  }

  downloadFile = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  writeToLS = (newData) => {
    localStorage.setItem('myTreeData', JSON.stringify(newData));
  };

  exportJSON = () => {
    this.downloadFile(JSON.stringify(this.state.options), "data.json", "text/plain");
  }

  getFile = (e) => {
    let files = e.target.files;
    let reader = new FileReader();
    reader.readAsText(files[0]);

    reader.onload = e => {
      localStorage.setItem('myTreeData', e.target.result);
      this.setState({
        options: JSON.parse(e.target.result)
      })
    };
  }

  render() {

    if(this.props.match.params.id !== undefined){
      console.log(this.props.match.params.id);
    }
    

    if(this.state.isLoading === false){
      this.writeToLS(this.state.options);
    }

     return (
       <div>
         <div>
         <input 
          type="file"
          style={{ display: 'none' }}
          id="raised-button-file"
          name="file" 
          onChange={this.getFile}
          accept=".json"
          />
          <label htmlFor="raised-button-file">
            <Button 
              variant="contained"
              color="secondary"
              component="span">
              Import JSON
            </Button>
          </label>
         </div>
         <Button
          variant="contained"
          onClick={() => this.exportJSON()}
          color="primary"
          >Export Data
         </Button>
         <h1>My Tree</h1>
          <OptionList 
            options={this.state.options}
            textChange={(options) => this.setState({options})}
          />
       </div>
     )
  }
}

export default TreeView;