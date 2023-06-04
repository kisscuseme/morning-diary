"use client";

import { DiaryType } from "@/types/types";
import Single from "./Single";
import { useEffect, useState } from "react";
import Write from "./Write";
import TranslationFromClient from "../organisms/TranslationFromClient";
import { useRecoilState, useRecoilValue } from "recoil";
import { rerenderDataState, userInfoState } from "@/states/states";
import { checkLogin } from "@/services/firebase/auth";

export default function Diary({ serverData }: { serverData: DiaryType }) {
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
        <Write serverData={serverData} setEditMode={setEditMode} />
      ) : (
        <Single serverData={serverData} setEditMode={setEditMode} />
      )}
    </>
  );
}
