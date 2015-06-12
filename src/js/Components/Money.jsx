/** Address.jsx */
var React = require('react');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var Money = React.createClass({

  setValue:function(value)
  {
    this.refs.Money.setValue(value);
  },
  getValue:function()
  {
     return this.refs.Money.getValue();
  },
  render: function() {
    var { ...other } = this.props;
    return(
        <TextField {...other} ref='Money'/>
    );
  }
});

module.exports = Money;

