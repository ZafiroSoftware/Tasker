/** Address.jsx */
var React = require('react');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var Address = React.createClass({

  setValue:function(value)
  {
    this.refs.Address.setValue(value);
  },
  getValue:function()
  {
     return this.refs.Address.getValue();
  },
  render: function() {
    var { ...other } = this.props;
    return(
        <TextField {...other} ref='Address'/>
    );
  }
});

module.exports = Address;

