/** Address.jsx */
var React = require('react');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var STRING = React.createClass({

  setValue:function(value)
  {
    this.refs.STRING.setValue(value);
  },
  getValue:function()
  {
     return this.refs.STRING.getValue();
  },
  render: function() {
    var { ...other } = this.props;
    return(
        <TextField {...other} ref='STRING'/>
    );
  }
});

module.exports = STRING;

