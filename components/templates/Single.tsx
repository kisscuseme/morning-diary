"use client";

import { CustomButton } from "@/components/atoms/CustomButton";
import {
  DefaultCol,
  DefaultContainer,
  DefaultRow,
  DefaultTitle,
} from "@/components/atoms/DefaultAtoms";
import { l } from "@/services/util/util";
import { DiaryType } from "@/types/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";
import { TopBar } from "../molecules/TopBar";
import { CustomDropdown } from "../atoms/CustomDropdown";

export default function Single({
  serverData,
  setEditMode,
}: {
  serverData: DiaryType;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  return (
    <DefaultContainer>
      <TopBar>
        <CustomDropdown
          initText={""}
          items={[]}
          onClickItemHandler={() => {}}
        />
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
