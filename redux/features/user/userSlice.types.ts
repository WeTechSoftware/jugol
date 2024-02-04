
export interface IUserState {
    authMethodType: string;
    allUserDetails: {
        data: any[],
        message: string;
    };
    loading: boolean;
    userProfileDetails: {};
}
