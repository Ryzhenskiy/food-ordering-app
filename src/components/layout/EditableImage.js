import Image from 'next/image';
import toast from 'react-hot-toast';
const EditableImage = ({ link, setLink }) => {
  async function handleFileChange(ev) {
    const files = ev.target.files;
    const uploadingPromise = new Promise(async (resolve, reject) => {
      if (files?.length > 0) {
        console.log(files);
        const data = new FormData();
        data.set('file', files[0]);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: data,
        });
        const link = await response.json();
        setLink(link);
        if (response.ok) resolve();
        else reject();
      }
    });
    await toast.promise(uploadingPromise, {
      loading: 'Uploading...',
      success: 'Image uploaded!',
      error: 'Failed to upload!',
    });
  }

  return (
    <>
      {link && (
        <Image
          src={link}
          width={250}
          height={250}
          alt={'avatar'}
          className="rounded-lg w-full h-full mb-1"
        />
      )}
      {!link && (
        <div className="flex justify-center items-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
          Edit
        </span>
      </label>
    </>
  );
};
export default EditableImage;
