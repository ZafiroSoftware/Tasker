/** Address.jsx */
var React = require('react');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var Cantidad = React.createClass({

  setValue:function(value)
  {
    this.refs.Cantidad.setValue(value);
  },
  getValue:function()
  {
     return this.refs.Cantidad.getValue();
  },
  render: function() {
    var { ...other } = this.props;
    return(
        <TextField {...other} ref='Cantidad'/>
    );
  }
});

module.exports = Cantidad;

