import homeWorkBg from "../assets/img/home-content-1.jpg";
import homeEducationBg from "../assets/img/home-content-2.jpg";
import ContactMap from "../components/ContactMap";

export default function HomeContent() {
  return (
    <section id="home-content">
      <article className="home-work">
        <div className="home-work-text">
          <div className="center">
            <h1>Workplace & Culture</h1>
            <p>
              We believe and invest in our student’s future potential and what
              they can achieve with the right support.Our instructors want you
              to succeed and will be there every step of the way. We are
              striving for a richer diversity in the European tech industry and
              think that professional organizations should mirror the
              populations diversity.
            </p>
          </div>
        </div>
        <img className="image" src={homeWorkBg} alt="Dish" />
      </article>

      <article className="home-work">
        <div className="home-work-text">
          <div className="center">
            <h1>IT Program</h1>
            <p>
              we offer you open and tailored board training under the guidance
              of the country’s leading board members and experts. Our programs
              are characterized by the idea that board work is like an orchestra
              – everyone must be in good spirits to be involved and create the
              whole. Welcome!
            </p>
          </div>
        </div>
        <img className="image" src={homeEducationBg} alt="Dish" />
      </article>

      <article className="home-work">
        <div className="home-work-text">
          <div className="center">
            <h1>Contact us</h1>
            <p>
              For more detailed information about this program & courses, get in
              touch with us.
            </p>
            <a href="mailto:snehalkdm2191@gmail.com">
              <h5>
                <i className="fas fa-envelope-open-text" />{" "}
                snehalkdm2191@gmail.com
              </h5>
            </a>
            <a href="mailto:snehalkdm2191@gmail.com">
              <h5>
                <i className="fas fa-mobile-alt" /> +46-735831881
              </h5>
            </a>
          </div>
        </div>
        <ContactMap />
      </article>
    </section>
  );
}
