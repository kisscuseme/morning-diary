"use client";

import { DiaryType } from "@/types/types";
import { useEffect, useState } from "react";
import List from "./List";
import Write from "./Write";
import TranslationFromClient from "../organisms/TranslationFromClient";
import { checkLogin } from "@/services/firebase/auth";
import { rerenderDataState, userInfoState } from "@/states/states";
import { useRecoilState, useRecoilValue } from "recoil";

export default function Main({
  serverDataList,
}: {
  serverDataList: DiaryType[];
}) {
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const rerenderData = useRecoilValue(rerenderDataState);

  useEffect(() => {}, [rerenderData]);

  checkLogin().then((data) => {
    if (data) {
      if (!userInfo) {
        setUserInfo({
          uid: data.uid,
          name: data.displayName || "",
          email: data.email || "",
        });
      }
    }
  });

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
