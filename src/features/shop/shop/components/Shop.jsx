import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLocationConditions } from '../actions';

import ScrollContainer from './ScrollContainer';
import Header from './Header';
import ShopContent from './ShopContent/ShopContent';
import ShopInfo from './ShopContent/ShopInfo';
import Menu from 'features/shop/menu/components/Menu';
import SnackInfo from './SnackInfo';

function Shop() {
  const router = useRouter();
  const { slug } = router.query;
  const dispatch = useDispatch();
  const shopData = useSelector((state) => state.shop.shop);
  const menuData = useSelector((state) => state.shop.menu);
  const coords = useSelector((state) => state.frame.location.coords);

  useEffect(() => {
    if (router.isReady && shopData && menuData) {
      const name = shopData.name.replaceAll(' ', '-');
      router.push(`${slug[0]}/${name}`, undefined, { shallow: true });
      console.log(shopData);
      // setData({ shopData, menuData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, shopData, menuData]);

  useEffect(() => {
    if (coords) {
      dispatch(fetchLocationConditions({ id: shopData.id, coords }));
    }
  }, [coords, shopData.id, dispatch]);

  // if (!router.isReady) {
  //   return null;
  // }

  return (
    <ScrollContainer>
      {shopData && menuData ? (
        <React.Fragment>
          <Header shop={shopData} />
          <ShopContent>
            <ShopInfo shop={shopData} />
            <Menu menu={menuData} />
            <SnackInfo />
          </ShopContent>
        </React.Fragment>
      ) : null}
    </ScrollContainer>
  );
}

export default Shop;
