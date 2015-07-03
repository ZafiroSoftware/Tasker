var dataCommon = require('../common/dataCommon.js');
var SysCommon = require('../common/SysCommon.js');
var PathDefault = '/dist/src';
var path = require("path");
var fs = require("fs");
var filename = "./dist/src/Login.html";
var sysData = require('../common/LoadCsv.js');

var users = {
    JuanHdzL: {
        id: 'JuanHdzL',
        password: '123',
        name: 'JuanHdzL'
    },
    RocioTamezJ:{
        id: 'RocioTamezJ',
        password: '123',
        name: 'RocioTamezJ'
    }
};

var home = function (request, reply) {
    return reply.redirect('/tasks/' + request.auth.credentials.username + '?format=App');
};

var login = function (request, reply) {
  var buf = fs.readFileSync(filename, "utf8")
  if(request.auth.isAuthenticated) 
  {
    return reply.redirect('/tasks/' + request.auth.credentials.username + '?format=App');
    //return reply.redirect('/');
  }
    
  var message = '';
  var account = null;
  if (request.method === 'post')
  {
    if (!request.payload.username || !request.payload.password) 
    {
      message = 'Usuario o password desconocido.';
    }
    else 
    { 
    tmp = SysCommon.SearchActor(request.payload.username);// users[request.payload.username];
    //console.log(account[0].pass);
    if(tmp)
    {
      account = {username:tmp[0].actor,password:tmp[0].pass};  
    }

      if (!account || account.password != request.payload.password) 
      { message = 'Usuario o password invalido';
      }
    }
  }

    if (request.method === 'get' || message) 
    { return reply(buf);
      //return reply.file(__dirname + PathDefault + '/customerOrder.html');
    }

    request.auth.session.set(account);
    return reply.redirect('/tasks/' + request.payload.username + '?format=App');
    //return reply.redirect('/');
};

var logout = function (request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
};

var multiparty = require('multiparty')

exports.register = function(server, options, next) {
  server.register(require('hapi-auth-cookie'), function (err)
  { server.auth.strategy('session', 'cookie', 
    { password: 'secret',
      cookie: 'sid-example',
      redirectTo: '/login',
       isSecure: false
     });
  });

server.route({  method: 'GET', 
                path: '/', 
                config: { handler: home, auth: 'session' } });
server.route({  method: ['GET', 'POST'],
                path: '/login', 
                config: { handler: login, auth: { mode: 'try',strategy: 'session' },
                plugins: { 'hapi-auth-cookie': { redirectTo: false } } } } );
server.route({  method: 'GET', 
                path: '/logout', 
                config: { handler: logout, auth: 'session' } });

//server.route({ method: 'POST', path: '/loadFiles',handler: function(req,reply) {new MulterImpl({}).init(); return reply({ status: 'ok' });}    } );
server.route({
    method: 'POST',
    path: '/loadFiles',
    config: {
        payload: {
            maxBytes: 209715200,
            output: 'stream',
            parse: false
        },
         handler: function(request, reply) {
                var multipary = require('multiparty');
                var form = new multiparty.Form();
                form.parse(request.payload, function(err, fields, files) {
                  //var name = files.file.fieldname;
                  //console.log(typeof(files.file[0].fieldName));
                  //console.log(files.file);
                  //var path = __dirname + "/uploads/" + name;
                  // var file = fs.createWriteStream(path);
                   //console.log(err);
                   //console.log(fields);
                   //console.log(files);
                  return reply(JSON.stringify(files));
                });
                //return reply({ status: 'ok' });
            }
    }
});

                  //handler: function(request, reply){  return reply({ status: 'ok' }); }  } );
   //server.route(
   // { method: 'GET', path: '/login/{actor?}', handler: function(request,reply)
   //   { 
   //    if( SysCommon.ExistsActor(request.params.actor) )
   //          {  return reply.redirect('/tasks/' + request.params.actor + '?format=App'); }
   //      else{   reply('El actor no existe');}  } 
   // }
  //);
/*server.views({
    relativeTo: __dirname,
    path: './dist',
    helpersPath: './dist/src/js',
    engines: {
        html: require('handlebars')
    },
    compileOptions: {
          pretty: true
    },
    isCached: false
});*/


  //--------------------------------------------------------------------------------
  //FUNCIONALIDAD PARA TASKER
   server.route({ method: 'GET', path: '/events/{actor?}',
                  config: { handler: dataCommon.Events ,auth: 'session' } } ); 

   server.route({ method: 'GET', path: '/tasks/{actor?}',  
                  config: { handler: dataCommon.Tasks ,auth: 'session' } } );
   //config: { handler: dataCommon.Tasks ,  auth: 'session' } } );

   server.route({ method: 'GET', path: '/tasks/{param*}',
                  handler: { directory:  { path: path.join(__dirname, '../') + PathDefault , listing: false, index: true }   } });
  
   server.route({ method: 'GET', path: '/events/{param*}',
                  handler: { directory:  { path: path.join(__dirname, '../') + PathDefault , listing: false, index: true }   } });
  
   server.route({ method: 'GET', path: '/{param*}',handler: { directory:  { path: path.join(__dirname, '../') + PathDefault , listing: false, index: true }   } });
   
  server.route({ method: 'POST', path: '/TaskFinish',handler: dataCommon.TaskFinish } );

   //--------------------------------------------------------------------------------
   server.route({ method: 'POST', path: '/getTask',handler: dataCommon.getTask} );
   server.route({ method: 'GET', path: '/getSearch',handler: dataCommon.getSearch } );
   server.route({ method: 'GET', path: '/getPreguntas',handler: dataCommon.getPreguntas} );
   server.route({ method: 'POST', path: '/Prospecto_Registar',handler: dataCommon.Prospecto_Registar} );
   server.route({ method: 'GET', path: '/getTaskByID',handler: dataCommon.getTaskByID} );
   server.route({ method: 'GET', path: '/getProspectoByID',handler: dataCommon.getProspectoByID } );
   server.route({ method: 'POST', path: '/Prospecto_Interesar',handler: dataCommon.Prospecto_Interesar }  );
   server.route({ method: 'POST', path: '/Prospecto_Calificar',handler: dataCommon.Prospecto_Calificar }  );
   next();
}
// Required for all plugins
// If this were a npm module, one could do this:
// exports.register.attributes = require('package.json')
exports.register.attributes = {
    name: 'tasks-route', // Must be unique
    version: '1.0.0'
};