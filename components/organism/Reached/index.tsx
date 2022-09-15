import ReachedItem from "../../molekuls/ReachedItem";

const Reached = () => {
  return (
    <section className="reached pt-50 pb-50">
      <div className="container-fluid">
        <div className="d-flex flex-lg-row flex-column align-items-center justify-content-center gap-lg-0 gap-4">
          <div className="me-lg-35">
            <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">
              290M+
            </p>
            <p className="text-lg text-lg-start text-center color-palette-2 m-0">
              Players Top Up
            </p>
          </div>
          <ReachedItem total="12.500" title="Games Available" />
          <ReachedItem total="99,9%" title="Happy Players" />
          <ReachedItem total="4.7" title="Rating Worldwide" />
        </div>
      </div>
    </section>
  );
};
export default Reached;
