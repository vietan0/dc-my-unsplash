import { arrayOf, string } from 'prop-types';
import { nanoid } from 'nanoid';
import { useContext } from 'react';
import Label from './Label';
import { MainContext } from '../contexts/MainContext';

export default function ImageView({ url, labels }) {
  const { setImages } = useContext(MainContext);
  function viewFullSize() {
    const a = document.createElement('a');
    a.href = url;
    a.click();
  }

  function copy() {
    navigator.clipboard.writeText(url);
  }

  function removeImage(e) {
    e.stopPropagation();
    setImages((prev) => {
      const dup = [...prev]; // just a local copy

      const targetImg = dup.find((obj) => obj.url === url);
      const targetImgIndex = dup.indexOf(targetImg);

      dup.splice(targetImgIndex, 1);
      return dup;
    });
  }

  return (
    <>
      <div className="flex max-w-full gap-4">
        <button
          type="button"
          onClick={viewFullSize}
          className="flex cursor-pointer gap-2 rounded-full bg-slate-200 px-4 py-2 hover:bg-slate-300 focus:ring active:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
          <span className="hidden text-sm sm:inline">View Full Size</span>
        </button>
        <button
          type="button"
          onClick={copy}
          className="flex cursor-pointer gap-2 rounded-full bg-slate-200 px-4 py-2 hover:bg-slate-300 focus:ring active:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
            />
          </svg>
          <span className="hidden text-sm sm:inline">Copy URL</span>
        </button>
        <button
          type="button"
          onClick={removeImage}
          className="ml-auto flex cursor-pointer gap-2 rounded-full px-4 py-2 outline outline-1 outline-red-600 hover:bg-slate-300 focus:ring active:bg-slate-200 dark:outline-red-400  dark:hover:bg-slate-700 dark:active:bg-slate-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-5 w-5 stroke-red-600 dark:stroke-red-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>

          <span className="hidden text-sm text-red-600 dark:text-red-400 sm:inline">Remove</span>
        </button>
      </div>
      <img
        src={url}
        alt=""
        className="max-h-[70vh] object-contain"
      />
      <div>
        {labels.map((text) => (
          <Label
            text={text}
            url={url}
            key={nanoid()}
          />
        ))}
      </div>
    </>
  );
}

ImageView.propTypes = {
  url: string.isRequired,
  labels: arrayOf(string).isRequired,
};
