/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useMemo, useEffect } from "react";
import { DefaultPageProps } from "@interfaces/page";
import get from "lodash/get";
import Image from "next/future/image";
import RadioButtonUnchecked from "@components/molecules/RadioButtonUnchecked";
import RadioButtonChecked from "@components/molecules/RadioButtonChecked";
import Date from "@components/molecules/Date";
import Video from "@components/molecules/Video";
import Arrow from "@components/molecules/Arrow";
import VariantContainedSizeLargeIconLeftFalseIconRightFalse from "@components/molecules/VariantContainedSizeLargeIconLeftFalseIconRightFalse";
import assets from "@assets/index";
import { Page, Box, Text } from "@jitera/jitera-web-ui-library";
import styles from "./styles.module.css";
type HomepagePageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};
function HomepagePage(props: HomepagePageProps): JSX.Element {
  return (
    <Page className={styles.page_container}>
      <Box className={styles.hero_section62}>
        <Box className={styles.top_header21}>
          <Box className={styles.top_container21}>
            <Box className={styles.fickleflight_logo9}>
              <Box className={styles.symbols9}>
                <Box className={styles.webscreen9}>
                  <Box className={styles.group9}>
                    <Image
                      src={assets("1686621805510png")}
                      alt={""}
                      className={styles.image9}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={styles.navigationright21}>
              <Box className={styles.navigation_menu15}>
                <Text className={styles.text12} textType="Text">
                  Explore
                </Text>
                <Text className={styles.text13} textType="Text">
                  Search
                </Text>
                <Text className={styles.text14} textType="Text">
                  Hotels
                </Text>
                <Text className={styles.text15} textType="Text">
                  Offers
                </Text>
              </Box>
              <Box className={styles.accountsection21}>
                <Box className={styles.notificationbell20}>
                  <Image
                    src={assets("1686621805540svg")}
                    alt={""}
                    className={styles.image18}
                  />
                  <Image
                    src={assets("1686621805542svg")}
                    alt={""}
                    className={styles.image19}
                  />
                  <Box className={styles.ellipse5320} />
                </Box>
                <Image
                  src={assets("1686621805544png")}
                  alt={""}
                  className={styles.image21}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.search_section62}>
          <Image
            src={assets("1686621805569png")}
            alt={""}
            className={styles.image23}
          />
          <Image
            src={assets("1686621806021png")}
            alt={""}
            className={styles.image24}
          />
          <Box className={styles.search_container62}>
            <Box className={styles.title28}>
              <Text className={styles.text27} textType="Text">
                Let’s explore & travel the world
              </Text>
              <Text className={styles.text28} textType="Text">
                Find the best destinations and the most popular stays!
              </Text>
            </Box>
            <Box className={styles.search_form62}>
              <Box className={styles.form_title_group39}>
                <Text className={styles.text31} textType="Text">
                  Search flights
                </Text>
                <Box className={styles.flightoptions39}>
                  <Box className={styles.flighttype39}>
                    <Box className={styles.radio36}>
                      <Box className={styles.padding35}>
                        <RadioButtonUnchecked
                          className={styles.radio_button_unchecked1}
                        />
                      </Box>
                      <Text className={styles.text36} textType="Text">
                        Return
                      </Text>
                    </Box>
                    <Box className={styles.radio39}>
                      <Box className={styles.padding38}>
                        <RadioButtonChecked
                          className={styles.radio_button_checked1}
                        />
                      </Box>
                      <Text className={styles.text39} textType="Text">
                        One-way
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className={styles.form_inputs_row62}>
                <Box className={styles.inputs_row59}>
                  <Box className={styles.departure_field47}>
                    <Box className={styles.input47}>
                      <Box className={styles.label_container45}>
                        <Text className={styles.text45} textType="Text">
                          Departure
                        </Text>
                      </Box>
                      <Box className={styles.active47}>
                        <Text className={styles.text47} textType="Text">
                          Singapore (SIN)
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={styles.arrival_field53}>
                    <Box className={styles.input53}>
                      <Box className={styles.label_container51}>
                        <Text className={styles.text51} textType="Text">
                          Arrival
                        </Text>
                      </Box>
                      <Box className={styles.active53}>
                        <Text className={styles.text53} textType="Text">
                          Los Angeles (LA)
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                  <Box className={styles.select_outlined59}>
                    <Box className={styles.input59}>
                      <Box className={styles.label_container57}>
                        <Text className={styles.text57} textType="Text">
                          Date
                        </Text>
                      </Box>
                      <Box className={styles.active59}>
                        <Text className={styles.text59} textType="Text">
                          01/05/2022
                        </Text>
                        <Date className={styles.date1} />
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box className={styles.button_group62}>
                  <Box className={styles.search_flights_button62}>
                    <Text className={styles.text62} textType="Text">
                      Search flights
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.home_contents268}>
        <Box className={styles.upcoming_flight_section117}>
          <Box className={styles.upcoming_flight_section117}>
            <Text className={styles.text66} textType="Text">
              Recent Searches
            </Text>
            <Box className={styles.flight_details117}>
              <Box className={styles.recent_searches96}>
                <Box className={styles.flight_main_container82}>
                  <Box className={styles.toand_from81}>
                    <Box className={styles.from_details72}>
                      <Text className={styles.text72} textType="Text">
                        SIN
                      </Text>
                    </Box>
                    <Box className={styles.duration79}>
                      <Box className={styles.flighticons79}>
                        <Box className={styles.line275} />
                        <Box className={styles.ionairplane77}>
                          <Image
                            src={assets("1686621806314svg")}
                            alt={""}
                            className={styles.image77}
                          />
                        </Box>
                        <Box className={styles.ellipse1878} />
                        <Box className={styles.ellipse1979} />
                      </Box>
                    </Box>
                    <Box className={styles.to_details81}>
                      <Text className={styles.text81} textType="Text">
                        LAX
                      </Text>
                    </Box>
                  </Box>
                  <Text className={styles.text82} textType="Text">
                    Depart on: 7 Sep 2021
                  </Text>
                </Box>
                <Box className={styles.flight_main_container96}>
                  <Box className={styles.toand_from95}>
                    <Box className={styles.from_details86}>
                      <Text className={styles.text86} textType="Text">
                        MY
                      </Text>
                    </Box>
                    <Box className={styles.duration93}>
                      <Box className={styles.flighticons93}>
                        <Box className={styles.line289} />
                        <Box className={styles.ionairplane91}>
                          <Image
                            src={assets("1686621806322svg")}
                            alt={""}
                            className={styles.image91}
                          />
                        </Box>
                        <Box className={styles.ellipse1892} />
                        <Box className={styles.ellipse1993} />
                      </Box>
                    </Box>
                    <Box className={styles.to_details95}>
                      <Text className={styles.text95} textType="Text">
                        DUB
                      </Text>
                    </Box>
                  </Box>
                  <Text className={styles.text96} textType="Text">
                    Depart on: 9 Sep 2021
                  </Text>
                </Box>
              </Box>
              <Box className={styles.prepare_menu117}>
                <Text className={styles.text98} textType="Text">
                  Prepare for your trip
                </Text>
                <Box className={styles.trip_menus117}>
                  <Box className={styles.hotel102}>
                    <Image
                      src={assets("1686621806329svg")}
                      alt={""}
                      className={styles.image101}
                    />
                    <Text className={styles.text102} textType="Text">
                      Hotel
                    </Text>
                  </Box>
                  <Box className={styles.attractions105}>
                    <Image
                      src={assets("1686621806331svg")}
                      alt={""}
                      className={styles.image104}
                    />
                    <Text className={styles.text105} textType="Text">
                      Attractions
                    </Text>
                  </Box>
                  <Box className={styles.eats108}>
                    <Image
                      src={assets("1686621806334svg")}
                      alt={""}
                      className={styles.image107}
                    />
                    <Text className={styles.text108} textType="Text">
                      Eats
                    </Text>
                  </Box>
                  <Box className={styles.commute111}>
                    <Image
                      src={assets("1686621806337svg")}
                      alt={""}
                      className={styles.image110}
                    />
                    <Text className={styles.text111} textType="Text">
                      Commute
                    </Text>
                  </Box>
                  <Box className={styles.taxi114}>
                    <Image
                      src={assets("1686621806341svg")}
                      alt={""}
                      className={styles.image113}
                    />
                    <Text className={styles.text114} textType="Text">
                      Taxi
                    </Text>
                  </Box>
                  <Box className={styles.movies117}>
                    <Image
                      src={assets("1686621806343svg")}
                      alt={""}
                      className={styles.image116}
                    />
                    <Text className={styles.text117} textType="Text">
                      Movies
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.pop_destinations_main159}>
          <Box className={styles.destinations_titles126}>
            <Box className={styles.titlecontainer122}>
              <Text className={styles.text121} textType="Text">
                Plan your next trip
              </Text>
              <Text className={styles.text122} textType="Text">
                Most Popular Destinations
              </Text>
            </Box>
            <Box className={styles.viewalltop126}>
              <Text className={styles.text124} textType="Text">
                View all destinations
              </Text>
              <Box className={styles.arrowright126}>
                <Image
                  src={assets("1686621806350svg")}
                  alt={""}
                  className={styles.image126}
                />
              </Box>
            </Box>
          </Box>
          <Box className={styles.cards_container159}>
            <Box className={styles.col1135}>
              <Box className={styles.paris_card135}>
                <Image
                  src={assets("1686621806353png")}
                  alt={""}
                  className={styles.image130}
                />
                <Box className={styles.destination_details135}>
                  <Text className={styles.text132} textType="Text">
                    Paris
                  </Text>
                  <Box className={styles.details135}>
                    <Text className={styles.text134} textType="Text">
                      $699
                    </Text>
                    <Text className={styles.text135} textType="Text">
                      from
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={styles.col2143}>
              <Box className={styles.greece_card143}>
                <Image
                  src={assets("1686621806424png")}
                  alt={""}
                  className={styles.image138}
                />
                <Box className={styles.destination_details143}>
                  <Text className={styles.text140} textType="Text">
                    Greece
                  </Text>
                  <Box className={styles.details143}>
                    <Text className={styles.text142} textType="Text">
                      $1079
                    </Text>
                    <Text className={styles.text143} textType="Text">
                      from
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={styles.col3151}>
              <Box className={styles.norway_card151}>
                <Image
                  src={assets("1686621806490png")}
                  alt={""}
                  className={styles.image146}
                />
                <Box className={styles.destination_details151}>
                  <Text className={styles.text148} textType="Text">
                    Norway
                  </Text>
                  <Box className={styles.details151}>
                    <Text className={styles.text150} textType="Text">
                      $895
                    </Text>
                    <Text className={styles.text151} textType="Text">
                      from
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={styles.col4159}>
              <Box className={styles.tuscany_card159}>
                <Image
                  src={assets("1686621806559png")}
                  alt={""}
                  className={styles.image154}
                />
                <Box className={styles.destination_details159}>
                  <Text className={styles.text156} textType="Text">
                    Tuscany
                  </Text>
                  <Box className={styles.details159}>
                    <Text className={styles.text158} textType="Text">
                      $1245
                    </Text>
                    <Text className={styles.text159} textType="Text">
                      from
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.recommended_holidays_container199}>
          <Box className={styles.rectitle166}>
            <Text className={styles.text162} textType="Text">
              Recommended Holidays
            </Text>
            <Box className={styles.frame701166}>
              <Text className={styles.text164} textType="Text">
                View all holidays
              </Text>
              <Box className={styles.arrowright166}>
                <Image
                  src={assets("1686621806621svg")}
                  alt={""}
                  className={styles.image166}
                />
              </Box>
            </Box>
          </Box>
          <Box className={styles.reccardscontainer199}>
            <Box className={styles.reccard1175}>
              <Image
                src={assets("1686621806624png")}
                alt={""}
                className={styles.image169}
              />
              <Box className={styles.holidaydetails175}>
                <Box className={styles.frame685175}>
                  <Box className={styles.frame684174}>
                    <Text className={styles.text173} textType="Text">
                      Bali
                    </Text>
                    <Text className={styles.text174} textType="Text">
                      4D3N
                    </Text>
                  </Box>
                  <Text className={styles.text175} textType="Text">
                    $899
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className={styles.reccard2183}>
              <Image
                src={assets("1686621806703png")}
                alt={""}
                className={styles.image177}
              />
              <Box className={styles.holidaydetails183}>
                <Box className={styles.card_info183}>
                  <Box className={styles.frame684182}>
                    <Text className={styles.text181} textType="Text">
                      Swiss
                    </Text>
                    <Text className={styles.text182} textType="Text">
                      6D5N
                    </Text>
                  </Box>
                  <Text className={styles.text183} textType="Text">
                    $900
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className={styles.reccard3191}>
              <Image
                src={assets("1686621806779png")}
                alt={""}
                className={styles.image185}
              />
              <Box className={styles.holidaydetails191}>
                <Box className={styles.card_info191}>
                  <Box className={styles.details190}>
                    <Text className={styles.text189} textType="Text">
                      Boracay
                    </Text>
                    <Text className={styles.text190} textType="Text">
                      5D4N
                    </Text>
                  </Box>
                  <Text className={styles.text191} textType="Text">
                    $699
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className={styles.reccard4199}>
              <Image
                src={assets("1686621806872png")}
                alt={""}
                className={styles.image193}
              />
              <Box className={styles.holidaydetails199}>
                <Box className={styles.card_info199}>
                  <Box className={styles.details198}>
                    <Text className={styles.text197} textType="Text">
                      Palawan
                    </Text>
                    <Text className={styles.text198} textType="Text">
                      4D3N
                    </Text>
                  </Box>
                  <Text className={styles.text199} textType="Text">
                    $789
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.popular_stays268}>
          <Box className={styles.popular_stays_header207}>
            <Box className={styles.popular_stays_title203}>
              <Text className={styles.text203} textType="Text">
                Popular Stays
              </Text>
            </Box>
            <Box className={styles.viewallstaysbutton207}>
              <Text className={styles.text205} textType="Text">
                View all stays
              </Text>
              <Box className={styles.arrowright207}>
                <Image
                  src={assets("1686621806944svg")}
                  alt={""}
                  className={styles.image207}
                />
              </Box>
            </Box>
          </Box>
          <Box className={styles.hotel_cards268}>
            <Box className={styles.hotel_card1223}>
              <Box className={styles.hotel_card223}>
                <Image
                  src={assets("1686621806947png")}
                  alt={""}
                  className={styles.image211}
                />
                <Box className={styles.stay_details216}>
                  <Box className={styles.stay_detailsrows216}>
                    <Text className={styles.text214} textType="Text">
                      Entire bungalow
                    </Text>
                    <Text className={styles.text215} textType="Text">
                      Matterhorn Suites
                    </Text>
                    <Text className={styles.text216} textType="Text">
                      $575/night
                    </Text>
                  </Box>
                  <Video className={styles.video1} />
                </Box>
                <Box className={styles.rating221}>
                  <Text className={styles.text218} textType="Text">
                    (60 reviews)
                  </Text>
                  <Box className={styles.group49221}>
                    <Text className={styles.text220} textType="Text">
                      4.9
                    </Text>
                    <Image
                      src={assets("1686621807020svg")}
                      alt={""}
                      className={styles.image221}
                    />
                  </Box>
                </Box>
                <Box className={styles.more_details_button223}>
                  <Text className={styles.text223} textType="Text">
                    More details
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className={styles.hotel_card2238}>
              <Box className={styles.hotel_card238}>
                <Image
                  src={assets("1686621807026png")}
                  alt={""}
                  className={styles.image226}
                />
                <Box className={styles.stay_details231}>
                  <Box className={styles.stay_detailsrows231}>
                    <Text className={styles.text229} textType="Text">
                      2-Story beachfront suite
                    </Text>
                    <Text className={styles.text230} textType="Text">
                      Discovery Shores
                    </Text>
                    <Text className={styles.text231} textType="Text">
                      $360/night
                    </Text>
                  </Box>
                  <Video className={styles.video2} />
                </Box>
                <Box className={styles.rating236}>
                  <Text className={styles.text233} textType="Text">
                    (116 reviews)
                  </Text>
                  <Box className={styles.group49236}>
                    <Text className={styles.text235} textType="Text">
                      4.8
                    </Text>
                    <Image
                      src={assets("1686621807091svg")}
                      alt={""}
                      className={styles.image236}
                    />
                  </Box>
                </Box>
                <Box className={styles.more_details_button238}>
                  <Text className={styles.text238} textType="Text">
                    More details
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className={styles.hotel_card3253}>
              <Box className={styles.hotel_card253}>
                <Image
                  src={assets("1686621807096png")}
                  alt={""}
                  className={styles.image241}
                />
                <Box className={styles.stay_details246}>
                  <Box className={styles.stay_detailsrows246}>
                    <Text className={styles.text244} textType="Text">
                      Single deluxe hut
                    </Text>
                    <Text className={styles.text245} textType="Text">
                      Arctic Hut{" "}
                    </Text>
                    <Text className={styles.text246} textType="Text">
                      $420/night
                    </Text>
                  </Box>
                  <Video className={styles.video3} />
                </Box>
                <Box className={styles.rating251}>
                  <Text className={styles.text248} textType="Text">
                    (78 reviews)
                  </Text>
                  <Box className={styles.group49251}>
                    <Text className={styles.text250} textType="Text">
                      4.7
                    </Text>
                    <Image
                      src={assets("1686621807176svg")}
                      alt={""}
                      className={styles.image251}
                    />
                  </Box>
                </Box>
                <Box className={styles.more_details_button253}>
                  <Text className={styles.text253} textType="Text">
                    More details
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box className={styles.hotel_card4268}>
              <Box className={styles.hotel_card268}>
                <Image
                  src={assets("1686621807182png")}
                  alt={""}
                  className={styles.image256}
                />
                <Box className={styles.stay_details261}>
                  <Box className={styles.stay_detailsrows261}>
                    <Text className={styles.text259} textType="Text">
                      Deluxe King Room
                    </Text>
                    <Text className={styles.text260} textType="Text">
                      Lake Louise Inn
                    </Text>
                    <Text className={styles.text261} textType="Text">
                      $244/night
                    </Text>
                  </Box>
                  <Video className={styles.video4} />
                </Box>
                <Box className={styles.rating266}>
                  <Text className={styles.text263} textType="Text">
                    (63 reviews)
                  </Text>
                  <Box className={styles.group49266}>
                    <Text className={styles.text265} textType="Text">
                      4.6
                    </Text>
                    <Image
                      src={assets("1686621807250svg")}
                      alt={""}
                      className={styles.image266}
                    />
                  </Box>
                </Box>
                <Box className={styles.more_details_button268}>
                  <Text className={styles.text268} textType="Text">
                    More details
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={styles.footer_section320}>
        <Box className={styles.subscribe_section288}>
          <Image
            src={assets("1686621807256png")}
            alt={""}
            className={styles.image271}
          />
          <Box className={styles.shareyourtravelsform288}>
            <Box className={styles.form_header275}>
              <Text className={styles.text274} textType="Text">
                subscribe to our newsletter
              </Text>
              <Text className={styles.text275} textType="Text">
                Get weekly updates
              </Text>
            </Box>
            <Box className={styles.form288}>
              <Box className={styles.form_text278}>
                <Text className={styles.text278} textType="Text">
                  Fill in your details to join the party!
                </Text>
              </Box>
              <Box className={styles.form_fields287}>
                <Box className={styles.destination_name_input283}>
                  <Box className={styles.input283}>
                    <Box className={styles.inactive283}>
                      <Text className={styles.text283} textType="Text">
                        Your name
                      </Text>
                      <Arrow className={styles.arrow1} />
                    </Box>
                  </Box>
                </Box>
                <Box className={styles.name_input287}>
                  <Box className={styles.input287}>
                    <Box className={styles.inactive287}>
                      <Text className={styles.text287} textType="Text">
                        Email address
                      </Text>
                      <Arrow className={styles.arrow2} />
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box className={styles.button288}>
                <VariantContainedSizeLargeIconLeftFalseIconRightFalse
                  className={styles.unstyled_button1}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.footer320}>
          <Box className={styles.fickle_flight_bio300}>
            <Box className={styles.logo292}>
              <Image
                src={assets("1686621807404svg")}
                alt={""}
                className={styles.image292}
              />
            </Box>
            <Text className={styles.text293} textType="Text">
              Fickle Flight is your one-stop travel portal. We offer hassle free
              flight and hotel bookings. We also have all your flight needs in
              you online shop.
            </Text>
            <Box className={styles.social_icons300}>
              <Box className={styles.entyposocialfacebookwithcircle296}>
                <Image
                  src={assets("1686621807407svg")}
                  alt={""}
                  className={styles.image296}
                />
              </Box>
              <Box className={styles.entyposocialtwitterwithcircle298}>
                <Image
                  src={assets("1686621807409svg")}
                  alt={""}
                  className={styles.image298}
                />
              </Box>
              <Box className={styles.entyposocialinstagramwithcircle300}>
                <Image
                  src={assets("1686621807413svg")}
                  alt={""}
                  className={styles.image300}
                />
              </Box>
            </Box>
          </Box>
          <Box className={styles.line4301} />
          <Box className={styles.footer_links320}>
            <Box className={styles.company308}>
              <Text className={styles.text304} textType="Text">
                About Us
              </Text>
              <Text className={styles.text305} textType="Text">
                Company
              </Text>
              <Text className={styles.text306} textType="Text">
                News
              </Text>
              <Text className={styles.text307} textType="Text">
                Careers
              </Text>
              <Text className={styles.text308} textType="Text">
                How we work
              </Text>
            </Box>
            <Box className={styles.support314}>
              <Text className={styles.text310} textType="Text">
                Account
              </Text>
              <Text className={styles.text311} textType="Text">
                Support
              </Text>
              <Text className={styles.text312} textType="Text">
                Support Center
              </Text>
              <Text className={styles.text313} textType="Text">
                FAQ
              </Text>
              <Text className={styles.text314} textType="Text">
                Accessibility
              </Text>
            </Box>
            <Box className={styles.more320}>
              <Text className={styles.text316} textType="Text">
                Covid Advisory
              </Text>
              <Text className={styles.text317} textType="Text">
                More
              </Text>
              <Text className={styles.text318} textType="Text">
                Airline Fees
              </Text>
              <Text className={styles.text319} textType="Text">
                Tips
              </Text>
              <Text className={styles.text320} textType="Text">
                Quarantine Rules
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Page>
  );
}
export default HomepagePage;
