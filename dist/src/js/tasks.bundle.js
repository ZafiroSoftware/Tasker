/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 * @jsx React.DOM
	 */
	var socket = io.connect();
	var userdefault;

	var Header = React.createClass(
	{displayName: "Header",  RedirectTasks:function()
	   {
	        window.location = '/events/' + userdefault + '?format=App';
	   },
	   render: function ()
	   { return ( React.createElement("header", {className: "bar bar-nav"}, 
	               React.createElement("a", {href: "#", className: "icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}), 
	               React.createElement("h1", {className: "title"}, this.props.text), 
	                React.createElement("button", {className: "btn btn-link btn-nav pull-left", onClick: this.RedirectTasks}, 
	                  React.createElement("span", {className: "icon icon-edit"}), 
	                 "Events"
	               )
	             ));
	    }
	});

	var SearchBar = React.createClass(
	{displayName: "SearchBar",  searchHandler: function() { this.props.searchHandler(this.refs.searchKey.getDOMNode().value); },
	   render: function ()
	  { return ( React.createElement("div", {className: "bar bar-standard bar-header-secondary"}, 
	                React.createElement("input", {type: "search", ref: "searchKey", onChange: this.searchHandler, value: this.props.searchKey})
	            ));
	  }
	});

	//var styleNew = {color:'green'};
	var styleRun = {color:'red'};
	var styleFinish = {color:'gray'};
	var styleNew = { color: 'green'}; 
	//var styleNew = { color: 'green', backgroundColor: 'red', fontSize: 50 }; 

	var TaskListItem = React.createClass(
	{displayName: "TaskListItem", ondbClickEvent:function()
	    {
	      if(this.props.task.TimeFinish === undefined)          //Comprobamos si la tarea esta finalizada.
	      { this.props.task.who = userdefault;
	        socket.emit('deletetask', this.props.task);        //Eliminamos las tareas enviadas a otros usuarios. 
	        taskservice.getTask(this.props.task, userdefault); // Indicamos que estamos tomado la tarea.
	        //window.location = this.props.task.use "/" + this.props.task.task + "?id=" + this.props.task.id;  
	        window.location = this.props.task.use + "?id=" + this.props.task.id;  //La direccion y el id de la tarea
	      }
	    },
	    btnOnClickhow: function()
	    { window.open(this.props.task.how); },
	    render: function ()
	    {return ( 
	             React.createElement("li", {className: "table-view-cell media", 
	                style: this.props.task.TimeFinish !== undefined ? styleFinish:this.props.task.TimeTaken!== undefined?styleRun:styleNew
	                }, 
	                      this.props.task.what, 
	                React.createElement("p", null, "ID:", this.props.task.id), 
	                React.createElement("div", null, 
	                React.createElement("button", {className: "btn btn-primary", onClick: this.ondbClickEvent}, "Take"), 
	                React.createElement("button", {className: "btn pull-right", onClick: this.btnOnClickhow}, "how")
	                )
	            )
	        );
	    }
	});

	var TaskList = React.createClass(
	{displayName: "TaskList",  render: function () {var items = this.props.tasks.map(function (task)
	   { return (React.createElement(TaskListItem, {key: task.id, task: task})); });
	     return (
	             React.createElement("ul", {className: "table-view"}, 
	                items
	            )
	            );
	    }
	});

	var HomePage = React.createClass(
	{displayName: "HomePage",
	  render: function () {
	        return (
	            React.createElement("div", {className: "page " + this.props.position}, 
	                React.createElement(Header, {text: "Tasks", back: "false"}), 
	                React.createElement(SearchBar, {searchKey: this.props.searchKey, searchHandler: this.props.searchHandler}), 
	                React.createElement("div", {className: "content"}, 
	                    React.createElement(TaskList, {tasks: this.props.tasks})
	                    
	                )
	            )
	        );
	    }
	});

	var App = React.createClass(
	{displayName: "App",
	    mixins: [PageSlider],
	    getInitialState: function()
	   {
	       socket.on('sendtask', this.getTask);
	       socket.on('deletetask', this.deletetask);
	       return {searchKey: '',tasks:  [] }
	   },
	    getTask: function(emited_task)
	    {
	        this.state.tasks.unshift(emited_task);
	        this.setState();
	    },
	    deletetask: function(emited_task)
	    {
	      var index = this.state.tasks.map(function(e) { return e.id; }).indexOf(emited_task.id);
	      this.state.tasks.splice(index,1);
	      this.setState();
	    },
	    searchHandler: function(searchKey)
	    {
	        taskservice.findByName(searchKey,userdefault).done(function(tasks) {
	            this.setState({
	                searchKey:searchKey,
	                tasks: tasks,
	                pages: [React.createElement(HomePage, {key: "list", searchHandler: this.searchHandler, searchKey: searchKey, tasks: tasks})]});
	            }.bind(this));
	    },
	    componentDidMount: function() 
	    {
	      var pathArray = window.location.pathname.split( '/' );
	      userdefault = pathArray[pathArray.length-1];
	      socket.emit('adduser', userdefault);
	      taskservice.findByName('',userdefault).done(function(tasks) {
	            this.setState({
	                tasks: tasks,
	                pages: [React.createElement(HomePage, {searchHandler: this.searchHandler, tasks: tasks})]});
	        }.bind(this));
	    }      
	});

	React.render(React.createElement(App, null), document.body);



/***/ }
/******/ ]);