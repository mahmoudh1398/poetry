import { Action } from "redux";
import { PoemsModel } from "models/poems.model";
import { REDUX_ACTION } from "enums/redux-action.enum";

export interface FavoritePoemsAction extends Action<REDUX_ACTION> {
  payload: PoemsModel;
}
