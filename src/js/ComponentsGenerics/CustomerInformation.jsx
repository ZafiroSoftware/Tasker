var React = require("react");
var TextField = require("material-ui/lib/text-field");

var CustomerInformation= React.createClass({
 
  getInitialState:function()
  {
    return { customer:[], nombre:'', dirreccion:'', email:'', telefono:''}
  },
  render:function()
  {
    return(
      <div>
        <TextField hintText = 'Introduzca su nombre' floatingLabelText = "Nombre" value = {this.state.customer.Nombre} />
        <TextField hintText = 'Introduzca su dirección' floatingLabelText = "Dirección" multiLine = {true} value = {this.state.customer.Direccion}/>
        <TextField hintText = 'Introduzca su email' floatingLabelText = "email" multiLine = {false} value = {this.state.customer.Email}/>
        <TextField hintText = 'Introduzca su telefono' floatingLabelText = "telefono" multiLine = {false} value = {this.state.customer.Telefono}/>
        <Address/>
      </div>
    )
  }
})

module.exports = CustomerInformation;