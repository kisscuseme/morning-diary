"use client";

import { DiaryType } from "@/types/types";
import Single from "./Single";
import { useState } from "react";
import Write from "./Write";
import TranslationFromClient from "../organisms/TranslationFromClient";

export default function Diary({ serverData }: { serverData: DiaryType }) {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <TranslationFromClient />
      {editMode ? (
        <Write serverData={serverData} setEditMode={setEditMode} />
      ) : (
        <Single serverData={serverData} setEditMode={setEditMode} />
      )}
    </>
  );
}
