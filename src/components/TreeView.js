import React from 'react';
import OptionList from './OptionList';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = {
  buttonContainer:{
    display: 'flex',
  },
  buttonStyle: {
    padding: '8px',
    margin: '3px',
    textAlign: 'center',
  }
}

class TreeView extends React.Component {    
  state = {
    options: [],
    selectedFile: null,
    isLoading: true
  }

  componentDidMount = () => {
    this.getServerData();
    // const treeData = this.getLSData();
    
    // this.setState({
    //   options: treeData,
    //   isLoading: false
    // })
  }

  getServerData = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let listId = params.get('query');

    if(listId !== undefined && listId !== null){
      axios
      .get(`https://guarded-mesa-76047.herokuapp.com/api/lists/${listId}`)
      .then(res => this.setState({ 
        options: res.data.list
        
      }));
    }
  }

  saveData = () => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let listId = params.get('query');

    axios
    .post(`https://guarded-mesa-76047.herokuapp.com/api/lists/update/${listId}`, {
      list: this.state.options
    })
    .then(() => {
      alert('Data saved successfully!')
    });
  }

  getLSData = () => {
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

  createNew = () => {
    const newData = 
    [{
      name: "Start Here",
      id: 1,
      selected: false,
      subOptions: [],
      depth: 0
    }];

    axios
    .post(`https://guarded-mesa-76047.herokuapp.com/api/lists/new`, {
      list: newData
    })
    .then((res) => {
      alert('New list created!')
      return(res);
    })
    .then((res) => {
      const newId = res.data._id;

      const a = document.createElement("a");
      a.href = `https://wmxgroup.github.io/react-sandbox-1/?query=${newId}`;
      a.click();
    });
  }

  createBaseNode = () => {
    const newData = 
    [{
      name: "Start Here",
      id: 1,
      selected: false,
      subOptions: [],
      depth: 0
    }];

    this.setState({
      options: newData
    });
  }

  render() {

    // if(this.state.isLoading === false){
    //   this.writeToLS(this.state.options);
    // }

     return (
       <div>
         <div style={styles.buttonContainer}>
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
                style={styles.buttonStyle}
                variant="contained"
                color="secondary"
                component="span">
                Import JSON
              </Button>
            </label>
          <Button
            style={styles.buttonStyle}
            variant="contained"
            onClick={() => this.exportJSON()}
            color="primary"
            >Export Data
          </Button>
          <Button
            style={styles.buttonStyle}
            variant="contained"
            onClick={() => this.saveData()}
            color="primary"
            >Save Data
          </Button>
          <Button
            style={styles.buttonStyle}
            variant="contained"
            onClick={() => this.createNew()}
            color="primary"
            >Create New
          </Button>
         </div>
         {this.state.options.length === 0 &&
         <div>
           <Button
            style={styles.buttonStyle}
            variant="contained"
            onClick={() => this.createBaseNode()}
            color="primary"
            >Add Base Node
           </Button>
         </div>
        }
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