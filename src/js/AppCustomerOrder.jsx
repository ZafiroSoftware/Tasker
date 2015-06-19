var React = require("react");
var TextField = require('material-ui/lib/text-field');
var AppBar = require("./Components/AppBar.jsx");
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Botton = require('material-ui/lib/flat-button');
var Tabs = require('material-ui/lib/tabs/tabs');
var Tab = require('material-ui/lib/tabs/tab');

var Address = require("./Components/Address.jsx");
var DateData = require("./Components/Date.jsx");
var Email = require("./Components/Email.jsx");
var Name = require("./Components/Name.jsx");
var Phone = require("./Components/Phone.jsx");
var StringData = require("./Components/String.jsx");
var Money = require("./Components/Money.jsx");
var Cantidad = require("./Components/Cantidad.jsx");
var OkCancel = require("./Components/OkCancel.jsx");
var SearchEntity = require("./Components/SearchEntity.jsx");

Object.assign = Object.assign || require('object.assign');
var FixedDataTable = require('fixed-data-table');
require('fixed-data-table/dist/fixed-data-table.css');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var FlexBox = require('flexboxgrid');

var Griddle = require("./Components/Griddle.jsx");
var columnMeta = require('./MetaGrid/CustomerOrderColumnMetaItems.js').CustomerOrderColumnMetaItems;
var fakeData = require('./MetaGrid/fakeData.js').fakeData;
var resultsPerPage = 10;

var SearchCustomer = require('react-super-select');
var DropzoneComponent = require('react-dropzone-component/lib/dropzone');
//var Dropzone = require('rc-dropzone');

var GriddleArticulos = React.createClass({
      render: function () {
        var datasource;   
      datasource = this.props.products;
      console.log(datasource);
        return (
          <div id="table-area">
             <Griddle results={datasource}
                      columnMetadata={columnMeta}
                      resultsPerPage={resultsPerPage}
                      tableClassName="table"/>
          </div>
        )
      }
  });

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
/*var djsConfig = {
  previewTemplate: React.renderToStaticMarkup(
    <div className="dz-preview dz-file-preview">
      <div className="dz-details">
        <div className="dz-filename"><span data-dz-name></span></div>
        <img data-dz-thumbnail />
      </div>
      <div className="dz-progress"><span className="dz-upload" data-dz-uploadprogress></span></div>
      <div className="dz-success-mark"><span>✔</span></div>
      <div className="dz-error-mark"><span>✘</span></div>
      <div className="dz-error-message"><span data-dz-errormessage></span></div>
    </div>
  )
}*/

var GridArticulos = React.createClass(
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
              <Column label="Articulo" width={100} dataKey={'ArticuloID'} />
              <Column label="Clave" width={200} dataKey={'ClaveArticulo'} />
              <Column label="Descripcion" width={400} dataKey={'Descripcion'} />
              <Column label="Cantidad" width={100} dataKey={'Cantidad'} />
              <Column label="Precio" width={100} dataKey={'Precio'} />
              <Column label="Importe" width={100} dataKey={'Importe'} />
            </Table>
            );
      }
  });

var App = React.createClass({
   getInitialState: function()
  {
    return { Articulo : [] ,products : [], sidebarWidth: 330}
  },
  childContextTypes:
  {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() 
  {
    return { muiTheme: ThemeManager.getCurrentTheme() };
  },
  ChangeCustomerID: function(e)
  {
    if(e.keyCode === 13)
    { customerService.findById( this.refs.customerID.getValue() ).done(function(customers)
      {if ((customers) && customers.length > 0)
        { console.log( customers );
          this.refs.Nombre.setValue(customers[0].Nombre);
          this.refs.Direccion.setValue(customers[0].Direccion);
          this.refs.email.setValue(customers[0].Email);
          this.refs.telefono.setValue(customers[0].Telefono);
          this.refs.DireccionEnvio.setValue(customers[0].Direccion);
        }
        else
        { this.CleanCustomer(); }
  
      }.bind(this));  
    }  
  },
  CleanCustomer: function()
  {
    this.refs.Nombre.setValue('');
    this.refs.Direccion.setValue('');
    this.refs.email.setValue('');
    this.refs.telefono.setValue('');
    this.refs.DireccionEnvio.setValue('');
  },
  ChangeArticulo: function(e)
  {
    if(event.keyCode === 13)
    {productsService.findByName( this.refs.Articulo.getValue() ).done(function(ItemsProduct)
      {
          this.setState({Articulo: ItemsProduct[0] });
          this.refs.Descripcion.setValue(ItemsProduct[0].Descripcion);
          this.refs.Precio.setValue(ItemsProduct[0].Precio);
          this.refs.Cantidad.setValue(1.0);
       }.bind(this));
      }
      else 
     {
      this.setState({ Articulo: [] });
      this.refs.Descripcion.setValue('');
      this.refs.Precio.setValue('');
      this.refs.Cantidad.setValue(1.0);
     }
  },
  AddProduct: function()
  { var product = [{  "ArticuloID": this.state.Articulo.ArticuloID, "ClaveArticulo": this.state.Articulo.ClaveArticulo,
                      "Descripcion": this.state.Articulo.Descripcion,"Cantidad": this.refs.Cantidad.getValue() ,
                      "Precio": this.refs.Precio.getValue(),
                      "Importe": this.refs.Precio.getValue() * this.refs.Cantidad.getValue()
                  }];
    this.state.products.push(product[0]);
    this.setState();
    this.CalculaTotales();
    this.CleanProduct();
  },
  CalculaTotales: function()
  {
    var Total = 0;
    this.state.products.map(function (i) { Total += i.Importe } );
    this.refs.Total.setValue(Total);
  },
  CleanProduct:function()
  {
      this.setState({ Articulo: [] });
      this.refs.Articulo.setValue('');
      this.refs.Descripcion.setValue('');
      this.refs.Precio.setValue('');
      this.refs.Cantidad.setValue(1.0);
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
   $.ajax(
   {
    url: "/CustomerOrder_TAKEN", 
    type: "POST", 
    data: JSON.stringify( this.DataCustomerOrder() ),
    //success: console.log('hecho'),
    contentType:"application/json; charset=utf-8", dataType:"json"} );
   
     history.back();
  },
  DataCustomerOrder:function()
  {
    var data =  
        { 'Customer': this.refs.customerID.getValue(),
          'shipTo': this.refs.DireccionEnvio.getValue(), 
          'shipTo': this.refs.DireccionEnvio.getValue(),
          'Total': this.refs.Total.getValue(),
          'date': this.refs.DateData.getDate(),
          "items" : this.state.products
       };
   return data; 
  //Falta ShipVia-- ShipCost
  },
  simulatedAjaxFetch: function() {
    var testData = [
            {
              "id": "5507c0528152e61f3c348d56",
              "name": "elit laborum et"
            },
            {
              "id": "5507c0526305bceb0c0e2c7a",
              "name": "dolor nulla velit"
            }
            ];
  // simulate a 2 second ajax fetch for collection data
  return {
    then: function(callback) {
       customerService
          .findByName('')
          .done(function(customers)
           { console.log(customers[0]); callback(customers); }
          );

    }
  };
},
handlerExample : function(option) {
  var output = [
    'Option Item Chosen = {\n',
    '\tid: ', option.id, '\n',
    '\Nombre: ', option.name, '\n\t};'];
  console.log(output.join(''));
},
  render() {
    return (
      <div>    	
        <DropzoneComponent config={componentConfig} 
                       eventHandlers={eventHandlers} 
                       djsConfig={djsConfig} 
                       maxFilesize = {100} />,
          <div className="row">
            <div className="col-xs-12">

              <Tabs> 
                <Tab label="Informacion General" >
                <div className="row">
                 <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                  <div className="box">

                      <SearchEntity 
                         table='Customer'
                         keyfield = 'id'
                         field = 'Nombre'/>

                        <TextField 
                          hintText = 'Ingrese No. de cliente' 
                          floatingLabelText = "Cliente"
                          multiLine = {false} 
                          onKeyDown={this.ChangeCustomerID}
                          ref = 'customerID'/>
                  </div>
                 </div>
                    <div className="col-xs-4">
                      <div className="box">
                          <DateData
                            hintText = 'Fecha' 
                            mode = 'portrait' 
                            ref = 'DateData'/>
                     </div>
                    </div>
                </div>
                  
                <div className="row">	
                 <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                  <div className="box">
                    <Name 
                        hintText = 'Nombre del Cliente' 
                        floatingLabelText = "Nombre"
                        multiLine = {false} 
                        ref = 'Nombre'/>
                  </div>
                </div>
                  <div className="col-xs-6">
                    <div className="box">
                     <Address 
                         hintText = 'Introduzca su dirección'
                         floatingLabelText = "Dirección"
                         multiLine = {true}
                         ref = 'Direccion'/>
                    </div>
                  </div>
                </div>

                 <div className="row">  
                  <div className="col-xs-12 col-sm-8 col-md-6 col-lg-4">
                    <div className="box">
                     <Email 
                         hintText = 'Introduzca su email'
                         floatingLabelText = "Email"
                         multiLine = {false}
                         ref = 'email'/>
                    </div>
                   </div>
                  <div className="col-xs-6">
                    <div className="box">
                      <Phone 
                         hintText = 'Introduzca su telefono' 
                         floatingLabelText = "Telefono"
                         multiLine = {false}
                         ref = 'telefono' />
                   </div>
                  </div>
                 </div>

                 <div className="row">  
                  <div className="col-xs-12">
                    <div className="box">
                    <Address 
                        hintText = 'Introduzca la dirección de envío' 
                        floatingLabelText = "Dirección de Envío"
                        multiLine = {false}
                        ref = 'DireccionEnvio' />
                    </div>
                  </div>
                 </div>
               
               </Tab>
              </Tabs>
                    <TextField 
                        hintText = 'Introduzca la clave del artículo' 
                        floatingLabelText = "Artículo"
                        multiLine = {false}
                        onKeyDown={this.ChangeArticulo}
                        ref = 'Articulo' />
                    <StringData 
                        hintText = 'Descripción' 
                        floatingLabelText = "Descripción"
                        multiLine = {false}
                        ref = 'Descripcion' />
                     <Money 
                        hintText = 'Precio' 
                        floatingLabelText = "Precio"
                        multiLine = {false}
                        ref = 'Precio' />
                    <Cantidad 
                        hintText = 'Cantidad' 
                        floatingLabelText = "Cantidad"
                        multiLine = {false}
                        ref = 'Cantidad' />
                    <Botton label="Agregar"  
                        secondary={true}
                        onClick={this.AddProduct} />
                    <GridArticulos products ={this.state.products} />
                    <TextField 
                        hintText = 'Total' 
                        floatingLabelText = "Total"
                        multiLine = {false}
                        ref = 'Total' />
            </div>
          </div>
         <OkCancel secondary = {true} ok = {this.ok} cancel = {this.cancel} ref = 'OkCancel'/>
    </div>
    )
  }
})

React.render(<App/>, document.body);

