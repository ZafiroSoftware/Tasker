/** Address.jsx */
var React = require('react');
var Botton = require('material-ui/lib/flat-button');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

var OkCancel = React.createClass({
propTypes: {
    onClick: React.PropTypes.func
  },
  _handleOnClick: function(e) {
    //this.props.onClick(e);
  },
  Click:function()
  {
  	console.log('new');
  },
    getInitialState: function()
  {
    return { isOkNotCancel:false }
  },
  getInitialProps:function()
  {
  	return {secondary:false}
  },

  render: function() {
    var { ...other } = this.props;
    return(
      <div className="text-field-mui">
        <Botton {...other}  label = 'ok' ref='ok' secondary={this.props.secondary}  onClick = {this.props.ok} />
        <Botton {...other}  label = 'cancel' ref='cancel'secondary={this.props.secondary} onClick = {this.props.cancel} />
      </div>
    );
  }
});

module.exports = OkCancel;

