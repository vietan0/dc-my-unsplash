import { arrayOf, string } from 'prop-types';
import { nanoid } from 'nanoid';
import { useContext, useState } from 'react';
import Label from './Label';
import { ImagesContext } from '../contexts/ImagesContext';

function DeleteImageIcon({ url }) {
  const { setImages } = useContext(ImagesContext);
  function removeImage() {
    setImages((prev) => {
      const dup = [...prev]; // just a local copy

      const targetImg = dup.find((obj) => obj.url === url);
      const targetImgIndex = dup.indexOf(targetImg);

      dup.splice(targetImgIndex, 1);
      return dup;
    });
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2.5"
      stroke="currentColor"
      onClick={removeImage}
      className="absolute right-2 top-2 h-6 w-6 cursor-pointer rounded-full bg-slate-200/50 stroke-slate-800 p-1 outline-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function Image({ url, labels }) {
  const [hover, setHover] = useState(false);
  function handleMouseEnter() {
    setHover(true);
  }
  function handleMouseLeave() {
    setHover(false);
  }
  return (
    <div
      className="relative rounded-md bg-blue-100 dark:bg-slate-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={url}
        alt=""
        className="rounded-md w-full"
      />
      <div className={labels.length > 0 ? 'p-4' : ''}>
        {labels.map((text) => (
          <Label
            text={text}
            url={url}
            key={nanoid()}
          />
        ))}
      </div>
      {hover && <DeleteImageIcon url={url} />}
    </div>
  );
}

DeleteImageIcon.propTypes = {
  url: string.isRequired,
};

Image.propTypes = {
  url: string.isRequired,
  labels: arrayOf(string).isRequired,
};
