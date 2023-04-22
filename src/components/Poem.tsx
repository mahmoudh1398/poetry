import { FC } from "react";
import CloseIcon from "assets/icons/close";
import FillFavoriteIcon from "assets/icons/fill-favorite";
import { PoemModel } from "models/poems.model";
import OutlineFavoriteIcon from "assets/icons/outline-favorite";

interface PoemProps {
  poem: PoemModel | null;
  isFavorite: boolean;
  handleClose: () => void;
  handleFavoritePoem: (poem: PoemModel) => void;
}

const Poem: FC<PoemProps> = ({
  poem,
  isFavorite,
  handleClose,
  handleFavoritePoem,
}) => {
  return (
    <div className="poem">
      <div className="heading">
        <div className="close-btn" onClick={handleClose}>
          <CloseIcon />
        </div>

        <h3>{poem?.title}</h3>

        <div
          className="favorite-btn"
          onClick={() => poem && handleFavoritePoem(poem)}
        >
          {isFavorite ? <FillFavoriteIcon /> : <OutlineFavoriteIcon />}
        </div>
      </div>

      <p className="poem-author">{poem?.author}</p>

      <ul className="poem-text">
        {poem?.lines.map((line: string, index: number) => (
          <li key={index}>
            <p>{line === "" ? <br /> : line}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Poem;
