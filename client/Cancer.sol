pragma solidity 0.4.10;

contract administrated {
    address public patient;
    string public will = "This is the will originally created by Patient";
    
    function administrated() {
       patient = msg.sender;
    }
    
    modifier patientRights {
        if (msg.sender != patient) throw;
        _;
    } 
    
    function changeWill(string willText) patientRights {
        will = willText;
    }
    
    function changeAdmin(address newAdmin) patientRights {
        patient = newAdmin;
    }

}