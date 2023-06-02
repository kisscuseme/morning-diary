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

const WritePage = () => {
  return (
    <DefaultContainer>
      <DefaultTitle>{l("Be full of good things today!")}</DefaultTitle>
      <DefaultRow>
        <DefaultCol>
          <CustomInput type="date" initValue={getToday()} />
        </DefaultCol>
        <DefaultCol>
          <CustomInput placeholder={l("Weather")} />
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
          />
        </DefaultCol>
      </DefaultRow>
      <DefaultRow>
        <DefaultCol>
          <CustomButton>{l("Save")}</CustomButton>
        </DefaultCol>
      </DefaultRow>
    </DefaultContainer>
  );
};

export default WritePage;
