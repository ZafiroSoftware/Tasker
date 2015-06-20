/** SearchKey.jsx */
var React = require('react');
var Select = require('react-select');

var SearchEntity = React.createClass({
  getInitialState:function()
  {
      return { ValueItem:undefined }

  },
 /* setValue:function(value)
  {
    //this.refs.Address.setValue(value);
  },*/
  getValue:function()
  {
     return this.refs.SearchEntity.state.value;
  },
  onChange: function(event){ },
  searchData:function(input,callback)
  { //input = input.toLowerCase();
    //setTimeout(function() {
    //  callback(null, rtn);
    //}, 500);
    Search
     .findByName( input , this.props.table, this.props.keyfield, this.props.field )
     .done(function(customers)
      { callback(null,{ options:customers, complete: false }) ; } )
  },
  render: function() {
    return (
      <div>
        <label>{this.props.label}</label>
          <Select asyncOptions={this.searchData} 
                  autoload = {true} 
                  className="remote-example" 
                  onChange = {this.onChange} 
                  value={this.props.value} 
                  ref = 'SearchEntity' />
      </div>
    );
  }
});

module.exports = SearchEntity;
