import { Avatar } from "./Avatar"

interface AuthorProps {
  name: string;
  description: string;
  id: string;
}

function AuthorComponent({className: classx, author}:{className: string, author: AuthorProps}) {
  return (
    <div className={`${classx} border rounded-md py-3 px-4 shadow-lg max-w-96 sm:min-w-72 h-fit`}>
        <div className="font-bold" >
            Author
        </div>
        <div className="flex gap-3 items-center">
            {author && <Avatar name={author.name} classx="h-10 min-w-10" />}
            <div>
                <div className="text-xl sm:text-3xl font-bold pb-2">{author.name}</div>
                <div className="text-gray-500">{author.description}</div>
            </div>
        </div>
    </div>
  )
}

export default AuthorComponent