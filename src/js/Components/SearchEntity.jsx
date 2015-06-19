/** SearchKey.jsx */
var React = require('react');

var SearchKey = React.createClass(
{  searchHandler: function() { this.props.searchHandler(this.refs.searchKey.getDOMNode().value); },
   render: function ()
  { return ( <div className="search">
                <input type="search" ref="searchKey" onChange={this.searchHandler} value={this.props.searchKey}/>
            </div>);
  }
});

var ListItem = React.createClass(
{
    render: function ()
    {return (
            <li className="item-search">
               {this.props.data.name}
            </li>
            );
    }
});

var List = React.createClass(
{
    render: function () {
        var items = this.props.data.map(function (d) {
            return (
                <ListItem key={d.id} data={d} />
            );
        });
        return (
            <ul className="ul-search">
                {items}
            </ul>
        );
    }
});

var SearchEntity =  React.createClass(
{ getInitialProps:function(){ return {table:'',key:'',field:''}; },
  getInitialState:function(){ return { data: [] }; },
  searchHandler: function(searchKey) {
    Search
     .findByName( searchKey, this.props.table, this.props.keyfield, this.props.field )
     .done(function(customers)
      {  this.setState( {data:customers} ) }.bind(this) ); },
  render: function () 
  {return (<div className="nav">
           <SearchKey searchKey={this.props.searchKey} searchHandler = {this.searchHandler} />
           <div>
               <List data ={this.state.data}/>
            </div>
            </div>
        );
    }
});

module.exports = SearchEntity;
