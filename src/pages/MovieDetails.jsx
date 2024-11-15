import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieDetails } from "../api/tmdb";
import { Typography } from "../components/ui/Typography";
import { slugify } from "../utils/slugify";
import Button from "../components/ui/Button";
import GoBackIcon from "../assets/icons/arrow_back.svg?react";
import noBackDropFound from "../assets/images/no-backdrop-found.png";
import Badge from "../components/ui/Badge";

const MovieDetails = () => {
  const { idSlug } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  // Parse id and slug from idSlug
  const separatorIndex = idSlug.indexOf("-");
  if (separatorIndex === -1) {
    // If no hyphen is found, the URL format is invalid
    navigate("/not-found", { replace: true });
    return null;
  }

  // Extract 'id' and 'slug' from 'idSlug' based on the position of the hyphen
  const id = idSlug.substring(0, separatorIndex);
  const slug = idSlug.substring(separatorIndex + 1);

  // Convert id to a number
  const idNumber = parseInt(id, 10);
  if (isNaN(idNumber)) {
    // Handle Invalid ID
    navigate("/not-found", { replace: true });
    return null;
  }

  useEffect(() => {
    const getMovieDetails = async () => {
      const data = await fetchMovieDetails(id);

      if (data) {
        setMovie(data);

        const actualSlug = slugify(data.title);

        if (actualSlug !== slug) {
          // Redirect to the correct URL
          navigate(`/movie/${id}-${actualSlug}`, { replace: true });
        }
      } else {
        navigate("/not-found");
      }
    };
    getMovieDetails();
  }, [id, slug, navigate]);

  if (!movie) return <div>Loading movie...</div>;

  return (
    <div>
      <Button
        variant="secondary"
        onClick={() => navigate(-1)}
        className="mb-12"
      >
        <GoBackIcon /> Go back
      </Button>
      <header className="items grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:order-2 lg:col-span-6">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                : noBackDropFound
            }
            alt=""
            className="rounded-lg"
          />
        </div>
        <div className="col-span-12 lg:order-1 lg:col-span-5">
          <Typography element="h1" className="mb-4">
            {movie.title}
          </Typography>
          <Typography element="p" styledAs="bodyLarge">
            {movie.overview}
          </Typography>
          <Badge>{movie.genres.map((genre) => genre.name)}</Badge>
        </div>
      </header>
    </div>
  );
};

export default MovieDetails;
