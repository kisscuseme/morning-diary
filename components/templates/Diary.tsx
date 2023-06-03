"use client";

import { DiaryType } from "@/types/types";
import Single from "./Single";
import { useState } from "react";
import Write from "./Write";
import { CustomButton } from "../atoms/CustomButton";
import { DefaultCol, DefaultRow } from "../atoms/DefaultAtoms";
import { l } from "@/services/util/util";

export default function Diary({ serverData }: { serverData: DiaryType }) {
  const [editMode, setEditMode] = useState(false);
  return editMode ? (
    <Write content={serverData} />
  ) : (
    <Single content={serverData} />
  );
}
