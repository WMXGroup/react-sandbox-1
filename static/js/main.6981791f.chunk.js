(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{104:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),l=n.n(o),i=n(15),c=n(16),s=n(20),u=n(17),d=n(22),h=n(148),p=n(150),m=n(142),f=n(64),g=n.n(f),b=n(65),v=n.n(b),y=n(137),E=n(5),S=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){!0===this.props.isMaxNew&&this.props.myRef.current.focus()}},{key:"render",value:function(){var e=this.props,t=e.classes,n=e.selected,a=e.label,o=e.onChange,l=e.handleTextChange,i=e.handleAddSub,c=e.handleDelete,s=e.handleReturn,u=e.nodeCount,d=e.myRef;return r.a.createElement("div",{className:t.nodeContainer},r.a.createElement(y.a,{badgeContent:u,color:"primary",anchorOrigin:{vertical:"top",horizontal:"left"}},r.a.createElement(p.a,{checked:n,className:t.checkbox,onChange:o,color:"primary",size:"small"})),r.a.createElement(h.a,{className:t.nodeText,InputProps:{disableUnderline:!0,style:{padding:0}},value:a,onChange:l,onKeyPress:s,inputRef:d,multiline:!0}),r.a.createElement(m.a,{onClick:i,size:"small"},r.a.createElement(g.a,{className:t.addButton})),r.a.createElement(m.a,{onClick:c,size:"small"},r.a.createElement(v.a,{className:t.deleteButton})))}}]),t}(r.a.Component),O=Object(E.a)(function(e){return{optionList:{margin:0},nodeContainer:{borderLeft:"1px dashed #ccc",display:"flex"},nodeText:{width:"700px",borderBottom:"1px dashed #ccc"},addButton:{fontSize:"17px",color:"green"},deleteButton:{fontSize:"17px",color:"red"},nodeCount:{justifyContent:"center",alignItems:"center"},checkbox:{height:0,width:"5px"}}})(S),C=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={isLastNew:!1},n.textInput=[],n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,n=this.props,a=n.options,o=n.textChange;this.textInput=[];for(var l=0;l<a.length;l++)this.textInput.push(r.a.createRef());var i=function(e,t){for(var n=0;n<a.length;n++)a[n].id===e&&(a[n].subOptions=t);o(a)},c=function(){return Math.random().toString(36).substring(2)+Date.now().toString(36)},s=function(e){var t={name:"",id:c(),subOptions:[],selected:!1,depth:a[e].depth};a.splice(e+1,0,t),o(a)},u=function(e){for(var t=0,n=0;n<a.length;n++)a[n].id===e&&(t=a[n].subOptions.length);return t};return r.a.createElement(r.a.Fragment,null,a.map(function(n,l){return r.a.createElement("ul",{key:[n.id,l].concat(),style:{margin:0,paddingLeft:0===n.depth?0:"20px",borderLeft:0===n.depth?"none":"1px #ccc dashed"}},r.a.createElement(O,{selected:n.selected,label:n.name,onChange:function(){return function(e){for(var t=0;t<a.length;t++)a[t].id===e&&(a[t].selected=!a[t].selected);o(a)}(n.id)},handleTextChange:function(e){return function(e,t){for(var n=0;n<a.length;n++)a[n].id===t&&(a[n].name=e);o(a)}(e.target.value,n.id)},handleAdd:function(){return s(l)},handleAddSub:function(){return function(e){for(var t={name:"",id:c(),subOptions:[],selected:!1},n=0;n<a.length;n++)a[n].id===e&&(t.depth=a[n].depth+1,a[n].subOptions.push(t),a[n].selected=!0);o(a)}(n.id)},handleDelete:function(){window.confirm('Are you sure you want to delete "'.concat(n.name,'"?'))&&function(e){for(var t=0;t<a.length;t++)a[t].id===e&&a.splice(t,1);o(a)}(n.id)},handleReturn:function(t){return function(t,n){"Enter"===t.key&&(t.preventDefault(),s(n),void 0!==e.textInput[n+1]?(e.setState({isLastNew:!1}),e.textInput[n+1].current.focus()):e.setState({isLastNew:!0}))}(t,l)},myRef:e.textInput[l],isMaxNew:e.state.isLastNew,nodeCount:u(n.id),count:n.count}),n.subOptions.length>0&&!0===n.selected&&r.a.createElement(t,{options:n.subOptions,textChange:function(e){return i(n.id,e)}}))}))}}]),t}(r.a.Component),w=n(144),x=n(145),N=n(102),k=n(151),j=n(66),D=n.n(j),L=n(67),I=n.n(L),T=n(68),A=n.n(T),R=n(146),B=n(45),F=n.n(B),J={treeContainer:{maxWidth:"700px"}},z=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={listName:"List Name",options:[],selectedFile:null,isLoading:!1,anchorEl:null,setAnchorEl:!1,lastSaved:null},n.componentDidMount=function(){n.getServerData()},n.getServerData=function(){var e=window.location.search,t=new URLSearchParams(e).get("query");void 0!==t&&null!==t?n.setState({isLoading:!0},function(){F.a.get("https://guarded-mesa-76047.herokuapp.com/api/lists/".concat(t)).then(function(e){return n.setState({listName:e.data.listName,options:e.data.list,lastSaved:e.data.lastSaved,isLoading:!1})})}):n.createBaseNode()},n.saveData=function(){n.handleClose();var e=window.location.search,t=new URLSearchParams(e).get("query");F.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/update/".concat(t),{list:n.state.options,listName:n.state.listName,lastSaved:n.state.lastSaved}).then(function(){alert("Data saved successfully!")})},n.getLSData=function(){var e=localStorage.getItem("myTreeData");return null!==e&&e!==[]||localStorage.setItem("myTreeData",JSON.stringify([{name:"Start Here",id:1,selected:!1,subOptions:[],depth:0}])),JSON.parse(localStorage.getItem("myTreeData"))},n.downloadFile=function(e,t,n){var a=document.createElement("a"),r=new Blob([e],{type:n});a.href=URL.createObjectURL(r),a.download=t,a.click()},n.writeToLS=function(e){localStorage.setItem("myTreeData",JSON.stringify(e))},n.exportJSON=function(){n.handleClose(),n.downloadFile(JSON.stringify(n.state.options),"data.json","text/plain")},n.getFile=function(e){n.handleClose();var t=e.target.files,a=new FileReader;a.readAsText(t[0]),a.onload=function(e){localStorage.setItem("myTreeData",e.target.result),n.setState({options:JSON.parse(e.target.result)})}},n.createNew=function(){n.handleClose();F.a.post("https://guarded-mesa-76047.herokuapp.com/api/lists/new",{list:[{name:"Start Here",id:1,selected:!1,subOptions:[],depth:0}]}).then(function(e){return alert("New list created!"),e}).then(function(e){var t=e.data._id,n=document.createElement("a");n.href="https://wmxgroup.github.io/react-sandbox-1/?query=".concat(t),n.click()})},n.createBaseNode=function(){n.handleClose();n.setState({options:[{name:"Start Here",id:1,selected:!1,subOptions:[],depth:0}]})},n.handleMenu=function(e){n.setState({anchorEl:e.currentTarget,setAnchorEl:!0})},n.handleClose=function(){n.setState({setAnchorEl:!1})},n.handleTitleChange=function(e){n.setState({listName:e.target.value})},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return console.log(new Date),r.a.createElement(r.a.Fragment,null,r.a.createElement(w.a,{position:"fixed",color:"primary"},r.a.createElement(x.a,null,r.a.createElement(m.a,{edge:"start",color:"inherit",onClick:this.handleMenu},r.a.createElement(D.a,null)),r.a.createElement(N.a,{id:"menu-appbar",anchorEl:this.state.anchorEl,getContentAnchorEl:null,anchorOrigin:{vertical:"bottom",horizontal:"center"},keepMounted:!0,transformOrigin:{vertical:"top",horizontal:"center"},open:this.state.setAnchorEl,onClose:this.handleClose},r.a.createElement("input",{type:"file",style:{display:"none"},id:"raised-button-file",name:"file",onChange:this.getFile,accept:".json"}),r.a.createElement("label",{htmlFor:"raised-button-file"},r.a.createElement(k.a,{onClick:function(){return e.getFile()}},"Import JSON")),r.a.createElement(k.a,{onClick:function(){return e.exportJSON()}},"Export Data"),r.a.createElement(k.a,{onClick:function(){return e.saveData()}},"Save Data"),r.a.createElement(k.a,{onClick:function(){return e.createNew()}},"Create New")),r.a.createElement(R.a,{variant:"h6"},"Outliner"),r.a.createElement("div",{style:{flexGrow:1}}),r.a.createElement(m.a,{color:"inherit"},r.a.createElement(I.a,null)),r.a.createElement(m.a,{edge:"end",color:"inherit"},r.a.createElement(A.a,null)))),r.a.createElement(x.a,null),r.a.createElement("div",{style:{fontStyle:"italic",color:"#bbb"}},null===this.state.lastSaved?"Not Saved":"Last Saved: "+this.state.lastSaved),r.a.createElement(h.a,{InputProps:{disableUnderline:!0,style:{display:"block",fontSize:"2em",marginTop:"0.3em",marginBottom:"0.3em"}},value:this.state.listName,onChange:this.handleTitleChange}),r.a.createElement("div",{style:J.treeContainer},r.a.createElement(C,{options:this.state.options,textChange:function(t){return e.setState({options:t})}})))}}]),t}(r.a.Component),M=n(147),P=n(103),U=n(83),q=Object(P.a)({palette:{primary:U.a},typography:{},overrides:{MuiBadge:{badge:{height:13,minWidth:13,padding:0},colorPrimary:{backgroundColor:"Navy"}}}}),H=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={count:0},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(M.a,{theme:q},r.a.createElement(z,null))}}]),t}(a.Component);l.a.render(r.a.createElement(H,null),document.getElementById("root"))},75:function(e,t,n){e.exports=n(104)}},[[75,2,1]]]);
//# sourceMappingURL=main.6981791f.chunk.js.map