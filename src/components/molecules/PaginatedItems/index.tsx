/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultPageProps } from "@interfaces/page";
import { List } from "@jitera/jitera-web-ui-library";
import React, { useCallback, useMemo, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import styles from "./styles.module.css";
import CardItem from "@components/molecules/CardItem";
import dateFormat, { masks } from "dateformat";
type HomePageProps = DefaultPageProps & {
  pageName?: string;
  className?: string;
};

function PaginatedItems({
  handleOnPressList1Item,
  getApiPartiesResult,
  test,
  itemsPerPage,
}) {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = test?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(test?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % test?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {/* <Items currentItems={currentItems} /> */}

      <List
        className={styles.ListAll}
        dataSource={currentItems}
        rowKey={useCallback(
          (item: Record<string, any>) => `${item.id}_${item.created_at}`,
          []
        )}
        grid={{ gutter: 0, xs: 3, md: 3, xl: 3, xxl: 4 }}
        renderItem={useCallback(
          (item: any) => (
            <CardItem
              className={styles.test}
              nameParty={item.nameparty}
              partystarttime={dateFormat(
                item.partystarttime,
                "paddedShortDate"
              )}
              partyLocation={item.partylocation}
              decribe={item.describe}
              // img={item.describe}
              img={item.img}
              label={"Booking"}
              onPress={handleOnPressList1Item}
              Id={item.id}
            />
          ),
          [getApiPartiesResult]
        )}
      />
      <ReactPaginate
        className={styles.Paginate}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}
export default PaginatedItems;
