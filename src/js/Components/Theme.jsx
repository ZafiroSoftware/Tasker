/** Theme.jsx */
var React = require('react');
var mui = require('mui');
var ThemeManager = new mui.Styles.ThemeManager();

class OuterMostParentComponent extends React.Component {
  // Important!
  getChildContext() { 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }
};

// Important!
OuterMostParentComponent.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = OuterMostParentComponent;

