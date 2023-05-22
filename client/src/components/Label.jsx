import { func, string } from 'prop-types';
import { useContext, useState } from 'react';
import { ImagesContext } from '../contexts/ImagesContext';

function DeleteLabelIcon({ text, url, setLabels }) {
  const { setImages } = useContext(ImagesContext);
  function removeLabel() {
    // if setLabels is present, this is Label in Popup, click X will change label in form
    if (setLabels) setLabels((prevArr) => prevArr.filter((label) => label !== text));
    // else this is Label in Image, click X will setImages
    else {
      setImages((prev) => {
        const dup = [...prev]; // just a local copy

        const targetImg = dup.find((obj) => obj.url === url);
        const targetImgIndex = dup.indexOf(targetImg);
        const targetLabelIndex = targetImg.labels.indexOf(text);
        targetImg.labels.splice(targetLabelIndex, 1); // delete that label

        // stick modified targetImg back in
        dup.splice(targetImgIndex, 1, targetImg);
        return dup;
      });
    }
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      onClick={removeLabel}
      className="absolute inset-y-0 right-0 m-auto h-6 w-6 cursor-pointer rounded-full bg-slate-200 p-1 outline outline-1 outline-blue-500 dark:bg-slate-800"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function Label({
  text, url, setLabels, mt,
}) {
  const [hover, setHover] = useState(false);

  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`relative mr-2 ${mt} mb-2 inline-flex w-fit rounded-full bg-blue-200 px-3.5 py-0.5 text-sm text-slate-800 outline outline-1 outline-blue-400 hover:pl-1 hover:pr-6 dark:bg-slate-800 dark:text-white dark:outline-blue-500`}
    >
      {text}
      {hover && (
        <DeleteLabelIcon
          text={text}
          url={url}
          setLabels={setLabels}
        />
      )}
    </span>
  );
}

DeleteLabelIcon.propTypes = {
  text: string.isRequired,
  url: string,
  setLabels: func,
};

DeleteLabelIcon.defaultProps = {
  url: '',
  setLabels: undefined,
};

Label.propTypes = {
  text: string.isRequired,
  url: string,
  setLabels: func,
  mt: string,
};

Label.defaultProps = {
  url: '',
  setLabels: undefined,
  mt: '',
};
