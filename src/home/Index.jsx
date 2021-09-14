import React, { useEffect, useState } from 'react';

import { accountService } from '@/_services';
import { AnchorEarn, CHAINS, NETWORKS, DENOMS } from '@anchor-protocol/anchor-earn';

function Home() {
    const user = accountService.userValue;

    const [balanceInfo, setBalanceInfo] = useState([])
  
    useEffect( () => {
  
      async function fetchData() {
        const anchorEarn = new AnchorEarn({
          chain: CHAINS.TERRA,
          network: NETWORKS.COLUMBUS_4,
          address: accountService.userValue.terrawal
  
        });
  
        const bInfo = await anchorEarn.balance({
          currencies: [DENOMS.UST]
        });
  
        setBalanceInfo(bInfo);
      }
  
      fetchData();
    }, []);


    return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {user.firstName}!</h1>
                <p>Your Terra address: {user.terrawal}</p>
                <p>Your account balance: {balanceInfo.total_account_balance_in_ust}</p>
                <p>Your deposit balance: {balanceInfo.total_deposit_balance_in_ust}</p>

            </div>
        </div>
    );
}

export { Home };
