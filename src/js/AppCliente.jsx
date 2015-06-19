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

var LookUp = require("./Components/String.jsx");
var Checkbox = require('material-ui/lib/Checkbox');
var Tabs = require('material-ui/lib/tabs/tabs');
var Tab = require('material-ui/lib/tabs/tab');

Object.assign = Object.assign || require('object.assign');
var FixedDataTable = require('fixed-data-table');
require('fixed-data-table/dist/fixed-data-table.css');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var FlexBox = require('flexboxgrid');

var GridCroquisVentas = React.createClass(
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
              headerHeight={30}>
              <Column label="Documento" width={400} dataKey={'Documento'} />
              <Column label="Archivo" width={400} dataKey={'Archivo'} />
            </Table>
            );
      }
  });
  
  var GridPlantasElevaciones = React.createClass(
  {  render: function()
      {
      var datasource;   
      datasource = this.props.plantas;
      return(
            <Table 
              rowHeight={25}
              rowGetter={function(rowIndex) {return datasource[rowIndex];  }}
              rowsCount={datasource.length}
              width={1120}
              height={220}
              headerHeight={30}>
              <Column label="Documento" width={400} dataKey={'Documento'} />
              <Column label="Archivo" width={400} dataKey={'Archivo'} />
            </Table>
            );
      }
  });
  
var App = React.createClass({
   getInitialState: function()
  {
    return {products : [], plantas :[], sidebarWidth: 330}
  },
  childContextTypes:
  {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() 
  {
    return { muiTheme: ThemeManager.getCurrentTheme() };
  },
  
   
   AddPlantasElevaciones: function()
  { var PlantaElevacion = [{  "Documento": this.refs.DocumentoPlantasElevaciones.getValue(),  "Archivo": this.refs.ArchivoPlantasElevaciones.getValue()
                  }];
    this.state.plantas.push(PlantaElevacion[0]);
    this.setState();
   
    this.CleanPlantasElevaciones();
  },
  CleanPlantasElevaciones:function()
  {
       this.refs.DocumentoPlantasElevaciones.setValue('');
	   this.refs.ArchivoPlantasElevaciones.setValue('');
	    },
   componentDidMount: function() 
   
  { 
    this.refs.Fecha.setDate(new Date());
  },
  
   
  AddCroquis: function()
  { var Croquis = [{  "Documento": this.refs.DocumentoCroquis.getValue(),  "Archivo": this.refs.ArchivoCroquis.getValue()
                  }];
    this.state.products.push(Croquis[0]);
    this.setState();
   
    this.CleanCroquis();
  },
  CleanCroquis:function()
  {
       this.refs.DocumentoCroquis.setValue('');
	   this.refs.ArchivoCroquis.setValue('');
	    },
   componentDidMount: function() 
   
  { 
    this.refs.Fecha.setDate(new Date());
  },
  cancel: function(e)
  {
    console.log( 'cancel');
  },
  ok:function(e)
  {
    console.log( this.DataSource() );
        $.ajax(
        {url: "/Cliente_TAKEN", 
        type: "POST", 
         data: JSON.stringify( this.DataSource() ),
         success: console.log('hecho'),
         contentType:"application/json; charset=utf-8", dataType:"json"}
        );
    console.log( 'ok');
  },
  DataSource:function()
  {
    var data =  
        { 
			'FolioID': this.refs.FolioID.getValue(),		  
			'Fecha': this.refs.Fecha.getDate(),
			'Nombre': this.refs.Nombre.getValue(),
			'DireccionObra': this.refs.DireccionObra.getValue(),
			'Correo': this.refs.Correo.getValue(),
			'Telefono': this.refs.Telefono.getValue(),
			'NombreArquitecto': this.refs.NombreArquitecto.getValue(),
			'TelefonoArquitecto': this.refs.TelefonoArquitecto.getValue(),
			'CorreoArquitecto': this.refs.CorreoArquitecto.getValue(),
			'FechaVisitaObra': this.refs.FechaVisitaObra.getDate(), 
			'FechaEntregaPlanos': this.refs.FechaEntregaPlanos.getDate(), 
			//'Urgente': this.refs.Checkbox.isChecked(), 			
			'TipoConstruccion': this.refs.TipoConstruccion.getValue(),          
			'TipoProyecto': this.refs.TipoProyecto.getValue(),
			'TipoProspecto': this.refs.TipoProspecto.getValue(),          
			'FaseProyecto': this.refs.FaseProyecto.getValue(),			
			'Vendedor': this.refs.Vendedor.getValue(),
		    'Notas': this.refs.Notas.getValue(),	
			"CroquisVentas" : this.state.products,
			"PlantasElevaciones" : this.state.plantas
       };
   return data; 
  //Falta ShipVia-- ShipCost
  },
render() {
    return (
		
			
			<div>    	
			
			<AppBar title ='Registro de Cliente' />
			
			<Tabs> 
				<Tab label="Generales" > 
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
                            ref = 'Fecha'/>
                     </div>
                    </div>
                </div>
				
			<div className="Title">
				  <h3>Cliente</h3>
				 </div>

                 <div className="row">				 			  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                     <Name 
                         hintText = 'Introduzca el nombre del cliente'
                         floatingLabelText = "Nombre"
                         multiLine = {false}
                         ref = 'Nombre'/>
                    </div>
                   </div> 

					<div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                     <Address 
                         hintText = 'Introduzca la dirección de la obra'
                         floatingLabelText = "Dirección de la Obra"
                         multiLine = {false}
                         ref = 'DireccionObra'/>
                    </div>
                   </div> 
				  
				   
                 </div>
				 
				  <div className="row">				 			  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                     <Phone 
                         hintText = 'Introduzca el teléfono del cliente'
                         floatingLabelText = "Teléfono"
                         multiLine = {false}
                         ref = 'Telefono'/>
                    </div>
                   </div> 

					<div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                     <Correo 
                         hintText = 'Introduzca la correo del cliente'
                         floatingLabelText = "Correo"
                         multiLine = {false}
                         ref = 'Correo'/>
                    </div>
                   </div> 		  
				   
                 </div>
				 
				 <div className="Title">
				  <h3>Arquitecto</h3>
				 </div>
				 
				 <div className="row">				 			  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                     <Name 
                         hintText = 'Introduzca el nombre del arquitecto'
                         floatingLabelText = "Nombre"
                         multiLine = {false}
                         ref = 'NombreArquitecto'/>
                    </div>
                   </div>                 
                 </div>
				 
				 <div className="row">  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                     <Phone 
                         hintText = 'Introduzca el teléfono del arquitecto'
                         floatingLabelText = "Teléfono"
                         multiLine = {false}
                         ref = 'TelefonoArquitecto'/>
                    </div>
                   </div>
                  <div className="col-xs-6">
                    <div className="box">
                      <Correo 
                         hintText = 'Introduzca el correo del arquitecto' 
                         floatingLabelText = "Correo"
                         multiLine = {false}
                         ref = 'CorreoArquitecto' />
                   </div>
                  </div>
                 </div>
				 
				  <div className="Title">
				  <h3>Fechas</h3>
				 </div>
				 
				 <div className="row">  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                     <DateData 
                         hintText = ''
                         floatingLabelText = "Visita de Obra"
                         multiLine = {false}
                         ref = 'FechaVisitaObra'/>
                    </div>
                   </div>
                  <div className="col-xs-6">
                    <div className="box">
                      <DateData 
                         hintText = '' 
                         floatingLabelText = "Entrega de Planos"
                         multiLine = {false}
                         ref = 'FechaEntregaPlanos' />
                   </div>
                  </div>
                 </div>
				 
				 <div className="row">  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                      <Checkbox
						name="Checkbox"
						value="Urgente"					
						label="Urgente de cotizaciones a ventas" />
                    </div>
                   </div>                  
                 </div>
				 
				 <div className="Title">
				  <h3>Proyecto</h3>
				 </div>
				 
				 <div className="row">  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                    <LookUp 
                        hintText = 'Introduzca el tipo de construcción' 
                        floatingLabelText = "Tipo de Construcción"
                        multiLine = {false}
                        ref = 'TipoConstruccion' />
                    </div>
                  </div>

				<div className="col-xs-6">
                    <div className="box">
                    <LookUp 
                        hintText = 'Introduzca el tipo de proyecto' 
                        floatingLabelText = "Tipo de Proyecto"
                        multiLine = {false}
                        ref = 'TipoProyecto' />
                    </div>
                  </div>				  
                 </div>
				 
				<div className="row">  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                    <LookUp 
                        hintText = 'Introduzca el tipo de prospecto' 
                        floatingLabelText = "Tipo de Prospecto"
                        multiLine = {false}
                        ref = 'TipoProspecto' />
                    </div>
                  </div>
				  
				  <div className="col-xs-6">
                    <div className="box">
                      <LookUp 
                         hintText = 'Introduzca la fase del proyecto' 
                         floatingLabelText = "Fase del proyecto"
                         multiLine = {false}
                         ref = 'FaseProyecto' />
                   </div>
                  </div>				  
                 </div>
				 
				  <div className="row">  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                    <LookUp 
                        hintText = 'Introduzca el vendedor' 
                        floatingLabelText = "Vendedor"
                        multiLine = {false}
                        ref = 'Vendedor' />
                    </div>
                  </div>			  
				  <div className="col-xs-6">
                    <div className="box">
                      <StringData 
                         hintText = 'Introduzca las notas' 
                         floatingLabelText = "Notas"
                         multiLine = {false}
                         ref = 'Notas' />
                   </div>
                  </div>				  
                 </div>
				 
				</Tab> 
				
				<Tab label="Croquis de Ventas" > 
					  <TextField 
                        hintText = 'Introduzca el documento' 
                        floatingLabelText = "Documento"
                        multiLine = {false}
                        ref = 'DocumentoCroquis' />
                    <StringData 
                        hintText = 'Introduzca el archivo' 
                        floatingLabelText = "Archivo"
                        multiLine = {false}
                        ref = 'ArchivoCroquis' />
                    
                    <Botton label="Agregar"  
                        secondary={true}
                        onClick={this.AddCroquis} />
                    <GridCroquisVentas products ={this.state.products} />
				</Tab> 
				
				<Tab label="Plantas y Elevaciones de la Obra" > 
				
					 <TextField 
                        hintText = 'Introduzca el documento' 
                        floatingLabelText = "Documento"
                        multiLine = {false}
                        ref = 'DocumentoPlantasElevaciones' />
                    <StringData 
                        hintText = 'Introduzca el archivo' 
                        floatingLabelText = "Archivo"
                        multiLine = {false}
                        ref = 'ArchivoPlantasElevaciones' />
                    
                    <Botton label="Agregar"  
                        secondary={true}
                        onClick={this.AddPlantasElevaciones} />
                    <GridPlantasElevaciones plantas ={this.state.plantas} /> 
				</Tab>
			</Tabs>
			
          
			
		    
			 
				 
				
                 

                  
					
					

                                     
            
				
         <OkCancel secondary = {true} ok = {this.ok} cancel = {this.cancel} ref = 'OkCancel'/>
    </div>
	
    )
  }
})

React.render(<App/>, document.body);

