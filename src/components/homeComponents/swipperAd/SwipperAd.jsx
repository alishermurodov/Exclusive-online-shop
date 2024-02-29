import React from 'react';
import styles from './swipperAd.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

// import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';

// SwiperCore.use([Autoplay, Pagination, Navigation]);

import apple from '../../../assets/home/apple.png';
import applePhone from '../../../assets/home/phoneApple.png';

export default function SwipeApple() {
  return (
    <div className={styles.swiper}>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        // navigation={true}
      >
        <SwiperSlide>
          <div className={styles.swiperSlide}>
            <div className={styles.slideInfo}>
              <div className={styles.slideInfoChild}>
                <img src={apple} alt="" />
                <p >iPhone 14 Series</p>
              </div>
              <h1>Up to 10% off Voucher</h1>
              <p>Shop Now</p>
            </div>
            <div className={styles.slideImg}>
              <img src={applePhone} alt="phone" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={styles.swiperSlide}>
            <div className={styles.slideInfo}>
              <div className={styles.slideInfoChild}>
                <img src={apple} alt="" />
                <p >iPhone 16 Series</p>
              </div>
              <h1>Up to 10% off Voucher</h1>
              <p>Shop Now</p>
            </div>
            <div className={styles.slideImg}>
              <img src={applePhone} alt="phone" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
