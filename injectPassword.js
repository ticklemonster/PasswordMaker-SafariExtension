var _passwordFields = [];
const _cookieName = "passwordmakerprofilename=";

function findPasswordFields() {
    // search for any input of type 'password'
    var inputs = document.getElementsByTagName("input");
    for( var ii in inputs ) {
        if( inputs[ii].type == "password" ) {
            //safari.self.tab.dispatchMessage("found",inputs[ii].id );
            _passwordFields.push(inputs[ii]);
            inputs[ii].className += " passwordmakertaggedpasswordfield";
        }
        
    }
}

function passwordHandler( event ) {
    if( event.name == "fillPassword" ) {
        // request to inject a password
        console.log('fill password request: ' + event.message );
        for( p in _passwordFields ) 
            _passwordFields[p].value = event.message;
    }
    else if( event.name == "setProfile" ) {
        // store the profile name as a cookie with this page
        console.log('set profile request: ' + event.message );
        document.cookie = _cookieName + event.message + ';'; 
    }
    else if( event.name == "getProfile" ) {
        var rval = "";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i].trim();
            if (c.indexOf(_cookieName)==0) {
                rval = c.substring(_cookieName.length,c.length);
                break;
            }
        }
        
        console.log('get profile request = ', rval );
        if( rval > "" ) {
            safari.self.tab.dispatchMessage("getProfileResponse",rval);
        }
    }
    
}

if( typeof safari != "undefined" ) {
    safari.self.addEventListener("message", passwordHandler, false);
    findPasswordFields();
}