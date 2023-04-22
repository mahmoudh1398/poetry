import { ReduxStoreModel } from "models/redux-store-model";
import { FavoritePoemsAction } from "./action-model";
import { REDUX_ACTION } from "enums/redux-action.enum";

export function reducer(
  prevState: ReduxStoreModel["favoritePoems"],
  action: FavoritePoemsAction
): ReduxStoreModel["favoritePoems"] {
  switch (action.type) {
    case REDUX_ACTION.SET_FAVORITE_POEMS:
      return action.payload;
    default:
      return prevState ? prevState : [];
  }
}
