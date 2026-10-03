"use client";

import dynamic from "next/dynamic";

const ChatWidget = dynamic(
  () => import("./ChatWidget").then((m) => m.ChatWidget),
  { ssr: false, loading: () => null },
);

export function ChatLazy() {
  return <ChatWidget />;
}
