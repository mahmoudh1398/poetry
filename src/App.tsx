import axios from "axios";
import Poem from "components/Poem";
import Modal from "components/Modal";
import { useRef, useState } from "react";
import Loading from "components/Loading";
import { BASE_URL } from "configs/urls.config";
import UpArrowIcon from "assets/icons/up-arrow";
import { FILTERS } from "configs/filters.config";
import { sortByString } from "tools/sortByString";
import DownArrowIcon from "assets/icons/down-arrow";
import { PoemModel, PoemsModel } from "models/poems.model";
import { useCloseByClickOutSide } from "tools/closeByClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { REDUX_ACTION } from "enums/redux-action.enum";
import { ReduxStoreModel } from "models/redux-store-model";

const App = (): JSX.Element => {
  const dispatch = useDispatch();

  const sortDropdownRef = useRef(null);

  const favoritePoems = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["favoritePoems"]
  >((store: ReduxStoreModel) => store.favoritePoems);

  const [poems, setPoems] = useState<PoemsModel>([]);
  const [selectedPoem, setSelectedPoem] = useState<PoemModel | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isSelectOpened, setIsSelectOpened] = useState<boolean>(false);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("poems");

  useCloseByClickOutSide({
    ref: sortDropdownRef,
    isOpened: isSelectOpened,
    setIsOpened: setIsSelectOpened,
  });

  const handleFetchPoems = async () => {
    try {
      setLoading(true);
      setShowFavorites(false);
      const response = await axios.get(`${BASE_URL}/random/20`);
      setPoems(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter);
    if (showFavorites) {
      const newList = sortByString({ arr: favoritePoems, filter: filter });
      dispatch({ type: REDUX_ACTION.SET_FAVORITE_POEMS, payload: newList });
    } else {
      setPoems(sortByString({ arr: poems, filter: filter }));
    }
    setIsSelectOpened(false);
  };

  const handleSelectPoem = (poem: PoemModel) => {
    setSelectedPoem(poem);
    setIsModalOpened(true);
  };

  const handleFavoritePoem = (poem: PoemModel) => {
    if (favoritePoems.length && favoritePoems?.includes(poem)) {
      const newList = favoritePoems?.filter((p: PoemModel) => p !== poem);
      dispatch({
        type: REDUX_ACTION.SET_FAVORITE_POEMS,
        payload: newList,
      });
    } else {
      dispatch({
        type: REDUX_ACTION.SET_FAVORITE_POEMS,
        payload: [poem, ...favoritePoems],
      });
    }
  };

  const switcher = (type: string): PoemsModel => {
    return type === "favorites" ? favoritePoems : poems;
  };

  return (
    <div className="app-container">
      <div className="intro">
        <h2>Read Random Poems</h2>

        <button onClick={handleFetchPoems} className="fetch-btn">
          Fetch Poems
        </button>

        <div className="sort-wrapper">
          <span>Sort by:</span>

          <div className="dropdown" ref={sortDropdownRef}>
            <div
              className="selected-filter"
              onClick={() => setIsSelectOpened(!isSelectOpened)}
            >
              <span>{selectedFilter}</span>
              {isSelectOpened ? (
                <UpArrowIcon color="#bfbfbf" />
              ) : (
                <DownArrowIcon color="#bfbfbf" />
              )}
            </div>

            {isSelectOpened ? (
              <ul className="filters-list">
                {FILTERS.map((filter: string) => (
                  <li
                    key={filter}
                    className="filter-item"
                    onClick={() => handleSelectFilter(filter)}
                  >
                    {filter}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>

      <div className="list-container">
        <div className="tabs">
          <button
            className={`${
              selectedTab === "poems" ? "selected-tab tab" : "tab"
            }`}
            onClick={() => setSelectedTab("poems")}
          >
            Poems
          </button>
          <button
            className={`${
              selectedTab === "favorites" ? "selected-tab tab" : "tab"
            }`}
            onClick={() => setSelectedTab("favorites")}
          >
            Favorites
          </button>
        </div>
        <div className="list-wrapper">
          <ul className="list">
            {loading ? (
              <div className="loading-wrapper">
                <Loading />
              </div>
            ) : (
              switcher(showFavorites ? "favorites" : "poems")?.map(
                (poem: PoemModel) => (
                  <li
                    key={poem.title}
                    className="poem-card"
                    onClick={() => handleSelectPoem(poem)}
                  >
                    <h4>{poem.title}</h4>
                    <p>{poem.author}</p>
                  </li>
                )
              )
            )}
          </ul>
        </div>
      </div>
      {isModalOpened ? (
        <Modal show={isModalOpened} onClose={() => setIsModalOpened(false)}>
          <Poem
            poem={selectedPoem}
            isFavorite={
              favoritePoems?.length > 0 && favoritePoems.includes(selectedPoem!)
            }
            handleClose={() => setIsModalOpened(false)}
            handleFavoritePoem={handleFavoritePoem}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default App;
