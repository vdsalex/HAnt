const query = require('stardog/lib/query');
const { Connection } = require("stardog");
const dbName = 'hantDB';

// Table column data, encoding the order, label, and "selector" for grabbing the
// data for each column.
const columnData = [
    {
        selector: "id",
        label: "ID"
    },
    {
        selector: "name",
        label: "Name"
    }
];

// For convenience, we'll also produce the array of selectors just once, and
// export it for re-use.
const columnSelectors = columnData.reduce(
    (selectors, { selector }) => [...selectors, selector],
    []
);

// In a typical application, the connection would be changeable. For our
// present purposes, though, this is unchanging and hard-coded.
const conn = new Connection({
    username: "admin",
    password: "admin",
    endpoint: "http://localhost:5820"
});

// An "enum" for the status of our request to Stardog for data.
const TableDataAvailabilityStatus = {
    NOT_REQUESTED: 'NOT_REQUESTED',
    LOADING: "LOADING",
    LOADED: "LOADED",
    FAILED: "FAILED"
};

const password = 'alex';
const username = 'alex';

const getPasswordQuery = `
            SELECT ?role
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
                FILTER(?username = \"` + String(username) + `\" && ?password = \"`+ String(password) +`\") .
            }`;

query.execute(conn, dbName, getPasswordQuery).then(res =>
{
    if(!res.ok)
    {
        console.log('FAILED FINDING USERNAME');
        return;
    }

    const {bindings} = res.body.results;
    const [bindings2] = bindings;

    console.log(bindings2.role.value);

});

