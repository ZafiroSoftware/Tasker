var React = require('react/addons');
var AppBar = require("./Components/AppBar.jsx");
var Address = require("./Components/Address.jsx");
var Correo = require("./Components/Email.jsx");
var Prospecto = require("./Components/String.jsx");
var Phone = require("./Components/Phone.jsx");
var OkCancel = require("./Components/OkCancel.jsx");
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var DateData = require("./Components/Date.jsx");
var Vendedor = require("./Components/String.jsx");
var idTask;

var App = React.createClass({
  getInitialState: function()
  {
    return {products : []}
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentDidMount: function() 
  { this.refs.Fecha.setDate(new Date());
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = window.location.href, params = {}, match;
        while(match = regex.exec(url)) {params[match[1]] = match[2]; }
        idTask = params.id;
  },
  setVendedor:function()
  {
     $.ajax({
      url: "/Prospecto_Registar", 
      type: "GET", 
      data: JSON.stringify( data ),
      contentType:"application/json; charset=utf-8", dataType:"json"}
    );
  },
  DataProspeccion:function()
  {
    return {
     'Prospecto': this.refs.Prospecto.getValue(),
     'Direccion': this.refs.Direccion.getValue(),
     'Telefono': this.refs.Telefono.getValue(),
     'Correo': this.refs.Correo.getValue(),
     'Fecha': this.refs.Fecha.getDate()
    };
  },
  EventCancel: function(e)
  { 
    window.location = '/';
  },
  EventOk:function(e)
  {
    var data = this.DataProspeccion();
        data.id = idTask;
    $.ajax({
      url: "/Prospecto_Registar", 
      type: "POST", 
      data: JSON.stringify( data ),
      contentType:"application/json; charset=utf-8", dataType:"json"}
    );
    window.location = '/';
  },
  render() {
    return (
    <div>
      <AppBar title ='Prospección' />
      <DateData
       hintText = 'Fecha' 
       floatingLabelText = "Fecha"
       mode = 'portrait' 
       ref = 'Fecha'/>
      <Prospecto 
        hintText = 'Prospecto'
        floatingLabelText = "Prospecto"
        multiLine = {true}
        ref = 'Prospecto'/>
      <Address 
        hintText = 'Introduzca la direcciòn'
        floatingLabelText = "Direcciòn"
        multiLine = {true}
        ref = 'Direccion'/>
      <Phone 
        hintText = 'Introduzca el teléfono'
        floatingLabelText = "Telefono"
        multiLine = {true}
        ref = 'Telefono'/>
      <Correo 
        hintText = 'Introduzca su correo' 
        floatingLabelText = "Correo"
        multiLine = {true}
        ref = 'Correo' />
      <OkCancel secondary = {true} 
        ok = {this.EventOk} 
        cancel = {this.EventCancel} 
        ref = 'OkCancel'/>
    </div>
    )
  }
})

React.render(<App/>, document.body);