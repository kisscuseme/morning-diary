"use client";

import { CustomButton } from "@/components/atoms/CustomButton";
import { CustomInput } from "@/components/atoms/CustomInput";
import {
  DefaultCol,
  DefaultContainer,
  DefaultRow,
  DefaultTitle,
} from "@/components/atoms/DefaultAtoms";
import { getToday, l } from "@/services/util/util";
import { DiaryType } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import { Form } from "react-bootstrap";
import { TopBar } from "../molecules/TopBar";
import { LanguageSelectorForClient } from "../organisms/LanguageSelectorForClient";

export default function Write({
  serverData,
  setEditMode,
}: {
  serverData?: DiaryType;
  setEditMode?: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DefaultContainer>
      <TopBar>
        <LanguageSelectorForClient />
      </TopBar>
      <DefaultTitle>
        {serverData
          ? l("Have you had a change of heart?")
          : l("Be full of good things today!")}
      </DefaultTitle>
      <Form>
        <DefaultRow>
          <DefaultCol>
            <CustomInput
              type="date"
              initValue={serverData?.date || getToday()}
            />
          </DefaultCol>
          <DefaultCol>
            <CustomInput
              placeholder={l("Weather")}
              initValue={serverData?.weather || ""}
            />
          </DefaultCol>
        </DefaultRow>
        <DefaultRow>
          <DefaultCol>
            <CustomInput
              as="textarea"
              placeholder={l("Write your story")}
              rows={10}
              backgroundColor="#3f3f3f"
              color="#efefef"
              placeholderColor="#8f8f8f"
              initValue={serverData?.text || ""}
            />
          </DefaultCol>
        </DefaultRow>
        <DefaultRow>
          <DefaultCol></DefaultCol>
          <DefaultCol>
            {setEditMode ? (
              <CustomButton
                onClick={() => {
                  setEditMode(false);
                }}
              >
                {l("Back")}
              </CustomButton>
            ) : (
              <></>
            )}
          </DefaultCol>
          <DefaultCol>
            <CustomButton>{l("Save")}</CustomButton>
          </DefaultCol>
        </DefaultRow>
      </Form>
    </DefaultContainer>
  );
}
