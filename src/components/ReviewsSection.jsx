import { Container, RatingsComponent, ReviewCard } from "../components";

const ReviewsSection = () => {
  return (
    <>
      <section className="py-5 pt-0">
        <Container>
          <h3 className="mb-3">Reviews</h3>
          <RatingsComponent />
          <div className="rounded-2 comment-field p-2 border">
            <form className="d-flex align-items-center gap-1">
              <input
                type="text"
                placeholder="Leave Comment"
                className="border-0 w-100 px-2"
              />
              <button type="button" className="btn btn-dark">
                Comment
              </button>
            </form>
          </div>
        </Container>
      </section>

      <section className="py-5 pt-0">
        <Container>
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </Container>
      </section>
    </>
  );
};

export default ReviewsSection;
