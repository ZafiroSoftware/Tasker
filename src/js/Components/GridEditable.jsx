/** GridEditable.jsx */
var React = require('react');

var EditableCell = React.createClass({
    getInitialState: function () {
        return {
            isEditMode: false,
            data: ""
        };
    },
    componentWillMount: function () {
        this.setState({
            isEditMode: this.props.isEditMode,
            data: this.props.data
        });
    },
    handleEditCell: function (evt) {
        this.setState({isEditMode: true});

    },
    handleKeyDown: function (evt) {
        switch (evt.keyCode) {
            case 13: // Enter
            case 9: // Tab
                this.setState({isEditMode: false});
                break;
        }
    },
    handleChange: function (evt) {
        this.setState({data: evt.target.value});
    },
    render: function () {
        var cellHtml;
        if (this.state.isEditMode) {
            cellHtml = <input type='text' value={this.state.data}
                onKeyDown={this.handleKeyDown} onChange={this.handleChange} />
        }
        else {
            cellHtml = <div onClick={this.handleEditCell}>{this.state.data}</div>
        }
        return (
            <td>{cellHtml}</td>
            );
    }
});

var Movie = React.createClass({
    render: function() {
        return (
            <tr>
                <EditableCell data = {this.props.id} />
                <EditableCell data={this.props.Pregunta} /> 
                <EditableCell data={this.props.Respuesta} />
           </tr>
            );
    }
});

var MovieList = React.createClass({
    getInitialState: function() {
        return {data: this.props.data};
    },
   render: function() {
       var movies = this.state.data.map(function (movie) {
           return <Movie
           id={movie.id} 
           Pregunta={movie.Pregunta} 
           Respuesta={movie.Respuesta} /> ;
        });
    return ( 
    <tbody>{movies}</tbody>
    );
   }
});

var GridEditable = React.createClass({
 render: function() {
    return(
        <table>
        <thead>
            <tr>
                <th> ID </th> <th>Pregunta</th>
                <th>Respuesta</th>
            </tr>
        </thead>
        <MovieList data={[{"Pregunta":"OBRA NUEVA O REMODELACION?","id":"1","Respuesta":""},{"Pregunta":"The Shawshank Redemption","id":"2","Respuesta":""},{"Pregunta":"The Godfather","id":"3","Respuesta":""}]} /> 
     </table>
    );
  }
});
 

module.exports = GridEditable;

