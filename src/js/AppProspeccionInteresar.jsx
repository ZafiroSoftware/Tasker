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



var LkpVendedor = require("./Components/SearchEntity.jsx");
var LkpFaseProyecto = require("./Components/SearchEntity.jsx");
var LkpTipoProspecto = require("./Components/SearchEntity.jsx");
var LkpProspecto = require("./Components/SearchEntity.jsx");



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
   
  
 
  DataProspeccion:function()
  {

    var data =  
        { //'Folio': this.refs.FolioID.getValue(),		  
          'Vendedor': this.refs.lkpVendedor.getValue(),
		      'Fecha': this.refs.DateData.getDate(),
          'Prospecto': this.refs.Prospecto.getValue(),
          'Correo': this.refs.Correo.getValue(),
		      'Telefono': this.refs.Telefono.getValue(),
		      'TipoProspecto': this.refs.lkpTipoProspecto.getValue(),          
		      'FaseProyecto': this.refs.lkpFaseProyecto.getValue()
       };
   return data; 
  //Falta ShipVia-- ShipCost
    },

  ChangeProspecto: function(event)
  {     

   {ProspectosService.findById(event).done(function(ItemsProspecto)
      {
       

        this.refs.lkpVendedor.setValue(ItemsProspecto[0].Vendedor);       
        //this.refs.Fecha.setDate(new Date(ItemsProspecto[0].Fecha));
        this.refs.Prospecto.setValue(ItemsProspecto[0].Prospecto);
        this.refs.Correo.setValue(ItemsProspecto[0].Correo);
        this.refs.Telefono.setValue(ItemsProspecto[0].Telefono);
        this.refs.lkpTipoProspecto.setValue(ItemsProspecto[0].TipoProspecto);
        this.refs.lkpFaseProyecto.setValue(ItemsProspecto[0].FaseProyecto);
        
       }.bind(this));
      }      
   
   
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
        {url: "/Prospecto_Interesar", 
        type: "POST", 
         data: JSON.stringify( data ),
         success: console.log('hecho'),
         contentType:"application/json; charset=utf-8", dataType:"json"}
        );
    history.back();
  },



  render() {
    return (
      <div>
      	<AppBar title ='Interesar a Prospecto' />
          <div className="row">
            <div className="col-xs-12">

                <div className="row">
                 <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                  <div className="box">
                        <LkpProspecto
                          table = 'Prospectos'
                          keyfield ='id'
                          field = 'Prospecto'
                      ref = 'LkpProspecto' 
                      onChange={this.ChangeProspecto}/>
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

                    
                    
            </div>
          </div>
         <OkCancel secondary = {true} ok = {this.EventOk} cancel = {this.EventCancel} ref = 'OkCancel'/>
    </div>
    )
  }
})

React.render(<App/>, document.body);

