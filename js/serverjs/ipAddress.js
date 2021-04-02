const Whac_A_Mole_IP_Address = "192.168.240.1";
const Temperature_Humidity_Led_H2S_IP_Address = "192.168.240.1";
const Sprinkler_Catlitterbox_IP_Address = "192.168.240.1";
const Food_Water_IP_Address = "192.168.240.1";

var ipAddress = {
    getWhacAMoleIPAddress:()=>{
        return Whac_A_Mole_IP_Address;
    },
    getTemperatureHumidityLedH2SIPAddress:()=>{
        return Temperature_Humidity_Led_H2S_IP_Address;
    },
    getSprinklerCatlitterboxIPAddress:()=>{
        return Sprinkler_Catlitterbox_IP_Address;
    },
    getFoodWaterIPAddress:()=>{
        return Food_Water_IP_Address;
    } 
};

module.exports = ipAddress;