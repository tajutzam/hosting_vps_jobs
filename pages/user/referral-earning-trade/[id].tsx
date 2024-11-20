import type { GetServerSideProps, NextPage } from "next";
import ReportSidebar from "layout/report-sidebar";
import React, { useState } from "react";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import {
  ReferralHistoryAction,
  handleSearchItems,
} from "state/actions/reports";
import SectionLoading from "components/common/SectionLoading";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { formatCurrency } from "common";
import Footer from "components/common/footer";
import { customPage, landingPage } from "service/landing-page";
import { useRouter } from "next/router";
import CustomDataTable from "components/Datatable";
import ReportOverviewHeader from "components/reports/ReportOverviewHeader";
import PlaceBottomRight from "components/gradient/placeBottomRight";
import PlaceTopLeft from "components/gradient/placeTopLeft";
import ReportLayout from "components/reports/ReportLayout";
import ReactDataTable from "components/ReactDataTable";
import CustomPagination from "components/Pagination/CustomPagination";

const ReferralEarningTrade: NextPage = () => {
  type searchType = string;
  const { t } = useTranslation("common");
  const [search, setSearch] = useState<searchType>("");
  const router = useRouter();
  const [sortingInfo, setSortingInfo] = useState<any>({
    column_name: "created_at",
    order_by: "desc",
  });
  const { settings } = useSelector((state: RootState) => state.common);
  const [selectedLimit, setSelectedLimit] = useState<any>("10");

  const [processing, setProcessing] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([]);
  const [stillHistory, setStillHistory] = useState<any>([]);

  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    ReferralHistoryAction(
      selectedLimit,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      router.query.id,
      search
    );
  };
  const getReport = async () => {
    ReferralHistoryAction(
      selectedLimit,
      1,
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      router.query.id,
      search
    );
  };
  const columns = [
    {
      Header: t("Referral user email"),
      accessor: "referral_user_email",
    },
    {
      Header: t("Transaction id"),
      accessor: "transaction_id",
    },
    {
      Header: t("Amount"),
      Cell: ({ row }: any) =>
        `${row?.original?.amount} ${row?.original?.coin_type}`,
    },
    {
      Header: t("Date"),
      accessor: "created_at",
      Cell: ({ cell }: any) => moment(cell.value).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  React.useEffect(() => {
    getReport();
    return () => {
      setHistory([]);
    };
  }, [selectedLimit, search]);

  const handlePagination = (event: any) => {
    ReferralHistoryAction(
      selectedLimit,
      event + 1,
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      router.query.id,
      search
    );
  };
  return (
    <>
      <ReportLayout>
        <div className="tradex-bg-background-main tradex-rounded-lg tradex-border tradex-border-background-primary tradex-shadow-[2px_2px_23px_0px_#6C6C6C0D] tradex-px-4 tradex-pt-6 tradex-pb-12 tradex-space-y-6">
          <div className=" tradex-pb-4 tradex-border-b tradex-border-background-primary tradex-space-y-4">
            <h2 className=" tradex-text-[32px] tradex-leading-[38px] md:tradex-text-[40px] md:tradex-leading-[48px] tradex-font-bold !tradex-text-title">
              {t("Referral earning trade")}
            </h2>
            <div className=" tradex-flex tradex-flex-col md:tradex-flex-row tradex-gap-4  tradex-justify-between md:tradex-items-end">
              <div>
                <label className="!tradex-mb-0 tradex-text-base tradex-leading-6 tradex-font-semibold ">
                  {t("Show")}
                  <select
                    className=" tradex-ml-4 !tradex-bg-transparent tradex-py-2.5 tradex-px-5 tradex-border !tradex-border-background-primary tradex-rounded tradex-text-sm tradex-leading-5 tradex-text-title"
                    placeholder="10"
                    onChange={(e) => {
                      setSelectedLimit(e.target.value);
                    }}
                    value={selectedLimit}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </label>
              </div>

              <div>
                <label className=" !tradex-mb-0 tradex-flex tradex-items-center tradex-text-xl tradex-leading-6 tradex-font-semibold ">
                  <input
                    type="search"
                    aria-controls="table"
                    className=" !tradex-bg-transparent md:tradex-ml-4 tradex-py-2.5 tradex-px-3 tradex-border !tradex-border-background-primary tradex-rounded tradex-text-sm tradex-leading-5"
                    value={search || ""}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className=" tradex-space-y-6">
            <ReactDataTable
              columns={columns}
              data={history || []}
              processing={processing}
              isSearchable={false}
              isSortEnable={false}
            />

            {history?.length > 0 && (
              <CustomPagination
                per_page={stillHistory?.per_page}
                current_page={stillHistory?.current_page}
                total={stillHistory?.total}
                handlePageClick={handlePagination}
              />
            )}
          </div>
        </div>
      </ReportLayout>

      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/buy-order-history");
  return {
    props: {},
  };
};

export default ReferralEarningTrade;
