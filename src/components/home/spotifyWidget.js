import * as React from "react";
import { useEffect, useState } from "react";
import { getMusicData } from "../../util/spotify";
import { SpotifyLogoIcon, ArrowsClockwiseIcon } from "@phosphor-icons/react";
import * as styles from "@styles/components/portfolio/spotifyWidget.module.scss";

export default function SpotifyWidget() {
  const [data, setData] = useState(null);
  const [track, setTrack] = useState(null);
  const [recent, setRecent] = useState(null);

  const fetchdata = async () => {
    const musicData = await getMusicData();
    setData(musicData);
    setTrack(musicData.currentlyPlaying);
    setRecent(musicData.recentlyPlayed.items);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // lol ai code
  //   useEffect(() => {
  //     const headings = document.querySelectorAll(`.${styles.info} h5`);
  //     headings.forEach((heading) => {
  //       console.log(`Text: ${heading.textContent}`);
  //       console.log(
  //         `scrollWidth: ${heading.scrollWidth}, clientWidth: ${heading.clientWidth}`
  //       );
  //       if (heading.scrollWidth > heading.clientWidth) {
  //         // Add a small buffer
  //         heading.classList.add(styles.scrollable);
  //         console.log("Added scrollable class");
  //       }
  //     });
  //   }, [track, recent]);

  const renderProgressBar = (duration, currentPosition) => {
    const progress = (currentPosition / duration) * 100;
    return (
      <div className={styles.progressBarContainer}>
        <div
          style={{
            width: `${progress}%`,
          }}
          className={styles.progressBar}
        ></div>
      </div>
    );
  };

  const CurrentlyPlayingWidget = () => {
    if (!track) return <></>;
    return (
      <div className={styles.spotifyWidget}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <SpotifyLogoIcon size={22} />
            <h4>Currently Playing:</h4>
          </div>

          <ArrowsClockwiseIcon
            className={styles.refresh}
            onClick={fetchdata}
            size={22}
          />
        </div>
        <div className={styles.song}>
          {/* <div className={styles.imgContainer}></div> */}
          <img
            className={styles.albumImg}
            src={track.item.album.images[0].url}
            alt={track.item.album.name}
          />
          <div className={styles.info}>
            <h5>{track.item.name}</h5>
            <h5>{track.item.album.name}</h5>
            {track.item.artists.map((artist, index) => (
              <h5 key={index}>{artist.name}</h5>
            ))}
          </div>
        </div>

        {renderProgressBar(track.item.duration_ms, track.progress_ms)}
      </div>
    );
  };

  const RecentlyPlayedWidget = () => {
    if (!recent) return <></>;
    return (
      <div className={styles.spotifyWidget}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <SpotifyLogoIcon size={22} />
            <h4>Recently played:</h4>
          </div>

          <ArrowsClockwiseIcon
            className={styles.refresh}
            onClick={fetchdata}
            size={22}
          />
        </div>
        <div className={styles.song}>
          {/* <div className={styles.imgContainer}></div> */}
          <img
            className={styles.albumImg}
            src={recent[0].track.album.images[0].url}
            alt={recent[0].track.album.name}
          />

          <div className={styles.info}>
            <h5>{recent[0].track.name}</h5>
            <h5>{recent[0].track.album.name}</h5>
            {recent[0].track.artists.map((artist, index) => (
              <h5 key={index}>{artist.name}</h5>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const SkeletonLoader = () => {
    return (
      <div className={styles.spotifyWidget}>
        <div className={styles.header}>
          <div className={styles.icon}>
            <div
              className={`${styles.skeleton} ${styles.skeletonText}`}
              style={{ width: "120px" }}
            ></div>
          </div>
        </div>
        <div className={styles.song}>
          <div className={`${styles.skeleton} ${styles.skeletonImage}`}></div>
          <div className={styles.info}>
            <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
            <div className={`${styles.skeleton} ${styles.skeletonText}`}></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {track === null && recent === null ? (
        <SkeletonLoader />
      ) : track && track.is_playing ? (
        <CurrentlyPlayingWidget />
      ) : (
        <RecentlyPlayedWidget />
      )}
    </>
  );
}
