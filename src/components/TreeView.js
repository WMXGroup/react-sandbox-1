import React from 'react';
import OptionList from './OptionList';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = {
  treeContainer: {
    maxWidth: '700px'
  },
}

class TreeView extends React.Component {    
  state = {
    listName: 'List Name',
    options: [],
    selectedFile: null,
    isLoading: false,
    anchorEl: null,
    setAnchorEl: false,
    lastSaved: null,
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
      this.setState({
        isLoading: true
      },() => {
        axios
        .get(`https://guarded-mesa-76047.herokuapp.com/api/lists/${listId}`)
        .then(res => this.setState({
          listName: res.data.listName,
          options: res.data.list,
          lastSaved: res.data.lastSaved,
          isLoading: false
        }))
        }
      )
    } else {
      this.createBaseNode()
    }
  }

  saveData = () => {
    this.handleClose();
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let listId = params.get('query');
    const currentDT = new Date();

    if(listId === null){
      axios
      .post(`https://guarded-mesa-76047.herokuapp.com/api/lists/new`, {
        list: this.state.list,
        listName: this.state.listName,
        lastSaved: new Date()
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
        return res.data
      })
      .then((data) => {
        this.setState({
          listName: data.listName,
          options: data.list,
          lastSaved: data.lastSaved,
        })
      })
    } else {
      axios
      .post(`https://guarded-mesa-76047.herokuapp.com/api/lists/update/${listId}`, {
        list: this.state.options,
        listName: this.state.listName,
        lastSaved: currentDT
      })
      .then(() => {
        this.setState({
          lastSaved: currentDT
        })
        alert('Data saved successfully!')
      });
    }
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
    this.handleClose();
    this.downloadFile(JSON.stringify(this.state.options), "data.json", "text/plain");
  }

  getFile = (e) => {
    this.handleClose();
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
    this.handleClose();
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
      list: newData,
      listName: this.state.listName,
      lastSaved: new Date()
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
    this.handleClose();
    const newData = 
    [{
      name: "Start Here",
      id: 1,
      selected: false,
      subOptions: [],
      depth: 0,
      // count: 0
    }];

    this.setState({
      options: newData,
    });
  }

  handleMenu = event => {
    this.setState({
      anchorEl: event.currentTarget,
      setAnchorEl: true
    });
  };

  handleClose = () => {
    this.setState({
      setAnchorEl: false
    });
  };

  handleTitleChange = (e) => {
    this.setState({
      listName: e.target.value
    })
  }

  render() {

    // if(this.state.isLoading === false){
    //   this.writeToLS(this.state.options);
    // }

     return (
       <React.Fragment>
        <AppBar 
          position="fixed" 
          color="primary">
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={this.handleMenu}
                >
                <MenuIcon />
              </IconButton>
              <Menu
                  id="menu-appbar"
                  anchorEl={this.state.anchorEl}
                  getContentAnchorEl={null}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  open={this.state.setAnchorEl}
                  onClose={this.handleClose}
                >
                  <input 
                    type="file"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    name="file" 
                    onChange={this.getFile}
                    accept=".json"
                    />
                  <label htmlFor="raised-button-file">
                    <MenuItem onClick={() => this.getFile()}>Import JSON</MenuItem>
                  </label>
                  <MenuItem onClick={() => this.exportJSON()}>Export Data</MenuItem>
                  <MenuItem onClick={() => this.saveData()}>Save Data</MenuItem>
                  <MenuItem onClick={() => this.createNew()}>Create New</MenuItem>
                </Menu>
              <Typography variant="h6">
                  Outliner
              </Typography>
              <div style={{flexGrow: 1}} />
              <IconButton color="inherit">
                <SearchIcon />
              </IconButton>
              <IconButton edge="end" color="inherit">
                <MoreIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Toolbar />
            {/* <Button
              style={{
                padding: '8px',
                margin: '3px',
                textAlign: 'center',
              }}
              variant="contained"
              onClick={() => this.exportJSON()}
              color="primary"
              >Export Data
            </Button> */}
          <div
            style={{
              fontStyle:'italic',
              color:'#bbb',
            }}>
              {this.state.lastSaved === null ? 'Not Saved' : 'Last Saved: ' + this.state.lastSaved}
          </div>
          <TextField
          InputProps={{
            disableUnderline: true,
            style: {
              display: 'block',
              fontSize: '2em',
              marginTop: '0.3em',
              marginBottom: '0.3em',
              // padding: 0
            }
          }}
          value={this.state.listName}
          onChange={this.handleTitleChange}
        />
          <div style={styles.treeContainer}>
            <OptionList 
                options={this.state.options}
                textChange={(options) => this.setState({options})}
              />
          </div>
        </React.Fragment>
     )
  }
}

export default TreeView;