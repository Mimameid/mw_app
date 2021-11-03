import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocationConditions, fetchShop } from '../actions';

import PerfectScrollbar from 'react-perfect-scrollbar';
import ScrollContainer from './ScrollContainer';
import Header from './Header';
import ShopContent from './ShopContent/ShopContent';
import ShopInfo from './ShopContent/ShopInfo';
import Menu from 'features/shop/menu/components/Menu';

function Shop() {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.frame.location.coords);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const shopResponse = dispatch(fetchShop(slug[0]));

      shopResponse
        .then((data) => {
          const { shopData, menuData } = data.payload;

          const name = shopData.name.replaceAll(' ', '-');
          router.push(`${slug[0]}/${name}`, undefined, { shallow: true });
          setData({ shopData, menuData });
        })
        .catch(() => {});
    }
  }, [router.isReady]);

  useEffect(() => {
    if (coords) {
      console.log('ici1');
      dispatch(fetchLocationConditions({ id: data.shopData.ip, coords }));
    }
  }, [coords, dispatch]);

  if (!router.isReady) {
    return null;
  }

  return (
    <PerfectScrollbar options={{ swipeEasing: false }}>
      <ScrollContainer>
        {data ? (
          <React.Fragment>
            <Header shop={data.shopData} />
            <ShopContent>
              <ShopInfo shop={data.shopData} />
              <Menu menu={data.menuData} />
            </ShopContent>
          </React.Fragment>
        ) : null}
      </ScrollContainer>
    </PerfectScrollbar>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}

export default Shop;
