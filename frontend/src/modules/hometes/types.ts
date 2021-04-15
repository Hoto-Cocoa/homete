import { ActionType } from "typesafe-actions";
import { Homete } from "../../types/Homete";
import * as actions from "./actions";

export type HometesAction = ActionType<typeof actions>;

export type HometesState = {
  loading: {
    FETCH: boolean;
    FETCH_ONE: boolean;
    SEND: boolean;
    APPROVE: boolean;
    REJECT: boolean;
  };
  homete: Homete;
  hometes: Homete[];
};
