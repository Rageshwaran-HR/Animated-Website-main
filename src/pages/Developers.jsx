import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import "./Developers.css";

const developers = [
  {
    name: "Rageshwaran R",
    year: "4th Year, CSE",
    image:
      "https://res.cloudinary.com/dm0vwe5cw/image/upload/YOUR_CLOUDINARY_URL_HERE",
    social: {
      email: "rageshwaran@example.com",
      github: "https://github.com/Rageshwaran-HR",
      linkedin: "https://www.linkedin.com/in/rageshwaranhr/",
    },
  },
  {
    name: "Vishvaa K",
    year: "3rd Year, CSE",
    image:
      "https://res.cloudinary.com/dm0vwe5cw/image/upload/YOUR_CLOUDINARY_URL_HERE",
    social: {
      email: "kvishvaa6@gmail.com",
      github: "https://github.com/vishvaa-vsk",
      linkedin: "https://www.linkedin.com/in/vishvaa-k/",
    },
  },
  {
    name: "James Jacob I",
    year: "3rd Year, CSE",
    image:
      "https://res.cloudinary.com/dm0vwe5cw/image/upload/v1769507311/IMG-20260112-WA0009_ixfupz.jpg",
    social: {
      email: "jamesjacob819i@gmail.com",
      github: "https://github.com/jamesjacob819i",
      linkedin: "https://www.linkedin.com/in/james-jacob-i/",
    },
  },
  {
    name: "Vaaheesan S",
    year: "3rd Year, CSE",
    image:
      "https://res.cloudinary.com/dm0vwe5cw/image/upload/YOUR_CLOUDINARY_URL_HERE",
    social: {
      email: "vaaheesan@example.com",
      github: "https://github.com/vacmar",
      linkedin: "https://www.linkedin.com/in/vaaheesan-s/",
    },
  },
];

const Developers = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="developers-main">
      <button onClick={() => navigate("/")} className="developers-back-btn">
        ← Back to Home
      </button>
      <div className="relative">
        <section
          className={`developers-header ${isLoading ? "is--loading" : ""}`}
        >
          {isLoading && (
            <div className="developers-loader">
              <div className="developers__h1">
                {"Developers".split("").map((letter, i) => (
                  <span key={i} className="developers__letter">
                    {letter}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="developers-header__content">
            <h1 className="developers-page-title">Developers</h1>
            <div className="comet-cards-container">
              {developers.map((dev, index) => (
                <div key={index} className="perspective-distant transform-3d">
                  <div className="relative rounded-card">
                    <div className="minimal-card">
                      <div className="minimal-image-container">
                        <img
                          src={dev.image}
                          alt="Developer Avatar"
                          className="minimal-image"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.parentElement.style.background =
                              "linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%)";
                          }}
                        />
                      </div>
                      <div className="minimal-content">
                        <div className="minimal-header">
                          <h3 className="minimal-name">{dev.name}</h3>
                        </div>
                        <p className="minimal-title">{dev.year}</p>
                        <div className="minimal-footer">
                          <div className="minimal-social-links">
                            {dev.social.email && (
                              <a
                                href={`mailto:${dev.social.email}`}
                                className="minimal-social-btn"
                                title="Email"
                              >
                                <FaEnvelope size={20} />
                              </a>
                            )}
                            {dev.social.github && (
                              <a
                                href={dev.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="minimal-social-btn"
                                title="GitHub"
                              >
                                <FaGithub size={20} />
                              </a>
                            )}
                            {dev.social.linkedin && (
                              <a
                                href={dev.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="minimal-social-btn"
                                title="LinkedIn"
                              >
                                <FaLinkedin size={20} />
                              </a>
                            )}
                            {dev.social.instagram && (
                              <a
                                href={dev.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="minimal-social-btn"
                                title="Instagram"
                              >
                                <FaInstagram size={20} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-overlay"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Developers;
