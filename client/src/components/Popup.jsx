import { func } from 'prop-types';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { nanoid } from 'nanoid';
import isUrl from 'is-url';
import Label from './Label';
import { ImagesContext } from '../contexts/ImagesContext';

export default function Popup({ setPopupOpen }) {
  const { setImages } = useContext(ImagesContext);
  const [urlForm, setUrlForm] = useState('');
  const [labelForm, setLabelForm] = useState('');
  const [labels, setLabels] = useState([]);
  const imageUrlInput = useRef(null);
  const [errMsg, setErrMsg] = useState('');

  // close popup handlers
  const close = () => setPopupOpen(false);
  const preventBubbling = (e) => e.stopPropagation();
  const handlePressEsc = (e) => e.key === 'Escape' && close();

  // form handlers
  function handleUrlChange(e) {
    setUrlForm(e.target.value);
  }

  function handleLabelFormChange(e) {
    setLabelForm(e.target.value);
  }

  function addLabel(e) {
    if (e.target.value) {
      if (e.key === 'Tab' || e.key === 'Enter') {
        e.preventDefault();
        setLabels((prev) => [...prev, e.target.value]);
        setLabelForm('');
      }
    }
  }

  function submit(e) {
    e.preventDefault();
    if (!urlForm) {
      setErrMsg('URL must not be empty');
      return;
    }
    if (!isUrl(urlForm)) {
      setErrMsg('Not a valid URL');
      return;
    }
    try {
      fetch(urlForm).then((res) => {
        // make sure it's an image
        if (!res.headers.get('content-type').includes('image')) {
          throw new Error('Not an image');
        }
        setImages((prev) => [{ labels, url: urlForm }, ...prev]);
        setPopupOpen(false);
      });
    } catch (err) {
      setErrMsg(err.message);
    }
  }

  useEffect(() => {
    // auto focus form
    imageUrlInput.current.focus();

    window.addEventListener('keydown', handlePressEsc);
    return () => {
      window.removeEventListener('keydown', handlePressEsc);
    };
  }, []);

  return (
    <div
      className="backdrop absolute inset-0 z-10 bg-gray-950/80"
      onClick={close}
    >
      <div
        onClick={preventBubbling}
        className="dialog absolute inset-0 m-auto flex h-min w-5/6 min-w-min max-w-xl flex-col gap-4 rounded-xl bg-slate-50 p-6 dark:bg-slate-900 sm:w-8/12"
      >
        <p className="ali flex items-center gap-2 text-2xl font-bold">
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
            <input
              ref={imageUrlInput}
              type="text"
              id="imageUrl"
              placeholder="https://images.unsplash.com/your-amazing-photo"
              value={urlForm}
              onChange={handleUrlChange}
              className={`w-full rounded-md bg-slate-200 p-1.5 placeholder:text-slate-500 dark:bg-slate-800 xs:p-3 ${errMsg && 'outline outline-red-500'}`}
            />
            {errMsg && <span className="text-red-500">{errMsg}</span>}
          </label>
          <label
            htmlFor="label"
            className="flex flex-col gap-2"
          >
            <p>
              Labels
              <br />
              {labels.map((text) => (
                <Label
                  text={text}
                  setLabels={setLabels}
                  mt="mt-2"
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
              onClick={close}
              className="rounded-md border border-blue-500 px-5 py-1.5 text-slate-950 dark:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              className="rounded-md bg-blue-700 px-5 py-1.5 text-white dark:bg-blue-500 xs:py-3"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Popup.propTypes = {
  setPopupOpen: func.isRequired,
};
