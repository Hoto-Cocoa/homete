import { createReducer } from "typesafe-actions";
import { produce } from "immer";
import { HometesState, HometesAction } from "./types";
import {
  FETCH,
  FETCH_SUCCESS,
  FETCH_FAILURE,
  FETCH_ONE,
  FETCH_ONE_SUCCESS,
  FETCH_ONE_FAILURE,
  SEND,
  SEND_SUCCESS,
  SEND_FAILURE,
  APPROVE,
  APPROVE_SUCCESS,
  APPROVE_FAILURE,
  REJECT,
  REJECT_SUCCESS,
  REJECT_FAILURE,
} from "./actions";

const initialState: HometesState = {
  loading: {
    FETCH: false,
    FETCH_ONE: false,
    SEND: false,
    APPROVE: false,
    REJECT: false,
  },
  homete: null,
  hometes: [],
};

const reducer = createReducer<HometesState, HometesAction>(initialState, {
  [FETCH]: (state) =>
    produce(state, (draft) => {
      draft.loading.FETCH = true;
    }),
  [FETCH_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading.FETCH = false;
      draft.hometes = action.payload;
    }),
  [FETCH_FAILURE]: (state) =>
    produce(state, (draft) => {
      draft.loading.FETCH = false;
    }),
  [FETCH_ONE]: (state) =>
    produce(state, (draft) => {
      draft.loading.FETCH_ONE = true;
    }),
  [FETCH_ONE_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading.FETCH_ONE = false;
      draft.homete = action.payload;
    }),
  [FETCH_ONE_FAILURE]: (state) =>
    produce(state, (draft) => {
      draft.loading.FETCH_ONE = false;
    }),
  [SEND]: (state) =>
    produce(state, (draft) => {
      draft.loading.SEND = true;
    }),
  [SEND_SUCCESS]: (state) =>
    produce(state, (draft) => {
      draft.loading.SEND = false;
    }),
  [SEND_FAILURE]: (state) =>
    produce(state, (draft) => {
      draft.loading.SEND = false;
    }),
  [APPROVE]: (state) =>
    produce(state, (draft) => {
      draft.loading.APPROVE = true;
    }),
  [APPROVE_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading.APPROVE = false;
      const homete = draft.hometes.find(
        (homete) => homete.id === action.payload,
      );
      homete.resolved = true;
    }),
  [APPROVE_FAILURE]: (state) =>
    produce(state, (draft) => {
      draft.loading.APPROVE = false;
    }),
  [REJECT]: (state) =>
    produce(state, (draft) => {
      draft.loading.REJECT = true;
    }),
  [REJECT_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.loading.REJECT = false;
      const idx = draft.hometes.findIndex(
        (homete) => homete.id === action.payload,
      );
      draft.hometes.splice(idx, 1);
    }),
  [REJECT_FAILURE]: (state) =>
    produce(state, (draft) => {
      draft.loading.REJECT = false;
    }),
});

export default reducer;
