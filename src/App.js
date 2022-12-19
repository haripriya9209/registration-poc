import React from 'react';
import './App.css';
import QrReader from './components/qrScanner';
import {useState, useEffect} from "react";
import { Html5Qrcode } from "html5-qrcode";
import ListItem from "./components/listItemTable";
import * as querries from "./common/api";

let html5QrCode;

function App() {
  const [display, setDisplay] = useState(true);
  const [cancel, setCancel] = useState(false);
  const [items, setItems] = useState([]);
  const [checkInStatus, setCheckInStatus] = useState(false);

  useEffect(()=>{
    html5QrCode = new Html5Qrcode("reader");
    collectCollectionIndexedDB();
    getAllData();
    Registrations();
  }, []);

  const qrConfig = {fps: 10, qrbox: {width: 200, height: 200}};

  //list Registrations querry
  const Registrations = async() =>{
    querries.listRegistrations().then(
        res=>{
          console.log(res.data.listRegistrations.registrationss);
          let dataFromApi = res.data.listRegistrations.registrationss;
          dataFromApi.map((singleDataset)=>{
            // console.log(singleDataset);
            addOrEditData(singleDataset, singleDataset.checkIn);
          })
        }
    ).catch(err=>console.log(err));
  }

  //create Registration querry
  const createRegistration = async(bookingId, emailId, name, phoneNumber) =>{
    querries.createRegistrationsApi(bookingId, emailId, name, phoneNumber).then(
        res=>{
          console.log(res);
        }
    ).catch(err=>console.log(err));
  }

  //Update registration
  const updateRegistration = async(bookingId, checkIn, name) =>{
    querries.updateRegistrationApi(bookingId, checkIn, name).then(
        res=>{
          console.log(res);
        }
    ).catch(err=>console.log(err));
  }

  //Checking IndexedDB is present or not
  const idb = window.indexedDB|| window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

  const collectCollectionIndexedDB = () =>{
    if (!window.indexedDB) {
      console.log("Your browser does not support IndexedDB");
    }else{
      console.log("Your browser supports IndexedDB");
      openDatabase();
    }
  }

  //opening database
  const openDatabase = () =>{
    const request = idb.open("ScannedEntries");

    //Error handlers
    request.onerror = function(event) {
      console.log("Error in IndexedDB: "+event);
    };

    request.onupgradeneeded = function(event) {
      const db = request.result;
      db.createObjectStore("userData", {keyPath: "id"});
    }

    //OnSuccess Handler
    request.onsuccess = function(event) {
      console.log("Success: created object store");
    };
  }
  
  //stop scanning
  const handleStop = () =>{
    try{
        html5QrCode.stop().then((res)=>{
            setDisplay(true);
            html5QrCode.clear();
        }).then(() => {
            setCancel(false);
        })
    }
    catch(err){
        console.log(err);
    }
  };

  //Start Scanning and capturing data
    const handleClickAdvanced = () =>{
      setDisplay(false);
      setCancel(true);
      const qrCodeSuccessCallback = (decodeText, decodedResult)=>{
        const entryText = `{"${decodeText.replaceAll("\n",'","').replaceAll(": ",'":"')}"}`
        const entry = {...JSON.parse(entryText)};
        // setItems([...items, entry]);
        // console.log(entry);

        entry["name"] = entry["Name"];
        delete entry["Name"];
        entry["bookingId"] = entry["Booking Id"];
        delete entry["Booking Id"];
        entry["emailId"] = entry["Email Id"];
        delete entry["Email Id"];
        entry["phoneNumber"] = entry["Phone Number"];
        delete entry["Phone Number"];

        addOrEditData(entry,false);
        handleStop();
      };

      html5QrCode.start(
          {facingMode: "environment"},
          qrConfig,
          qrCodeSuccessCallback
      ).catch((err) => {
          console.log(err)
      });
    };

  //ADD or EDIT data
  const addOrEditData = (entry, checkInStatus)=>{
    const dbPromise = idb.open("ScannedEntries");
    // console.log(entry);
    dbPromise.onsuccess = () => {
      const db = dbPromise.result;
      const userReadWriteTransaction = db.transaction("userData", "readwrite");
      const newObjectStore = userReadWriteTransaction.objectStore("userData");
      // setItems([...items, entry]);
      const users = newObjectStore.put({
        id: entry["bookingId"],
        name: entry["name"],
        emailId: entry["emailId"],
        phoneNumber: entry["phoneNumber"],
        bookingId: entry["bookingId"],
        checkIn: checkInStatus.toString()
      });

      users.onsuccess = () =>{
        userReadWriteTransaction.oncomplete = () =>{
          getAllData();
          if(checkInStatus){
            updateRegistration(entry["bookingId"],checkInStatus,entry["name"]);
          }
          else{
            createRegistration(entry["bookingId"],entry["emailId"],entry["name"],entry["phoneNumber"]);
          }
          db.close();
        }
        
        // alert(checkInStatus?"user is checked-in":"user is added");
        
      }

      users.onerror = (event) =>{
        console.log(event);
      }
    };
  }

  //read data from IndexedDB
    const getAllData = () =>{
      const dbPromise = idb.open("ScannedEntries");

      dbPromise.onsuccess = () => {
        const db = dbPromise.result;
        const userReadTransaction = db.transaction("userData", "readonly");
        const newObjectStore = userReadTransaction.objectStore("userData");
        // setItems([...items, entry]);
        const users = newObjectStore.getAll();

        users.onsuccess = (querry) =>{
          setItems(querry.target.result);
        }
        
        users.onerror = (querry) =>{
          console.log("error occurred while loading data");
        }
      };
    }
  
  //checkIn data
  const checkIn = (data) =>{
    addOrEditData(data,true);
    setCheckInStatus(true);
  }

  return (
    <div className="App">
      <QrReader
        handleClickAdvanced={()=>{handleClickAdvanced()}}
        display={display}
      />
      {cancel && 
        <div className="d-flex justify-content-center align-items-center m-4">
            <button className='button-styles' onClick={()=>handleStop()}>
                Stop
            </button>
        </div>
      }
      <ListItem items={items} checkIn={checkIn} checkInStatus={checkInStatus}/>

    </div>
  );
}

export default App;
