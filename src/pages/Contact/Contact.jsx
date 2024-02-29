import React from 'react'
import styles from './contact.module.css'

// img 
import phoneIcon from '../../assets/Contacts/phoneIcon.svg'
import mailIcon from '../../assets/Contacts/mailIcon.svg'

//mui
import { Button, } from "@mui/material";
import { useTranslation } from 'react-i18next';

const Contact = () => {
    // translation 
    const { t, i18n } = useTranslation()

    return (
        <>
            <div className={styles.container}>
                <p><span>Home /</span>Cantact</p>
                <div className={styles.forms}>
                    <div className={styles.callAndMail}>
                        <div className="">
                            <div className={styles.iconWithText}>
                                <img src={phoneIcon} />
                                <p>{t("Call To Us")}</p>
                            </div>
                            <p style={{ marginBottom: 12 }}>{t("We are available 24/7, 7 days a week.")}</p>
                            <p>{t("Phone: +8801611112222")}</p>
                        </div>
                        <hr />
                        <div className="">
                            <div className={styles.iconWithText}>
                                <img src={mailIcon} />
                                <p>{t("Write To US")}</p>
                            </div>
                            <p style={{ marginBottom: 12 }}>{t("Fill out our form and we will contact you within 24 hours.")}</p>
                            <p style={{ marginBottom: 12 }}>Emails: customer@exclusive.com</p>
                            <p>Emails: support@exclusive.com</p>
                        </div>
                    </div>
                    <div className={styles.formInputs}>
                        <div className={styles.inputs}>
                            <input type="text" placeholder='Name' />
                            <input type="email" placeholder='Email' />
                            <input type="phone" placeholder='Phone' />
                        </div>
                        <div className={styles.formTextArea}>
                            <textarea name="" id="" cols="30" rows="13">
                            </textarea>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right' }}>
                            <Button
                                sx={{ height: "46px", width: "190px" }}
                                color="error"
                                variant="contained"
                            >
                                {t("SEND MESSAGE")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact