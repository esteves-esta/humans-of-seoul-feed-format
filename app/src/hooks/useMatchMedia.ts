import React from "react";
/* https://betterprogramming.pub/using-window-matchmedia-in-react-8116eada2588 */
const useMatchMedia = (size = 640) => {
  const [isNarrowScreen, setIsNarrowScreen] = React.useState(false);

  React.useEffect(() => {
    const mediaWatcher = window.matchMedia(`( min-width: ${size}px )`);
    setIsNarrowScreen(mediaWatcher.matches);

    function updateIsNarrowScreen(event) {
      event.matches && setIsNarrowScreen(event.matches);
    }

    mediaWatcher.addEventListener("change", updateIsNarrowScreen);
    return () => {
      mediaWatcher.removeEventListener("change", updateIsNarrowScreen);
    };
  }, []);

  return isNarrowScreen;
};

export default useMatchMedia;
