/* --------------
 	DOM FUNCTIONS
----------------- */

function addEvent( element, event, callback, capture ) {

	if ( element.attachEvent ) {
		element.attachEvent( 'on' + event, callback );
	}
	
	else if ( element.addEventListener ) {
		element.addEventListener( event, callback, capture );
	}
	
	else {
		element['on' + event] = callback;
	}
	
	return element;

}

function removeEvent( element, event, callback, capture ) {
		
	if ( element.detachEvent ) {
		element.detachEvent( 'on' + event, callback );
	}
	
	else if ( element.removeEventListener ) {
		element.removeEventListener( event, callback, capture );
	}
	
	else {
		element['on' + event] = null;
	}
	
	return element;

}

// className functions
// Dean Edwards 2004.10.24

function addClass(element, className) {
    if (!hasClass(element, className)) {
        if (element.className) element.className += " " + className;
        else element.className = className;
    }
};

function removeClass(element, className) {
    var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
    element.className = element.className.replace(regexp, "$2");
};

function hasClass(element, className) {
    var regexp = new RegExp("(^|\\s)" + className + "(\\s|$)");
    return regexp.test(element.className);
};



function getElementsByTagNameAndClassName( tagName, className, element ) {
	
	for ( var i = 0, matches = [], targets = element.getElementsByTagName( tagName ); i < targets.length; i++ ) {

		if ( hasClass( targets[i], className ) ) {
		
			matches[matches.length] = targets[i];
		
		}
	
	}
		
	return matches;

}


function removeAllChildNodes( element ) {

	for ( var i = ( element.childNodes.length - 1 ); i >=0; i-- ) {
	
		element.removeChild( element.childNodes[i] );
	
	}	

}


function gbid(id) { return document.getElementById(id); }



/* --------------

 	COMMUNICATION FUNCTIONS

----------------- */

function createRequest() {

   var xmlhttp = false;

	try {
		xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	} catch (e) {
		try {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (E) {
			// do nothing...
		}
	}
 
  
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
		try {
			xmlhttp = new XMLHttpRequest();
		} catch (e) {
			// do nothing...
		}
	}
	
	return xmlhttp;
}

function sendRequest(uri, method, callback) {
  var req = createRequest();
  if ( !req ) { return; }
  if (!method) method = 'GET';
  if ( typeof( callback ) == 'function' ) { req.onreadystatechange = function() { callback(req); }; }
  req.open(method.toUpperCase(), uri, true);
  req.send(null);
}

function hasAjax() {
  if (!createRequest()) return false;
  return true;
}


function hit(url) { (new Image()).src=url; }

function rpc(url, setd) { if (document.images) (new Image()).src=url+'&zr='+rand(); }

function redirect(url,s) { if (!s) s=''; return '/url?q='+urlencode('http'+s+'://'+url); } 

function logError( msg, url, line ) {
	
	var href = '/rpc/log?a=jserr&msg=' + urlencode( msg ) + '&url=' + urlencode( url ) + '&line=' + line;
	if (Image) { (new Image()).src = href; }
	
}

logError.errorCount = 0;

window.onerror = function( msg, url, line ) { if ( logError.errorCount == 0 ) { logError( msg, url, line ); } logError.errorCount++; return false; };


/* --------------

 	ENCODING/DECODING FUNCTIONS

----------------- */

var urlencode = window.encodeURIComponent ? 
	function ( str ) { return window.encodeURIComponent(str).replace(/%20/g,'+') } : 
	function ( str ) { return escape(str).replace(/\+/g,'%2B').replace(/\//g,'%2F').replace(/%20/g,'+'); 
} 

function urlUnescape(s) {
	s = s.replace(/\+/g," ");
	return unescape(s);
}


function urlEscape(s) {
	s = escape(s);
	s = s.replace(/\+/g,"%2B");
	s = s.replace(/\//g,"%2F");
	return s.replace(new RegExp("%20","g"),"+");
}

function rand() { return Math.floor(Math.random()*2147483647); }

/* --------------
 	WINDOW FUNCTIONS
----------------- */

function sts(w) { window.status = w; return true; }
function _st(el) { if (el) window.status = String(el.innerHTML); }
function cls() { window.status = ''; }


/* --------------
 	COOKIE FUNCTIONS
----------------- */

function  getc(a) { var ck = String(document.cookie); var pos = ck.indexOf(a+'='); if (pos == -1) return ''; var d = ck.indexOf(';', pos); return ck.substring(pos + a.length + 1, d == -1 ? ck.length : d); }
function _getck(a){ return getc(a); }

function setck(ckname, id, st) {
  if (!ckname) return;
  var ck = getc(ckname);
  var val = ':' + id;
  if (ck.indexOf(val) < 0) {
    ck += val + st; 
  } else {
    var pattern = new RegExp(val+'[SR]','gi');
    ck = ck.replace(pattern,'');
  }
  document.cookie = ckname+'='+ck+'; path=/';
} 


function getCookie(name) { return unescape(_getck(name)); }

function setCookie(name, value, expires) {
  var cs = name + '=' + escape(value) + '; path=/' + ((expires) ? '; expires=' + expires.toGMTString() : '');
  document.cookie = cs;
}


/* --------------
 	STRING FORMATING FUNCTIONS
----------------- */
function dehyphenate(s) {
	return new String( s ).split('-').join(' ');
}


function toTitleCase() {

	if ( typeof arguments[0] == 'string' ) {
	
		var return_value = arguments[0].split( ' ' );
		
		for ( var i = 0; i < return_value.length; i++ ) {
							
			return_value[i] = return_value[i].substring(0,1).toUpperCase() + return_value[i].substring(1).toLowerCase();
			
			if ( ( return_value[i].match(/^(\.NET|ABAP|ACS|ADZ|AJAX|ASP|CAD|CATIA|CICS|CDL|CEO|CFO|CIO|COO|CNA|CNC|CPA|CPS|CSS|CTO|DB|DBA|EMT|ESL|ETL|GIS|GUI|HHA|HR|HRIS|HVAC|HTML|IBM|IR|IT|J2EE|LAN|LPN|LVN|MRI|OA|OT|PA|PACS|PBX|PC|PHP|PL|PM|PT|QA|QC|RN|SAN|SAP|SAS|SQL|VP|VB\.NET|WSNA)(\,)?$/i) != null ) || return_value[i].length <= 2 ) {
			
				return_value[i] = return_value[i].toUpperCase();
			
			}
		
			if ( return_value[i].match(/^(in|at|of|the|a)$/i) != null ) {
			
				return_value[i] = return_value[i].toLowerCase();
				
			}
			
			if ( return_value[i].match(/^(Ph\.?D\.?)$/i) != null ) {
			
				return_value[i] = 'Ph.D.';
				
			}
		}
		
		// Ensure the first word is caplitalized, even if it is a,of,the, etc.
		return_value[0] = return_value[0].substring(0,1).toUpperCase() + return_value[0].substring(1);
			
		return return_value.join( ' ' );
			
	}

}

/* other version....

function toTitleCase(words) {
	var result = new Array();
	for (var i = 0; i < words.length; i++) {
	
		if ( words[i].search(/^CPA|SQL|PM|PT|QA|RN$/i) == -1 ) {
			var first = words[i].substring(0,1);
			var rest = words[i].substring(1);
			result[i] = first.toUpperCase() + rest.toLowerCase();
		}
		
		else { result[i] = words[i].toUpperCase(); }
		
	}
	return result.join(" ");
} */





/* --------------

 	OBJECTS

----------------- */

function WindowGeometry( target_window ) {

	/* Based on example 14.2 in "JavaScript: The Definitive Guide, Fifth Edition" by David Flanagan (ISBN: 0-596-10199-6) */
	
	
	if ( target_window.screenLeft != undefined ) { // IE and others
		this.getWindowX = function() { return target_window.screenLeft; };
		this.getWindowY = function() { return target_window.screenTop; };
	}
	else if ( target_window.screenX != undefined ) { // Firefox and others
		this.getWindowX = function() { return target_window.screenX; };
		this.getWindowY = function() { return target_window.screenY; };
	}
	
	if ( target_window.innerWidth  != undefined ) { // All browsers but IE
		this.getViewportWidth = function() { return target_window.innerWidth; };
		this.getViewportHeight = function() { return target_window.innerHeight; };
		this.getHorizontalScroll = function() { return target_window.pageXOffset; };
		this.getVerticalScroll = function() { return target_window.pageYOffset; };
	}
	else if ( document.documentElement && ( document.documentElement.clientWidth != undefined ) ) {
		// These functions are for IE6 when there is a DOCTYPE
		this.getViewportWidth = function() { return target_window.document.documentElement.clientWidth; };
		this.getViewportHeight =  function() { return target_window.document.documentElement.clientHeight; };
		this.getHorizontalScroll = function() { return target_window.document.documentElement.scrollLeft; };
		this.getVerticalScroll = function() { return target_window.document.documentElement.scrollTop; };
	}
	else if ( document.body.clientWidth ) {
		// These are for IE4, IE5, and IE6 without a DOCTYPE
		this.getViewportWidth = function() { return target_window.document.body.clientWidth; };
		this.getViewportHeight = function() { return target_window.document.body.clientHeight; };
		this.getHorizontalScroll = function() { return target_window.document.body.scrollLeft; };
		this.getVerticalScroll = function() { return target_window.document.body.scrollTop; };
	}
	
}



/* ----- Begin ForumRequest Object ---- */

function ForumRequest() {
	
	this.request = { jobtitles: [], companies: [], querymatch: '', user_id: '' };
	
	this._request = { jobtitles: [], companies: [] };
	
	this.results = {};
	

}
	
ForumRequest.prototype.encodeForumsMultivalueArgument = function( args ) {

	var arg_string = '';
	
	for ( var i = 0; i < args.length; i++) {
		arg_string += urlencode( args[i]) + ( i < args.length-1 ? "|" : "" );
	}
	
	return urlencode(arg_string); // encode twice to effectively quote "|" in values

}

ForumRequest.prototype.addJobtitle = function( title ) {
		
	if ( this._request.jobtitles[title] == undefined ) {
	
		this.request.jobtitles[this.request.jobtitles.length] = title;
		this._request.jobtitles[title] = (this.request.jobtitles.length - 1);
			
	}
	
}

ForumRequest.prototype.getForumForJobtitle = function( title ) {
		
	if ( this.results.jobtitles != undefined ) {
	
		var forum = this.results.jobtitles[this._request.jobtitles[title]];
		
		if ( forum.id != '-' ) {
		
			return forum;
		
		}
			
	}
	
	return null;
	
}

ForumRequest.prototype.addJobtitles = function( titles ) {

	for ( var i = 0; i < titles.length; i++ ) {
	
		this.addJobtitle( titles[i] );
	
	}

}


ForumRequest.prototype.addCompany = function( name ) {
		
	if ( this._request.companies[name] == undefined ) {
	
		this.request.companies[this.request.companies.length] = name;
		this._request.companies[name] = (this.request.companies.length - 1);
			
	}
	
}

ForumRequest.prototype.addCompanies = function( names ) {

	for ( var i = 0; i < names.length; i++ ) {
	
		this.addCompany( names[i] );
	
	}

}

ForumRequest.prototype.getForumForCompany = function( name ) {
		
	if ( this.results.companies != undefined ) {
	
		var forum = this.results.companies[this._request.companies[name]];
		
		if ( forum.id != '-' ) {
		
			return forum;
		
		}
					
	}
	
	return null;
	
}


ForumRequest.prototype.addQuery = function( query ) {

	this.request.querymatch = query;

}

ForumRequest.prototype.addUserId = function( user_id ) {

	this.request.user_id = user_id;

}


ForumRequest.prototype.getForums = function( callback ) {

	var self = this;
		
	var query_string = [];
	query_string.push( 'jobtitles=' + this.encodeForumsMultivalueArgument( this.request.jobtitles ) );
	query_string.push( 'companies=' + this.encodeForumsMultivalueArgument( this.request.companies ) );
	query_string.push( 'query=' + this.request.querymatch  );
	query_string.push( 'userid=' + this.request.user_id  );
	query_string.push( 'ts=' + new Date().getTime()  );
	
	var uri = '/forum/service?all=1&action=get-forum-names&' + query_string.join( '&' );
	
	sendRequest( uri, 'GET', function( result ) {
	
			var request_obj = self;
	
			if ( result.readyState != 4 || result.responseText == '' ) { return; }
			
			eval( 'request_obj.results = ' + result.responseText + ';');
			
			if ( callback ) { callback( request_obj.results ); }
			
		} 
		
	);

}




/* --------------

 	GLOBAL IMPLEMENTATION

----------------- */


function displayNewForumComments( notices, user_id ) {

	if ( notices == null || !notices.length ) { return; }
		
	var notice_table_id = 'recent_comments';
	
	var label_text_template = 'New Comments (#)';
	var total_num_comments = 0;
	
	
	function setLabelText( label_text ) {
	
		control.innerHTML = label_text;
	
	}
	
	
	
	var control = document.createElement( 'a' );
	control.href = '#' + notice_table_id;
	control.id = 'new_comment_label';
	setLabelText( 'Loading...' );
	
	var user_actions = document.getElementById( 'user_actions' );
	
	var seperator = document.createTextNode( ' - ' );
	
	if ( user_actions ) {
	
		user_actions.appendChild( seperator );
		user_actions.appendChild( control );

	}
	
	var popup_label = PopupLabel( control );	
	
	
	var table = document.createElement('table');
	table.id = notice_table_id;
	table.style.display = 'none';
	
	var tbody = document.createElement( 'tbody' );
	
	table.appendChild( tbody );

	
	function setNumComments( num_comments ) {
	
		setLabelText( label_text_template.replace( /\#/, num_comments ) );
	
	}	
	
	
	function makeDefaultRow( msg ) {
	
		var row = document.createElement('tr');
		
		var default_td = document.createElement('td');
		default_td.className = 'col_a';
		
		default_td.appendChild( document.createTextNode( msg ) );
		
		row.appendChild( default_td );
		
		return row;
	
	}
	
	function makeRow( notice ) {
	
		total_num_comments += notice.comments;
		
		var hide_url =  notice.link + '?hide=' + user_id;
		
		function hideNotification() {
		
			total_num_comments -=  notice.comments; 
			setNumComments( total_num_comments ); 
			tbody.removeChild( row ); 
			if ( tbody.getElementsByTagName('tr').length == 0 ) { 

				seperator.parentNode.removeChild( seperator );
				control.parentNode.removeChild( control );
				
				if ( popup_label) { popup_label.close(); }
			}
			
			sendRequest( hide_url, 'GET', function() {} );
		
		}
				
		var row = document.createElement('tr');
		
		var title_td = document.createElement('td');
		title_td.className = 'col_a';
		
		var forum_link = document.createElement('a');
		forum_link.href = hide_url;

		
		forum_link.appendChild( document.createTextNode( notice.subject ) );
		title_td.appendChild( forum_link );
		title_td.appendChild( document.createTextNode( ' ' ) );
		
		var amount = document.createElement('span');
		amount.className = 'amount';
		amount.appendChild( document.createTextNode( '(' + notice.comments + ')' ) );
		
		
		title_td.appendChild( amount );
		setNumComments(  total_num_comments );
		
		var actions_td = document.createElement('td');
		actions_td.className = 'col_b';
							
		var hide_action = document.createElement('a');
		hide_action.href = '#';
		hide_action.title = 'Stop showing notifications when this forum is updated.';
		hide_action.appendChild( document.createTextNode('Hide') );
		hide_action.onclick = hideNotification;
		
		actions_td.appendChild( hide_action );
		
		row.appendChild( title_td );
		row.appendChild( actions_td );				
		
		return row;
	
	}
	
	// this actually populates the table...	
	for ( var i = 0; i < notices.length; i ++ ) {
		
		tbody.appendChild( makeRow( notices[i] ) );
		
	}
					
	setNumComments( total_num_comments );	
	
	control.parentNode.insertBefore( table, control.nextSibling );
		
	return;	

}

/* ---  New Comments --- */


function hideForumTopic( url, element, num_comments ) {

	sendRequest( url, 'GET', function( result ) {
				
		if ( result.readyState != 4 || result.responseText == '' ) { return; }
		
		updateTotalNumComments( getTotalNumComments() - num_comments );
		
		if ( element && element.parentNode != null ) {
		
			element.parentNode.removeChild( element );
			
			if ( getNumCommentItems() == 0 ) {
			
				
				new_comment_label.close();
				
				var comments_label = getNumCommentsLabel();
				comments_label.style.display = 'none';
				comments_label.previousSibling.parentNode.removeChild( comments_label.previousSibling );
			
			}
					
		}

	} );

}

function getNumCommentItems() {

	var recent_comments = document.getElementById('recent_comments');
	
	if ( recent_comments ) {
	
		return recent_comments.getElementsByTagName('tr').length;
	
	}
	
	return 0;

}


function getNumCommentsLabel() {

	return document.getElementById('new_comment_label');
}

function getTotalNumComments() {

	var label = getNumCommentsLabel();
	
	var current_total = label.innerHTML.match(/[0-9]+/);
	
	return current_total[0];
	
}

function updateTotalNumComments( new_total ) {

	var comments_label = getNumCommentsLabel();
	
	comments_label.innerHTML = comments_label.innerHTML.replace( getTotalNumComments(), new_total );

}
