import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getUser } from '../../../service';
import UpdateUserInformation from '../../management/UpdateUserInformation';
import Loading from '../../onLoad/Loading';
import Custom404 from "../../../pages/404"

const PersonalInformation = () => {
  const router = useRouter();

  const [display, setDisplay] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    if (mounted)
      if (router.isReady) {
        getUser(router.query.id).then((res) => {
          if(res.length === 0) router.isFallback = true;
          setUser(res[0])
        });
      }
    return () => {
      mounted = false;
    };
  }, [router.isReady,router.query.id]);
  

  // protect route
  if(router.isFallback){
    router.push('/404');
  }
  if (!user) return <Loading />;

  return (
    <>
      <div>
        <div className="PersonalInformation">
          <div className="pi-img center">
            <Image src="/icon-512x512.png" alt="Avatar" width={512} height={512} objectFit="contain" priority />
          </div>
          <div className="pi-info" key={user.id}>
            <div className="pi-name">
              <i className="bi bi-person-rolodex"></i> Họ và tên: <b>{user.fullname}</b>
            </div>
            <div className="pi-email">
              <i className="bi bi-envelope"></i> Email: {user.email}
            </div>
            <div className="pi-phone">
              <i className="bi bi-phone"></i> Số điện thoại: {user.telephone}
            </div>
            <div className="pi-address">
              <i className="bi bi-geo-alt"></i> Địa chỉ: {user.address}
            </div>
          </div>
          <button style={{ marginTop: '1rem' }} onClick={() => setDisplay(true)}>
            Chỉnh sửa thông tin cá nhân
          </button>
        </div>
      </div>
      {display && <UpdateUserInformation setDisplay={setDisplay} />}
    </>
  );
};

export default PersonalInformation;
