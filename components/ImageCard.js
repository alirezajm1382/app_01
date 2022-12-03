import Image from "next/image";
import MockImage from "../data";
import styles from "../styles/ImageCard.module.css";

function ImageCard() {
  const data = MockImage();
  return (
    <div className={styles.wrapper}>
      <div className={styles.image_container}>
        <img src={data.urls.regular} />
      </div>
      <div className="d-flex gap-2 details_container">
        <div className="desc_container">
          <h5>Title</h5>
          <p>Desc</p>
        </div>
        <div className="profile_container">
          <p>Profile</p>
          <div className={styles.profile_image_container}>
            <Image src={data.user.profile_image} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
