import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { Action } from '@ngrx/store';
// tslint:disable-next-line:max-line-length
import { INIT_APP_STATE, ADD_REZIPTS, DELETE_REZIPTS, ReceiptsActions, AddReciptAction, DeleteReciptAction, LoadSuccessReciptsAction, LOAD_REZIPTZ_SUCCESS } from '../actions/app.actions';
import { Receipt } from '../../models/receipt';


export interface State {
  recipt: Receipt[];
}

export const initialState: State = {
  recipt: null,
};

export const reducer = (state = initialState, action: ReceiptsActions) => {
  switch (action.type) {
    case INIT_APP_STATE:
      return { ...state };
    // case UPDATE_REZIPTS:
    //   return [...state, action.payload];
    //   break;
    case ADD_REZIPTS:
      return { ...state, recipt: action.payload };

    case DELETE_REZIPTS:
      return { ...state, recipt: action.payload };

    case LOAD_REZIPTZ_SUCCESS:
      return { ...state, recipt: action.payload };

    default:
      break;
  }
};

export interface ApplicationState {
  recipts: State;
}

export const reducers: ActionReducerMap<ApplicationState> = {
  recipts: reducer,
};


// export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
