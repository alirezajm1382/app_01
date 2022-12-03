import Head from "next/head";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ImageCard from "../components/ImageCard";

function GalleryPage() {
  return (
    <div>
      <Head>
        <title>App / Gallery</title>
        <meta name="description" content="Powered by Love <3" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
      </Head>
      <div className="mt-5 me-3">
        <div className="d-flex align-items-center justify-content-between">
          <h2>Gallery</h2>
          <div className="d-flex gap-2">
            <Form.Control type="text" placeholder="Search Query" />
            <Button variant="warning">Fire</Button>
          </div>
        </div>
        <hr />
        <div className="m-2 d-grid gap-3">
          <div className="row row-cols-2">
            <ImageCard />
            <ImageCard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryPage;
