/** SearchKey.jsx */
var React = require('react');
var Select = require('react-select');

var SearchEntity = React.createClass({
  getInitialPrpops:function()
  {
    return ({autoload:true});
  },
  getInitialState:function()
  {
    return {SearchByID:false};
  },
  getValue:function()
  { 
    return this.refs.SearchEntity.state.value;
  },
  setValue:function(e)
  {
    this.searchByID(e); 
  },
  searchByID:function(id)
  {  Search
       .findById( id , this.props.table, this.props.keyfield, this.props.field )
       .done(function(data)
        { var newState = {
              options: data,
              filteredOptions: data,
              value: data[0].value,
              placeholder: data[0].label
            };
            this.refs.SearchEntity.setState(newState); 
        }.bind(this)) 
  },
  searchData:function(input,callback)
  { //input = input.toLowerCase();
    //setTimeout(function() {
    //  callback(null, rtn);
    //}, 500);
  /*if(input !== '' ) 
   {*/
    Search
     .findByName( input , this.props.table, this.props.keyfield, this.props.field )
     .done(function(customers)
      { callback(null,{ options:customers, complete: false }) ; } )
   // }
  },
  render: function() {
      var { ...other } = this.props;
    return (
          <Select {...other}
                  asyncOptions={this.searchData} 
                  autoload = {true} 
                  ref = 'SearchEntity' />
    );
  }
});

module.exports = SearchEntity;
