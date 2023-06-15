/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from 'react';
import { DefaultPageProps } from "@interfaces/page";
import get from 'lodash/get';
import Image from 'next/future/image'
import { useTranslation } from 'next-i18next'
import {Box,
Row,
Col,
Text,
Button} from '@jitera/jitera-web-ui-library'
import styles from './styles.module.css';
type DetailBookingPartyMoleculeProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
  nameParty?: string
partyStartTime?: string
partyLocation?: string
numberOfPeople?: number
describe?: string
img?: string}
function DetailBookingPartyMolecule (props: DetailBookingPartyMoleculeProps): JSX.Element {
  const { t } = useTranslation('web')
  
  
  
  return (
<Box className={`${styles.page_container} ${get(props, 'className')}`} ><Image src={get(props, 'img')} width={''100%''} height={''100%''} alt={''} className={styles.image3} /><Row align='top' gutter={[32, 32]} justify='start' className={styles.row_1} ><Col md={Number(12)} xl={Number(8)} xs={Number(24)} ><Box className={styles.images4} ><Image src={get(props, 'img')} width={''360px''} height={''380px''} alt={''} className={styles.image4} /></Box></Col><Col md={Number(12)} xl={Number(15)} xs={Number(24)} ><Box className={styles.content8} ><Box className={styles.text8} ><Text className={styles.text7} textType='Text' >{get(props, 'nameParty')}</Text><Box className={styles.box_4} ><Text className={styles.text_7} textType='Text' >{t('detail_booking_party.text_7')}</Text><Text className={styles.text_8} textType='Text' >{get(props, 'nameParty')}</Text></Box><Box className={styles.box_5} ><Text className={styles.text8} textType='Text' >{t('detail_booking_party.text8')}</Text><Text className={styles.text_9} textType='Text' >{get(props, 'partyStartTime')}</Text></Box><Box className={styles.box_6} ><Text className={styles.text_5} textType='Text' >{t('detail_booking_party.text_5')}</Text><Text className={styles.text_10} textType='Text' >[Text]</Text></Box><Box className={styles.box_7} ><Text className={styles.text_6} textType='Text' >{t('detail_booking_party.text_6')}</Text><Text className={styles.text_11} textType='Text' >[Text]</Text></Box></Box><Box className={styles.box_8} ><Button buttonType='primary' className={styles.button_1} ><Text className={styles.button_1_text_0} textType='Text' >{t('detail_booking_party.button_1_text_0')}</Text></Button><Button buttonType='primary' className={styles.button_2} ><Text className={styles.button_2_text_0} textType='Text' >{t('detail_booking_party.button_2_text_0')}</Text></Button></Box></Box></Col></Row></Box>  );
}
export default DetailBookingPartyMolecule;
