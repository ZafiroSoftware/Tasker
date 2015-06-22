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

var FlexBox = require('flexboxgrid');

var LkpVendedor = require("./Components/SearchEntity.jsx");
var LkpFaseProyecto = require("./Components/SearchEntity.jsx");
var LkpTipoProspecto = require("./Components/SearchEntity.jsx");

var GridPreguntas = React.createClass(
  {  render: function()
      {
      var datasource;   
      datasource = this.props.products;
      return(
            <Table 
              rowHeight={25}
              rowGetter={function(rowIndex) {return datasource[rowIndex];  }}
              rowsCount={datasource.length}
              width={1120}
              height={220}
              headerHeight={25}>
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
    this.state.products.push(product[0]);
    this.setState();
   
    this.CleanPreguntas();
  },
  CleanPreguntas:function()
  {
       this.refs.Pregunta.setValue('');
	   this.refs.Respuesta.setValue('');
	    },
   componentDidMount: function() 
   
  { 
    this.refs.DateData.setDate(new Date());
  },
  cancel: function(e)
  {
    console.log( 'cancel');
  },
  ok:function(e)
  {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
       url = window.location.href, params = {}, match;
       while(match = regex.exec(url)) {params[match[1]] = match[2]; }
    var data = this.DataProspeccion();
        data.id = params.id;
  $.ajax(
        {url: "/Prospeccion_TAKEN", 
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
        { 'Folio': this.refs.FolioID.getValue(),		  
          'Vendedor': this.refs.lkpVendedor.getValue(),
		  'Fecha': this.refs.DateData.getDate(),
          'Prospecto': this.refs.Prospecto.getValue(),
         'Correo': this.refs.Correo.getValue(),
		 'Telefono': this.refs.Telefono.getValue(),
		 'TipoProspecto': this.refs.lkpTipoProspecto.getValue(),          
		  'FaseProyecto': this.refs.lkpFaseProyecto.getValue(),
          "Preguntas" : this.state.products
       };
   return data; 
  //Falta ShipVia-- ShipCost
  },
  render() {
    return (
      <div>
      	<AppBar title ='Prospección' />
          <div className="row">
            <div className="col-xs-12">

                <div className="row">
                 <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                  <div className="box">
                        <TextField 
                          hintText = '' 
                          floatingLabelText = "Folio"
                          multiLine = {false} 
                          
                          ref = 'FolioID'/>
                  </div>
                 </div>
                    <div className="col-xs-4">
                      <div className="box">
                          <DateData
                            hintText = 'Fecha' 
							floatingLabelText = "Fecha"
                            mode = 'portrait' 
                            ref = 'DateData'/>
                     </div>
                    </div>
                </div>
                  
                <div className="row">	
                 <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                  <div className="box">
                    <label >Vendedor</label>
							<LkpVendedor
								table = 'Seller'
								keyfield ='id'
								field = 'Nombre'
								ref = 'lkpVendedor'/>
                  </div>
                </div>
                  <div className="col-xs-6">
                    <div className="box">
                     <Prospecto 
                         hintText = 'Prospecto'
                         floatingLabelText = "Prospecto"
                         multiLine = {false}
                         ref = 'Prospecto'/>
                    </div>
                  </div>
                </div>

                 <div className="row">  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                     <Phone 
                         hintText = 'Introduzca su teléfono'
                         floatingLabelText = "Telefono"
                         multiLine = {false}
                         ref = 'Telefono'/>
                    </div>
                   </div>
                  <div className="col-xs-6">
                    <div className="box">
                      <Correo 
                         hintText = 'Introduzca su correo' 
                         floatingLabelText = "Correo"
                         multiLine = {false}
                         ref = 'Correo' />
                   </div>
                  </div>
                 </div>

                 <div className="row">  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                    <label >Tipo de Prospecto</label>
						<LkpTipoProspecto
							table = 'TypeProspectus'
							keyfield ='id'
							field = 'Nombre'
							ref = 'lkpTipoProspecto'/>
                    </div>
                  </div>
				  
				  <div className="col-xs-6">
                    <div className="box">
                       <label >Fase del Proyecto</label>
						<LkpFaseProyecto
							table = 'Phase'
							keyfield ='id'
							field = 'Nombre'
							ref = 'lkpFaseProyecto'/>
                   </div>
                  </div>
				  
                 </div>

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
                    
            </div>
          </div>
         <OkCancel secondary = {true} ok = {this.ok} cancel = {this.cancel} ref = 'OkCancel'/>
    </div>
    )
  }
})

React.render(<App/>, document.body);

