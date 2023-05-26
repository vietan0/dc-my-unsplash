import { useContext, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import isUrl from 'is-url';
import { func } from 'prop-types';
import MoonLoader from 'react-spinners/MoonLoader';
import Label from './Label';
import { MainContext } from '../contexts/MainContext';

export default function AddPhotoForm({ setPopupOpen }) {
  const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dtaatflqb/image/upload';
  const { setImages } = useContext(MainContext);
  const [urlForm, setUrlForm] = useState('');
  const [fileChosen, setFileChosen] = useState();
  const [labelForm, setLabelForm] = useState('');
  const [labels, setLabels] = useState([]);
  const imageUrlInput = useRef(null);
  const [errMsg, setErrMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  // form handlers
  function handleUrlChange(e) {
    setUrlForm(e.target.value);
  }

  function handleFileChange(e) {
    if (e.target.files) {
      setFileChosen(e.target.files[0]);
      setUrlForm(e.target.files[0].name);
    }
  }

  function clearInput() {
    setUrlForm('');
    setFileChosen(null);
  }

  function handleLabelFormChange(e) {
    setLabelForm(e.target.value);
  }

  function addLabel(e) {
    const str = e.target.value;
    if (str) {
      if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        if (!labels.includes(str)) setLabels((prev) => [...prev, str]);
        setLabelForm('');
      }
    }
  }

  async function submit(e) {
    e.preventDefault();
    if (fileChosen) {
      // upload local file
      try {
        setUploading(true);
        const formData = new FormData();
        formData.append('file', fileChosen);
        formData.append('upload_preset', 'fdio4i5m');

        const res = await fetch(cloudinaryUrl, { method: 'POST', body: formData });
        const { url } = await res.json();
        setUploading(false);
        setImages((prev) => [{ labels, url }, ...prev]);
        setPopupOpen(false);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      // use public image url
      if (!urlForm) {
        setErrMsg('URL must not be empty');
        return;
      }
      if (!isUrl(urlForm)) {
        setErrMsg('Not a valid URL');
        return;
      }
      try {
        const res = await fetch(urlForm);
        // make sure it's an image
        if (!res.headers.get('content-type').includes('image')) {
          throw new Error('Not an image');
        }
        setImages((prev) => [{ labels, url: urlForm }, ...prev]);
        setPopupOpen(false);
      } catch (err) {
        setErrMsg(err.message);
      }
    }
  }

  useEffect(() => {
    // auto focus form
    imageUrlInput.current.focus();
  }, []);

  return (
    <>
      <p className="flex items-center gap-2 text-2xl font-bold">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Add a new photo
      </p>
      <form
        action=""
        className="flex flex-col gap-4"
      >
        <label
          htmlFor="imageUrl"
          className="flex flex-col gap-2"
        >
          <p>Image URL</p>
          <div className="flex items-center gap-4">
            <div className="relative flex flex-grow items-center">
              <input
                ref={imageUrlInput}
                type="text"
                id="imageUrl"
                placeholder="https://images.unsplash.com/your-amazing-photo"
                value={urlForm}
                onChange={handleUrlChange}
                disabled={fileChosen}
                className={`w-full rounded-md bg-slate-200 p-1.5 placeholder:text-slate-500 disabled:text-blue-300/60 dark:bg-slate-800 xs:p-3 ${
                  urlForm && 'pr-5 xs:pr-9'
                } ${errMsg && 'outline outline-red-500'}`}
              />
              {urlForm && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  onClick={clearInput}
                  className="absolute right-2 h-5 w-5 cursor-pointer rounded-full stroke-slate-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </div>
            {errMsg && <span className="text-red-500">{errMsg}</span>}
            <p>or</p>
            <input
              type="file"
              name="file"
              onChange={handleFileChange}
              className="max-w-[100px] cursor-pointer text-clip text-[6px] text-transparent file:rounded-md file:border file:border-solid file:border-blue-500 file:bg-slate-200 file:p-1.5 file:font-sans file:text-base file:text-slate-500 file:hover:bg-slate-300 file:active:bg-slate-400 dark:file:bg-slate-800 dark:file:hover:bg-slate-700 dark:file:active:bg-slate-900 xs:file:p-3"
            />
          </div>
        </label>
        <label
          htmlFor="label"
          className="flex flex-col gap-2"
        >
          <p>
            <span className="mr-2">Labels</span>
            {labels.map((text) => (
              <Label
                text={text}
                setLabels={setLabels}
                key={nanoid()}
              />
            ))}
          </p>
          <input
            type="text"
            id="label"
            placeholder="Press 'Tab' or 'Enter' to add a label"
            value={labelForm}
            onChange={handleLabelFormChange}
            onKeyDown={addLabel}
            className="w-full rounded-md bg-slate-200 p-1.5 placeholder:text-slate-500 dark:bg-slate-800 xs:p-3"
          />
        </label>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setPopupOpen(false)}
            className="rounded-md px-5 py-1.5 text-slate-950 outline outline-1 outline-slate-500 hover:bg-slate-200 focus:ring focus:ring-slate-500 active:bg-slate-300 dark:text-white dark:hover:bg-slate-800 dark:active:bg-slate-700 xs:py-3"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={submit}
            className="btn-primary"
            disabled={!urlForm}
          >
            {uploading ? (
              <MoonLoader
                color="white"
                loading={uploading}
                cssOverride={{ display: '-webkit-box' }}
                size={18}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </>
  );
}

AddPhotoForm.propTypes = { setPopupOpen: func.isRequired };
