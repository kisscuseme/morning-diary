"use client";

import Write from "@/components/templates/Write";
import { useSearchParams } from "next/navigation";

const WritePage = () => {
  const params = useSearchParams();
  console.log(params.get("title"));
  console.log(params.get("text"));
  const content = {
    title: params.get("title"),
    text: params.get("text"),
    weather: params.get("weather"),
    date: params.get("date"),
    id: params.get("id")
  }
  return <Write content={content} />;
};

export default WritePage;
