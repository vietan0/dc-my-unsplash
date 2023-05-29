import { arrayOf, string, number } from 'prop-types';
import { nanoid } from 'nanoid';
import { useContext, useEffect, useRef, useState } from 'react';
import Label from './Label';
import { MainContext } from '../contexts/MainContext';

function DeleteImageIcon({ url }) {
  const { setImages } = useContext(MainContext);
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
      className="absolute right-2 top-2 h-6 w-6 cursor-pointer rounded-full bg-slate-200/50 stroke-slate-800 p-1 outline-1 hover:bg-slate-300/50"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

export default function ImageCard({ url, labels, index }) {
  const { setImageViewOpen } = useContext(MainContext);
  const [hover, setHover] = useState(false);
  const image = useRef(null);

  function handleMouseEnter() {
    setHover(true);
  }
  function handleMouseLeave() {
    setHover(false);
  }

  useEffect(() => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        const img = entry.target;
        if (index <= 2) img.setAttribute('src', url); // first few load as usual
        else if (entry.isIntersecting) {
          // this logic only concerns with "third or below" images
          if (entry.boundingClientRect.height > 0) {
            img.setAttribute('src', url);
            img.classList.remove('fakeHeight');
            observer.disconnect();
          } else img.classList.add('fakeHeight');
        }
      });
    });
    io.observe(image.current);
  }, []);

  return (
    <div
      className="relative cursor-pointer rounded-md bg-blue-100 dark:bg-slate-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setImageViewOpen({ url, labels })}
    >
      <img
        ref={image}
        alt=""
        className="w-full rounded-md"
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

DeleteImageIcon.propTypes = { url: string.isRequired };

ImageCard.propTypes = {
  url: string.isRequired,
  labels: arrayOf(string).isRequired,
  index: number.isRequired,
};
