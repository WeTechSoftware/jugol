import React from "react";
import { Image } from "expo-image";
import calendar from "./calendar.svg";
import camera from "./camera.svg";
import microphone from "./microphone.svg";
import playing from "./playing.svg";
import drink from "./drink.svg";
import cooking from "./cooking.svg";
import extreme from "./extreme.svg";
import art from "./art.svg";
import music from "./music.svg";
import run from "./run.svg";
import shopping from "./shopping.svg";
import swimming from "./swimming.svg";
import travelling from "./travelling.svg";
import videogame from "./videogame.svg";
import yoga from "./yoga.svg";
import cameraProfile from "./cameraProfile.svg";
import cardsIcon from "./cards.svg";
import messageIcon from "./message.svg";
import filterIcon from "./filter.svg";
import threeDots from "./dots.svg";
import gallery from "./gallery.svg";
import success_payment from "./success_payment.svg";
import error_payment from "./error_payment.svg";

type TVectorImage = React.ComponentProps<typeof Image>;
export type TIcon = Omit<TVectorImage, "source">;

export const CalenderIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={calendar} />
);

export const CameraIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={camera} />
);

export const MicrophoneIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={microphone} />
);

export const PlayingIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={playing} />
);

export const DrinkIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={drink} />
);

export const CookingIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={cooking} />
);

export const ExtremeIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={extreme} />
);

export const ArtIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={art} />
);
export const MusicIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={music} />
);

export const RunIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={run} />
);

export const ShoppingIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={shopping} />
);

export const SwimmingIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={swimming} />
);

export const TravellingIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={travelling} />
);
export const VideogameIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={videogame} />
);

export const YogaIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={yoga} />
);
export const CameraProfile = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={cameraProfile} />
);
export const CardsIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={cardsIcon} />
);
export const MessageIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={messageIcon} />
);
export const FilterIcon = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={filterIcon} />
);

export const ThreeDots = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={threeDots} />
);

export const SuccessPayment = (props: TIcon) => (
  <Image
    style={{ height: 20, width: 20 }}
    {...props}
    source={success_payment}
  />
);

export const ErrorPayment = (props: TIcon) => (
  <Image style={{ height: 20, width: 20 }} {...props} source={error_payment} />
);
