"use strict";
import "babel-polyfill";
require("babel-register");
var express = require('express');
var router = express.Router();
var connection_struct = require("../helpers/db-connection");




var data = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="/stylesheets/rescuer_near_hazards.css" type="text/css">
    <link rel="stylesheet" href="/stylesheets/rescuer_engaged_hazard.css" type="text/css">
    <link rel="stylesheet" href="/stylesheets/rescuer_archive.css" type="text/css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <title>HAnt</title>
</head>
<body>

    <div class="container" id="mainButtonsDiv">
        <div class="centering-container">
            <button class="btn main-button" id="nearHazardsButton" value="near-hazards"
                    onclick="clickButton(this)"
                    onmouseover="hoverButton(this)"
                    onmouseleave="mouseleaveButton(this)">Near Hazards</button>
            <button class="btn main-button" id="engagedHazardButton" value="engaged-hazard"
                    onclick="clickButton(this)"
                    onmouseover="hoverButton(this)"
                    onmouseleave="mouseleaveButton(this)">Engaged Hazard</button>
            <button class="btn main-button" id="archiveButton" value="archive"
                    onclick="clickButton(this)"
                    onmouseover="hoverButton(this)"
                    onmouseleave="mouseleaveButton(this)">Archive</button>
        </div>
        <div class="container" id="nearHazardsDiv">
            %
        </div>

        <div class="container" id="engagedHazardDiv">
            <div class="container" id="floorPlanBtnsAndTimeDiv">
                <div class="container" id="floorPlanDiv">
                    <img src="/images/hospital-floor-plan.jpg" alt="Hospital Floor Plan" id="floorPlanImg" usemap="#usa_image_map">
                </div>
                <div class="container" id="buttonsAndTimeDiv">
                    <div class="container" id="abandonButtonDiv">
                        <button class="btn" id="abandonButton">Abandon</button>
                    </div>
                    <div class="container" id="changeFloorButtonsDiv">
                        <button class="btn change-floor-button">Previous Floor</button>
                        <button class="btn change-floor-button">Next Floor</button>
                    </div>
                    <div class="container" id="timeDiv">
                        <h5 id="currentTime"></h5>
                    </div>
                </div>
            </div>
            <div class="container" id="instructionsWindowExternalDiv">
                <div class="container" id="instructionsWindowInternalDiv">
                    <ul id="instructionsList">
                        $
                    </ul>
                </div>
            </div>
        </div>

        <div class="container" id="archiveDiv">
            <div class="container main-hazard-external-div">
                <div class="container status-and-external-div-container">
                    <i class="fas fa-exclamation-circle status-icon"></i>
                    <div class="container secondary-hazard-external-div" onclick="displayDetails(this)" onmouseover="hoverHazard(this)" onmouseleave="leaveHazard(this)">
                        <i class="fas fa-fire hazard-icon"></i>
                        <div class="container hazard-internal-div">
                            <div class="container hazard-all-info-container">
                                <div class="container hazard-type-time-container">
                                    <h5 class="hazard-type-heading">Fire at St. Maria Hospital</h5>
                                    <h5 class="hazard-time-heading">Today, 10:54 PM</h5>
                                </div>
                                <h6 class="hazard-address-heading">394 Maple Wood Way</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container main-detailed-hazard-div">
                    <div class="unused-space-div"></div>
                    <div class="container details-and-buttons-div">
                        <div class="container inner-details-div">
                            <div class="container first-half-of-details-div">
                                <div class="container heading-and-info-inner-div">
                                    <div class="row hospital-info-heading-div">
                                        <i class="fas fa-h-square hospital-icon"></i>
                                        <h5 class="hospital-info-heading-hd">
                                            Hospital Info
                                        </h5>
                                    </div>
                                    <div class="container hospital-info-div">
                                        <div class="container hospital-info-list">
                                            <div class="row patients-info-row">
                                                <div class="col-8 hospital-info-col patients-info-text">
                                                    <h6 class="patients-text hospital-detail-hd">Patients:</h6>
                                                </div>
                                                <div class="col-4 hospital-info-col patients-info-number">
                                                    <h6 class="patients-number hospital-detail-hd">110</h6>
                                                </div>
                                            </div>
                                            <div class="row employees-info-row">
                                                <div class="col-8 hospital-info-col employees-info-text">
                                                    <h6 class="employees-text hospital-detail-hd">Employees:</h6>
                                                </div>
                                                <div class="col-4 hospital-info-col employees-info-number">
                                                    <h6 class="patients-number hospital-detail-hd">53</h6>
                                                </div>
                                            </div>
                                            <div class="row contact-info-row">
                                                <div class="col-5 hospital-info-col contact-info-text">
                                                    <h6 class="contact-text hospital-detail-hd">Contact:</h6>
                                                </div>
                                                <div class="col-7 hospital-info-col contact-info-number">
                                                    <h6 class="patients-number hospital-detail-hd">610-192-6600</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container plan-div">
                                    <div class="row plan-heading-div">
                                        <i class="far fa-map hospital-plan-icon"></i>
                                        <h5 class="plan-heading-hd">Hospital Floor Plans</h5>
                                    </div>
                                    <div class="row plan-and-buttons-pics">
                                        <div class="col-9 hospital-plans">
                                            <img class="floor-plan" src="./res/floor_plans/ground_floor.png" alt="Floor Plan" data-toggle="modal" data-target="#floorPlanModal">
                                        </div>
                                        <div class="col-3 hospital-buttons-for-plans-div">
                                            <div class="row hospital-buttons-row">
                                                <button class="hospital-plan-btn arrow-up-btn" onclick="nextFloor()"><i class="fas fa-arrow-up"></i></button>
                                                <button class="hospital-plan-btn arrow-down-btn" onclick="previousFloor()"><i class="fas fa-arrow-down"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container second-half-of-details-div">
                                <div class="container-fluid other-details-main-div">
                                    <div class="row other-details-heading-div">
                                        <i class="fas fa-info other-details-icon"></i>
                                        <h5 class="other-details-heading-hd">Other Details</h5>
                                    </div>
                                    <div class="row other-details-list-ext-div">
                                        <div class="row other-details-list-int-div">
                                            <div class="row rescuers-involved-row">
                                                <div class="col-8 other-detail-col other-detail-text-col rescuers-involved-text-col">
                                                    <h6 class="other-detail-text-hd rescuers-involved-text other-detail-hd">Rescuers Involved:</h6>
                                                </div>
                                                <div class="col-4 other-detail-col other-detail-number-col rescuers-involved-number-col">
                                                    <h6 class="other-detail-number-hd rescuers-involved-number other-detail-hd">13</h6>
                                                </div>
                                            </div>
                                            <div class="row reported-casualties-row">
                                                <div class="col-8 other-detail-col other-detail-text-col reported-casualties-text-col">
                                                    <h6 class="other-detail-text-hd reported-casualties-text other-detail-hd">Reported Casualties:</h6>
                                                </div>
                                                <div class="col-4 other-detail-col other-detail-number-col reported-casualties-number-col">
                                                    <h6 class="other-detail-number-hd reported-casualties-number other-detail-hd">0</h6>
                                                </div>
                                            </div>
                                            <div class="row hazard-status-row">
                                                <div class="col-8 other-detail-col other-detail-text-col hazard-status-text-col">
                                                    <h6 class="other-detail-text-hd hazard-status-text other-detail-hd">Hazard Status:</h6>
                                                </div>
                                                <div class="col-4 other-detail-col other-detail-number-col hazard-status-number-col">
                                                    <h6 class="other-detail-number-hd hazard-status-sts other-detail-hd">ongoing</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container buttons-details-div">
                            <button class="buttons-details-btn hide-details-btn" onclick="hideDetails(this)">Hide Details</button>
                            <button class="buttons-details-btn ignore-btn" data-toggle="modal" data-target="#ignoreModal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container main-hazard-external-div">
                <div class="container status-and-external-div-container">
                    <i class="fas fa-exclamation-circle status-icon"></i>
                    <div class="container secondary-hazard-external-div" onclick="displayDetails(this)" onmouseover="hoverHazard(this)" onmouseleave="leaveHazard(this)">
                        <i class="fas fa-fire hazard-icon"></i>
                        <div class="container hazard-internal-div">
                            <div class="container hazard-all-info-container">
                                <div class="container hazard-type-time-container">
                                    <h5 class="hazard-type-heading">Fire at St. Maria Hospital</h5>
                                    <h5 class="hazard-time-heading">Today, 10:54 PM</h5>
                                </div>
                                <h6 class="hazard-address-heading">394 Maple Wood Way</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container main-detailed-hazard-div">
                    <div class="unused-space-div"></div>
                    <div class="container details-and-buttons-div">
                        <div class="container inner-details-div">
                            <div class="container first-half-of-details-div">
                                <div class="container heading-and-info-inner-div">
                                    <div class="row hospital-info-heading-div">
                                        <i class="fas fa-h-square hospital-icon"></i>
                                        <h5 class="hospital-info-heading-hd">
                                            Hospital Info
                                        </h5>
                                    </div>
                                    <div class="container hospital-info-div">
                                        <div class="container hospital-info-list">
                                            <div class="row patients-info-row">
                                                <div class="col-8 hospital-info-col patients-info-text">
                                                    <h6 class="patients-text hospital-detail-hd">Patients:</h6>
                                                </div>
                                                <div class="col-4 hospital-info-col patients-info-number">
                                                    <h6 class="patients-number hospital-detail-hd">110</h6>
                                                </div>
                                            </div>
                                            <div class="row employees-info-row">
                                                <div class="col-8 hospital-info-col employees-info-text">
                                                    <h6 class="employees-text hospital-detail-hd">Employees:</h6>
                                                </div>
                                                <div class="col-4 hospital-info-col employees-info-number">
                                                    <h6 class="patients-number hospital-detail-hd">53</h6>
                                                </div>
                                            </div>
                                            <div class="row contact-info-row">
                                                <div class="col-5 hospital-info-col contact-info-text">
                                                    <h6 class="contact-text hospital-detail-hd">Contact:</h6>
                                                </div>
                                                <div class="col-7 hospital-info-col contact-info-number">
                                                    <h6 class="patients-number hospital-detail-hd">610-192-6600</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container plan-div">
                                    <div class="row plan-heading-div">
                                        <i class="far fa-map hospital-plan-icon"></i>
                                        <h5 class="plan-heading-hd">Hospital Floor Plans</h5>
                                    </div>
                                    <div class="row plan-and-buttons-pics">
                                        <div class="col-9 hospital-plans">
                                            <img class="floor-plan" src="./res/floor_plans/ground_floor.png" alt="Floor Plan" data-toggle="modal" data-target="#floorPlanModal">
                                        </div>
                                        <div class="col-3 hospital-buttons-for-plans-div">
                                            <div class="row hospital-buttons-row">
                                                <button class="hospital-plan-btn arrow-up-btn" onclick="nextFloor()"><i class="fas fa-arrow-up"></i></button>
                                                <button class="hospital-plan-btn arrow-down-btn" onclick="previousFloor()"><i class="fas fa-arrow-down"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container second-half-of-details-div">
                                <div class="container-fluid other-details-main-div">
                                    <div class="row other-details-heading-div">
                                        <i class="fas fa-info other-details-icon"></i>
                                        <h5 class="other-details-heading-hd">Other Details</h5>
                                    </div>
                                    <div class="row other-details-list-ext-div">
                                        <div class="row other-details-list-int-div">
                                            <div class="row rescuers-involved-row">
                                                <div class="col-8 other-detail-col other-detail-text-col rescuers-involved-text-col">
                                                    <h6 class="other-detail-text-hd rescuers-involved-text other-detail-hd">Rescuers Involved:</h6>
                                                </div>
                                                <div class="col-4 other-detail-col other-detail-number-col rescuers-involved-number-col">
                                                    <h6 class="other-detail-number-hd rescuers-involved-number other-detail-hd">13</h6>
                                                </div>
                                            </div>
                                            <div class="row reported-casualties-row">
                                                <div class="col-8 other-detail-col other-detail-text-col reported-casualties-text-col">
                                                    <h6 class="other-detail-text-hd reported-casualties-text other-detail-hd">Reported Casualties:</h6>
                                                </div>
                                                <div class="col-4 other-detail-col other-detail-number-col reported-casualties-number-col">
                                                    <h6 class="other-detail-number-hd reported-casualties-number other-detail-hd">0</h6>
                                                </div>
                                            </div>
                                            <div class="row hazard-status-row">
                                                <div class="col-8 other-detail-col other-detail-text-col hazard-status-text-col">
                                                    <h6 class="other-detail-text-hd hazard-status-text other-detail-hd">Hazard Status:</h6>
                                                </div>
                                                <div class="col-4 other-detail-col other-detail-number-col hazard-status-number-col">
                                                    <h6 class="other-detail-number-hd hazard-status-sts other-detail-hd">ongoing</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container buttons-details-div">
                            <button class="buttons-details-btn hide-details-btn" onclick="hideDetails(this)">Hide Details</button>
                            <button class="buttons-details-btn ignore-btn" data-toggle="modal" data-target="#ignoreModal">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Floor Plan Modal -->
    <div class="modal fade" id="floorPlanModal" tabindex="-1" role="dialog" aria-labelledby="floorPlanModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="floorPlanModalLabel">Floor plan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    ...
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Ignore Modal -->
    <div class="modal fade" id="ignoreModal" tabindex="-1" role="dialog" aria-labelledby="ignoreModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ignoreModalLabel">Ignore</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to ignore this hazard?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Yes</button>
                    <button type="button" class="btn btn-primary">No</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Engage Modal -->
    <div class="modal fade" id="engageModal" tabindex="-1" role="dialog" aria-labelledby="engageModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="engageModalLabel">Engage</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to engage this hazard?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                    <button type="button" class="btn btn-primary">Yes</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Send to Archive Modal -->
    <div class="modal fade" id="sendToArchiveModal" tabindex="-1" role="dialog" aria-labelledby="sendToArchiveModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="sendToArchiveModalLabel">Send to Archive</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to send to archive this hazard?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Yes</button>
                    <button type="button" class="btn btn-primary">No</button>
                </div>
            </div>
        </div>
    </div>

    <script src="/public/javascripts/rescuer_map.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="/javascripts/rescuer.js" type="text/javascript"></script>
</body>
</html>

`;

var dataDiv = `
<div class="container main-hazard-external-div">
                <div class="container status-and-external-div-container">
                    <i class="fas fa-exclamation-circle status-icon"></i>
                    <div class="container secondary-hazard-external-div" onclick="displayDetails(this)" onmouseover="hoverHazard(this)" onmouseleave="leaveHazard(this)">
                        <i class="fas fa-fire hazard-icon"></i>
                        <div class="container hazard-internal-div">
                            <div class="container hazard-all-info-container">
                                <div class="container hazard-type-time-container">
                                    <h5 class="hazard-type-heading">%1 at %2</h5>
                                    <h5 class="hazard-time-heading">%3</h5>
                                </div>
                                <h6 class="hazard-address-heading">%4</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container main-detailed-hazard-div">
                    <div class="unused-space-div"></div>
                    <div class="container details-and-buttons-div">
                        <div class="container inner-details-div">
                            <div class="container first-half-of-details-div">
                                <div class="container heading-and-info-inner-div">
                                    <div class="row hospital-info-heading-div">
                                        <i class="fas fa-h-square hospital-icon"></i>
                                        <h5 class="hospital-info-heading-hd">
                                            Hospital Info
                                        </h5>
                                    </div>
                                    <div class="container hospital-info-div">
                                        <div class="container hospital-info-list">
                                            <div class="row patients-info-row">
                                                <div class="col-8 hospital-info-col patients-info-text">
                                                    <h6 class="patients-text hospital-detail-hd">Patients:</h6>
                                                </div>
                                                <div class="col-4 hospital-info-col patients-info-number">
                                                    <h6 class="patients-number hospital-detail-hd">%5</h6>
                                                </div>
                                            </div>
                                            <div class="row employees-info-row">
                                                <div class="col-8 hospital-info-col employees-info-text">
                                                    <h6 class="employees-text hospital-detail-hd">Employees:</h6>
                                                </div>
                                                <div class="col-4 hospital-info-col employees-info-number">
                                                    <h6 class="patients-number hospital-detail-hd">%6</h6>
                                                </div>
                                            </div>
                                            <div class="row contact-info-row">
                                                <div class="col-5 hospital-info-col contact-info-text">
                                                    <h6 class="contact-text hospital-detail-hd">Contact:</h6>
                                                </div>
                                                <div class="col-7 hospital-info-col contact-info-number">
                                                    <h6 class="patients-number hospital-detail-hd">%7</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="container plan-div">
                                    <div class="row plan-heading-div">
                                        <i class="far fa-map hospital-plan-icon"></i>
                                        <h5 class="plan-heading-hd">Hospital Floor Plans</h5>
                                    </div>
                                    <div class="row plan-and-buttons-pics">
                                        <div class="col-9 hospital-plans">
                                            <img class="floor-plan" src="/images/hospital-floor-plan.jpg" alt="Floor Plan" data-toggle="modal" data-target="#floorPlanModal">
                                        </div>
                                        <div class="col-3 hospital-buttons-for-plans-div">
                                            <div class="row hospital-buttons-row">
                                                <button class="hospital-plan-btn arrow-up-btn" onclick="nextFloor()"><i class="fas fa-arrow-up"></i></button>
                                                <button class="hospital-plan-btn arrow-down-btn" onclick="previousFloor()"><i class="fas fa-arrow-down"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container second-half-of-details-div">
                                <div class="container-fluid other-details-main-div">
                                    <div class="row other-details-heading-div">
                                        <i class="fas fa-info other-details-icon"></i>
                                        <h5 class="other-details-heading-hd">Other Details</h5>
                                    </div>
                                    <div class="row other-details-list-ext-div">
                                        <div class="row other-details-list-int-div">
                                            <div class="row rescuers-involved-row">
                                                <div class="col-8 other-detail-col other-detail-text-col rescuers-involved-text-col">
                                                    <h6 class="other-detail-text-hd rescuers-involved-text other-detail-hd">Rescuers Involved:</h6>
                                                </div>
                                                <div class="col-4 other-detail-col other-detail-number-col rescuers-involved-number-col">
                                                    <h6 class="other-detail-number-hd rescuers-involved-number other-detail-hd">%8</h6>
                                                </div>
                                            </div>
                                            <div class="row reported-casualties-row">
                                                <div class="col-8 other-detail-col other-detail-text-col reported-casualties-text-col">
                                                    <h6 class="other-detail-text-hd reported-casualties-text other-detail-hd">Reported Casualties:</h6>
                                                </div>
                                                <div class="col-4 other-detail-col other-detail-number-col reported-casualties-number-col">
                                                    <h6 class="other-detail-number-hd reported-casualties-number other-detail-hd">%9</h6>
                                                </div>
                                            </div>
                                            <div class="row hazard-status-row">
                                                <div class="col-8 other-detail-col other-detail-text-col hazard-status-text-col">
                                                    <h6 class="other-detail-text-hd hazard-status-text other-detail-hd">Hazard Status:</h6>
                                                </div>
                                                <div class="col-4 other-detail-col other-detail-number-col hazard-status-number-col">
                                                    <h6 class="other-detail-number-hd hazard-status-sts other-detail-hd">%10</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="container buttons-details-div">
                            <button class="buttons-details-btn hide-details-btn" onclick="hideDetails(this)">Hide Details</button>
                            <button class="buttons-details-btn engage-btn" data-toggle="modal" data-target="#engageModal">Engage</button>
                            <button class="buttons-details-btn ignore-btn" data-toggle="modal" data-target="#ignoreModal">Ignore</button>
                            <button class="buttons-details-btn send-to-archive-btn" data-toggle="modal" data-target="#sendToArchiveModal">Send to Archive</button>
                        </div>
                    </div>
                </div>
            </div>
`;

var instructionDiv = `
                        <li className="instruction-item">
                            <h6 className="instruction-text">$</h6>
                            <h6 className="instruction-time">16 Jan 2019, 18:39</h6>
                        </li>`;

var query = require('stardog/lib/query');
var getHazardsQuery = `
    SELECT ?type ?location ?time ?address ?patients ?employees ?contact ?rescuersInvolved ?reportedCasualties ?hazardStatus
            WHERE
            {
                {
                    ?hazard a :Fire ;
                        :type ?type ;
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
                        :type ?type ;
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
                        :type ?type ;
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

var getSensorsQuery = `
        SELECT ?sensorEast ?sensorCentral ?sensorWest
            WHERE
            {
                {
                    ?hospital a :Hospital ;
                        :sensorEast ?sensorEast ;
                        :sensorCentral ?sensorCentral ;
                        :sensorWest ?sensorWest .
                    }
            }
            `;

/* GET home page. */
router.get('/', async function(req, res, next)
{
    let type = "";
    let location = "";
    let time = "";
    let address = "";
    let patients = "";
    let employees = "";
    let contact = "";
    let rescuersInvolved = "";
    let reportedCasualties = "";
    let hazardStatus = "";

    let result1 = await query.execute(connection_struct.conn, "hantDB", getHazardsQuery).then(res =>
    {
        if(!res.ok)
        {
            // alert('Error while searching for the password..');
            console.log('Error while executing query..');
        }

        const { bindings } = res.body.results;

        if(!bindings.length)
        {
            console.log('Wrong password or username not found!');
            // alert('Wrong password!');
        }
        else
        {
            for (let idx = 0; idx < bindings.length; ++idx)
            {
                let dataDivAux = dataDiv;

                type = bindings[idx].type.value;
                location = bindings[idx].location.value;
                time = bindings[idx].time.value;
                address = bindings[idx].address.value;
                patients = bindings[idx].patients.value;
                employees = bindings[idx].employees.value;
                contact = bindings[idx].contact.value;
                rescuersInvolved = bindings[idx].rescuersInvolved.value;
                reportedCasualties = bindings[idx].reportedCasualties.value;
                hazardStatus = bindings[idx].hazardStatus.value;

                dataDivAux = dataDivAux.replace('%1', type);
                dataDivAux = dataDivAux.replace('%2', location);
                dataDivAux = dataDivAux.replace('%3', time);
                dataDivAux = dataDivAux.replace('%4', address);
                dataDivAux = dataDivAux.replace('%5', patients);
                dataDivAux = dataDivAux.replace('%6', employees);
                dataDivAux = dataDivAux.replace('%7', contact);
                dataDivAux = dataDivAux.replace('%8', rescuersInvolved);
                dataDivAux = dataDivAux.replace('%9', reportedCasualties);
                dataDivAux = dataDivAux.replace('%10', hazardStatus);

                if(idx === (bindings.length - 1))
                {
                    data = data.replace('%', dataDivAux);
                }
                else
                {
                    data = data.replace('%', dataDivAux + '\n%');
                }
            }
        }
    });

    let result2 = await query.execute(connection_struct.conn, "hantDB", getSensorsQuery).then(res =>
    {
        if(!res.ok)
        {
            // alert('Error while searching for the password..');
            console.log('Error while executing query..');
        }

        const { bindings } = res.body.results;

        if(!bindings.length)
        {
            console.log('Wrong password or username not found!');
            // alert('Wrong password!');
        }
        else
        {
            for (let idx = 0; idx < bindings.length; ++idx)
            {
                let instructionAux1 = instructionDiv;
                let instructionAux2 = instructionDiv;
                let instructionAux3 = instructionDiv;
                let sensorEast = bindings[idx].sensorEast.value;
                let sensorCentral = bindings[idx].sensorCentral.value;
                let sensorWest = bindings[idx].sensorWest.value;

                let message = "";

                if (sensorEast === "0") {
                    message = "East sensor is broken. Try using another exit.";
                    instructionAux1 = instructionAux1.replace('$', message);
                    if(idx === (bindings.length - 1))
                    {
                        data = data.replace('$', instructionAux1);
                    }
                    else
                    {
                        data = data.replace('$', instructionAux1 + '\n$');
                    }
                }
                if (sensorWest === "0") {
                    message = "West sensor is broken. Try using another exit.";
                    instructionAux2 = instructionAux2.replace('$', message);
                    if(idx === (bindings.length - 1))
                    {
                        data = data.replace('$', instructionAux2);
                    }
                    else
                    {
                        data = data.replace('$', instructionAux2 + '\n$');
                    }
                }
                if (sensorCentral === "0") {
                    message = "People are trapped inside. Act fast.";
                    instructionAux3 = instructionAux3.replace('$', message);
                    if(idx === (bindings.length - 1))
                    {
                        data = data.replace('$', instructionAux3);
                    }
                    else
                    {
                        data = data.replace('$', instructionAux3 + '\n$');
                    }
                }


            }
        }
    });
    res.send(data);
});

module.exports = router;
