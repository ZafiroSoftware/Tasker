/** Address.jsx */
var React = require('react');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var Percent = React.createClass({

  setValue:function(value)
  {
    this.refs.Percent.setValue(value);
  },
  getValue:function()
  {
     return this.refs.Percent.getValue();
  },
  render: function() {
    var { ...other } = this.props;
    return(
        <TextField {...other} ref='Percent'/>
    );
  }
});

module.exports = Percent;

