import React from 'react'
import styles from './about.module.css'

//img
import aboutFirst from '../../assets/about/aboutFirst.svg'
import service1 from '../../assets/about/Services.svg'
import service2 from '../../assets/about/Services 1.svg'
import service3 from '../../assets/about/Services 2.svg'
import service4 from '../../assets/about/Services 3.svg'

import Tom from '../../assets/about/tomCruise.svg'
import Emma from '../../assets/about/emmaWatson.svg'
import Will from '../../assets/about/willSmith.svg'

import delivery from '../../assets/about/deliveryIcon.svg'
import callCenter from '../../assets/about/callCenterIcon.svg'
import guarantee from '../../assets/about/guarantee.svg'


import Progress from '../../components/AboutComponents/progress/Progress'
import FounderCard from '../../components/AboutComponents/founderCart/FounderCard'
import { useTranslation } from 'react-i18next'

const About = () => {
    //translation
    const { t, i18n } = useTranslation()

    return (
        <>
            <div className={styles.container}>
                <p><span>Home / </span>About</p>
                <div className={styles.story}>
                    <div className={styles.storyInfo}>
                        <h1 style={{ marginBottom: 40 }}>{t("Our Story")}</h1>
                        <p style={{ marginBottom: 24 }}>{t("Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.")}
                        </p>
                        <p>{t("Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.")}</p>
                    </div>
                    <div className={styles.storyImg}>
                        <img src={aboutFirst} alt="" />
                    </div>
                </div>
                <div className={styles.progBlock}>
                    <Progress
                        border={'1px solid #000'}
                        img={service1}
                        amount={'10.5k '}
                        desc={t('Sallers active our site')}
                    />
                    <Progress
                        background={'#DB4444'}
                        color={'#FFFFFF'}
                        img={service2}
                        amount={'10.5k '}
                        desc={t('Sallers active our site')}
                    />
                    <Progress
                        border={'1px solid #000'}
                        img={service3}
                        amount={'10.5k '}
                        desc={t('Sallers active our site')}
                    />
                    <Progress
                        border={'1px solid #000'}
                        img={service4}
                        amount={'10.5k '}
                        desc={t('Sallers active our site')}
                    />
                </div>
                <div className={styles.founderBlock}>
                    <FounderCard
                        img={Tom}
                        name={'Tom Cruise'}
                        job={t('Founder & Chairman')}
                    />
                    <FounderCard
                        img={Emma}
                        name={'Tom Cruise'}
                        job={t('Founder & Chairman')}
                    />
                    <FounderCard
                        img={Will}
                        name={'Tom Cruise'}
                        job={t('Founder & Chairman')}
                    />
                </div>
                <div className={styles.founderBlock}>
                    <Progress
                        fontSize={'20px'}
                        img={delivery}
                        amount={t('FREE AND FAST DELIVERY')}
                        desc={t('Free delivery for all  over $140')}
                    />
                    <Progress
                        fontSize={'20px'}
                        img={callCenter}
                        amount={t('24/7 CUSTOMER SERVICE')}
                        desc={'Friendly 24/7 customer support'}
                    />
                    <Progress
                        fontSize={'20px'}
                        img={guarantee}
                        amount={t('MONEY BACK GUARANTEE')}
                        desc={t('We reurn money within 30 days')}
                    />
                </div>
            </div>
        </>
    )
}

export default About