"use client";

import { CustomButton } from "@/components/atoms/CustomButton";
import {
  DefaultCol,
  DefaultContainer,
  DefaultRow,
  DefaultTitle,
} from "@/components/atoms/DefaultAtoms";
import { getToday, getYearList, l } from "@/services/util/util";
import { DiaryType } from "@/types/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";
import { TopBar } from "../molecules/TopBar";
import { CustomDropdown } from "../atoms/CustomDropdown";
import { useSetRecoilState } from "recoil";
import { selectedYearState } from "@/states/states";
import Menu from "../organisms/Menu";

export default function Single({
  serverData,
  setEditMode,
}: {
  serverData: DiaryType;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}) {
  const setSelectedYear = useSetRecoilState(selectedYearState);
  const router = useRouter();

  // Dropdown에서 선택한 날짜를 recoil 전역 상태에 바인딩
  const selectYear = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <DefaultContainer>
      <TopBar>
        <DefaultRow>
          <DefaultCol>
            <Menu />
          </DefaultCol>
          <DefaultCol>
            <CustomDropdown
              initText={getToday().substring(0, 4)}
              items={getYearList()}
              onClickItemHandler={selectYear}
            />
          </DefaultCol>
        </DefaultRow>
      </TopBar>
      <DefaultTitle>{l("Shall we recall the memories?")}</DefaultTitle>
      <Form>
        <DefaultRow>
          <DefaultCol>
            {l("Date")}: {serverData?.date}
          </DefaultCol>
          <DefaultCol>
            {l("Weather")}: {serverData?.weather || ""}
          </DefaultCol>
        </DefaultRow>
        <DefaultRow>
          <DefaultCol>{serverData?.text || ""}</DefaultCol>
        </DefaultRow>
        <DefaultRow>
          <DefaultCol>
            <CustomButton
              onClick={() => {
                router.back();
              }}
            >
              {l("Back")}
            </CustomButton>
          </DefaultCol>
          <DefaultCol>
            <CustomButton
              onClick={() => {
                setEditMode(true);
              }}
            >
              {l("Edit")}
            </CustomButton>
          </DefaultCol>
          <DefaultCol>
            <CustomButton>{l("Delete")}</CustomButton>
          </DefaultCol>
        </DefaultRow>
      </Form>
    </DefaultContainer>
  );
}
