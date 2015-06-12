/** Address.jsx */
var React = require('react');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var Phone = React.createClass({

  setValue:function(value)
  {
    this.refs.Phone.setValue(value);
  },
  getValue:function()
  {
     return this.refs.Phone.getValue();
  },
  render: function() {
    var { ...other } = this.props;
    return(
        <TextField {...other} ref='Phone'/>
    );
  }
});

module.exports = Phone;

