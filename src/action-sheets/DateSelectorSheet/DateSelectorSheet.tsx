import { Button, VStack } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { Calendar } from "react-native-calendars";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import colors from "../../theme-config/colors";
import { fontConfig } from "../../theme-config/fontConfig";
import CalendarHeader from "./CalendarHeader";
import { IDateSelectorSheetProps } from "./DateSelectorSheet.types";

export const DAYSHEET_ID = "selectDateSheet";

export default function DateSelectorSheet({
  sId = DAYSHEET_ID,
  setDate,
}: IDateSelectorSheetProps) {
  const today = new Date();

  const calendarTheme = {
    arrowColor: "#000",
    selectedDayBackgroundColor: colors.primary[100],
    todayTextColor: colors.primary[100],
    textDayFontFamily: fontConfig.Poppins[400].normal,
    textMonthFontFamily: fontConfig.Poppins[400].normal,
    textDayHeaderFontFamily: fontConfig.Poppins[400].normal,
  };

  const todaysDate = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const [currentDate, setCurrentDate] = React.useState<string>(todaysDate);

  return (
    <ActionSheet containerStyle={actionSheetStyle.container} id={sId}>
      <VStack pb={8} pt={16} px={8} space={8} borderRadius="3xl">
        <Calendar
          hideDayNames={true}
          onDayPress={(day) => {
            setCurrentDate(day.dateString);
          }}
          initialDate={currentDate}
          firstDay={1}
          enableSwipeMonths
          theme={calendarTheme}
          renderHeader={(date: Date) => <CalendarHeader date={date} />}
          renderArrow={(direction) => (
            <EvilIcons
              name={direction === "left" ? "chevron-left" : "chevron-right"}
              size={30}
              color={"#000"}
            />
          )}
        />
        <Button
          onPress={() => {
            const convertedDate = currentDate
              ? new Date(currentDate)
              : new Date();
            setDate?.(convertedDate);
            SheetManager.hide(DAYSHEET_ID);
          }}
          variant={"primary"}
        >
          Save
        </Button>
      </VStack>
    </ActionSheet>
  );
}

export const actionSheetStyle = StyleSheet.create({
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});
