import { admin } from "@/services/firebase/firebase.admin";
import { cookies } from "next/dist/client/components/headers";
import Home from "../page";
import Main from "@/components/templates/Main";
import { DiaryType } from "@/types/types";

const MainPage = async () => {
  try {
    // firebase 서버 토큰 검증
    const token = await admin
      .auth()
      .verifyIdToken(cookies().get("token")?.value || "");
    if (token.uid !== "") {
      // 서버로부터 데이터 가져오기 (추가 예정)
      const serverDataList: DiaryType[] = [
        {
          id: "1",
          title: "테스트 데이터",
        },
        {
          id: "2",
          title: "테스트 데이터2",
        },
        {
          id: "3",
          title: "테스트 데이터3",
        },
      ];
      return <Main serverDataList={serverDataList} />;
    } else {
      return (
        // 인증 정보 없을 경우 기본 값
        <></>
      );
    }
  } catch (error: any) {
    if (error.code === "auth/id-token-expired") {
      // 토큰 만료 시 루트 페이지로 이동
      return <Home />;
    } else {
      console.log(error.message);
      // 다른 에러도 루트 페이지로 이동 (딱히 다른 대안이 없음)
      return <Home />;
    }
  }
};

export default MainPage;
