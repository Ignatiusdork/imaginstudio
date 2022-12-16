import { HashConnect } from "hashconnect";

// Create a new instance of the hashconnect class
let hashconnect = new HashConnect()


let appMetadata = {
    name: "studio connect",
    description: "Connecting hpack to marketplace",
    icon: "https://absolute.url/to/icon.png"
}

export const pairHashpack = async () => {
    let initData = await hashconnect.init(appMetadata, "testnet", false);

    hashconnect.foundExtensionEvent.once((walletMetadata) => {
        hashconnect.connectToLocalWallet(initData.pairingString, walletMetadata);
    })

    hashconnect.pairingEvent.once((pairingData)=> {
        console.log('wallet paired')
        console.log(pairingData)

        const accountId = document.getElementById('accountid')
        accountId.innerHTML = pairingData.accountIds[0]
    }) 

    return initData
}


// import React, { useState } from 'react';
// import HashConnect, { HashConnectConnectionState, HashConnectTypes } from 'hashconnect';

// const HashconnectService = () => {
//   const [state, setState] = useState(HashConnectConnectionState.Disconnected);
//   const [pairingData, setPairingData] = useState(null);

//   const appMetadata = {
//     name: "dApp Example",
//     description: "An example hedera dApp",
//     icon: "https://www.hashpack.app/img/logo.svg"
//   };

//   const hashconnect = new HashConnect(true);

//   hashconnect.foundExtensionEvent.on((data) => {
//     console.log("Found extension", data);
//     setAvailableExtension(data);
//   });

//   hashconnect.pairingEvent.on((data) => {
//     console.log("Paired with wallet", data);
//     setPairingData(data.pairingData);
//   });

//   hashconnect.connectionStatusChangeEvent.on((newState) => {
//     console.log("hashconnect state change event", newState);
//     setState(newState);
//   });

//   const connectToExtension = async () => {
//     hashconnect.connectToLocalWallet();
//   }

//   return (
//     <div>
//       <p>Hashconnect state: {state}</p>
//       {pairingData && <p>Pairing data: {JSON.stringify(pairingData)}</p>}
//       <button onClick={connectToExtension}>Connect to extension</button>
//     </div>
//   );
// };
