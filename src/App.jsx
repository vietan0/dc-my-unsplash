import { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { MainContext } from './contexts/MainContext';
import layBricks from './utils/layBricks';
import Popup from './components/Popup';
import MasonryCol from './components/MasonryCol';
import AddPhotoForm from './components/AddPhotoForm';
import ImageView from './components/ImageView';

function App() {
  const { images, imageViewOpen, setImageViewOpen, searchInput, setSearchInput } = useContext(MainContext);
  const [addPhotoOpen, setAddPhotoOpen] = useState(false);

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

  function handleAddPhotoClick() {
    setAddPhotoOpen(true);
  }

  function handleSearchChange(e) {
    setSearchInput(e.target.value);
  }
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
      {addPhotoOpen && (
        <Popup setPopupOpen={setAddPhotoOpen}>
          <AddPhotoForm setPopupOpen={setAddPhotoOpen} />
        </Popup>
      )}
      {Object.keys(imageViewOpen).length > 0 && (
        <Popup setPopupOpen={setImageViewOpen}>
          <ImageView
            url={imageViewOpen.url}
            labels={imageViewOpen.labels}
            setPopupOpen={setImageViewOpen}
          />
        </Popup>
      )}
      <header className="sticky top-0 z-10 flex flex-col items-stretch justify-between gap-4 bg-white/80 py-4 backdrop-blur-xl dark:bg-slate-950/80 sm:flex-row sm:gap-8">
        <div className="flex max-w-xl flex-col gap-4 xs:flex-1 xs:flex-row xs:items-center">
          <a href="/">
            <svg
              className="min-w-[100px]"
              width="138"
              height="26"
              viewBox="0 0 138 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M36.6626 11.7246L34.4226 4.17861H34.3666C34.376 4.36528 34.39 4.63594 34.4086 4.99061C34.4366 5.33594 34.46 5.70928 34.4786 6.11061C34.4973 6.51194 34.5066 6.88061 34.5066 7.21661V11.7246H32.3786V1.72861H35.5986L37.8246 9.12061H37.8806L40.1766 1.72861H43.3826V11.7246H41.1706V7.16061C41.1706 6.84328 41.1753 6.49328 41.1846 6.11061C41.2033 5.71861 41.2173 5.34994 41.2266 5.00461C41.2453 4.64994 41.2593 4.37928 41.2686 4.19261H41.2126L38.9026 11.7246H36.6626ZM44.5601 4.03861H47.0801L48.4661 8.39261C48.5127 8.55128 48.5501 8.72861 48.5781 8.92461C48.6154 9.11128 48.6434 9.30261 48.6621 9.49861H48.7041C48.7321 9.28394 48.7647 9.08794 48.8021 8.91061C48.8487 8.72394 48.8954 8.55594 48.9421 8.40661L50.3281 4.03861H52.7921L49.6281 12.4806C49.3107 13.3393 48.8767 13.9879 48.3261 14.4266C47.7754 14.8653 47.0707 15.0846 46.2121 15.0846C45.9694 15.0846 45.7594 15.0706 45.5821 15.0426C45.4141 15.0239 45.2647 15.0006 45.1341 14.9726V13.1106C45.2367 13.1293 45.3581 13.1479 45.4981 13.1666C45.6474 13.1853 45.8014 13.1946 45.9601 13.1946C46.3987 13.1946 46.7347 13.0639 46.9681 12.8026C47.2014 12.5413 47.3834 12.2333 47.5141 11.8786L47.5981 11.6406L44.5601 4.03861ZM65.9052 1.72861V7.98661C65.9052 8.75194 65.7466 9.42394 65.4292 10.0026C65.1212 10.5813 64.6546 11.0386 64.0292 11.3746C63.4132 11.7013 62.6292 11.8646 61.6772 11.8646C60.3332 11.8646 59.3066 11.5193 58.5972 10.8286C57.8879 10.1379 57.5332 9.19528 57.5332 8.00061V1.72861H59.9272V7.73461C59.9272 8.49994 60.0766 9.04594 60.3752 9.37261C60.6832 9.69928 61.1359 9.86261 61.7332 9.86261C62.3586 9.86261 62.8112 9.69461 63.0912 9.35861C63.3806 9.01328 63.5252 8.46728 63.5252 7.72061V1.72861H65.9052ZM72.5953 3.89861C73.4073 3.89861 74.0606 4.12261 74.5553 4.57061C75.0593 5.00928 75.3113 5.72328 75.3113 6.71261V11.7246H72.9593V7.37061C72.9593 6.83861 72.8706 6.43728 72.6933 6.16661C72.5159 5.89594 72.2359 5.76061 71.8533 5.76061C71.2839 5.76061 70.8966 5.97528 70.6913 6.40461C70.4859 6.82461 70.3833 7.43128 70.3833 8.22461V11.7246H68.0173V4.03861H69.8093L70.1313 5.03261H70.2433C70.4859 4.65928 70.8126 4.37928 71.2233 4.19261C71.6339 3.99661 72.0913 3.89861 72.5953 3.89861ZM82.8305 9.40061C82.8305 10.1566 82.5645 10.7586 82.0325 11.2066C81.5098 11.6453 80.6885 11.8646 79.5685 11.8646C79.0271 11.8646 78.5511 11.8319 78.1405 11.7666C77.7391 11.7013 77.3331 11.5846 76.9225 11.4166V9.51261C77.3705 9.71794 77.8371 9.87661 78.3225 9.98861C78.8078 10.0913 79.2185 10.1426 79.5545 10.1426C79.9091 10.1426 80.1658 10.0959 80.3245 10.0026C80.4831 9.90928 80.5625 9.77861 80.5625 9.61061C80.5625 9.48928 80.5205 9.38194 80.4365 9.28861C80.3618 9.19528 80.2031 9.09261 79.9605 8.98061C79.7271 8.85928 79.3771 8.70061 78.9105 8.50461C78.4531 8.30861 78.0751 8.10794 77.7765 7.90261C77.4871 7.69728 77.2678 7.45461 77.1185 7.17461C76.9785 6.88528 76.9085 6.52594 76.9085 6.09661C76.9085 5.36861 77.1885 4.82261 77.7485 4.45861C78.3178 4.08528 79.0691 3.89861 80.0025 3.89861C80.4971 3.89861 80.9638 3.94994 81.4025 4.05261C81.8411 4.15528 82.2938 4.31394 82.7605 4.52861L82.0885 6.12461C81.7058 5.95661 81.3325 5.82128 80.9685 5.71861C80.6138 5.61594 80.2918 5.56461 80.0025 5.56461C79.4611 5.56461 79.1905 5.70461 79.1905 5.98461C79.1905 6.08728 79.2278 6.18528 79.3025 6.27861C79.3865 6.36261 79.5405 6.45594 79.7645 6.55861C79.9978 6.66128 80.3338 6.80594 80.7725 6.99261C81.2111 7.16994 81.5845 7.36128 81.8925 7.56661C82.2005 7.76261 82.4338 8.00528 82.5925 8.29461C82.7511 8.58394 82.8305 8.95261 82.8305 9.40061ZM88.8625 3.89861C89.7212 3.89861 90.4072 4.23928 90.9205 4.92061C91.4338 5.59261 91.6905 6.57261 91.6905 7.86061C91.6905 8.73794 91.5645 9.47528 91.3125 10.0726C91.0605 10.6606 90.7152 11.1086 90.2765 11.4166C89.8472 11.7153 89.3525 11.8646 88.7925 11.8646C88.2418 11.8646 87.8078 11.7666 87.4905 11.5706C87.1825 11.3746 86.9352 11.1599 86.7485 10.9266H86.6505C86.6785 11.1039 86.7018 11.2906 86.7205 11.4866C86.7392 11.6826 86.7485 11.8926 86.7485 12.1166V15.0846H84.3825V4.03861H86.3005L86.6365 5.01861H86.7485C86.9445 4.71994 87.2105 4.45861 87.5465 4.23461C87.8825 4.01061 88.3212 3.89861 88.8625 3.89861ZM88.0365 5.76061C87.5605 5.76061 87.2292 5.91928 87.0425 6.23661C86.8558 6.54461 86.7578 7.01128 86.7485 7.63661V7.84661C86.7485 8.52794 86.8418 9.05061 87.0285 9.41461C87.2152 9.77861 87.5605 9.96061 88.0645 9.96061C88.8765 9.96061 89.2825 9.25128 89.2825 7.83261C89.2825 7.11394 89.1798 6.59128 88.9745 6.26461C88.7692 5.92861 88.4565 5.76061 88.0365 5.76061ZM95.6762 11.7246H93.3102V1.08461H95.6762V11.7246ZM101.143 3.88461C102.142 3.88461 102.916 4.11794 103.467 4.58461C104.018 5.05128 104.293 5.73261 104.293 6.62861V11.7246H102.655L102.193 10.6886H102.137C101.81 11.1086 101.465 11.4119 101.101 11.5986C100.737 11.7759 100.238 11.8646 99.6029 11.8646C98.9216 11.8646 98.3569 11.6639 97.9089 11.2626C97.4609 10.8613 97.2369 10.2406 97.2369 9.40061C97.2369 8.58861 97.5216 7.98661 98.0909 7.59461C98.6696 7.19328 99.5143 6.96928 100.625 6.92261L101.941 6.88061V6.65661C101.941 6.28328 101.843 6.01261 101.647 5.84461C101.46 5.67661 101.199 5.59261 100.863 5.59261C100.527 5.59261 100.177 5.64861 99.8129 5.76061C99.4489 5.86328 99.0803 5.99394 98.7069 6.15261L97.9929 4.58461C98.4129 4.36061 98.8889 4.18794 99.4209 4.06661C99.9529 3.94528 100.527 3.88461 101.143 3.88461ZM101.941 8.22461L101.227 8.25261C100.639 8.27128 100.228 8.37861 99.9949 8.57461C99.7616 8.76128 99.6449 9.01794 99.6449 9.34461C99.6449 9.63394 99.7289 9.84394 99.8969 9.97461C100.065 10.1053 100.28 10.1706 100.541 10.1706C100.933 10.1706 101.264 10.0539 101.535 9.82061C101.806 9.57794 101.941 9.25128 101.941 8.84061V8.22461ZM111.815 9.40061C111.815 10.1566 111.549 10.7586 111.017 11.2066C110.494 11.6453 109.673 11.8646 108.553 11.8646C108.012 11.8646 107.536 11.8319 107.125 11.7666C106.724 11.7013 106.318 11.5846 105.907 11.4166V9.51261C106.355 9.71794 106.822 9.87661 107.307 9.98861C107.792 10.0913 108.203 10.1426 108.539 10.1426C108.894 10.1426 109.15 10.0959 109.309 10.0026C109.468 9.90928 109.547 9.77861 109.547 9.61061C109.547 9.48928 109.505 9.38194 109.421 9.28861C109.346 9.19528 109.188 9.09261 108.945 8.98061C108.712 8.85928 108.362 8.70061 107.895 8.50461C107.438 8.30861 107.06 8.10794 106.761 7.90261C106.472 7.69728 106.252 7.45461 106.103 7.17461C105.963 6.88528 105.893 6.52594 105.893 6.09661C105.893 5.36861 106.173 4.82261 106.733 4.45861C107.302 4.08528 108.054 3.89861 108.987 3.89861C109.482 3.89861 109.948 3.94994 110.387 4.05261C110.826 4.15528 111.278 4.31394 111.745 4.52861L111.073 6.12461C110.69 5.95661 110.317 5.82128 109.953 5.71861C109.598 5.61594 109.276 5.56461 108.987 5.56461C108.446 5.56461 108.175 5.70461 108.175 5.98461C108.175 6.08728 108.212 6.18528 108.287 6.27861C108.371 6.36261 108.525 6.45594 108.749 6.55861C108.982 6.66128 109.318 6.80594 109.757 6.99261C110.196 7.16994 110.569 7.36128 110.877 7.56661C111.185 7.76261 111.418 8.00528 111.577 8.29461C111.736 8.58394 111.815 8.95261 111.815 9.40061ZM115.733 1.08461V2.94661C115.733 3.41328 115.719 3.83328 115.691 4.20661C115.663 4.57061 115.64 4.83661 115.621 5.00461H115.747C115.99 4.60328 116.293 4.31861 116.657 4.15061C117.03 3.98261 117.45 3.89861 117.917 3.89861C118.449 3.89861 118.92 3.99661 119.331 4.19261C119.751 4.38861 120.078 4.69194 120.311 5.10261C120.544 5.51328 120.661 6.04994 120.661 6.71261V11.7246H118.295V7.37061C118.295 6.29728 117.931 5.76061 117.203 5.76061C116.643 5.76061 116.256 5.97528 116.041 6.40461C115.836 6.82461 115.733 7.42661 115.733 8.21061V11.7246H113.367V1.08461H115.733Z"
                  fill="black"
                  className="fill-black dark:fill-white"
                />
                <rect
                  x="7.52856"
                  y="3.91125"
                  width="7.08874"
                  height="7.08874"
                  rx="2"
                  fill="black"
                  className="fill-black dark:fill-white"
                />
                <rect
                  y="15"
                  width="22.1458"
                  height="7.08874"
                  rx="2"
                  fill="black"
                  className="fill-black dark:fill-white"
                />
                <path
                  d="M33.6146 23.8942C33.0326 23.8942 32.5616 23.6842 32.2016 23.2642C31.8476 22.8442 31.6706 22.2202 31.6706 21.3922C31.6706 20.5582 31.8506 19.9282 32.2106 19.5022C32.5706 19.0762 33.0446 18.8632 33.6326 18.8632C33.9986 18.8632 34.2986 18.9322 34.5326 19.0702C34.7666 19.2082 34.9556 19.3762 35.0996 19.5742H35.1536C35.1416 19.4962 35.1266 19.3762 35.1086 19.2142C35.0906 19.0522 35.0816 18.9082 35.0816 18.7822V16.9642H36.0356V23.8042H35.2886L35.1266 23.1562H35.0816C34.9436 23.3662 34.7576 23.5432 34.5236 23.6872C34.2896 23.8252 33.9866 23.8942 33.6146 23.8942ZM33.8396 23.1112C34.3076 23.1112 34.6376 22.9822 34.8296 22.7242C35.0216 22.4602 35.1176 22.0672 35.1176 21.5452V21.4012C35.1176 20.8372 35.0246 20.4052 34.8386 20.1052C34.6586 19.7992 34.3226 19.6462 33.8306 19.6462C33.4406 19.6462 33.1466 19.8052 32.9486 20.1232C32.7506 20.4352 32.6516 20.8642 32.6516 21.4102C32.6516 21.9562 32.7506 22.3762 32.9486 22.6702C33.1466 22.9642 33.4436 23.1112 33.8396 23.1112ZM39.4387 18.8632C40.0747 18.8632 40.5757 19.0612 40.9417 19.4572C41.3077 19.8472 41.4907 20.3812 41.4907 21.0592V21.5812H38.2327C38.2447 22.0792 38.3737 22.4602 38.6197 22.7242C38.8717 22.9882 39.2227 23.1202 39.6727 23.1202C39.9847 23.1202 40.2607 23.0932 40.5007 23.0392C40.7467 22.9792 40.9987 22.8922 41.2567 22.7782V23.5702C41.0107 23.6782 40.7647 23.7592 40.5187 23.8132C40.2727 23.8672 39.9787 23.8942 39.6367 23.8942C39.1627 23.8942 38.7457 23.8012 38.3857 23.6152C38.0317 23.4292 37.7527 23.1532 37.5487 22.7872C37.3507 22.4152 37.2517 21.9592 37.2517 21.4192C37.2517 20.8732 37.3417 20.4112 37.5217 20.0332C37.7077 19.6552 37.9627 19.3672 38.2867 19.1692C38.6167 18.9652 39.0007 18.8632 39.4387 18.8632ZM39.4387 19.6012C39.0967 19.6012 38.8207 19.7122 38.6107 19.9342C38.4067 20.1562 38.2867 20.4712 38.2507 20.8792H40.5367C40.5307 20.5012 40.4377 20.1952 40.2577 19.9612C40.0837 19.7212 39.8107 19.6012 39.4387 19.6012ZM43.5943 23.8042L41.7583 18.9532H42.7663L43.7743 21.7882C43.8403 21.9742 43.9063 22.1842 43.9723 22.4182C44.0383 22.6462 44.0803 22.8352 44.0983 22.9852H44.1343C44.1583 22.8352 44.2063 22.6432 44.2783 22.4092C44.3503 22.1752 44.4163 21.9682 44.4763 21.7882L45.4843 18.9532H46.4923L44.6473 23.8042H43.5943ZM49.1956 23.8942C48.5236 23.8942 47.9836 23.6962 47.5756 23.3002C47.1676 22.8982 46.9636 22.2682 46.9636 21.4102C46.9636 20.8102 47.0626 20.3242 47.2606 19.9522C47.4586 19.5802 47.7316 19.3072 48.0796 19.1332C48.4276 18.9532 48.8236 18.8632 49.2676 18.8632C49.5376 18.8632 49.7896 18.8932 50.0236 18.9532C50.2636 19.0072 50.4616 19.0702 50.6176 19.1422L50.3296 19.9162C50.1616 19.8502 49.9816 19.7932 49.7896 19.7452C49.6036 19.6972 49.4266 19.6732 49.2586 19.6732C48.3826 19.6732 47.9446 20.2492 47.9446 21.4012C47.9446 21.9532 48.0526 22.3732 48.2686 22.6612C48.4846 22.9492 48.8026 23.0932 49.2226 23.0932C49.4926 23.0932 49.7296 23.0632 49.9336 23.0032C50.1436 22.9432 50.3356 22.8652 50.5096 22.7692V23.5972C50.3356 23.6992 50.1466 23.7742 49.9426 23.8222C49.7386 23.8702 49.4896 23.8942 49.1956 23.8942ZM52.6087 16.9642V18.7912C52.6087 18.9472 52.6027 19.1002 52.5907 19.2502C52.5787 19.3942 52.5667 19.5142 52.5547 19.6102H52.6177C52.7737 19.3582 52.9807 19.1722 53.2387 19.0522C53.5027 18.9322 53.7877 18.8722 54.0937 18.8722C54.6637 18.8722 55.0987 19.0132 55.3987 19.2952C55.7047 19.5772 55.8577 20.0272 55.8577 20.6452V23.8042H54.9127V20.7802C54.9127 20.0242 54.5797 19.6462 53.9137 19.6462C53.4157 19.6462 53.0737 19.7962 52.8877 20.0962C52.7017 20.3902 52.6087 20.8132 52.6087 21.3652V23.8042H51.6547V16.9642H52.6087ZM59.2047 18.8632C59.8107 18.8632 60.2637 18.9982 60.5637 19.2682C60.8697 19.5322 61.0227 19.9492 61.0227 20.5192V23.8042H60.3477L60.1587 23.1292H60.1227C59.9127 23.3932 59.6907 23.5882 59.4567 23.7142C59.2287 23.8342 58.9107 23.8942 58.5027 23.8942C58.0647 23.8942 57.7017 23.7772 57.4137 23.5432C57.1257 23.3032 56.9817 22.9312 56.9817 22.4272C56.9817 21.9352 57.1677 21.5602 57.5397 21.3022C57.9117 21.0442 58.4847 20.9032 59.2587 20.8792L60.0867 20.8522V20.5822C60.0867 20.2282 60.0057 19.9792 59.8437 19.8352C59.6817 19.6852 59.4537 19.6102 59.1597 19.6102C58.9137 19.6102 58.6767 19.6462 58.4487 19.7182C58.2207 19.7902 58.0017 19.8772 57.7917 19.9792L57.4857 19.2862C57.7137 19.1662 57.9747 19.0672 58.2687 18.9892C58.5687 18.9052 58.8807 18.8632 59.2047 18.8632ZM60.0777 21.4732L59.4297 21.4912C58.8777 21.5152 58.4937 21.6082 58.2777 21.7702C58.0677 21.9262 57.9627 22.1482 57.9627 22.4362C57.9627 22.6882 58.0377 22.8712 58.1877 22.9852C58.3377 23.0992 58.5327 23.1562 58.7727 23.1562C59.1447 23.1562 59.4537 23.0512 59.6997 22.8412C59.9517 22.6312 60.0777 22.3162 60.0777 21.8962V21.4732ZM63.4456 23.8042H62.4916V16.9642H63.4456V23.8042ZM65.8978 23.8042H64.9438V16.9642H65.8978V23.8042ZM69.3039 18.8632C69.9399 18.8632 70.4409 19.0612 70.8069 19.4572C71.1729 19.8472 71.3559 20.3812 71.3559 21.0592V21.5812H68.0979C68.1099 22.0792 68.2389 22.4602 68.4849 22.7242C68.7369 22.9882 69.0879 23.1202 69.5379 23.1202C69.8499 23.1202 70.1259 23.0932 70.3659 23.0392C70.6119 22.9792 70.8639 22.8922 71.1219 22.7782V23.5702C70.8759 23.6782 70.6299 23.7592 70.3839 23.8132C70.1379 23.8672 69.8439 23.8942 69.5019 23.8942C69.0279 23.8942 68.6109 23.8012 68.2509 23.6152C67.8969 23.4292 67.6179 23.1532 67.4139 22.7872C67.2159 22.4152 67.1169 21.9592 67.1169 21.4192C67.1169 20.8732 67.2069 20.4112 67.3869 20.0332C67.5729 19.6552 67.8279 19.3672 68.1519 19.1692C68.4819 18.9652 68.8659 18.8632 69.3039 18.8632ZM69.3039 19.6012C68.9619 19.6012 68.6859 19.7122 68.4759 19.9342C68.2719 20.1562 68.1519 20.4712 68.1159 20.8792H70.4019C70.3959 20.5012 70.3029 20.1952 70.1229 19.9612C69.9489 19.7212 69.6759 19.6012 69.3039 19.6012ZM75.0033 18.8632C75.5673 18.8632 75.9993 19.0042 76.2993 19.2862C76.5993 19.5682 76.7493 20.0212 76.7493 20.6452V23.8042H75.8043V20.7802C75.8043 20.0242 75.4713 19.6462 74.8053 19.6462C74.3073 19.6462 73.9653 19.7932 73.7793 20.0872C73.5933 20.3812 73.5003 20.8042 73.5003 21.3562V23.8042H72.5463V18.9532H73.3023L73.4373 19.6012H73.4913C73.6473 19.3492 73.8603 19.1632 74.1303 19.0432C74.4063 18.9232 74.6973 18.8632 75.0033 18.8632ZM79.8893 18.8632C80.5313 18.8632 81.0263 19.1062 81.3743 19.5922H81.4193L81.5273 18.9532H82.3013V23.8672C82.3013 24.5572 82.1153 25.0792 81.7433 25.4332C81.3773 25.7872 80.8163 25.9642 80.0603 25.9642C79.7063 25.9642 79.3823 25.9402 79.0883 25.8922C78.8003 25.8442 78.5333 25.7692 78.2873 25.6672V24.8302C78.8033 25.0822 79.4123 25.2082 80.1143 25.2082C80.5103 25.2082 80.8163 25.0942 81.0323 24.8662C81.2483 24.6442 81.3563 24.3292 81.3563 23.9212V23.7592C81.3563 23.6812 81.3593 23.5792 81.3653 23.4532C81.3713 23.3272 81.3773 23.2312 81.3833 23.1652H81.3473C81.1853 23.4172 80.9813 23.6032 80.7353 23.7232C80.4893 23.8372 80.2073 23.8942 79.8893 23.8942C79.2773 23.8942 78.7973 23.6752 78.4493 23.2372C78.1073 22.7932 77.9363 22.1782 77.9363 21.3922C77.9363 20.6122 78.1073 19.9972 78.4493 19.5472C78.7973 19.0912 79.2773 18.8632 79.8893 18.8632ZM80.0873 19.6552C79.7093 19.6552 79.4183 19.8052 79.2143 20.1052C79.0163 20.4052 78.9173 20.8372 78.9173 21.4012C78.9173 21.9652 79.0163 22.3942 79.2143 22.6882C79.4183 22.9822 79.7153 23.1292 80.1053 23.1292C80.5493 23.1292 80.8733 23.0092 81.0773 22.7692C81.2873 22.5232 81.3923 22.1242 81.3923 21.5722V21.3922C81.3923 20.7742 81.2873 20.3302 81.0773 20.0602C80.8673 19.7902 80.5373 19.6552 80.0873 19.6552ZM85.7043 18.8632C86.3403 18.8632 86.8413 19.0612 87.2073 19.4572C87.5733 19.8472 87.7563 20.3812 87.7563 21.0592V21.5812H84.4983C84.5103 22.0792 84.6393 22.4602 84.8853 22.7242C85.1373 22.9882 85.4883 23.1202 85.9383 23.1202C86.2503 23.1202 86.5263 23.0932 86.7663 23.0392C87.0123 22.9792 87.2643 22.8922 87.5223 22.7782V23.5702C87.2763 23.6782 87.0303 23.7592 86.7843 23.8132C86.5383 23.8672 86.2443 23.8942 85.9023 23.8942C85.4283 23.8942 85.0113 23.8012 84.6513 23.6152C84.2973 23.4292 84.0183 23.1532 83.8143 22.7872C83.6163 22.4152 83.5173 21.9592 83.5173 21.4192C83.5173 20.8732 83.6073 20.4112 83.7873 20.0332C83.9733 19.6552 84.2283 19.3672 84.5523 19.1692C84.8823 18.9652 85.2663 18.8632 85.7043 18.8632ZM85.7043 19.6012C85.3623 19.6012 85.0863 19.7122 84.8763 19.9342C84.6723 20.1562 84.5523 20.4712 84.5163 20.8792H86.8023C86.7963 20.5012 86.7033 20.1952 86.5233 19.9612C86.3493 19.7212 86.0763 19.6012 85.7043 19.6012ZM92.1687 22.4362C92.1687 22.9102 91.9947 23.2732 91.6467 23.5252C91.2987 23.7712 90.8157 23.8942 90.1977 23.8942C89.8557 23.8942 89.5617 23.8672 89.3157 23.8132C89.0757 23.7652 88.8537 23.6932 88.6497 23.5972V22.7602C88.8597 22.8622 89.1057 22.9552 89.3877 23.0392C89.6757 23.1172 89.9547 23.1562 90.2247 23.1562C90.5847 23.1562 90.8427 23.0992 90.9987 22.9852C91.1607 22.8712 91.2417 22.7182 91.2417 22.5262C91.2417 22.4182 91.2117 22.3222 91.1517 22.2382C91.0917 22.1482 90.9777 22.0582 90.8097 21.9682C90.6477 21.8722 90.4077 21.7642 90.0897 21.6442C89.7777 21.5182 89.5137 21.3952 89.2977 21.2752C89.0877 21.1492 88.9257 21.0022 88.8117 20.8342C88.6977 20.6602 88.6407 20.4382 88.6407 20.1682C88.6407 19.7482 88.8087 19.4272 89.1447 19.2052C89.4867 18.9772 89.9367 18.8632 90.4947 18.8632C90.7887 18.8632 91.0647 18.8932 91.3227 18.9532C91.5867 19.0132 91.8417 19.0972 92.0877 19.2052L91.7727 19.9342C91.5627 19.8442 91.3467 19.7692 91.1247 19.7092C90.9027 19.6432 90.6777 19.6102 90.4497 19.6102C90.1617 19.6102 89.9427 19.6552 89.7927 19.7452C89.6427 19.8352 89.5677 19.9612 89.5677 20.1232C89.5677 20.2372 89.6037 20.3362 89.6757 20.4202C89.7477 20.5042 89.8677 20.5882 90.0357 20.6722C90.2097 20.7562 90.4467 20.8582 90.7467 20.9782C91.0467 21.0922 91.3017 21.2092 91.5117 21.3292C91.7277 21.4492 91.8897 21.5962 91.9977 21.7702C92.1117 21.9442 92.1687 22.1662 92.1687 22.4362ZM93.1711 23.2732C93.1711 23.0392 93.2281 22.8742 93.3421 22.7782C93.4621 22.6822 93.6091 22.6342 93.7831 22.6342C93.9511 22.6342 94.0951 22.6822 94.2151 22.7782C94.3411 22.8742 94.4041 23.0392 94.4041 23.2732C94.4041 23.5072 94.3411 23.6752 94.2151 23.7772C94.0951 23.8792 93.9511 23.9302 93.7831 23.9302C93.6091 23.9302 93.4621 23.8792 93.3421 23.7772C93.2281 23.6752 93.1711 23.5072 93.1711 23.2732ZM96.253 17.1082C96.397 17.1082 96.523 17.1502 96.631 17.2342C96.739 17.3182 96.793 17.4592 96.793 17.6572C96.793 17.8492 96.739 17.9902 96.631 18.0802C96.523 18.1642 96.397 18.2062 96.253 18.2062C96.097 18.2062 95.965 18.1642 95.857 18.0802C95.755 17.9902 95.704 17.8492 95.704 17.6572C95.704 17.4592 95.755 17.3182 95.857 17.2342C95.965 17.1502 96.097 17.1082 96.253 17.1082ZM96.721 18.9532V23.8042H95.767V18.9532H96.721ZM102.494 21.3742C102.494 22.1782 102.287 22.7992 101.873 23.2372C101.459 23.6752 100.901 23.8942 100.199 23.8942C99.7612 23.8942 99.3712 23.7952 99.0292 23.5972C98.6932 23.3992 98.4262 23.1142 98.2282 22.7422C98.0362 22.3642 97.9402 21.9082 97.9402 21.3742C97.9402 20.5702 98.1442 19.9522 98.5522 19.5202C98.9602 19.0822 99.5182 18.8632 100.226 18.8632C100.67 18.8632 101.06 18.9622 101.396 19.1602C101.738 19.3522 102.005 19.6342 102.197 20.0062C102.395 20.3782 102.494 20.8342 102.494 21.3742ZM98.9212 21.3742C98.9212 21.9202 99.0232 22.3462 99.2272 22.6522C99.4372 22.9582 99.7672 23.1112 100.217 23.1112C100.667 23.1112 100.994 22.9582 101.198 22.6522C101.408 22.3462 101.513 21.9202 101.513 21.3742C101.513 20.8222 101.408 20.3992 101.198 20.1052C100.988 19.8052 100.658 19.6552 100.208 19.6552C99.7582 19.6552 99.4312 19.8052 99.2272 20.1052C99.0232 20.3992 98.9212 20.8222 98.9212 21.3742Z"
                  fill="black"
                  className="fill-black dark:fill-white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect
                    width="138"
                    height="26"
                    fill="none"
                  />
                </clipPath>
              </defs>
            </svg>
          </a>
          <label
            htmlFor="search"
            className="sm:flex-0 relative flex flex-1 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="absolute left-2 top-2 h-6 w-6 stroke-slate-500 xs:left-3 xs:top-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              id="search"
              placeholder="Search by labels"
              value={searchInput}
              onChange={handleSearchChange}
              className="w-full rounded-md bg-slate-200/50 p-1.5 pl-9 placeholder:text-slate-500 dark:bg-slate-900/50 xs:p-3 xs:pl-12"
            />
            {searchInput && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                onClick={() => setSearchInput('')}
                className="absolute right-2 top-3 h-5 w-5 cursor-pointer rounded-full stroke-slate-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </label>
        </div>
        <button
          type="button"
          onClick={handleAddPhotoClick}
          className="btn-primary"
        >
          Add Photo
        </button>
      </header>
      <div className={`grid ${gridCols} flex-grow gap-6`}>{colElems}</div>
    </div>
  );
}

export default App;
