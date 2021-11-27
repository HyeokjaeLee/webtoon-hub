import { UncontrolledCarousel } from "reactstrap";
import "assets/scss/components/random-recommend.scss";
export default function RandomRecommend() {
  return (
    <div className="random-recommend-wrap">
      <UncontrolledCarousel
        className="random-recommend"
        items={[
          {
            altText: "Slide 1",
            caption: "Slide 1",
            key: 1,
            src: "https://picsum.photos/id/123/1200/600",
          },
          {
            altText: "Slide 2",
            caption: "Slide 2",
            key: 2,
            src: "https://picsum.photos/id/456/1200/600",
          },
          {
            altText: "Slide 3",
            caption: "Slide 3",
            key: 3,
            src: "https://picsum.photos/id/678/1200/600",
          },
        ]}
      />
    </div>
  );
}
