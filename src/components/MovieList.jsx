import { Link } from "react-router-dom";
import fallbackPoster from "../assets/images/no-poster-found.jpg";
import { Typography } from "./ui/Typography";
import { slugify } from "../utils/slugify";
import StarIcon from "../assets/icons/star.svg?react";

const MovieList = ({ movies }) => {
  return (
    <div className="4xl:grid-cols-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
      {movies.map((movie) => {
        return (
          <div
            key={movie.id}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <Link
              to={`/movie/${movie.id}-${slugify(movie.title)}`}
              className="group"
              aria-label={movie.title}
            >
              <div class="overflow-hidden">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : fallbackPoster
                  }
                  alt=""
                  width="500"
                  height="750"
                  className="h-auto w-full transform transition duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4 text-center">
                <Typography element="h2" styledAs="h5" className="mb-1">
                  {movie.title}
                </Typography>
                <Typography
                  element="p"
                  className="mb-1 inline-flex gap-1 font-semibold text-green-800"
                  aria-hidden="true"
                >
                  <StarIcon color="orange" />
                  {movie.vote_average.toFixed(1)} / 10
                </Typography>
                <Typography element="p" className="sr-only">
                  {`Rating: ${movie.vote_average.toFixed(1)} out of 10`}
                </Typography>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
