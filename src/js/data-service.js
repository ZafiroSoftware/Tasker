//var url = "http://192.168.1.69:8000";
var baseURL = "";

taskservice = (function ()
{var baseURL = "";
  return {findByName: function(searchKey,username) 
          	{ return $.ajax({url: baseURL + "/" + "tasks/" + username , data: {name: searchKey}}); },
          getTask: function(data,username) 
    	  	{ return $.ajax({url: baseURL + "/" + "getTask",  type: "POST", data: data }); 
    	  	}
      	 };
}());

eventsService = (function ()
{var baseURL = "";
  return {findByName: function(searchKey,username) 
  	{
  		return $.ajax({url: baseURL + "/" + "events/" + username, data: {name: searchKey }});  } 
 	};
}());

productsService = (function ()
{
        var baseURL = "";
        return {
                 findByName: function(searchKey) {return $.ajax({url: baseURL + "/" + "getProducts", data: {name: searchKey}}); }
               };
}());


customerService = (function ()
{
        var baseURL = "";
        return {
              //findById: function(id) { return $.ajax(url + "/getCustomerByID/" + id);},
             findById: function(id) { return $.ajax({ url: baseURL + "/getCustomerByID" , data: {id:id} }); },

                 findByName: function(searchKey) {return $.ajax({url: baseURL + "/" + "getCustomerSearch", data: {name: searchKey}}); }
               };
}());

Search = (function ()
{
        var baseURL = "";
        return {
              //findById: function(id) { return $.ajax(url + "/getCustomerByID/" + id);},
             findById: function(id) { return $.ajax({ url: baseURL + "/getCustomerByID" , data: {id:id} }); },

                 findByName: function(searchKey,table,key,field) {return $.ajax({url: baseURL + "/" + "getSearch", data: { search: searchKey, table:table , key:key, field:field } }); }
               };
}());
