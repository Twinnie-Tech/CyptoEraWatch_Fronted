import { ArticleDetails } from "@app/Dummy/MOCK_DATA";
import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useUser } from "@app/context/UserContext";
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
const cloudPreset = process.env.NEXT_PUBLIC_CLOUD_PRESET;

interface UpdateFormProps {
  blog: ArticleDetails;
  type: string;
  fetchPosts: () => Promise<void>;
}

//, fetchPosts
const UpdateForm = ({ blog, type, fetchPosts }: UpdateFormProps) => {
  const { user } = useUser();
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null | any>(null);
  const router = useRouter();

  const [post, setPost] = useState({
    title: blog.title,
    content: blog.content,
    tag: blog.tag,
    image: blog.image,
    status: blog.status,
  });

  const uploadImage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!file || !cloudPreset || !cloudName) {
        throw new Error("Missing required data for upload");
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", cloudPreset);

      console.log(formData, "formData");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data, "data response");

      setPost({ ...post, image: data.secure_url });
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
    }
  };

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const resp = await fetch(`/api/blog/update/`, {
        method: "PATCH",
        body: JSON.stringify({
          id: blog.id,
          title: post.title,
          content: post.content,
          tag: post.tag,
          image: post.image,
          status: post.status,
        }),
      });

      if (resp.ok) {
        const updatedBlog = await resp.json();

        blog.title = updatedBlog.title;
        blog.content = updatedBlog.content;
        blog.tag = updatedBlog.tag;
        blog.image = updatedBlog.image;
        blog.status = updatedBlog.status;

        //Refetch posts to update the DataTable
        await fetchPosts();

        toast.success("Blog updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        // Close the modal by clicking the AlertDialog.Action button
        const cancelButton = document.querySelector(
          '[data-state="open"] button.px-5.py-1\\.5.bg-red-600'
        ) as HTMLButtonElement;
        if (cancelButton) {
          cancelButton.click();
        }

        router.push("/dashboard");
      } else {
        throw new Error("Failed to update blog");
      }
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetImage = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setPreview(null);
    setFile(null);

    // Reset the file input value
    const fileInput = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result);
        }
      };
    }
  };

  const renderImagePreview = () => {
    if (preview) {
      return (
        <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
          <img
            src={preview}
            alt="preview"
            className="w-[50%] h-[50%] rounded-md"
          />
        </div>
      );
    } else if (blog.image) {
      return (
        <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
          <img
            src={blog.image[0]}
            alt="current"
            className="w-[50%] h-[50%] rounded-md"
          />
        </div>
      );
    } else {
      return (
        <div className="flex-col items-center justify-end space-y-3 mt-10">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                fill="#3C50E0"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                fill="#3C50E0"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                fill="#3C50E0"
              />
            </svg>
          </span>
          <p>
            <span className="text-primary">Click to upload</span> or drag and
            drop
          </p>
          <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
          <p>(max, 800 X 800px)</p>
        </div>
      );
    }
  };

  return (
    <section>
      <form onSubmit={updatePost} className="w-full">
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Blog Title {` `}
          </span>
          <span className="font-normal"></span>
          <input
            value={post.title}
            onChange={(e) =>
              setPost({
                ...post,
                title: e.target.value,
              })
            }
            placeholder={blog?.title}
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Content
          </span>
          <textarea
            value={post.content}
            onChange={(e) =>
              setPost({
                ...post,
                content: e.target.value,
              })
            }
            placeholder={blog.content}
            className="form_textarea"
            required
          />
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Tags {` `}
          </span>
          <span className="font-normal">(#Bitcoin,#Ethereum)</span>
          <input
            value={post.tag}
            onChange={(e) =>
              setPost({
                ...post,
                tag: e.target.value,
              })
            }
            placeholder={blog?.tag}
            required
            className="form_input"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Status
          </span>
          {user?.role == "admin" ? (
            <select
              value={post.status}
              onChange={(e) => setPost({ ...post, status: e.target.value })}
              className="w-full"
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          ) : (
            <p>{post?.status}</p>
          )}
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700 ">
            Blog Image
          </span>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark mt-5">
            <div
              id="FileUpload"
              className="relative mt-5 mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
            >
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
              />

              {renderImagePreview()}
            </div>
            <div className="flex justify-end gap-4.5">
              {loading ? (
                <p className="text-red-500">Processing...</p>
              ) : (
                <p></p>
              )}
              <button
                className="flex justify-center rounded-md border border-stroke py-2 px-6 font-bold text-white hover:shadow-1 bg-red-600 dark:border-strokedark dark:text-white mr-2"
                type="submit"
                onClick={handleResetImage}
              >
                Cancel
              </button>
              <Button
                className="bg-blue-600 hover:bg-white  hover:text-black hover:border-blue-600 hover:border-2"
                type="submit"
                onClick={uploadImage}
                disabled={!file}
              >
                Save
              </Button>
            </div>
          </div>
        </label>

        <div className="flex-end mx-3 gap-4 mt-4">
          <AlertDialog.Action asChild>
            <button className="px-5 py-1.5  bg-red-600 hover:bg-red-400  rounded-full text-white">
              Cancel
            </button>
          </AlertDialog.Action>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default UpdateForm;
