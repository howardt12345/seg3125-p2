import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as FaStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as FaStarEmpty } from "@fortawesome/free-regular-svg-icons";

export const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div>
      {Array.from(Array(rating)).map((_, index) => (
        <FontAwesomeIcon
          icon={FaStarSolid}
          key={"star-" + index}
          aria-hidden="true"
        ></FontAwesomeIcon>
      ))}
      {Array.from(Array(5 - rating)).map((_, index) => (
        <FontAwesomeIcon
          icon={FaStarEmpty}
          key={"star-outline-" + index}
          aria-hidden="true"
        ></FontAwesomeIcon>
      ))}
    </div>
  );
};
