var React = require("react");
var TextField = require('material-ui/lib/text-field');
var AppBar = require("./Components/AppBar.jsx");
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Botton = require('material-ui/lib/flat-button');


var Address = require("./Components/Address.jsx");
var Prospecto = require("./Components/String.jsx");
var TipoProspecto = require("./Components/String.jsx");
var FaseProyecto = require("./Components/String.jsx");
var DateData = require("./Components/Date.jsx");
var Correo = require("./Components/Email.jsx");
var Name = require("./Components/Name.jsx");
var Phone = require("./Components/Phone.jsx");
var StringData = require("./Components/String.jsx");
var Money = require("./Components/Money.jsx");
var Cantidad = require("./Components/Cantidad.jsx");
var OkCancel = require("./Components/OkCancel.jsx");

Object.assign = Object.assign || require('object.assign');
var FixedDataTable = require('fixed-data-table');
require('fixed-data-table/dist/fixed-data-table.css');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;
var idTask;
//var FlexBox = require('flexboxgrid');


var LkpProspecto = require("./Components/SearchEntity.jsx");

var GridPreguntas = React.createClass(
  {  render: function()
      {
      var datasource;   
      datasource = this.props.products;
      return(
            <Table 
              rowHeight={35}
              rowGetter={function(rowIndex) {return datasource[rowIndex];  }}
              rowsCount={datasource.length}
              width={1120}
              height={300}
              headerHeight={35}>
              <Column label="Pregunta" width={400} dataKey={'Pregunta'} />
              <Column label="Respuesta" width={400} dataKey={'Respuesta'} />
            </Table>
            );
      }
  });

var App = React.createClass({
   getInitialState: function()
  {
    return {products : [], sidebarWidth: 330}
  },
  childContextTypes:
  {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() 
  {
    return { muiTheme: ThemeManager.getCurrentTheme() };
  },
  CleanCustomer: function()
  {
    this.refs.lkpVendedor.setValue('');
    this.refs.Prospecto.setValue('');
    this.refs.Correo.setValue('');
    this.refs.Telefono.setValue('');
    this.refs.lkpTipoProspecto.setValue('');
	this.refs.lkpFaseProyecto.setValue('');
  },
   
  AddPregunta: function()
  { var product = [{  "Pregunta": this.refs.Pregunta.getValue(),  "Respuesta": this.refs.Respuesta.getValue()
                  }];

    var Prospecto =  this.refs.LkpProspecto.getValue();
    this.state.products.push(product[0]);
    this.setState();
    this.refs.LkpProspecto.setValue(Prospecto);
    this.CleanPreguntas();
  },


  CleanPreguntas:function()
  {
       this.refs.Pregunta.setValue('');
	   this.refs.Respuesta.setValue('');
	    },
  componentDidMount: function() 
  { 
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
        url = window.location.href, params = {}, match;
        while(match = regex.exec(url)) {params[match[1]] = match[2]; }
        idTask = params.id;
  },
  cancel: function(e)
  {
    console.log(idTask);
  },

  EventCancel: function(e)
  { 
    //console.log(idTask);
    window.location = '/';
  },

  EventOk:function(e)
  {
    var data = this.DataProspeccion();
        data.id = idTask;
    $.ajax({
      url: "/Prospecto_Interesar", 
      type: "POST", 
      data: JSON.stringify( data ),
      contentType:"application/json; charset=utf-8", dataType:"json"}
    );
    window.location = '/';
  },


  ok:function(e)
  {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
       url = window.location.href, params = {}, match;
       while(match = regex.exec(url)) {params[match[1]] = match[2]; }
       var data = this.DataProspeccion();
        data.id = this.refs.LkpProspecto.getValue();
        


  $.ajax(
        {url: "/Prospecto_Calificar", 
        type: "POST", 
         data: JSON.stringify( data ),
         success: console.log('hecho'),
         contentType:"application/json; charset=utf-8", dataType:"json"}
        );
    history.back();
  },
  DataProspeccion:function()
  {

    var data =  
        { //'Folio': this.refs.FolioID.getValue(),		  
           'Preguntas' : this.state.products
       };
   return data; 
  //Falta ShipVia-- ShipCost
  },

  ChangeProspecto: function(event)
  {     

   {ProspectosService.findByName(event).done(function(ItemsProspecto)
      {

        console.log(ItemsProspecto);
           
        //this.refs.Fecha.setDate(new Date(ItemsProspecto[0].Fecha));
               
       }.bind(this));
      }
    
      
   
   
  },

  render() {
    return (
    <div>
      <AppBar title ='Calificar Prospecto' />
      <LkpProspecto
          table = 'Prospectos'
          keyfield ='id'
          field = 'Prospecto'
          ref = 'LkpProspecto' 
          onChange={this.ChangeProspecto}/>      

      <TextField 
          hintText = 'Introduzca la Pregunta' 
          floatingLabelText = "Pregunta"
          multiLine = {false}
          ref = 'Pregunta' />
      <StringData 
          hintText = 'Introduzca la respuesta' 
          floatingLabelText = "Respuesta"
          multiLine = {false}
          ref = 'Respuesta' />
      
      <Botton label="Agregar"  
          secondary={true}
          onClick={this.AddPregunta} />
      <GridPreguntas products ={this.state.products} />

       
      <OkCancel secondary = {true} 
        ok = {this.EventOk} 
        cancel = {this.EventCancel} 
        ref = 'OkCancel'/>
    </div>
    )
  }
})

React.render(<App/>, document.body);

