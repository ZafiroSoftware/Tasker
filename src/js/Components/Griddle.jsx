/** Griddle.jsx */
var React = require("react/addons");
var Griddle = require('griddle-react');

var Grid = React.createClass({
  getInitialProps: function()
  {
    return {showFilter : true}
  },
  render: function() {
    return(
        <Griddle {...this.props}
         ref='Griddle'/>
    );
  }
});

module.exports = Grid;

