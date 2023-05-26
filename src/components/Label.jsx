import { func, string } from 'prop-types';
import { useContext, useState } from 'react';
import { MainContext } from '../contexts/MainContext';

function DeleteLabelIcon({ text, url, setLabels }) {
  const { setImages } = useContext(MainContext);
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
      className="absolute inset-y-0 right-0 m-auto h-6 w-6 cursor-pointer rounded-full bg-slate-200 hover:bg-slate-300 p-1 outline outline-1 outline-blue-500 dark:bg-slate-800 dark:hover:bg-slate-700"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function Highlight({ text }) {
  const { searchInput } = useContext(MainContext);
  const regex = new RegExp(searchInput, 'gi');

  const normalOnes = text.split(regex).map((n) => <span>{n}</span>);
  const matches = text.match(regex)
    ? text.match(regex).map((n) => <span className="bg-amber-300 dark:bg-amber-800">{n}</span>)
    : [];
  const concatenated = [];

  for (let i = 0; i < Math.max(normalOnes.length, matches.length); i += 1) {
    concatenated.push(normalOnes[i], matches[i]);
  }
  // console.dir(matches);
  return <span>{concatenated}</span>;
}

export default function Label({
  text, url, setLabels,
}) {
  const { searchInput, setSearchInput } = useContext(MainContext);
  const [hover, setHover] = useState(false);

  function seeLabels() {
    setSearchInput(text);
  }

  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={seeLabels}
      className="relative mb-2 mr-2 inline-flex w-fit rounded-full bg-blue-200 px-3.5 py-0.5 text-sm text-slate-800 outline outline-1 outline-blue-400 hover:pl-1 hover:pr-6 dark:bg-slate-800 dark:text-white dark:outline-blue-500"
    >
      {searchInput ? <Highlight text={text} /> : text}
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

Highlight.propTypes = {
  text: string.isRequired,
};

Label.propTypes = {
  text: string.isRequired,
  url: string,
  setLabels: func,
};

Label.defaultProps = {
  url: '',
  setLabels: undefined,
};
