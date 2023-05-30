// 로그인 페이지 메타 정보
export const metadata = {
  title: "Morning Diary - Sign In",
  description: "Please log in.",
  openGraph: {
    title: "Morning Diary - Sign In",
    description: "Please log in.",
    images: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
