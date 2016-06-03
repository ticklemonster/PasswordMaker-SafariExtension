/*
 * File:    profileutils.js
 *
 * Profile management functions - using HTML5 local storage 
 * for the password maker Safari extension.
 * 
 */


var charsets = [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`~!@#$%^&*()_-+={}|[]\\:\";\'<>?,./",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    "0123456789abcdef",
    "0123456789",
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    "`~!@#$%^&*()_-+={}|[]\\:\";\'<>?,./"
];                



var DefaultProfile = {
name: 'Default', 
useProto: false, 
useSubdom: false,
useDomain: true,
usePath: false,
useText: '',
whereL33t: 'off',
l33tLevel: 1,
hashAlgorithm: 'md5',
passwordLength: 8, 
username: '',
modifier: '',
charset: charsets[0],
passwordPrefix: '',
passwordSuffix: ''
};

// Loads a certain profile.
function getProfile( profile_name ) {
    var rval;
    
    if( typeof localStorage !== 'undefined' ) {
        rval = JSON.parse( localStorage.getItem('profile_' + profile_name) );
        if( rval == null ) {
            rval = JSON.parse( localStorage.getItem( 'profile_Default') );
            if( rval == null ) {
                // create and save a default set now...
                localStorage.setItem( 'profile_Default', JSON.stringify(DefaultProfile) );
                rval = DefaultProfile;
            }
        } 
        
    } else {
        // no local storage SHOULD NEVER HAPPEN!
        //console.log('What??? No local storage?');
        rval = DefaultProfile;
    }
    
    return rval;
}

function saveProfile( profile ) {
    if( typeof localStorage !== 'undefined' ) {
        localStorage.setItem( 'profile_' + profile.name, JSON.stringify(profile) );      
    } else {
        // no local storage SHOULD NEVER HAPPEN!
        //console.log('What??? No local storage?');
    }
}

function deleteProfile( profile_name ) {
    if( typeof localStorage !== 'undefined' ) {
        localStorage.removeItem( 'profile_' + profile_name );            
    } else {
        // no local storage SHOULD NEVER HAPPEN!
        //console.log('What??? No local storage?');
    }
}

function getProfileNames() {
    // get a list of all saved profiles and provide the list as a message to listening windows (like the popup)
    rval = [];
    
    for( o in localStorage ) {
        if( o.match(/^profile_(.+)/) ) {
            rval.push( o.substr(8) );
        }
    }
    
    return rval;
}


//
// Master Password get/set(clear)
//
function setMasterPassword( passwd ) {
    //console.log('setMasterPassword: ', passwd );
    if( typeof localStorage !== 'undefined' ) {
        if( passwd != null && passwd > "" )
            localStorage.setItem( 'master_password', passwd );
        else
            localStorage.removeItem( 'master_password' );
    } else {
        // no local storage SHOULD NEVER HAPPEN!
        //console.log('What??? No local storage?');
    }
    
}
function getMasterPassword() {
    //console.log('getMasterPassword: ', localStorage.getItem('master_password') );
    if( typeof localStorage !== 'undefined' ) {
        return localStorage.getItem('master_password');
    }
    return '';
}




