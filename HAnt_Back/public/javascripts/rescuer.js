let previousPressedButton = null;
let displayedDiv = null;

function hoverButton(btn)
{
    if(btn !== previousPressedButton)
    {
        btn.style.color = "#F0810F";
    }
}

function mouseleaveButton(btn)
{
    if(btn !== previousPressedButton)
    {
        btn.style.color = "#D5D6D2";
    }
}

function clickButton(btn)
{
    if(btn !== previousPressedButton)
    {
        btn.style.color = "#F0810F";
        btn.style.borderBottomColor = "#F0810F";

        // at first press, previousPressedButton is null
        if(previousPressedButton)
        {
            previousPressedButton.style.color = "#D5D6D2";
            previousPressedButton.style.borderBottomColor = "#011A27";
        }

        switch(btn.getAttribute('value'))
        {
            case "near-hazards":
            {
                displayedDiv.style.display = "none";
                displayedDiv = document.getElementById("nearHazardsDiv");
                displayedDiv.style.display = "block";

                break;
            }

            case "engaged-hazard":
            {
                displayedDiv.style.display = "none";
                displayedDiv = document.getElementById("engagedHazardDiv");
                displayedDiv.style.display = "flex";

                break;
            }

            case "archive":
            {
                displayedDiv.style.display = "none";
                displayedDiv = document.getElementById("archiveDiv");
                displayedDiv.style.display = "block";

                break;
            }
        }

        previousPressedButton = btn;
    }
}

function hoverHazard(hazardExtDiv)
{
    hazardExtDiv.children[0].style.color = "#E6DF44";
    hazardExtDiv.children[1].children[0].children[0].children[0].style.color = "#E6DF44";
    hazardExtDiv.children[1].children[0].children[0].children[1].style.color = "#E6DF44";
    hazardExtDiv.children[1].children[0].children[1].style.color = "#E6DF44";
}

function leaveHazard(hazardExtDiv)
{
    hazardExtDiv.children[0].style.color = "#D5D6D2";
    hazardExtDiv.children[1].children[0].children[0].children[0].style.color = "#D5D6D2";
    hazardExtDiv.children[1].children[0].children[0].children[1].style.color = "#D5D6D2";
    hazardExtDiv.children[1].children[0].children[1].style.color = "#D5D6D2";
}

function displayDetails(hazard)
{
    if(hazard.parentElement.parentElement.children[1].style.display !== "flex")
    {
        hazard.parentElement.parentElement.children[1].style.display = "flex";
    }
}

function hideDetails(hazard)
{
    hazard.parentElement.parentElement.parentElement.style.display = "none";
}

function nextFloor()
{

}

function previousFloor()
{

}

function updateTime()
{
    const currentTime = new Date();
    document.getElementById("currentTime").innerHTML = currentTime.getDate() + "-" +
        (currentTime.getMonth()+1) + "-" +
         currentTime.getFullYear() + " " +
        currentTime.getHours() + ":" + currentTime.getMinutes();

    setTimeout(updateTime, 60000); // 60s
}


updateTime();

displayedDiv = document.getElementById("nearHazardsDiv");
clickButton(document.getElementById("nearHazardsButton"));
