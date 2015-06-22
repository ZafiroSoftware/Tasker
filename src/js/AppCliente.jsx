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
var SearchEntity = require("./Components/SearchEntity.jsx");

var LkpCliente = require("./Components/SearchEntity.jsx");
var LkpVendedor = require("./Components/SearchEntity.jsx");
var LkpArquitecto = require("./Components/SearchEntity.jsx");
var LkpTipoConstruccion = require("./Components/SearchEntity.jsx");
var LkpFaseProyecto = require("./Components/SearchEntity.jsx");
var LkpTipoProspecto = require("./Components/SearchEntity.jsx");
var LkpTipoProyecto = require("./Components/SearchEntity.jsx");

var Column = FixedDataTable.Column;
var FlexBox = require('flexboxgrid');


  
//Manejo de importación de archivo
var  DropzoneComponent = require('react-dropzone-component/lib/dropzone');

var myDropzone;

function initCallback (dropzone) {
    myDropzone = dropzone;
}

function removeFile () {
    if (myDropzone) {
        myDropzone.removeFile();
    }
}

var componentConfig = {
    allowedFiletypes: ['.*'],
    showFiletypeIcon: true,
    postUrl: '/loadFiles'
};

var callbackArray = [
    function () {
        console.log('Look Ma, I\'m a callback in an array!');
    },
    function () {
        console.log('Wooooow!');
    }
];
 
var simpleCallBack = function () {
    console.log('I\'m a simple callback');
};

var djsConfig = {
    addRemoveLinks: true
};
var eventHandlers = {
    // All of these receive the event as first parameter:
    drop: callbackArray,
    dragstart: null,
    dragend: null,
    dragenter: null,
    dragover: null,
    dragleave: null,
    // All of these receive the file as first parameter:
    addedfile: simpleCallBack,
    removedfile: null,
    thumbnail: null,
    error: null,
    processing: null,
    uploadprogress: null,
    sending: null,
    success: null,
    complete: null,
    canceled: null,
    maxfilesreached: null,
    maxfilesexceeded: null,
    // All of these receive a list of files as first parameter 
    // and are only called if the uploadMultiple option 
    // in djsConfig is true:
    processingmultiple: null,
    sendingmultiple: null,
    successmultiple: null,
    completemultiple: null,
    canceledmultiple: null,
    // Special Events
    totaluploadprogress: null,
    reset: null,
    queuecompleted: null
}

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
  { var PlantaElevacion = 
            [{  "Documento": this.refs.DocumentoPlantasElevaciones.getValue(),  
                "Archivo": this.refs.ArchivoPlantasElevaciones.getValue()
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
  { var Croquis =
        [{  "Documento": this.refs.DocumentoCroquis.getValue(),  
            "Archivo": this.refs.ArchivoCroquis.getValue()
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
  {this.refs.lkpTipoConstruccion.getValue();
    console.log( 'cancel');
  },
  ok:function(e)
  {
    var regex = /[?&]([^=#]+)=([^&#]*)/g,
       url = window.location.href, params = {}, match;
       while(match = regex.exec(url)) {params[match[1]] = match[2]; }
    var data = this.DataSource();
        data.id = params.id;
   $.ajax(
      {url: "/Cliente_TAKEN", 
       type: "POST", 
       data: JSON.stringify( data ),
       //success: console.log('hecho'),
       contentType:"application/json; charset=utf-8", dataType:"json"}
        );
    history.back();
  },
  DataSource:function()
  {
    var data =  
        { 
			'FolioID': this.refs.FolioID.getValue(),		  
			'Fecha': this.refs.Fecha.getDate(),
			'Cliente': this.refs.lkpCliente.getValue(),
			'DireccionObra': this.refs.DireccionObra.getValue(),
			'Correo': this.refs.Correo.getValue(),
			'Telefono': this.refs.Telefono.getValue(),
			'Arquitecto': this.refs.lkpArquitecto.getValue(),
			'TelefonoArquitecto': this.refs.TelefonoArquitecto.getValue(),
			'CorreoArquitecto': this.refs.CorreoArquitecto.getValue(),
			'FechaVisitaObra': this.refs.FechaVisitaObra.getDate(), 
			'FechaEntregaPlanos': this.refs.FechaEntregaPlanos.getDate(), 
			//'Urgente': this.refs.Checkbox.isChecked(), 			
			'TipoConstruccion': this.refs.lkpTipoConstruccion.getValue(),          
			'TipoProyecto': this.refs.lkpTipoProyecto.getValue(),
			'TipoProspecto': this.refs.lkpTipoProspecto.getValue(),          
			'FaseProyecto': this.refs.lkpFaseProyecto.getValue(),			
			'Vendedor': this.refs.lkpVendedor.getValue(),
		  'Notas': this.refs.Notas.getValue() 
			//,	
			//"CroquisVentas" : this.state.products,
			//"PlantasElevaciones" : this.state.plantas
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
                  <label >Cliente</label>            
        					<LkpCliente
        						table = 'Customer'
        						keyfield ='id'
        						field = 'Nombre'
                    ref = 'lkpCliente' />
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
                         hintText = 'Introduzca el correo del cliente'
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
					<label >Arquitecto</label>
                     <LkpArquitecto
							table = 'Architects'
							keyfield ='id'
							field = 'Nombre'
              ref = 'lkpArquitecto'/>
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
					<label >Tipo de Construcción</label>
						<LkpTipoConstruccion
							table = 'TypeConstruction'
							keyfield ='id'
							field = 'Nombre'
              ref = 'lkpTipoConstruccion' />
                    </div>
                  </div>

				<div className="col-xs-6">
                    <div className="box">				
                    <label >Tipo de Proyecto</label>
                    <LkpTipoProyecto
							table = 'TypeProject'
							keyfield ='id'
							field = 'Nombre'
              ref = 'lkpTipoProyecto'/>
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
				
					 <label >Introduzca el documento</label>   
						
                     <DropzoneComponent config={componentConfig} 
                       eventHandlers={eventHandlers} 
                       djsConfig={djsConfig} />,
                    
                                       
				</Tab> 
				
				<Tab label="Plantas y Elevaciones de la Obra" > 
				
					<label >Introduzca el documento</label>    
					 						
                     <DropzoneComponent config={componentConfig} 
                       eventHandlers={eventHandlers} 
                       djsConfig={djsConfig} />,
                    
                    
                    
				</Tab>
			</Tabs>
        <OkCancel secondary = {true} ok = {this.ok} cancel = {this.cancel} ref = 'OkCancel'/>
    </div>
	
    )
  }
})

React.render(<App/>, document.body);

