(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{57:function(e,t,n){e.exports=n(68)},68:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(9),i=n.n(o),l=n(13),c=n(14),s=n(18),u=n(15),d=n(20),p=n(104),m=n(105),f=n(101),h=n(49),g=n.n(h),b=n(50),y=n.n(b),O=n(5),v=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){!0===this.props.isMaxNew&&this.props.myRef.current.focus()}},{key:"render",value:function(){var e=this.props,t=e.classes,n=e.selected,a=e.label,o=e.onChange,i=e.handleTextChange,l=e.handleAddSub,c=e.handleDelete,s=e.handleReturn,u=e.nodeCount,d=e.myRef;return r.a.createElement("div",{className:t.nodeContainer},r.a.createElement(m.a,{checked:n,className:t.checkbox,onChange:o,color:"primary",size:"small"}),r.a.createElement(p.a,{className:t.nodeText,InputProps:{disableUnderline:!0,style:{padding:0}},value:a,onChange:i,onKeyPress:s,inputRef:d,multiline:!0}),r.a.createElement("label",{className:t.nodeCount},u),r.a.createElement(f.a,{onClick:l,size:"small"},r.a.createElement(g.a,{className:t.addButton})),r.a.createElement(f.a,{onClick:c,size:"small"},r.a.createElement(y.a,{className:t.deleteButton})))}}]),t}(r.a.Component),x=Object(O.a)(function(e){return{optionList:{margin:0},nodeContainer:{borderLeft:"1px solid #ccc",display:"flex"},nodeText:{},addButton:{fontSize:"17px",color:"green"},deleteButton:{fontSize:"17px",color:"red"},nodeCount:{display:"flex",justifyContent:"center",alignItems:"center"},checkbox:{height:0}}})(v),E=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(u.a)(t).call(this,e))).state={isLastNew:!1},n.textInput=[],n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this,n=this.props,a=n.options,o=n.textChange;this.textInput=[];for(var i=0;i<a.length;i++)this.textInput.push(r.a.createRef());var l=function(e,t){a[e]=t,o(a)},c=function(){return Math.random().toString(36).substring(2)+Date.now().toString(36)},s=function(e){var t={name:"",id:c(),subOptions:[],depth:a[e].depth};a.splice(e+1,0,t),o(a)},u=function(e){for(var t=0,n=0;n<a.length;n++)a[n].id===e&&(t=a[n].subOptions.length);return t};return r.a.createElement(r.a.Fragment,null,a.map(function(n,i){return r.a.createElement("ul",{style:{margin:0,paddingLeft:0===n.depth?0:"20px",borderLeft:0===n.depth?"none":"1px #ccc solid"}},r.a.createElement(x,{selected:n.selected,label:n.name,onChange:function(){return function(e){for(var t=0;t<a.length;t++)a[t].id===e&&(a[t].selected=!a[t].selected);o(a)}(n.id)},handleTextChange:function(e){return function(e,t){for(var n=0;n<a.length;n++)a[n].id===t&&(a[n].name=e);o(a)}(e.target.value,n.id)},handleAdd:function(){return s(i)},handleAddSub:function(){return function(e){for(var t={name:"",id:c(),subOptions:[]},n=0;n<a.length;n++)a[n].id===e&&(t.depth=a[n].depth+1,a[n].subOptions.push(t),a[n].selected=!0);o(a)}(n.id)},handleDelete:function(){return function(e){for(var t=0;t<a.length;t++)a[t].id===e&&a.splice(t,1);o(a)}(n.id)},handleReturn:function(t){return function(t,n){"Enter"===t.key&&(t.preventDefault(),s(n),void 0!==e.textInput[n+1]?(e.setState({isLastNew:!1}),e.textInput[n+1].current.focus()):e.setState({isLastNew:!0}))}(t,i)},myRef:e.textInput[i],isMaxNew:e.state.isLastNew,nodeCount:u(n.id)}),n.subOptions.length>0&&!0===n.selected&&r.a.createElement(t,{options:n.subOptions,textChange:function(e){return l(n.name,e)}}))}))}}]),t}(r.a.Component),S=n(102),j=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={options:[],selectedFile:null,isLoading:!0},n.componentDidMount=function(){var e=n.getData();n.setState({options:e,isLoading:!1})},n.getData=function(){var e=localStorage.getItem("myTreeData");return null!==e&&e!==[]||localStorage.setItem("myTreeData",JSON.stringify([{name:"Start Here",id:1,selected:!1,subOptions:[],depth:0}])),JSON.parse(localStorage.getItem("myTreeData"))},n.downloadFile=function(e,t,n){var a=document.createElement("a"),r=new Blob([e],{type:n});a.href=URL.createObjectURL(r),a.download=t,a.click()},n.writeToLS=function(e){localStorage.setItem("myTreeData",JSON.stringify(e))},n.exportJSON=function(){n.downloadFile(JSON.stringify(n.state.options),"data.json","text/plain")},n.getFile=function(e){var t=e.target.files,a=new FileReader;a.readAsText(t[0]),a.onload=function(e){localStorage.setItem("myTreeData",e.target.result),n.setState({options:JSON.parse(e.target.result)})}},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e=this;return!1===this.state.isLoading&&this.writeToLS(this.state.options),r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("input",{type:"file",style:{display:"none"},id:"raised-button-file",name:"file",onChange:this.getFile,accept:".json"}),r.a.createElement("label",{htmlFor:"raised-button-file"},r.a.createElement(S.a,{variant:"contained",color:"secondary",component:"span"},"Import JSON"))),r.a.createElement(S.a,{variant:"contained",onClick:function(){return e.exportJSON()},color:"primary"},"Export Data"),r.a.createElement("h1",null,"My Tree"),r.a.createElement(E,{options:this.state.options,textChange:function(t){return e.setState({options:t})}}))}}]),t}(r.a.Component),C=n(103),w=n(67),N=n(65),k=Object(w.a)({palette:{primary:N.a},typography:{}}),I=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={count:0},n}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(C.a,{theme:k},r.a.createElement(j,null))}}]),t}(a.Component);i.a.render(r.a.createElement(I,null),document.getElementById("root"))}},[[57,2,1]]]);
//# sourceMappingURL=main.a49f9fc7.chunk.js.map