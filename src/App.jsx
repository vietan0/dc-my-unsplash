import { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { MainContext } from './contexts/MainContext';
import layBricks from './utils/layBricks';
import MasonryCol from './components/MasonryCol';
import Header from './components/Header';

function App() {
  const { images, searchInput } = useContext(MainContext);

  const gridBreaks = [400, 520, 840, 1024, 1440];
  function setSize() {
    const wW = window.innerWidth;
    if (wW <= gridBreaks[1]) {
      return 'grid-cols-1';
    }
    if (gridBreaks[1] < wW && wW <= gridBreaks[2]) {
      return 'grid-cols-2';
    }
    if (gridBreaks[2] < wW && wW <= gridBreaks[3]) {
      return 'grid-cols-3';
    }
    if (gridBreaks[3] < wW && wW <= gridBreaks[4]) {
      return 'grid-cols-4';
    }
    return 'grid-cols-5';
  }

  const [gridCols, setGridCols] = useState(setSize());
  useEffect(() => {
    window.addEventListener('resize', () => {
      setGridCols(setSize());
    });
  }, []);

  const filtered = images.filter((image) => {
    const { labels } = image;
    return searchInput
      ? labels.includes(searchInput) || labels.filter((str) => str.includes(searchInput)).length > 0
      : image;
  });

  const cols = layBricks(filtered, gridCols.charAt(gridCols.length - 1));
  const colElems = cols.map((col) => (
    <MasonryCol
      col={col}
      key={nanoid()}
    />
  ));

  return (
    <div className="App m-auto flex min-h-screen max-w-screen-xl flex-col gap-4 px-4 pb-4 xs:px-8 xs:pb-8 sm:px-12">
      <h1 className="sr-only">My Unsplash</h1>
      <Header />
      <div className={`grid ${gridCols} flex-grow gap-6`}>{colElems}</div>
    </div>
  );
}

export default App;
