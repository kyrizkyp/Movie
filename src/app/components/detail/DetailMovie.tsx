"use client";

import React, { useEffect, useState } from "react";
import { getMovieDetail } from "@/app/data/DataApi";
import Link from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

interface MovieDetailProps {
  detailId: string;
}

const DetailMovie: React.FC<MovieDetailProps> = ({ detailId }) => {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovieDetail(detailId);
      setMovie(data);
    };

    fetchData();
  }, [detailId]);

  if (!movie) {
    return <div>Loading...</div>;
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

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h${minutes}min`;
  };

  // Format tanggal rilis
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <div className="my-6 self-start mx-4 xl:mx-6 2xl:mx-60">
        <Link href="/" className="px-6 py-2 bg-black text-white font-bold">
          BACK
        </Link>
      </div>

      <div className="w-full md:px-14 lg:px-24 xl:px-36 2xl:px-80">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="flex items-center mt-2">
          {renderStars(movie.vote_average)}
          <IconStar size={16} className="text-yellow-500" />
          <span className="ml-2">{movie.vote_average}</span>
        </div>
        <p className="mt-4">{movie.overview}</p>

        <h2 className="text-2xl font-bold mt-4">Cast:</h2>
        <div className="flex flex-wrap mt-2">
          {movie.credits.cast.slice(0, 5).map((cast: any) => (
            <div key={cast.id} className="flex items-center mr-4 mb-4">
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt={cast.name}
                className="rounded-full w-16 h-16 object-cover"
              />
              <span className="ml-2">{cast.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p>
            <strong>Release Date:</strong> {formatDate(movie.release_date)}
          </p>
          <p>
            <strong>Director:</strong>{" "}
            {
              movie.credits.crew.find((crew: any) => crew.job === "Director")
                ?.name
            }
          </p>
          <p>
            <strong>Production Companies:</strong>{" "}
            {movie.production_companies
              .map((company: any) => company.name)
              .join(", ")}
          </p>
          <p>
            <strong>Runtime:</strong> {formatRuntime(movie.runtime)}
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre: any) => genre.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
