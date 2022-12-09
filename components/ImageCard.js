import Image from "next/image";
import MockImage from "../data";
import { Card, CardMedia, CardContent, Typography, Link } from "@mui/material";

function ImageCard() {
  const data = MockImage();
  return (
    <Card sx={{ position: "relative" }}>
      <Link href={data.links.html}>
        <CardMedia height="200" component="div">
          <div style={{ position: "relative", width: "100%", height: "200px" }}>
            <Image
              src={data.urls.small_s3}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </CardMedia>
      </Link>
      <CardContent>
        <Typography variant="body1" component="p">
          by{" "}
          <Link sx={{ textDecoration: "none" }} href={data.user.links.html}>
            {data.user.name}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ImageCard;
