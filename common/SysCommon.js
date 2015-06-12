"use strict"
var _ = require('lodash');
var R = require('ramda');
var sysData = require('./LoadCsv.js');

//---------------------------------------------------------------------------------------------------------------------------------
//funciones para manipulacion de tareas roles y actores
//---------------------------------------------------------------------------------------------------------------------------------

//Busca el evento pasando como argunmento la entidad y la entrada
var SearchEvent = function(entity,input)
{ return  _.filter(sysData.EventTaskRole() ,{ 'event': entity, 'in': input }); }

//Busca los actores por un rol especifico
var ActorByRole = function(role)
{ role = role || '';
  if(role === ''){ return _.pluck(sysData.Actor_Role(),'actor');}
  else{return _.pluck(_.filter(sysData.Actor_Role(),{role:role}),'actor');}
};

//funcion que obtiene los roles para el actor especifico
var RolsByActor = function(actorName)
{ actorName = actorName || '';
  if (actorName ===''){ return _.pluck( sysData.Actor_Role(),'role'); }
  else{return _.pluck(_.filter(sysData.Actor_Role() ,{actor:actorName}),'role');}
};

//funcion que obtiene  los eventos para el actor respecto a su rol
var events_role = function(actorName){ return RolsByActor(actorName).map(function(items){ return _.filter( sysData.Event_Role(),{role:items}); } )};

module.exports.RolsByActor = RolsByActor;
module.exports.ActorByRole = ActorByRole;
module.exports.SearchEvent = SearchEvent;
module.exports.events_role = events_role;