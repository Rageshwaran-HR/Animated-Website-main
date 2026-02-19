import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaBus,
  FaPhoneAlt,
  FaArrowLeft,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Transport.css";

const busRoutes = [
  {
    routeNo: 1,
    name: "EAST TAMBARAM",
    stops: [
      { place: "Bharath College", time: "6:50" },
      { place: "Camp Road", time: "6:55" },
      { place: "Tambaram", time: "7:00" },
      { place: "Valluvar Gurukulam – Sanitorium", time: "7:02" },
      { place: "Chrompet", time: "7:05" },
      { place: "Pallavaram", time: "7:10" },
      { place: "Meenambakkam", time: "7:12" },
      { place: "Nanganallur Jn", time: "7:15" },
      { place: "Kathipara Junction", time: "7:20" },
      { place: "Ekkadu thangal", time: "7:23" },
      { place: "Kasi Theatre", time: "7:25" },
      { place: "Ashok Pillar", time: "7:30" },
      { place: "Kumaran hospital – Lakshman Sruthi", time: "7:34" },
      { place: "Vadapalani", time: "7:36" },
      { place: "Ambika empire – Thirunagar", time: "7:38" },
      { place: "MMDA", time: "7:40" },
      { place: "SAF", time: "7:42" },
      { place: "VEC", time: "" },
    ],
    conductor: { name: "Mr. Ganesamoorthy", phone: "8144726870" },
  },
  {
    routeNo: 2,
    name: "MEDAVAKKAM",
    stops: [
      { place: "Kovilambakkam Sathya Agency", time: "6:35" },
      { place: "Eachangadu", time: "6:45" },
      { place: "Kamatchi hospital", time: "6:50" },
      { place: "Kaively Signal", time: "6:55" },
      { place: "Velachery Venkadeswara Super Market", time: "7:00" },
      { place: "Kajana Jewellery", time: "7:02" },
      { place: "Murugan Kalayana Mahal", time: "7:03" },
      { place: "Erikkarai", time: "7:05" },
      { place: "Check post", time: "7:10" },
      { place: "Little Mount", time: "7:13" },
      { place: "Saidapet (Hotel Metro)", time: "7:15" },
      { place: "T.Nagar terminus", time: "7:23" },
      { place: "North Usman Road", time: "7:28" },
      { place: "Mahalingapuram", time: "7:30" },
      { place: "Soolaimedu", time: "7:32" },
      { place: "Mehtha Nagar", time: "7:33" },
      { place: "Skywalk", time: "7:37" },
      { place: "Aminjikkarai Police station", time: "7:38" },
      {
        place:
          "Chinthamani – Lotus Colony – New Avadi Road – New Avadi Road ICF Signal – Nathamuni – Sidco",
        time: "",
      },
      { place: "VEC", time: "" },
    ],
    conductor: { name: "Mr. Govindaraj", phone: "9941861552" },
  },
  {
    routeNo: 3,
    name: "PALAVAKKAM",
    stops: [
      { place: "Palavakkam", time: "6:25" },
      { place: "RTO Office", time: "6:30" },
      { place: "Thruvanmiyur", time: "6:35" },
      { place: "Jeyanthi Theatre", time: "6:37" },
      { place: "Adayar Depot", time: "6:39" },
      { place: "Malar Hospital", time: "6:45" },
      { place: "Sathya Studio", time: "6:47" },
      { place: "Mandaiveli Depot", time: "6:50" },
      { place: "Mylapore Theppakkulam", time: "6:55" },
      { place: "Royapettai Police Station", time: "7:03" },
      { place: "Mesapet Market", time: "7:04" },
      { place: "Ice House", time: "7:06" },
      { place: "Rathna Café", time: "7:20" },
      { place: "Commissioner Office", time: "7:30" },
      { place: "Purasaiwalkam BSNL", time: "7:35" },
      { place: "Kilpauk Mental Hospital", time: "7:37" },
      { place: "Ayanavaram ESI", time: "7:38" },
      { place: "Sayani", time: "7:42" },
      { place: "Joint Office", time: "7:44" },
      { place: "ICF", time: "7:47" },
      { place: "kallukkadai", time: "7:48" },
      { place: "Villivakkam", time: "7:50" },
      { place: "VEC", time: "" },
    ],
    conductor: { name: "Mr. Nagaraj", phone: "9092731034" },
  },
  {
    routeNo: 4,
    name: "KUMANAN CHAVADI",
    stops: [
      { place: "Kumanan chavad", time: "6:45" },
      { place: "Kattupakkam", time: "6:48" },
      { place: "Durgai Amman Koil", time: "6:52" },
      { place: "Iyyappanthangal", time: "6:53" },
      { place: "Ramachandra Hospital", time: "6:54" },
      { place: "Porur Signal", time: "7:00" },
      { place: "Karambakkam Vasanth & Co", time: "7:01" },
      { place: "Valasaravakkam", time: "7:05" },
      { place: "Kesavarthini", time: "7:08" },
      { place: "Alwar thirunagar", time: "7:10" },
      { place: "Vembuli Amman Koil", time: "7:12" },
      { place: "Virugambakkam", time: "7:15" },
      { place: "Avichi School", time: "7:16" },
      { place: "Thai Sathya School", time: "7:18" },
      { place: "KK Nagar RTO office", time: "7:20" },
      { place: "Pondicheri guest house", time: "7:21" },
      { place: "Nesapakkam", time: "7:23" },
      { place: "Ajanta Bus stop", time: "7:24" },
      { place: "Udipi hotel bus stop", time: "7:25" },
      { place: "Virugambakkam Market", time: "7:31" },
      { place: "Elango Nagar", time: "7:33" },
      { place: "Natesan Nagar", time: "7:34" },
      { place: "Sai Nagar", time: "7:35" },
      { place: "Chinmaya Nagar", time: "7:36" },
      { place: "Vijayakanth Thirumana Mandapam", time: "7:39" },
      { place: "Senthil Nagar", time: "7:50" },
      { place: "Rettai Eri RTO office", time: "7:55" },
      { place: "VEC", time: "" },
    ],
    conductor: { name: "Mr. Mari", phone: "8973211561" },
  },
  {
    routeNo: 5,
    name: "THIRUVALLUR",
    stops: [
      { place: "Manavala Nagar Signal", time: "6:40" },
      { place: "Periyakuppam", time: "6:45" },
      { place: "Oil mill (GRT)", time: "6:50" },
      { place: "Post Office", time: "6:50" },
      { place: "State Bank", time: "6:55" },
      { place: "Fire Service", time: "6:55" },
      { place: "Theradi", time: "7:00" },
      { place: "Kakkalur", time: "7:05" },
      { place: "Veppampet", time: "7:15" },
      { place: "Thiruninravur Police station", time: "7:25" },
      { place: "Thiruninravur Abiramy", time: "7:25" },
      { place: "Thiruninravur Temple", time: "7:30" },
      { place: "Pattabiram", time: "7:35" },
      { place: "Avadi Check post", time: "7:40" },
      {
        place:
          "Avadi Bus stand – Murugappa polytechnic – Vaishnavi nagar – Thirumullaivayil – Manikandapuram – Sted ford hospital",
        time: "",
      },
      { place: "VEC", time: "" },
    ],
    conductor: { name: "Mr. Manohar (Driver)", phone: "7639055572" },
  },
  {
    routeNo: 6,
    name: "THACHUR KOOT ROAD",
    stops: [
      { place: "Thatchurkoot road", time: "6:30" },
      { place: "Andarkuppam", time: "6:35" },
      { place: "Krishnapuram", time: "6:40" },
      { place: "Ponneri", time: "6:45" },
      { place: "Elavam Pedu", time: "7:05" },
      { place: "Vembakkam", time: "7:10" },
      { place: "Minjur", time: "7:15" },
      { place: "Nandhiambakkam", time: "7:20" },
      { place: "Vallur camp", time: "7:25" },
      { place: "Manali New town", time: "7:30" },
      { place: "Andar Kuppam", time: "7:35" },
      { place: "Manali Market", time: "7:45" },
      { place: "Milk depot", time: "7:50" },
      { place: "Madhavaram Thapal petti", time: "8:00" },
      { place: "VEC", time: "" },
    ],
    conductor: { name: "Mr. Saravanan (Driver)", phone: "8939179597" },
  },
  {
    routeNo: 7,
    name: "ENNORE",
    stops: [
      { place: "Ennore", time: "6:40" },
      { place: "Thalankuppam", time: "6:45" },
      { place: "Burma Nagar", time: "6:50" },
      { place: "Wimco Nagar", time: "6:55" },
      { place: "Ajax", time: "7:00" },
      { place: "Periyar Nagar", time: "7:02" },
      { place: "Theradi", time: "7:10" },
      { place: "Rajakadai", time: "7:15" },
      { place: "Thangal", time: "7:17" },
      { place: "Toll gate (Tondayarpet)", time: "7:20" },
      { place: "Pudhu Vannarapettai cross road", time: "7:25" },
      { place: "Lakshmi koil", time: "7:27" },
      { place: "Appolo", time: "7:30" },
      { place: "Mint", time: "7:35" },
      { place: "MKB Nagar", time: "7:40" },
      { place: "EB Office", time: "7:42" },
      { place: "Mullai Nagar", time: "7:45" },
      { place: "MR Nagar", time: "7:47" },
      { place: "Petrol bunk", time: "7:50" },
      { place: "Sidco Nagar", time: "7:52" },
      { place: "Pavithra Hospital", time: "7:55" },
      { place: "Erukkancherry Signal", time: "7:59" },
      { place: "Moolakkadai", time: "8:00" },
      { place: "VEC", time: "" },
    ],
    conductor: { name: "Mr. Kothandam", phone: "9094209300" },
  },
  {
    routeNo: 8,
    name: "DOVETON",
    stops: [
      { place: "Doveton", time: "7:10" },
      { place: "Bhuvaneshwari Theatre", time: "7:15" },
      { place: "Pattalam Manikoondu", time: "7:18" },
      { place: "Pattalam Market", time: "7:20" },
      { place: "Jeeva Station", time: "7:25" },
      { place: "PB Road Bakery", time: "7:30" },
      { place: "Perambur bus stand", time: "7:35" },
      { place: "Railway station", time: "7:37" },
      { place: "Gandhi Silai", time: "7:40" },
      { place: "Veenus", time: "7:42" },
      { place: "Periyar Nagar", time: "7:44" },
      { place: "70 Feet road", time: "7:46" },
      { place: "Don bosco Periyar statue", time: "7:50" },
      { place: "Welding Shop", time: "7:51" },
      { place: "Moogambikai", time: "7:55" },
      { place: "Kulathur", time: "8:01" },
      {
        place:
          "Poombhukar nagar – Srinivasan Nagar – Rajamangalam Police station",
        time: "",
      },
      { place: "VEC", time: "" },
    ],
    conductor: { name: "Mr. Chandran (Driver)", phone: "9884548333" },
  },
  {
    routeNo: 9,
    name: "AMBATTUR ESTATE",
    stops: [
      { place: "Ambattur Estate", time: "7:15" },
      { place: "Mugappair MGR Statue", time: "7:20" },
      { place: "Mugappair Shoba show room", time: "7:21" },
      { place: "Velammal west school", time: "7:24" },
      { place: "Ambedkar ground", time: "7:25" },
      { place: "7H Bus stand", time: "7:27" },
      { place: "Panneer Nagar", time: "7:27" },
      { place: "Golden flat", time: "7:29" },
      { place: "Main School", time: "7:32" },
      { place: "Cheriyan Hospital", time: "7:33" },
      { place: "Collector Nagar", time: "7:34" },
      { place: "HP Petrol bunk", time: "7:35" },
      { place: "Thirumangalam Signal", time: "7:37" },
      { place: "Anna Nagar depot", time: "7:38" },
      { place: "Lucas bus stop", time: "7:40" },
      { place: "VEC", time: "" },
    ],
    conductor: { name: "Mr. Shankar", phone: "8939675717" },
  },
  {
    routeNo: 10,
    name: "VELAPPAN CHAVADI",
    stops: [
      { place: "Velappanchavadi", time: "7:05" },
      { place: "Vanagaram Signal", time: "7:10" },
      { place: "Maduravayal Erikkarai bus stop", time: "7:12" },
      { place: "Maduravoyal Market", time: "7:13" },
      { place: "Maduravoyal post office", time: "7:14" },
      { place: "Ration shop", time: "7:15" },
      { place: "Venkaya Mandi", time: "7:18" },
      { place: "SBIO School", time: "7:21" },
      { place: "AP Abinava", time: "7:23" },
      { place: "7M bus stop", time: "7:25" },
      { place: "DR Super market", time: "7:26" },
      { place: "State Bank", time: "7:27" },
      { place: "ICF Colony church", time: "7:35" },
      { place: "Ayapakkam water tank", time: "7:37" },
      { place: "Dunlop", time: "7:45" },
      { place: "TI Cycle", time: "7:47" },
      { place: "Orakadam", time: "7:51" },
      { place: "Kallikuppam", time: "7:57" },
      { place: "VEC", time: "" },
    ],
    conductor: { name: "Mr. Dhanasingh", phone: "9840477973" },
  },
];

const Transport = () => {
  const navigate = useNavigate();
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="transport-container">
      <div className="transport-header">
        <button
          onClick={handleBack}
          className="back-button"
          aria-label="Go back"
        >
          <FaArrowLeft />
        </button>
        <h1 className="transport-title">Bus Routes</h1>
        <p className="transport-subtitle">
          VELAMMAL ENGINEERING COLLEGE, CHENNAI-66
        </p>
      </div>

      <div className="transport-contact-banner">
        <FaPhoneAlt className="contact-icon" />
        <div>
          <p className="contact-label">Transport Incharge</p>
          <p className="contact-info">Mr. M. Manimaran - 9087240706</p>
        </div>
      </div>

      <div className="routes-grid">
        {busRoutes.map((route) => (
          <div
            key={route.routeNo}
            className={`route-card ${selectedRoute === route.routeNo ? "route-card-expanded" : ""}`}
            onClick={() =>
              setSelectedRoute(
                selectedRoute === route.routeNo ? null : route.routeNo,
              )
            }
          >
            <div className="route-header">
              <div className="route-number">
                <FaBus className="bus-icon" />
                <span>Route {route.routeNo}</span>
              </div>
              <h3 className="route-name">{route.name}</h3>
            </div>

            {selectedRoute === route.routeNo && (
              <div className="route-details">
                <div className="stops-container">
                  <h4 className="stops-title">
                    <FaMapMarkerAlt /> Bus Stops & Timings
                  </h4>
                  <div className="stops-list">
                    {route.stops.map((stop, idx) => (
                      <div key={idx} className="stop-item">
                        <div className="stop-marker"></div>
                        <div className="stop-info">
                          <span className="stop-place">{stop.place}</span>
                          {stop.time && (
                            <span className="stop-time">
                              <FaClock /> {stop.time} AM
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="conductor-info">
                  <h4 className="conductor-title">Contact</h4>
                  <p className="conductor-name">{route.conductor.name}</p>
                  <a
                    href={`tel:${route.conductor.phone}`}
                    className="conductor-phone"
                  >
                    <FaPhoneAlt /> {route.conductor.phone}
                  </a>
                </div>
              </div>
            )}

            {selectedRoute !== route.routeNo && (
              <div className="route-preview">
                <p className="route-preview-text">
                  {route.stops[0].place} → VEC
                </p>
                <p className="route-preview-time">
                  Starts at {route.stops[0].time} AM
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transport;
