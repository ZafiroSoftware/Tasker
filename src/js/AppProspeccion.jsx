var React = require('react/addons');
var TextField = require('material-ui/lib/text-field');
var AppBar = require("./Components/AppBar.jsx");
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Botton = require('material-ui/lib/flat-button');

var Address = require("./Components/Address.jsx");
var Correo = require("./Components/Email.jsx");
var Prospecto = require("./Components/String.jsx");
var Phone = require("./Components/Phone.jsx");
var OkCancel = require("./Components/OkCancel.jsx");
var LkpVendedor = require("./Components/SearchEntity.jsx");
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
  childContextTypes:
  {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() 
  {
    return { muiTheme: ThemeManager.getCurrentTheme() };
  },
  DataProspeccion:function()
  {
    return {
     'Folio': this.refs.FolioID.getValue(),      
     'Vendedor': this.refs.lkpVendedor.getValue(),
     'Prospecto': this.refs.Prospecto.getValue(),
     'Correo': this.refs.Correo.getValue(),
     'Telefono': this.refs.Telefono.getValue()
    };
   //return data; 
  },
  EventCancel: function(e)
  {  console.log(idTask);
  },
  EventOk:function(e)
  {
    var data = this.DataProspeccion();
        data.id = idTask;
    $.ajax({
      url: "/Prospeccion_TAKEN", 
      type: "POST", 
      data: JSON.stringify( data ),
      contentType:"application/json; charset=utf-8", dataType:"json"}
    );
    history.back();
  },
  render() {
    return (
    <div>
      <AppBar title ='Prospección' />
      <TextField 
        hintText = '' 
        floatingLabelText = "Folio"
        multiLine = {false} 
        ref = 'FolioID'/>
      <LkpVendedor
        table = 'Seller'
        keyfield ='id'
        field = 'Nombre'
        ref = 'lkpVendedor'/>
      <Prospecto 
        hintText = 'Prospecto'
        loatingLabelText = "Prospecto"
        multiLine = {false}
        ref = 'Prospecto'/>
      <Phone 
        hintText = 'Introduzca su teléfono'
        floatingLabelText = "Telefono"
        multiLine = {false}
        ref = 'Telefono'/>
      <Correo 
        hintText = 'Introduzca su correo' 
        floatingLabelText = "Correo"
        multiLine = {false}
        ref = 'Correo' />
      < OkCancel secondary = {true} 
        ok = {this.EventOk} 
        cancel = {this.EventCancel} 
        ref = 'OkCancel'/>
    </div>
    )
  }
})

React.render(<App/>, document.body);


