function radioValueChanged(input)
{
    const inputValue = input.getAttribute('value');

    if (previous !== inputValue)
    {
        switch (inputValue)
        {
            case 'rescuer':
            {
                document.getElementById('roleImg').setAttribute('src', './res/firefighter.png');
                document.getElementById('roleTitle').innerHTML = 'Rescuer';
                document.getElementById('roleDescriptionParagraph').innerHTML = 'As rescuer, your duty is to inform the hospital about your current position and number of members in your squad.';
                break;
            }

            case 'patient':
            {
                document.getElementById('roleImg').setAttribute('src', './res/transfusion.png');
                document.getElementById('roleTitle').innerHTML = 'Patient';
                document.getElementById('roleDescriptionParagraph').innerHTML = 'As patient, you must wait for rescue squad\'s notifications in order to give you the proper instructions.';
                break;
            }

            case 'common user':
            {
                document.getElementById('roleImg').setAttribute('src', './res/multiple-users-silhouette.png');
                document.getElementById('roleTitle').innerHTML = 'Common User';
                document.getElementById('roleDescriptionParagraph').innerHTML = 'The common user\'s role is to pay attention to the environment and signal the noticed hazards.';
                break;
            }

            case 'administrator':
            {
                document.getElementById('roleImg').setAttribute('src', './res/hospital-buildings.png');
                document.getElementById('roleTitle').innerHTML = 'Administrator';
                document.getElementById('roleDescriptionParagraph').innerHTML = 'The administrator is responsible with the hospital design plan which must be updated when a change is made. ';
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
