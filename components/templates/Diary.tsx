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
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  scheduleAccordionActiveState,
  selectedYearState,
} from "@/states/states";
import { CustomButton } from "../atoms/CustomButton";
import { Accordion } from "react-bootstrap";
import { accordionCustomStyle } from "../molecules/CustomMolecules";
import { useRouter, useSearchParams } from "next/navigation";

export default function Diary({ serverData }: { serverData: any[] }) {
  const setSelectedYear = useSetRecoilState(selectedYearState);
  const [scheduleAccordionActive, setScheduleAccordionActive] = useRecoilState(
    scheduleAccordionActiveState
  );
  const router = useRouter();

  // Dropdown에서 선택한 날짜를 recoil 전역 상태에 바인딩
  const selectYear = (year: string) => {
    setSelectedYear(year);
  };

  return (
    <DefaultContainer>
      <style>{accordionCustomStyle}</style>
      <TopBar>
        <CustomDropdown
          initText={getToday().substring(0, 4)}
          items={getYearList()}
          onClickItemHandler={selectYear}
        />
      </TopBar>
      <DefaultTitle>{l("My Morning Stories")}</DefaultTitle>
      <DefaultRow>
        <DefaultCol>
          <CustomButton
            onClick={() => {
              const params = new URLSearchParams();
              params.set("text","content123");
              params.set("title", "title123");
              params.set("weather", "sunny");
              params.set("id", "12312312");
              params.set("date", "2023-01-01");
              const url = "/write?" + params.toString();
              router.push(url);
            }}
          >
            {l("Write")}
          </CustomButton>
        </DefaultCol>
      </DefaultRow>
      <DefaultRow>
        <Accordion defaultActiveKey={scheduleAccordionActive}>
          {serverData.map((value) => {
            return (
              <Accordion.Item key={value.id} eventKey={value.id}>
                <Accordion.Header>{value.title}</Accordion.Header>
                <Accordion.Body>test</Accordion.Body>
              </Accordion.Item>
            );
          })}
        </Accordion>
      </DefaultRow>
    </DefaultContainer>
  );
}
