  "use strict"
var _ = require('lodash');
var R = require('ramda');
var config = require('../config.js');
var r = require('rethinkdb');
var sysData = require('./LoadCsv.js');
var sysCommon = require('./sysCommon.js');
var PathDefault = 'dist/src';
var path = require("path")

module.exports.Events = function(request, reply)
{
  if(request.params.actor)
      {
        if(existsElement( sysData.Actor_Role() ,'actor',request.params.actor) === false) //comprobar existencia de usuario
        { return reply('The actor not exists'); }
        if(request.query.format)
        {
          if (request.query.format === 'App'){ return reply.file( path.join(__dirname, '../') + PathDefault + '/Events.html');}
          else {return reply('The page was not found').code(404);}
        }
        else if(request.query.name)
        {
            { return reply(_.flatten(sysCommon.events_role(request.params.actor)).filter(function(e){ return (e.event).toLowerCase().indexOf(request.query.name.toLowerCase()) > -1; })); }
        }
        else 
        { 
         return reply(_.flatten(sysCommon.events_role(request.params.actor)) );
        }
      }
      return reply(_.flatten(sysCommon.events_role('')) );
};

module.exports.Tasks = function(request, reply)
{     if(request.params.actor)
      {
        if(existsElement(sysData.Actor_Role(),'actor',request.params.actor) === false) //comprobar existencia de usuario
        { return reply('The actor not exists'); }
        if(request.query.format)
        {
          if (request.query.format === 'App'){return  reply.file( path.join(__dirname, '../') + PathDefault + '/Tasks.html'); }
          else {return reply('The page was not found').code(404);}
        }
        else if(request.query.name)
        { r.connect(config.rethinkdb)
           .then(function(conn)
           {r.table('IssuedTask')
             .filter( function(user)
             {
              return( 
                    (   (user.hasFields('who')).and(user("who").eq(request.params.actor)) )
                     .or( (user.hasFields('who').not()).and(user("actorSend").contains(request.params.actor)) ) );
             })
             .filter(function(doc){ return doc('task').match("^" + request.query.name) })
             .run(conn)
             .then(function(result){ return result.toArray();})
             .then(function(result){ reply(result); }) 
           }); 
        }
        else 
        { 
         r.connect(config.rethinkdb)
          .then(function(conn)
          {r.table('IssuedTask')
             .filter( function(user)
             {
              return( 
                    (   (user.hasFields('who')).and(user("who").eq(request.params.actor)) )
                     .or( (user.hasFields('who').not()).and(user("actorSend").contains(request.params.actor)) ) );
             })
            .run(conn)
            .then(function(result){ return result.toArray();})
            .then(function(result){ reply(result); }) 
          }); 
        }
      }
      else
      {
        r.connect(config.rethinkdb)
       .then(function(conn)
       { r.table('IssuedTask')
          .run(conn)
          .then(function(result){ return result.toArray();})
          .then(function(result){ reply(result); }) 
       }); 
      }
};

module.exports.getProducts = function(request, reply)
{ var name = request.query.name;
    if(name)
    { r.connect(config.rethinkdb)
       .then(function(conn)
       { r.table('Products')
          .filter({'ClaveArticulo':name})
          .run(conn)
          .then(function(result){ return result.toArray();})
          .then(function(result){ reply(result); }) 
        }); 
    }
    else
    { r.connect(config.rethinkdb)
       .then(function(conn)
       { r.table('Products')
          .run(conn)
          .then(function(result){ return result.toArray();})
          .then(function(result){ reply(result); }) 
       }); 
    };
  }

module.exports.getCustomer = function(request, reply)
{
  var name = request.query.name;
	 if(name)
    { r.connect(config.rethinkdb)
       .then(function(conn)
       { r.table('Customer')
          .filter({'Nombre':name})
          .run(conn)
          .then(function(result){ return result.toArray();})
          .then(function(result){ reply(result); }) 
        }); 
    }
    else
    { r.connect(config.rethinkdb)
       .then(function(conn)
       { r.table('Customer')
          .run(conn)
          .then(function(result){ return result.toArray();})
          .then(function(result){ reply(result); }) 
       }); 
    };
}

module.exports.getCustomerByID = function(request, reply)
{if(request.query.id)
  {  r.connect(config.rethinkdb)
       .then(function(conn)
       { r.table('Customer')
          .filter({ClienteID:request.query.id})
          .run(conn)
          .then(function(result){ return result.toArray();})
          .then(function(result){ reply(result); }) 
       });
  }
}
//---------------------------------------------------------------------------------------------------------------------------------
// Funciones para guardar los datos
//---------------------------------------------------------------------------------------------------------------------------------
//Establece la hora en que se toma la tarea de acuerdo al ID de la instancia de la tarea
module.exports.getTask = function(request, reply) 
{var fecha = new Date();
     r.connect(config.rethinkdb)
      .then(function(conn)
      {
        r.table('IssuedTask')
         .get(request.payload.id)
         .update({TimeTaken: fecha , who: request.payload.who})
         .run(conn)   
      })
    //return reply.redirect()
};

//---------------------------------------------------------------------------------------------------------------------------------           
//Funciones generales
//---------------------------------------------------------------------------------------------------------------------------------           
//arr: array sobre el cual se busca
//item: campo sobre el cual se encuentra
//element: elemento a buscar
var existsElement = function(arr,item,element)
{
    return(_.contains(_.pluck(arr, item), element))
};


module.exports.InsertData = function(table,source,result)
{ 
  r.connect(config.rethinkdb)
    .then(function(conn)
    {
        r.table(table)
         .insert(source)
         .run(conn)
         .then(function(result){ return result.generated_keys[0];})
    });
}

module.exports.searchTask = function(event)
{
  _.map(_.filter( SearchEvent(event.event, event.out) ), sendTask);
  // _.map(_.filter( EventTaskRole,{ 'event': event.event, 'in': event.out }), sendTask);
};

module.exports.CustomerOrder_TAKEN = function (request, reply) 
{
  var fecha = new Date();
 //Actualiza la hora en que se termino la tarea
 r.connect(config.rethinkdb)
  .then(function(conn)
  {
    r.table('IssuedTask')
     .get(request.payload.id)
     .update({TimeFinish: fecha})
     .run(conn)   
  })

 r.connect(config.rethinkdb)
  .then(function(conn)
  {
    r.table('IssuedTask')
     .filter({id:request.payload.id})
     .run(conn)
     .then(function(result){ return result.toArray();})
     .then(function(result){ searchTask({'event':result[0].event, 'out': result[0].out}); }) 
  })

  r.connect(config.rethinkdb)
  .then(function(conn)
  {
    r.table('CustomerOrder')
     .insert(request.payload)
     .run(conn)   
  })
};

module.exports.Prospeccion_TAKEN = function (request, reply) 
{
  var fecha = new Date();
 //Actualiza la hora en que se termino la tarea
 r.connect(config.rethinkdb)
  .then(function(conn)
  {
    r.table('IssuedTask')
     .get(request.payload.id)
     .update({TimeFinish: fecha})
     .run(conn)   
  })

 r.connect(config.rethinkdb)
  .then(function(conn)
  {
    r.table('IssuedTask')
     .filter({id:request.payload.id})
     .run(conn)
     .then(function(result){ return result.toArray();})
     .then(function(result){ searchTask({'event':result[0].event, 'out': result[0].out}); }) 
  })

  r.connect(config.rethinkdb)
  .then(function(conn)
  {
    r.table('Prospectos')
     .insert(request.payload)
     .run(conn)   
  })
};

module.exports.Cliente_TAKEN = function (request, reply) 
{
  var fecha = new Date();
 //Actualiza la hora en que se termino la tarea
 r.connect(config.rethinkdb)
  .then(function(conn)
  {
    r.table('IssuedTask')
     .get(request.payload.id)
     .update({TimeFinish: fecha})
     .run(conn)   
  })

 r.connect(config.rethinkdb)
  .then(function(conn)
  {
    r.table('IssuedTask')
     .filter({id:request.payload.id})
     .run(conn)
     .then(function(result){ return result.toArray();})
     .then(function(result){ searchTask({'event':result[0].event, 'out': result[0].out}); }) 
  })

  r.connect(config.rethinkdb)
  .then(function(conn)
  {
    r.table('Clientes')
     .insert(request.payload)
     .run(conn)   
  })
};

module.exports.getCustomerSearch = function(request, reply)
{
  var name = request.query.name;
  console.log(name);
  r.connect(config.rethinkdb)
   .then(function(conn)
   { r.table('Customer')
      .filter(  function(f){ return f('Nombre').match(name) } )
      .pluck('id', 'Nombre')
      .map({ id: r.row("id"), name: r.row("Nombre") } )
      .run(conn)
      .then(function(result){ return result.toArray();})
      .then(function(result){ return reply(result); }) 
   });
}

module.exports.getSearch = function(request, reply)
{ r.connect(config.rethinkdb)
   .then(function(conn)
   { r.table(request.query.table)
      .filter(  function(f){ return f(request.query.field).match(request.query.search) } )
      .pluck(request.query.key, request.query.field)
      .map({ value: r.row(request.query.key), label: r.row(request.query.field) } )
      .run(conn)
      .then(function(result){ return result.toArray();})
      .then(function(result){ return reply(result); }) 
   });
}

module.exports.existsElement = existsElement;