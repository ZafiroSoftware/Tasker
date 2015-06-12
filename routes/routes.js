var dataCommon = require('../common/dataCommon.js');
var PathDefault = '/dist/src';
var path = require("path");

exports.register = function(server, options, next) {
   server.route({ method: 'GET', path: '/events/{actor?}', handler: dataCommon.Events }); 
   server.route({ method: 'GET', path: '/tasks/{actor?}',  handler: dataCommon.Tasks });
   server.route({ method: 'GET', path: '/tasks/{param*}',handler: { directory:  { path: path.join(__dirname, '../') + PathDefault , listing: false, index: true }   } });
   server.route({ method: 'GET', path: '/events/{param*}',handler: { directory:  { path: path.join(__dirname, '../') + PathDefault , listing: false, index: true }   } });
   server.route({ method: 'GET', path: '/{param*}',handler: { directory:  { path: path.join(__dirname, '../') + PathDefault , listing: false, index: true }   } });
   server.route({ method: 'POST', path: '/CustomerOrder_TAKEN',handler: dataCommon.CustomerOrder_TAKEN }  );
   server.route({ method: 'POST', path: '/getTask',handler: dataCommon.getTask} );

   server.route({ method: 'GET', path: '/getCustomer',handler: dataCommon.getCustomer } );
   server.route({ method: 'GET', path: '/getCustomerByID',handler: dataCommon.getCustomerByID } );
   server.route({ method: 'GET', path: '/getProducts',handler: dataCommon.getProducts } );
   server.route({ method: 'GET', path: '/Take_CustomerOrder',  handler: function(request, reply) {  reply.file(__dirname + PathDefault + '/customerOrder.html');  }});

    // Callback, completes the registration process
    next();
}
// Required for all plugins
// If this were a npm module, one could do this:
// exports.register.attributes = require('package.json')
exports.register.attributes = {
    name: 'tasks-route', // Must be unique
    version: '1.0.0'
};