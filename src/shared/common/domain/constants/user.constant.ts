import { ControllerAction } from "../types/controller-action.type";

export const UserControllerName: string = 'user';
export const UserControllerTag: string = 'USER';

export const UserRoutes: Record<string, string> = {
    GET_USER_BY_ID: `/:id`,
} as const;

export const UserControllerMap: Record<
    keyof typeof UserRoutes,
    ControllerAction<string>
> = {
    GET_USER_BY_ID: {
        ROUTE: UserRoutes.GET_USER_BY_ID,
    }
};
