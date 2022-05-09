import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import SingleLogo from '../../components/layout/SingleLogo';
import MetaData from '../../components/meta/MetaData';
import Loading from '../../components/onLoad/Loading';
import MoneyDeposit from '../../components/user/wallet/MoneyDeposit';
import MoneyDonated from '../../components/user/wallet/MoneyDonated';
import MoneyInWallet from '../../components/user/wallet/MoneyInWallet';
import MoneyReceived from '../../components/user/wallet/MoneyReceived';
import WithDrawMoney from '../../components/user/wallet/WithDrawMoney';
import { AuthContext } from '../../contexts/AuthContext';
import { getAllUsers, getUser } from '../../service';
import Custom404 from '../404';

const Wallet = () => {
  const [display, setDisplay] = useState(false);
  const [deposit, setDeposit] = useState(false);
  const [user, setUser] = useState(null);
  const { loggedUser } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (router.isReady) {
        getUser(router.query.id).then((res) => {
          if (res.length === 0) {
            router.isFallback = true;
          }
          setUser(res[0]);
        });
      }
    }
  }, [router.isReady]);

  if (router.isFallback) return <Custom404 />;
  if (!user) return <Loading />;

  return (
    <>
      <MetaData title={`Ví của tôi - ${user.fullname}`} description="Ví của tôi" />
      <SingleLogo />
      <div className="flex-space-between">
        <h1>
          <i className="bi bi-wallet2" style={{ fontSize: '34px' }}></i> Ví của tôi
        </h1>
        <div className="flex-default">
          <div className="center">
            <i className="bi bi-cash-coin" title="Rút tiền" onClick={() => setDisplay(true)}></i>
          </div>
          {true === 'pns' ? (
            <div className="center">
              <i className="bi bi-info-circle" style={{ marginLeft: '1rem' }} title="Thông tin người ủng hộ"></i>
            </div>
          ) : (
            <div className="center">
              <button className="deposit-btn" onClick={() => setDeposit(true)}>
                Nạp tiền
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="grid-container r-wallet">
        <MoneyInWallet />
        {true === null ? <Loading /> : true === 'pns' ? <MoneyReceived /> : <MoneyDonated />}
        <WithDrawMoney display={display} setDisplay={setDisplay} />
        <MoneyDeposit display={deposit} setDisplay={setDeposit} />
      </div>
    </>
  );
};

export default Wallet;
