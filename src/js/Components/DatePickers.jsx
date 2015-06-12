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

var DatePickers = React.createClass({
  getDefaultProps: function()
  {
  	return {hintText:'',mode:''};
  },
  getInitialState: function()
  {
  	return {autoOk:false};
  },
  childContextTypes: 
  {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentWillMount: function() {
  	ThemeManager.setTheme(ThemeManager.types.LIGHT);
    //this.refs.fecha.setValue(new date());
  },
  render: function() 
  {
    return (
      <div>
       <DatePicker
       		hintText={this.props.hintText}
       		mode={this.props.mode}
  			autoOk={this.state.autoOk}
  			minDate={this.state.minDate}
  			maxDate={this.state.maxDate}
  			showYearSelector={this.state.showYearSelector}
        ref = 'fecha' />
      </div>
    );
  }
});

module.exports = DatePickers;

