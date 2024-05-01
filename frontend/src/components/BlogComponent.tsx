import { getDateString } from "@/hooks";

function BlogComponent({title, content, className: classx, date}: {title: string, content: string, className: string, date: Date}) {
 return (
    <div className={`${classx} mb-8`}>
        <div className="font-extrabold text-3xl sm:text-5xl pb-2">{title}</div>
        <div className="text-gray-500 pb-2">Posted on {getDateString(date)}</div>
        <hr className="mb-6"/>
        <div dangerouslySetInnerHTML={{__html: content}} className="font-[sans] text-lg"></div>
    </div>
  )
}

export default BlogComponent