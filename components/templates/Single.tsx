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
import { Form } from "react-bootstrap";

export default function Single({ content }: { content: DiaryType }) {
  return (
    <DefaultContainer>
      <DefaultTitle>{l("Shall we recall the memories?")}</DefaultTitle>
      <Form>
        <DefaultRow>
          <DefaultCol>
            {l("Date")}: {content?.date}
          </DefaultCol>
          <DefaultCol>
            {l("Weather")}: {content?.weather || ""}
          </DefaultCol>
        </DefaultRow>
        <DefaultRow>
          <DefaultCol>{content?.text || ""}</DefaultCol>
        </DefaultRow>
        <DefaultRow>
          <DefaultCol>
            <CustomButton>{l("Back")}</CustomButton>
          </DefaultCol>
          <DefaultCol>
            <CustomButton>{l("Edit")}</CustomButton>
          </DefaultCol>
          <DefaultCol>
            <CustomButton>{l("Delete")}</CustomButton>
          </DefaultCol>
        </DefaultRow>
      </Form>
    </DefaultContainer>
  );
}
