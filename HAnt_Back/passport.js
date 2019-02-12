const query = require('stardog/lib/query');
import {
    TableDataAvailabilityStatus,
    columnData,
    columnSelectors,
    conn,
    dbName,
} from "/helpers/db-connection";

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


module.exports = function (passport)
{
    passport.use(new LocalStrategy(function(username, password, done)
    {
        // Match Username
        const getUsernameQuery = `
            ASK
            {
                {
                    ?user a :Rescuer ;
                        :nick ?nick .
                }
                    UNION
                {
                    ?user a :Admin ;
                        :nick ?nick .   
                }
                FILTER(?nick = `+ String(username) +`) .
            }`;

        query.execute(conn, dbName, getUsernameQuery).then(res =>
        {
            if(!res.ok)
            {
                return done(null, false, {message: 'Error while searching for the username..'});
            }

            //if false = if we didn't find the username
            if(!res.body)
            {
                return done(null, false, {message: 'Username not found!'});
            }
        });

        //Match password
        const getPasswordQuery = `
            ASK
            {
                {
                    ?user a :Rescuer ;
                        :password ?password .
                }
                    UNION
                {
                    ?user a :Admin ;
                        :password ?password .
                }
                FILTER(?password = `+ String(password) +`) .
            }`;

        query.execute(conn, dbName, getPasswordQuery).then(res =>
        {
            if(!res.ok)
            {
                return done(null, false, {message: 'Error while searching for the password..'});
            }

            //if false = if the password is wrong
            if(!res.body)
            {
                return done(null, false, {message: 'Wrong password!'});
            }
            else
            {
                return done(null)
            }
        });
    }))
};
