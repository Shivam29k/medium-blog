import Editor from "@/components/Editor";
import Navbar from "@/components/Navbar";
import { BACKEND_URL } from "@/config";
import { coustomAlert } from "@/components/coustomAlert";
import axios from "axios";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { publishAtom } from "@/store/atoms/publish";
import { useNavigate } from "react-router-dom";
import { CreateBlogInput } from "@shivamkrandom/medium";

function Create() {
  const [blogInput, setBlogInput] = useState<CreateBlogInput>(
    {} as CreateBlogInput
  );

  const [_, setPublish] = useRecoilState(publishAtom);
  setPublish(false);

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const currentDate = new Date();
    const dateString = currentDate.toISOString();

    console.log("Date String: ", dateString);
    console.log(blogInput);
    if (!blogInput.content) {
      coustomAlert("warning", "Blog content can't be empty.");
      return;
    }
    if (blogInput.content.length < 50) {
      coustomAlert(
        "warning",
        "Blog content length dosen't meet the minimum criteria to publish."
      );
    } else {
      axios
        .post(`${BACKEND_URL}/api/v1/blog/auth/`, { ...blogInput, date: dateString }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          coustomAlert("success", res.data.message);
          navigate(`/blog/${res.data.id}`);
        })
        .catch((err) => {
          console.log(err);
          coustomAlert("error", "Error while publishing the blog.");
        });
      // console.log(title, content);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center m-3 ">
      <Navbar />
      <div className="mt-10 font-bold text-3xl p-6 text-gray-700">
        Create a new Blog
      </div>
      <form
        className="flex flex-col  max-w-[800px] gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="font-medium my-2 text-xl">Title</div>
          <input
            type="text"
            onChange={(e) =>
              setBlogInput({ ...blogInput, title: e.target.value })
            }
            placeholder="Title"
            className="border w-full p-2 rounded border-gray-500"
            required
          />
        </div>
        <div>
          <div className="font-medium my-2 text-xl">Blog</div>
          <div className="overflow-hidden rounded border border-gray-500">
            <Editor setBlogInput={setBlogInput} blogInput={blogInput} />
          </div>
          {/* {content} */}
        </div>
        <button type="submit">
          <div className="bg-gray-500 text-white p-2 mt-3 rounded-md w-fit px-6 text-center hover:bg-slate-700 font-bold shadow-md">
            Publish
          </div>
        </button>
      </form>
    </div>
  );
}

export default Create;
