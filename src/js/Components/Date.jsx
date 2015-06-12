/** DatePicker.jsx */
var React = require('react');
var DatePicker = require('material-ui/lib/date-picker');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');
var Dialog =  require('material-ui/lib/dialog');
var DialogWindow= require('material-ui/lib/dialog-window');

var injectTapEventPlugin = require("react-tap-event-plugin");
window.React = React;
injectTapEventPlugin();

var DateControl = React.createClass({
  getDate: function()
  {
  		return this.refs.DatePicker.getDate();
  },
  setDate: function(value)
  {
  		return this.refs.DatePicker.setDate(value);
  },
  render: function() 
  { var { ...other } = this.props;
    return (
       <DatePicker {...other} ref='DatePicker'/>

    );
  }
});

module.exports = DateControl;

