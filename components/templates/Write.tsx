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
import { Form } from "react-bootstrap";

export default function Write({ content }: { content: DiaryType }) {
  return (
    <DefaultContainer>
      <DefaultTitle>{l("Be full of good things today!")}</DefaultTitle>
      <Form>
        <DefaultRow>
          <DefaultCol>
            <CustomInput type="date" initValue={content?.date || getToday()} />
          </DefaultCol>
          <DefaultCol>
            <CustomInput
              placeholder={l("Weather")}
              initValue={content?.weather || ""}
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
              initValue={content?.text || ""}
            />
          </DefaultCol>
        </DefaultRow>
        <DefaultRow>
          <DefaultCol>
            <CustomButton>{l("Save")}</CustomButton>
          </DefaultCol>
        </DefaultRow>
      </Form>
    </DefaultContainer>
  );
}
