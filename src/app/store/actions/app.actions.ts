import { Receipt } from '../../models/receipt';

export const INIT_APP_STATE = 'INIT-APP';
export const LOAD_REZIPTZ = 'LOAD-REZIPTS';
export const LOAD_REZIPTZ_SUCCESS = 'LOAD-REZIPTS-SUCCESS';
export const DELETE_REZIPTS = 'DELETE-REZIPTS';
export const UPDATE_REZIPTS = 'UPDATE-REZIPTS';
export const ADD_REZIPTS = 'ADD-REZIPTS';


export class AddReciptAction /*implements Action*/ {
    public readonly type: string = ADD_REZIPTS;
    constructor(public payload: Receipt[]) { }
}
// export class LoadReciptsAction implements Action {
//     readonly type: string = LOAD_REZIPTZ;
// }
export class LoadSuccessReciptsAction /*implements Action*/ {
    readonly type: string = LOAD_REZIPTZ_SUCCESS;
    constructor(public payload: Receipt[]) { }
}
export class DeleteReciptAction /*implements Action*/ {
    readonly type: string = DELETE_REZIPTS;
    constructor(public payload: Receipt[]) { }
}

export type ReceiptsActions = AddReciptAction /*| LoadReciptsAction*/ | DeleteReciptAction | LoadSuccessReciptsAction;
