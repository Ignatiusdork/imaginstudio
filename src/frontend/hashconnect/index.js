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

        const accountId = document.getElementById('accountid');
        accountId.innerHTML = pairingData.accountIds[0];
    }) 

    return initData
}