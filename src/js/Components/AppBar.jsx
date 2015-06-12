/** AppBar.jsx */
var React = require('react');
var AppBar = require('material-ui/lib/app-bar');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var MyTextField = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentWillMount: function() {
    ThemeManager.setPalette({
      accent1Color: Colors.blue500
    });
  },
  render: function() {
    return (
      <div className="text-field-mui">
        <AppBar title= {this.props.title}  />
      </div>
    );
  }
});

module.exports = MyTextField;

