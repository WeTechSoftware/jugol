
export interface ICustomImageCarousal {
    data: ICarousalData[];
    autoPlay: boolean;
    pagination: boolean;
    handleSignInClick: () => void;
    handleSignupClick: () => void;
}

export interface ICarousalData {
    heading: string;
    body: string;
    picture: string;
}
