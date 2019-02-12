"use strict";
import "babel-polyfill";
require("babel-register");
var connection_struct = require("../helpers/db-connection");
const query = require('stardog/lib/query');
var express = require('express');

var getUserQuery = `
            SELECT ?username ?password ?role
            WHERE
            {
                {
                    ?user a :Rescuer ;
                        :nick ?username ;
                        :role ?role ;
                        :password ?password .
                }
                    UNION
                {
                    ?user a :Admin ;
                        :nick ?username ;
                        :role ?role ;
                        :password ?password .
                }
                FILTER(?username = \"%1\" && ?password = \"%2\") .
            }`;

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendfile('public/login.html');
});

router.post('/', async function(req, res, next)
{
    const username = req.body.username;
    const password = req.body.password;

    getUserQuery = getUserQuery.replace('%1', username);
    getUserQuery = getUserQuery.replace('%2', password);

    let passAndUserOk = true;
    let theRole = "";

    let result = await query.execute(connection_struct.conn, "hantDB", getUserQuery).then(res =>
    {
        if(!res.ok)
        {
            // alert('Error while searching for the password..');
            console.log('Error while searching for the password..');
            passAndUserOk = false;
        }

        const { bindings } = res.body.results;

        if(!bindings.length)
        {
            console.log('Wrong password or username not found!');
            // alert('Wrong password!');
            passAndUserOk = false;
        }
        else
        {
            const [ bindings2 ] = bindings;
            theRole = bindings2.role.value;
            //theRole = getUserQuery.role;
        }
        return {passAndUserOk, theRole};
    });

    if(result.passAndUserOk)
    {
        getUserQuery = getUserQuery.replace(username, '%1');
        getUserQuery = getUserQuery.replace(password, '%2');

        if(result.theRole === 'rescuer')
        {
            res.redirect('/rescuer');
        }
        else if(result.theRole === 'admin')
        {
            res.redirect('/admin');
        }
        else
        {
            res.redirect('/login');
        }
    }
});

function executeGetUserQuery()
{
    let passAndUserOk = true;
    let theRole = "";

    query.execute(connection_struct.conn, "hantDB", getUserQuery).then(res =>
    {
        if(!res.ok)
        {
            // alert('Error while searching for the password..');
            console.log('Error while searching for the password..');
            passAndUserOk = false;
        }

        const { bindings } = res.body.results;

        if(!bindings.length)
        {
            console.log('Wrong password or username not found!');
            // alert('Wrong password!');
            passAndUserOk = false;
        }
        else
        {
            const [ bindings2 ] = bindings;
            theRole = bindings2.role.value;
            //theRole = getUserQuery.role;
        }
    });
    return {passAndUserOk, theRole};
}

module.exports = router;
