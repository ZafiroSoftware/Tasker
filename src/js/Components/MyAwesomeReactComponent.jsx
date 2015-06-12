/** MyAwesomeReactComponent.jsx */
var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var MyAwesomeReactComponent = React.createClass({
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
    var containerStyle = {
      textAlign: 'center',
      paddingTop: '200px'
    };
    return (
      <div style={containerStyle}>
        <RaisedButton label="Hola Material ui" primary={true} onTouchTap={this._handleTouchTap} />
      </div>
    );
  },
_handleTouchTap: function() {
    alert('1-2-3-4-5');
  }
});

module.exports = MyAwesomeReactComponent;

