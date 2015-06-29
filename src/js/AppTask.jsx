
var React = require('react');
var AppBar = require("./Components/AppBar.jsx");
var idTask;

var App = React.createClass({
  getInitialState: function()
  {
    return {products : []}
  },
  componentDidMount: function() 
  { 
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = window.location.href, params = {}, match;
        while(match = regex.exec(url)) {params[match[1]] = match[2]; }
        idTask = params.id;
  },
  EventCancel: function(e)
  {  //console.log(idTask);
    window.location = '/';
  },
  EventOk:function(e)
  {
    if(idTask)
    {
      var data = {id:idTask};
      $.ajax({
        url: "/TaskFinish", 
        type: "POST", 
        data: JSON.stringify( data ),
        contentType:"application/json; charset=utf-8", dataType:"json"}
      );
    }
    window.location = '/';
  },
  render() {
    return (
    <div>
      <AppBar title ='Task' />
      <div>
        <button className="btn" ref = 'Cancel' onClick = {this.EventCancel} >Cancel</button>
        <button className="btn" ref = 'Ok' onClick = {this.EventOk}>OK</button>
      </div>
    </div>
    )
  }
})

React.render(<App/>, document.body);


