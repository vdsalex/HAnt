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
    SELECT ?location ?time ?address ?patients ?employees ?contact ?rescuersInvolved ?reportedCasualties ?hazardStatus
            WHERE
            {
                {
                    ?hazard a :Fire ;
                        :location ?location;
                        :time ?time;
                        :address ?address ;
                        :patients ?patients ;
                        :employees ?employees ;
                        :contact ?contact ;
                        :rescuersInvolved ?rescuersInvolved;
                        :reportedCasualties ?reportedCasualties;
                        :hazardStatus ?hazardStatus .
                }
                    UNION
                {
                    ?hazard a :Flood ;
                        :location ?location;
                        :time ?time;
                        :address ?address ;
                        :patients ?patients ;
                        :employees ?employees ;
                        :contact ?contact ;
                        :rescuersInvolved ?rescuersInvolved;
                        :reportedCasualties ?reportedCasualties;
                        :hazardStatus ?hazardStatus .
                }
                    UNION
                {
                    ?hazard a :Earthquake ;
                        :location ?location;
                        :time ?time;
                        :address ?address ;
                        :patients ?patients ;
                        :employees ?employees ;
                        :contact ?contact ;
                        :rescuersInvolved ?rescuersInvolved;
                        :reportedCasualties ?reportedCasualties;
                        :hazardStatus ?hazardStatus .
                }
            }`;

let location = "";
let time = "";
let address = "";
let patients = "";
let employees = "";
let contact = "";
let rescuersInvolved = "";
let reportedCasualties = "";
let hazardStatus = "";

query.execute(conn, dbName, getPasswordQuery).then(res =>
{
    if(!res.ok)
    {
        console.log('FAILED FINDING USERNAME');
        return;
    }

    let variabila = [];

    const {bindings} = res.body.results;
    const [bindings2] = bindings;
    for (let idx = 0; idx < bindings.length; ++idx) {


        location = bindings[idx].location.value;
        time = bindings[idx].time.value;
        address = bindings[idx].address.value;
        patients = bindings[idx].patients.value;
        employees = bindings[idx].employees.value;
        contact = bindings[idx].contact.value;
        rescuersInvolved = bindings[idx].rescuersInvolved.value;
        reportedCasualties = bindings[idx].reportedCasualties.value;
        hazardStatus = bindings[idx].hazardStatus.value;
        variabila.push(bindings[idx]);
        console.log(location);
        console.log(time);
        console.log(address);
        console.log(patients);
        console.log(employees);
        console.log(contact);
        console.log(rescuersInvolved);
        console.log(reportedCasualties);
        console.log(hazardStatus);
    }
});

