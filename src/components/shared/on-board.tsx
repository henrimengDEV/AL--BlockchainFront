import coinbaseWalletModule from "@web3-onboard/coinbase";
import walletConnectModule from "@web3-onboard/walletconnect";
import injectedModule from "@web3-onboard/injected-wallets";
import Onboard from "@web3-onboard/core";
import {Button} from "primereact/button";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {changeConnectedUser, resetConnectedUser} from "../../store/user/user.slice";

const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule();
const injected = injectedModule();

const modules = [coinbaseWalletSdk, walletConnect, injected];

const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`;
const ROPSTEN_RPC_URL = `https://ropsten.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`;
const RINKEBY_RPC_URL = `https://rinkeby.infura.io/v3/${import.meta.env.VITE_INFURA_KEY}`;

const onboard = Onboard({
    wallets: modules, // created in previous step
    chains: [
        {
            id: "0x1", // chain ID must be in hexadecimel
            token: "ETH",
            namespace: "evm",
            label: "Ethereum Mainnet",
            rpcUrl: MAINNET_RPC_URL
        },
        {
            id: "0x3",
            token: "tROP",
            namespace: "evm",
            label: "Ethereum Ropsten Testnet",
            rpcUrl: ROPSTEN_RPC_URL
        },
        {
            id: "0x4",
            token: "rETH",
            namespace: "evm",
            label: "Ethereum Rinkeby Testnet",
            rpcUrl: RINKEBY_RPC_URL
        }
    ],
    appMetadata: {
        name: "My App",
        icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
        description: "My app using Onboard",
        recommendedInjectedWallets: [
            {name: "Coinbase", url: "https://wallet.coinbase.com/"},
            {name: "MetaMask", url: "https://metamask.io"}
        ]
    }
});

const OnBoard = () => {
    const connectedUser = useAppSelector(state => state.user.connectedUser);
    const dispatch = useAppDispatch();

    const connectWallet = async () => {
        try {
            await onboard.connectWallet().then(value => {
                dispatch(changeConnectedUser({
                    username: value[0].accounts[0].ens?.name || '',
                    address: value[0].accounts[0].address
                }))
            });
        } catch (error) {
            console.error(error);
        }
    };

    const disconnect = async () => {
        const [primaryWallet] = onboard.state.get().wallets;
        if (primaryWallet) await onboard.disconnectWallet({label: primaryWallet.label});
        refreshState();
    };

    const refreshState = () => {
        dispatch(resetConnectedUser())
    };

    return (
        <>
            {
                connectedUser == null
                    ? <Button label="Connect Wallet" icon="pi pi-bitcoin" onClick={connectWallet} />
                    : <Button
                        label="Disconnect"
                        icon="pi pi-power-off"
                        className="p-button-warning"
                        onClick={disconnect}
                    />
            }
        </>
    );
}

export default OnBoard