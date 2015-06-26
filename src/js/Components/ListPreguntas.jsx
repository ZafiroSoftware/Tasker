/** SearchKey.jsx */
var React = require('react');
var TextField = require('material-ui/lib/text-field');
var ThemeManager = require('material-ui/lib/styles/theme-manager')();
var Colors = require('material-ui/lib/styles/colors');

 var outerStyle = {
            padding: '0 10px'
        };
var ListItem = React.createClass(
{
  getInitialState: function() {
    return {Pregunta: this.props.Pregunta , Respuesta:this.props.Respuesta,id:this.props.id};
  },
  getValue:function(){return {Pregunta: this.props.Pregunta , Respuesta:this.props.Respuesta,id:this.props.id}; },
  handleChange: function(event) {
    var data = {Pregunta:this.state.Pregunta,Respuesta:event.target.value,id:this.state.id};
    this.setState(data);
    console.log(this.state.Respuesta);
  },
 render: function(){
  return(
      <div statemio={this.state}>
        <input type="text" value = {this.state.Pregunta} disabled />
        <input type="text" value= {this.state.Respuesta} onChange={this.handleChange} />
      </div>
    );
  }
});

var ListPreguntas = React.createClass(
{
    getInitialState:function(){ return { data: this.props.data}; },
    getValue:function(){ console.log(this.refs.list); },
    render: function () {
      //console.log(this.state.data);
        var items = this.state.data.map(function (data) {
            return (
                <ListItem id={data.id} Pregunta={data.Pregunta} Respuesta={data.Respuesta} />
            );
        });
        return (
            <ul ref='list' className="ul-items">
                <input type="text" value = 'Pregunta' disabled />
                <input type="text" value= 'Respuesta' disabled />
                {items}
            </ul>
        );
    }
});

var ListPreguntass =  React.createClass(
{ getInitialState:function(){ return { data: this.props.data}; },
  getValue:function()
  {
     return this.refs.List;
  },
  /*getInitialState:function(){ return { data: [{"Pregunta":"PRESUPUESTO A INVERTIR","id":13,"Respuesta":""},
                                              {"Pregunta":"OBRA NUEVA O REMODELACION?","id":9,"Respuesta":""},
                                              {"Pregunta":"LOCALIZACION DEL PROYECTO","id":14,"Respuesta":""},
                                              {"Pregunta":"NOMBRE DEL ARQUITECTO","id":10,"Respuesta":""},
                                              {"Pregunta":"TIPO DE CONSTRUCCION","id":11,"Respuesta":""},
                                              {"Pregunta":"METROS CUADRADOS","id":12,"Respuesta":""},
                                              {"Pregunta":"TIPO DE ACABADOS","id":16,"Respuesta":""},
                                              {"Pregunta":"PRECIO POR METRO CUADRADO","id":15,"Respuesta":""}]}; },*/
  render: function () 
  {return (<div className="nav">
           <div>
               <List ref = 'List' data ={this.state.data}/>
            </div>
            </div>
        );
    }
});

module.exports = ListPreguntas;
