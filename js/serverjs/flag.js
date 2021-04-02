// Only for room 1
var H2SFlag = false;
var TempFlag = false;
var Led1Flag = false;
var Led2Flag = false;
var Led3Flag = false;
var Led4Flag = false;
var Led5Flag = false;

var flag = {
    getH2SFlag:()=>{
        return H2SFlag;
    },
    setH2SFlag: (bool)=>{
        H2SFlag = bool;
    },
    
    getTempFlag:()=>{
        return TempFlag;
    },
    setTempFlag: (bool)=>{
        TempFlag = bool;
    },
    
    getLed1Flag:()=>{
        return Led1Flag;
    },
    setLed1Flag: (bool)=>{
        Led1Flag = bool;
    },
    
    getLed2Flag:()=>{
        return Led2Flag;
    },
    setLed2Flag: (bool)=>{
        Led2Flag = bool;
    },
    
    getLed3Flag:()=>{
        return Led3Flag;
    },
    setLed3Flag: (bool)=>{
        Led3Flag = bool;
    },
    
    getLed4Flag:()=>{
        return Led4Flag;
    },
    setLed4Flag: (bool)=>{
        Led4Flag = bool;
    },
    
    getLed5Flag:()=>{
        return Led5Flag;
    },
    setLed5Flag: (bool)=>{
        Led5Flag = bool;
    }
};

module.exports = flag;