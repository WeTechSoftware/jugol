export interface IAuthState {
    checkUserInformation: boolean;
    idToken: string | null;
    fcmToken: string | null;
    checkNotificationPermission: boolean;
    uid: string | null;
}
