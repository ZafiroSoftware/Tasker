/** @jsx React.DOM */

Object.assign = Object.assign || require('object.assign');
var FixedDataTable = require('fixed-data-table');
var React = require("react");
require('fixed-data-table/dist/fixed-data-table.css');
var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

var Grid = React.createClass(
  {
  	  getInitialProps:function()
  	  {
  	  		return { datasource: [] }
  	  },
      render: function()
      {
        var datasource;   
      datasource = this.props.datasource;
      return(
            <Table 
              rowHeight={25}
              rowGetter={function(rowIndex) {return datasource[rowIndex];  }}
              rowsCount={datasource.length}
              width={1120}
              height={220}
              headerHeight={25}>
              <Column label="Articulo" width={100} dataKey={'ArticuloID'} />
              <Column label="Clave" width={200} dataKey={'ClaveArticulo'} />
              <Column label="Descripcion" width={400} dataKey={'Descripcion'} />
              <Column label="Cantidad" width={100} dataKey={'Cantidad'} />
              <Column label="Precio" width={100} dataKey={'Precio'} />
              <Column label="Importe" width={100} dataKey={'Importe'} />
            </Table>
            );
      }
  });

module.exports = Grid;