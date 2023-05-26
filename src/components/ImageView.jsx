import { arrayOf, string } from 'prop-types';
import { nanoid } from 'nanoid';
import Label from './Label';

export default function ImageView({ url, labels }) {
  function copy() {
    navigator.clipboard.writeText(url);
  }

  function download() {
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-unsplash-${nanoid()}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <>
      <div className="flex max-w-full gap-4">
        <button
          type="button"
          onClick={download}
          className="flex cursor-pointer gap-2 rounded-full bg-slate-200 px-4 py-2 hover:bg-slate-300 focus:ring active:bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-800"
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
          <span className="text-sm">View Full Size</span>
        </button>
        <button
          type="button"
          onClick={copy}
          className="flex cursor-pointer gap-2 rounded-full bg-slate-200 px-4 py-2 hover:bg-slate-300 focus:ring active:bg-slate-400 dark:bg-slate-800 dark:hover:bg-slate-700 dark:active:bg-slate-800"
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
          <span className="text-sm">Copy URL</span>
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
