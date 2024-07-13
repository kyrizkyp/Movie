"use client";

import React, { useEffect, useState } from "react";
import { getTvShowDetail } from "@/app/data/DataApi";
import Link from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import DetailAktor from "./DetailAktor";

interface TvShowDetailProps {
  detailId: string;
}

const DetailTvShow: React.FC<TvShowDetailProps> = ({ detailId }) => {
  const [show, setShow] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTvShowDetail(detailId);
      setShow(data);
    };

    fetchData();
  }, [detailId]);

  if (!show) {
    return <div className="text-white">Loading...</div>;
  }

  const renderStars = (rating: number) => {
    const numStars = Math.round(rating / 2);
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <IconStarFilled key={i} className="text-yellow-500" size={16} />
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="my-6 self-start mx-4 xl:mx-6 2xl:mx-60">
        <Link href="/" className="px-6 py-2 bg-black text-white font-bold">
          BACK
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="w-80 h-auto"
            />
          </div>

          <div className="flex flex-col items-center md:items-start justify-center p-0 md:p-4 text-white">
            <div className="py-6 px-4">
              <h1 className="text-3xl font-bold">{show.name}</h1>
            </div>

            <div className="max-w-xl pb-6 px-4">
              <p className="text-sm text-center md:text-left">
                {show.overview}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center p-4">
              <div className="flex items-center gap-2 md:gap-6 p-2">
                <p className="text-sm">Production</p>
                <p className="text-xs md:max-w-[200px]">
                  {show.production_companies
                    .map((company: any) => company.name)
                    .join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-2 md:gap-6 p-2">
                <p className="text-sm">Status</p>
                <p className="text-xs">{show.status}</p>
              </div>

              <div className="flex items-center gap-2 md:gap-6 p-2">
                <p className="text-sm">Genres</p>
                <p className="text-xs">
                  {show.genres.map((genre: any) => genre.name).join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-2 p-2">
                <div className="flex items-center">
                  {renderStars(show.vote_average)}
                  <IconStar size={16} className="text-yellow-500" />
                  <span className="ml-2 text-white">{show.vote_average}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DetailAktor cast={show.credits.cast} />
      </div>
    </div>
  );
};

export default DetailTvShow;
