import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import {
  FaBus,
  FaPhoneAlt,
  FaArrowLeft,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Button from "../components/Button";

gsap.registerPlugin(ScrollTrigger);

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
      { place: "Kumanan chavadi", time: "6:45" },
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
      { place: "Kolathur", time: "8:01" },
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

  // Temporarily disabled animations for debugging
  // useGSAP(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.from(".transport-header-content", {
  //       y: 50,
  //       opacity: 0,
  //       duration: 1,
  //       ease: "power3.out",
  //       delay: 0.2,
  //     });

  //     gsap.from(".route-card", {
  //       y: 100,
  //       opacity: 0,
  //       duration: 0.8,
  //       stagger: 0.1,
  //       ease: "power3.out",
  //       delay: 0.5,
  //       scrollTrigger: {
  //         trigger: ".routes-grid",
  //         start: "top 80%",
  //         toggleActions: "play none none none",
  //       },
  //     });
  //   });

  //   return () => ctx.revert();
  // }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-950 px-5 py-12 sm:px-10 sm:py-16">
      <div className="transport-header-content mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-4">
          <Button
            title="Back"
            leftIcon={<FaArrowLeft className="mr-2" />}
            onClick={handleBack}
            containerClass="text-sm"
          />
        </div>

        <div className="mb-12 text-center">
          <h1 className="special-font hero-heading mb-4 text-blue-100">
            Bus R<b>o</b>utes
          </h1>
          <p className="font-circular-web text-lg text-blue-50/85 sm:text-xl">
            VELAMMAL ENGINEERING COLLEGE, CHENNAI-66
          </p>
        </div>

        <div className="mx-auto mb-16 max-w-2xl rounded-md border-hsla bg-slate-950/30 px-6 py-6 backdrop-blur-sm">
          <p className="mb-2 font-general text-[10px] uppercase tracking-widest text-blue-50/80">
            Transport Incharge
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-hsla bg-slate-950/50">
              <FaPhoneAlt className="text-xl text-blue-300" />
            </div>
            <div>
              <p className="font-zentry text-xl text-blue-50 sm:text-2xl">
                Mr. M. Manimaran
              </p>
              <a
                href="tel:9087240706"
                className="font-general text-sm uppercase tracking-wider text-blue-300 transition-colors hover:text-blue-100"
              >
                9087240706
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="routes-grid mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {busRoutes.map((route) => (
          <div
            key={route.routeNo}
            className={`route-card cursor-pointer overflow-hidden rounded-lg border-hsla bg-slate-950 p-6 shadow-xl transition-all duration-300 hover:border-blue-300/50 hover:shadow-2xl hover:shadow-blue-300/10 ${
              selectedRoute === route.routeNo ? "col-span-full" : ""
            }`}
            onClick={() =>
              setSelectedRoute(
                selectedRoute === route.routeNo ? null : route.routeNo,
              )
            }
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border-hsla bg-slate-950/50 px-3 py-1.5">
                <FaBus className="text-blue-300" />
                <span className="font-general text-[10px] uppercase tracking-widest text-blue-300">
                  Route {route.routeNo}
                </span>
              </div>
            </div>

            <h3 className="special-font mb-4 font-zentry font-black uppercase leading-tight text-blue-50 sm:text-2xl md:text-3xl">
              {route.name}
            </h3>

            {selectedRoute !== route.routeNo && (
              <div className="rounded-md border-hsla bg-slate-950/20 p-4 backdrop-blur-sm">
                <p className="font-circular-web text-base text-blue-50/90">
                  {route.stops[0].place} → VEC
                </p>
                <p className="mt-2 flex items-center gap-2 font-general text-xs uppercase tracking-wider text-blue-300">
                  <FaClock className="text-sm" />
                  Starts at {route.stops[0].time} AM
                </p>
              </div>
            )}

            {selectedRoute === route.routeNo && (
              <div className="mt-6 grid gap-6 md:grid-cols-[2fr_1fr]">
                <div className="rounded-md border-hsla bg-slate-950/20 p-5 backdrop-blur-sm">
                  <h4 className="mb-4 flex items-center gap-2 font-general text-[10px] uppercase tracking-widest text-blue-300">
                    <FaMapMarkerAlt /> Bus Stops & Timings
                  </h4>
                  <div className="max-h-[500px] space-y-3 overflow-y-auto pr-2">
                    {route.stops.map((stop, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 rounded-md bg-slate-950/30 p-3 transition-colors hover:bg-slate-950/50"
                      >
                        <div className="mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-blue-300 shadow-lg shadow-blue-300/50"></div>
                        <div className="flex-1">
                          <p className="font-circular-web text-sm leading-relaxed text-blue-50 sm:text-base">
                            {stop.place}
                          </p>
                          {stop.time && (
                            <p className="mt-1 flex items-center gap-1.5 font-general text-xs font-semibold uppercase tracking-wider text-blue-300">
                              <FaClock className="text-[10px]" /> {stop.time} AM
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-md border-hsla bg-slate-950/30 p-6 backdrop-blur-sm">
                  <h4 className="mb-4 font-general text-[10px] uppercase tracking-widest text-blue-300">
                    Contact
                  </h4>
                  <p className="mb-3 font-zentry text-lg text-blue-50 sm:text-xl">
                    {route.conductor.name}
                  </p>
                  <a
                    href={`tel:${route.conductor.phone}`}
                    className="inline-flex items-center gap-2 rounded-full bg-violet-50 px-5 py-3 text-sm font-medium text-black transition-all hover:bg-violet-300 hover:shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaPhoneAlt /> {route.conductor.phone}
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transport;
