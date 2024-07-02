import { useWeb3Modal } from '@web3modal/wagmi/react';
import React from 'react';
import { useAccount, useConfig } from 'wagmi';
import CommonButton from '../CommonButton';

function CustomAddress() {
    const config = useConfig();
    const { address } = useAccount();
    const { open } = useWeb3Modal();

    return (
        <div>
            <CommonButton onClick={address ? null : open()}>
                {address ? "Connected" : "Connect Wallet"}
            </CommonButton>
        </div>
    );
}

export default CustomAddress;
