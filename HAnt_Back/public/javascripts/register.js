const marklogic = require('marklogic');
console.dir(marklogic)

function radioValueChanged(input)
{
    const inputValue = input.getAttribute('value');

    if (previous !== inputValue)
    {
        switch (inputValue)
        {
            case 'rescuer':
            {
                // document.getElementById('roleImg').setAttribute('src', './res/firefighter.png');
                document.getElementById('roleTitle').innerHTML = 'Rescuer';
                document.getElementById('roleDescriptionParagraph').innerHTML = 'Rescuer\'s duty is to inform the hospital about its current state and assume responsibility for the people in danger.';
                break;
            }

            case 'rescued':
            {
                // document.getElementById('roleImg').setAttribute('src', './res/hand_on_a_hand.png');
                document.getElementById('roleTitle').innerHTML = 'Rescued';
                document.getElementById('roleDescriptionParagraph').innerHTML = 'As a person to be rescued, you must follow the instructions on the window in order to be safe.';
                break;
            }

            case 'admin':
            {

                document.getElementById('roleTitle').innerHTML = 'Administrator';
                document.getElementById('roleDescriptionParagraph').innerHTML = 'The Administrator must upload the proper floor plans of the hospital so the people could orient easily through building when the hazard happens.';
                break;
            }
        }
    }

    previous = inputValue;
}

function validatePassword()
{
    const password = document.getElementById("inputPassword");
    const confirm_password = document.getElementById("inputConfirmPassword");

    console.log(password.value);
    console.log(confirm_password.value);

    if(password.value !== confirm_password.value) {
        confirm_password.setCustomValidity("Passwords don't match!");
    } else {
        confirm_password.setCustomValidity('');
    }
}

let previous;