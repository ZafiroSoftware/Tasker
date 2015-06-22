/** SearchKey.jsx */
var React = require('react');
var Select = require('react-select');

var SearchEntity = React.createClass({
  getInitialPrpops:function()
  {
    return ({autoload:true});
  },
  getValue:function()
  { 
    return this.refs.SearchEntity.state.value;
  },
  searchData:function(input,callback)
  { //input = input.toLowerCase();
    //setTimeout(function() {
    //  callback(null, rtn);
    //}, 500);
  if(input !== '' ) 
   {
    Search
     .findByName( input , this.props.table, this.props.keyfield, this.props.field )
     .done(function(customers)
      { callback(null,{ options:customers, complete: false }) ; } )
    }
  },
  render: function() {
      var { ...other } = this.props;
    return (
      <div>
        <label>{this.props.label}</label>
          <Select {...other}
                  asyncOptions={this.searchData} 
                  autoload = {true} 
                  ref = 'SearchEntity' />
      </div>
    );
  }
});

module.exports = SearchEntity;
