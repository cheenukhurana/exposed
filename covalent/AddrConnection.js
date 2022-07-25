
// import { utimes } from "fs";
import fetch from "node-fetch";
// import { kill } from "process";

const BASE_URL = "https://api.covalenthq.com/v1/";
const API_KEY = "ckey_67ab6a60325149cc85edc08efbd";
const CHAIN_ID = 42;

export async function GetAllChains() {
    const url = BASE_URL + "chains/?quote-currency=USD&format=JSON&key=" + API_KEY
    console.log("Getting all Chains available on Covalent...");
    let response = await fetch(url);
    if (!response.ok) { 
        console.log("HTTP-Error while getting Chains data: ", response.status);
    }
    let j = await response.json();
    return j;
}

export async function FindConnection(originAddr, destinationAddr) {
    /**
     * This function returns a JSON response containing the following info:
     * If no connection exists:
     * {
        status: 200,
        origin: '0xf4267F20B463421D2cF3db534491b7920F79Ac4F',
        originIsConnected: false,
        connnections: [],
        error: null
        }
        
        If connection exits:
        {
        status: 200,
        origin: '0xf4267F20B463421D2cF3db534491b7920F79Ac4F',
        originIsConnected: true,
        connnections: [ '0x4281ecf07378ee595c564a59048801330f3084ee' ],
        error: null
        }
     */
    const url = BASE_URL + CHAIN_ID + "/address/" + originAddr + "/transactions_v2/?key=" + API_KEY
    console.log("Getting all transactions for the origin address...", url);
    let response = await fetch(url);
    if (!response.ok) { 
        console.log("HTTP-Error while getting Chains data: ", response.status);
    }
    let j = await response.json();
    if(!j.data || !j.data.items) {
        console.log("No Data or transactions present in the response. Relation cannot exist. Data:", j);
        return j;
    }
    var finalResp = {}
    var conns = []
    var originIsConnected = false;
    j.data.items.forEach(tx => {
        console.log("==== transaction is: ", tx);
        if(tx.from_address == destinationAddr || tx.to_address == destinationAddr) {
            console.log("====== connection exists", destinationAddr, tx.to_address, tx.from_address);
            originIsConnected = true;
            if(!conns.includes(destinationAddr)) {
                conns.push(destinationAddr);
            }
        }
    })
    finalResp = {
        "status": response.status,
        "origin": originAddr,
        "originIsConnected": originIsConnected,
        "connnections": conns,
        "error": null,
    }
    return finalResp;
}


// Delete below once findConnection works
export function testConnection(addressA,addressB)
{
    if((addressA === "0x34Ca45aFcb10922b10DE0356Fa39BA36Fc7ac1AF" && addressB==="0x0aF81EF3bBF66CD544B953B11541B44250430199") || (addressA === "0x0aF81EF3bBF66CD544B953B11541B44250430199" && addressB==="0x34Ca45aFcb10922b10DE0356Fa39BA36Fc7ac1AF"))
    return true

    return false
}

// async function main() {
//     // var resp = await GetAllChains();
//     // console.log("===== All Chains on Coavlent Response: ", resp);

//     var resp2 = await FindConnection("0xf4267F20B463421D2cF3db534491b7920F79Ac4F", "0x4281ecf07378ee595c564a59048801330f3084ee");
//     console.log("====== transactions of main account is: ", resp2);
// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });