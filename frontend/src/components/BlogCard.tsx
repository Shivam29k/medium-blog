import { useState, useEffect } from "react";
import { Avatar } from "./Avatar";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

function BlogCard({
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) {
  const [truncatedContent, setTruncatedContent] = useState<String>("");


  useEffect(() => {

    const removeImgTags = (content: string) => {
      const imgStartIndex = content.indexOf("<img");
      const imgEndIndex = content.indexOf('">') + 6;
      const updatedContent = content.slice(0, imgStartIndex) + content.slice(imgEndIndex);
      return updatedContent;
    };

    const updatedContent = removeImgTags(content);

    const width = window.innerWidth;
    let wordCount;
    if (width > 768) {
      wordCount = 30;
    } else {
      wordCount = 20;
    }`1`
    setTruncatedContent(updatedContent.split(" ").slice(0, wordCount).join(" "));
  }, [content]);

  return (
    <div className="border-b-2 m-4 flex flex-col gap-2 cursor-pointer">
      <div className="flex items-center">
        <Avatar name={authorName} classx="h-6 w-6 text-xs" />
        <span className="font-medium text-sm pl-2">{authorName}</span>{" "}
        <span className="px-1">·</span>
        <span className="text-gray-500 text-sm">{publishedDate}</span>
      </div>
      <div className="font-bold text-2xl  pt-2 ">{title}</div>
      <div className="font-[sans] text-gray-700 ">
        <p dangerouslySetInnerHTML={{__html: truncatedContent.length < content.length ? `${truncatedContent}...` : truncatedContent}}></p>
      </div>
      <div className="text-sm text-gray-500 pb-5 mt-3 ">
        {Math.ceil(content.length / 1000)} minutes read
      </div>
    </div>
  );
}

function BlogCardSkeleton() {
  return (
    <div className="border-b-2 flex flex-col gap-2 w-full py-8 m-4">
      <div className="flex flex-col gap-4">
        <div className="flex w-full items-center gap-4">
          <div className="h-6 w-6 bg-slate-300 rounded-full animate-pulse"></div>
          <div className="w-1/3 h-4 border bg-slate-300 rounded-full animate-pulse"></div>
        </div>
        <div className="w-5/6 h-5 bg-slate-300 rounded-full mt-2 animate-pulse"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full h-4 bg-slate-300 rounded-full mt-2 animate-pulse"></div>
          <div className="w-full h-4 bg-slate-300 rounded-full mt-2 animate-pulse"></div>
        </div>
        <div className="w-4/6 h-4 bg-slate-300 rounded-full mt-2 animate-pulse"></div>
      </div>
    </div>
  );
}

export { BlogCard, BlogCardSkeleton };
