/** Snackbar.jsx */
var React = require('react');
var Notification =require('react-notification/dist/notification');
var Snackbar = require('material-ui/lib/snackbar');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

module.exports = React.createClass({
   handleShow() {
    console.log('Notification hidden:', false);
    this.refs.notification.show();
  },

  handleHide() {
    console.log('Notification hidden:', true);
    this.refs.notification.hide();
  },

  handleNotificationActionClick() {
    console.log('Notification action clicked:', true);
  },

  getNotificationStyles() {

    var bar = {
      background: '#263238'
    };

    var action = {
      color: '#FFCCBC'
    };

    return { bar, action };

  },

  getInitialState() {
    return {
      message: 'Todo added',
      action: 'Undo'
    };
  },

  
 render() {

    return (
      <div>
        <button onClick={this.handleShow}>Show</button>
        <button onClick={this.handleHide}>Hide</button>
        <Notification
          ref="notification"
          message='hola mundo'
          action={this.state.action}
          styles={this.getNotificationStyles()}
          onClick={this.handleNotificationActionClick}/>
      </div>
    ); }
});


