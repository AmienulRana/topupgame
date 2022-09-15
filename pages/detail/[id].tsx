import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import TopUpForm from "../../components/organism/DetailPage/TopUpForm";
import TopUpItem from "../../components/organism/DetailPage/TopUpItem";
import Footer from "../../components/organism/Footer";
import Navbar from "../../components/organism/Navbar";
import { GameItemTypes, NominalsTypes, PaymentTypes } from "../../datatypes";
import { getFeaturedGame, getVoucherGameDetail } from "../../services/player";

interface DetailProps {
  detailVoucher: GameItemTypes;
  nominals: NominalsTypes[];
  payment: PaymentTypes[];
}
export default function Detail({
  detailVoucher,
  nominals,
  payment,
}: DetailProps) {
  useEffect(() => {
    localStorage.setItem("data-item", JSON.stringify(detailVoucher));
  }, []);
  return (
    <>
      <Navbar />
      <section className="detail pt-lg-60 pb-50">
        <div className="container-xxl container-fluid">
          <div className="detail-header pb-50">
            <h2 className="text-4xl fw-bold color-palette-1 text-start mb-10">
              Top Up
            </h2>
            <p className="text-lg color-palette-1 mb-0">
              Perkuat akun dan jadilah pemenang
            </p>
          </div>
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 pb-30 pb-md-0 pe-md-25 text-md-start">
              <TopUpItem type="mobile" data={detailVoucher} />
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 ps-md-25">
              <TopUpItem type="desktop" data={detailVoucher} />
              <hr />
              <TopUpForm nominals={nominals} payments={payment} />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const data = await getFeaturedGame();
  const paths = data.map((item: GameItemTypes) => ({
    params: {
      id: item._id,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

interface GetStaticProps {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params }: GetStaticProps) {
  const { id } = params;
  const data = await getVoucherGameDetail(id);
  const detailVoucher = {
    _id: data?.voucher?._id,
    name: data?.voucher?.name,
    thumbnail: data?.voucher?.thumbnail,
    category: { name: data?.voucher?.category?.name },
  };
  return {
    props: {
      detailVoucher,
      nominals: data?.voucher?.nominals,
      payment: data?.payment,
    },
  };
}
