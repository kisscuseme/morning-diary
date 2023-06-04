"use client";

import { DiaryType } from "@/types/types";
import { useState } from "react";
import List from "./List";
import Write from "./Write";
import TranslationFromClient from "../organisms/TranslationFromClient";

export default function Main({
  serverDataList,
}: {
  serverDataList: DiaryType[];
}) {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <TranslationFromClient />
      {editMode ? (
        <Write setEditMode={setEditMode} />
      ) : (
        <List serverDataList={serverDataList} setEditMode={setEditMode} />
      )}
    </>
  );
}
