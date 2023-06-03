import { admin } from "@/services/firebase/firebase.admin";
import { cookies } from "next/dist/client/components/headers";
import Home from "../../page";
import { DiaryType } from "@/types/types";
import Diary from "@/components/templates/Diary";

const DiaryPage = async ({ params }: { params: { id: string } }) => {
  try {
    // firebase 서버 토큰 검증
    const token = await admin
      .auth()
      .verifyIdToken(cookies().get("token")?.value || "");
    if (token.uid !== "") {
      // 서버로부터 데이터 가져오기 (추가 예정)
      const serverData: DiaryType = {
        id: params.id,
        text: "테스트 데이터",
        date: "2020-01-01",
        weather: "Sunny",
      };
      return <Diary serverData={serverData} />;
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

export default DiaryPage;
