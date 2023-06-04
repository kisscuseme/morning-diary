"use client";

import { getToday, getYearList, l } from "@/services/util/util";
import {
  DefaultCol,
  DefaultContainer,
  DefaultRow,
  DefaultTitle,
} from "../atoms/DefaultAtoms";
import { TopBar } from "../molecules/TopBar";
import { CustomDropdown } from "../atoms/CustomDropdown";
import { useSetRecoilState } from "recoil";
import { selectedYearState } from "@/states/states";
import { CustomButton } from "../atoms/CustomButton";
import { NavLink, Row } from "react-bootstrap";
import { accordionCustomStyle } from "../molecules/CustomMolecules";
import { DiaryType } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import Menu from "../organisms/Menu";

export default function List({
  serverDataList,
  setEditMode,
}: {
  serverDataList: DiaryType[];
  setEditMode: Dispatch<SetStateAction<boolean>>;
}) {
  const setSelectedYear = useSetRecoilState(selectedYearState);

  // Dropdown에서 선택한 날짜를 recoil 전역 상태에 바인딩
  const selectYear = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <DefaultContainer>
      <style>{accordionCustomStyle}</style>
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
      <DefaultTitle>{l("My Morning Stories")}</DefaultTitle>
      <DefaultRow>
        <DefaultCol>
          <CustomButton
            onClick={() => {
              setEditMode(true);
            }}
          >
            {l("Write")}
          </CustomButton>
        </DefaultCol>
      </DefaultRow>
      {serverDataList.map((value) => {
        return (
          <Row key={value?.id}>
            <DefaultCol>
              <NavLink href={`/diary/${value?.id}`}>{value?.title}</NavLink>
            </DefaultCol>
          </Row>
        );
      })}
    </DefaultContainer>
  );
}
