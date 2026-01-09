import React, { useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EVENTS } from "../data/events";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "",
    collegeName: "",
    year: "",
    events: [],
    foodPreference: "",
    transactionId: "",
    teamName: "",
    transactionScreenshot: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  useGSAP(() => {
    gsap.from(".form-card", {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
    });

    gsap.from(".form-field", {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.2,
    });
  });

  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics and Communication",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Chemical Engineering",
    "Biotechnology",
    "Other",
  ];

  // Filter events - exclude Workshop, Project Expo
  const excludeEvents = ["workshop", "project-expo"];
  const filteredEvents = EVENTS.filter(
    (event) => !excludeEvents.includes(event.slug)
  );

  // Categorize events by track
  const eventsByTrack = filteredEvents.reduce((acc, event) => {
    const track = event.track || "Other";
    if (!acc[track]) acc[track] = [];
    acc[track].push({
      id: event.slug,
      name: event.name,
      track: event.track,
    });
    return acc;
  }, {});

  const eventOptions = filteredEvents.map((event) => ({
    id: event.slug,
    name: event.name,
    track: event.track,
  }));

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = "Name can only contain letters and spaces";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.length > 100) {
      newErrors.email = "Email is too long (max 100 characters)";
    }

    // Department validation
    if (!formData.department.trim()) {
      newErrors.department = "Department is required";
    } else if (formData.department.trim().length < 2) {
      newErrors.department = "Department name must be at least 2 characters";
    } else if (formData.department.trim().length > 50) {
      newErrors.department = "Department name is too long (max 50 characters)";
    }

    // College Name validation
    if (!formData.collegeName.trim()) {
      newErrors.collegeName = "College name is required";
    } else if (formData.collegeName.trim().length < 3) {
      newErrors.collegeName = "College name must be at least 3 characters";
    } else if (formData.collegeName.trim().length > 100) {
      newErrors.collegeName = "College name is too long (max 100 characters)";
    }

    // Year validation
    if (!formData.year) {
      newErrors.year = "Current year is required";
    }

    // Events validation
    if (formData.events.length === 0) {
      newErrors.events = "Select at least one event";
    } else if (formData.events.length > 5) {
      newErrors.events = "You can select a maximum of 5 events";
    }

    // Food preference validation
    if (!formData.foodPreference) {
      newErrors.foodPreference = "Food preference is required";
    }

    // Paper Presentation validation - only if selected
    const isPaperPresentationSelected =
      formData.events.includes("paper-presentation");
    if (isPaperPresentationSelected) {
      if (!formData.teamName.trim()) {
        newErrors.teamName = "Team name is required for paper presentation";
      } else if (formData.teamName.trim().length < 3) {
        newErrors.teamName = "Team name must be at least 3 characters";
      }
    }

    // Transaction ID validation
    if (!formData.transactionId.trim()) {
      newErrors.transactionId = "Transaction ID is required";
    } else if (formData.transactionId.trim().length < 5) {
      newErrors.transactionId = "Transaction ID must be at least 5 characters";
    }

    // Transaction screenshot validation
    if (!formData.transactionScreenshot) {
      newErrors.transactionScreenshot = "Transaction screenshot is required";
    } else if (formData.transactionScreenshot.size > 5 * 1024 * 1024) {
      newErrors.transactionScreenshot = "File size must be less than 5MB";
    } else if (
      !["image/png", "image/jpeg", "image/jpg"].includes(
        formData.transactionScreenshot.type
      )
    ) {
      newErrors.transactionScreenshot = "Only PNG and JPG formats are allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleEventChange = (eventId) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter((id) => id !== eventId)
        : [...prev.events, eventId],
    }));
    if (errors.events) {
      setErrors((prev) => ({
        ...prev,
        events: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          transactionScreenshot: "Only PNG and JPG formats are allowed",
        }));
        return;
      }

      // Validate file size
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          transactionScreenshot: "File size must be less than 5MB",
        }));
        return;
      }

      setFormData((prev) => ({
        ...prev,
        transactionScreenshot: file,
      }));
      if (errors.transactionScreenshot) {
        setErrors((prev) => ({
          ...prev,
          transactionScreenshot: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔴 Form submission started");

    if (!validateForm()) {
      console.log("❌ Form validation failed");
      return;
    }

    console.log("✅ Form validation passed");
    setIsLoading(true);

    try {
      // Replace with your Google Form ID
      const GOOGLE_FORM_ID = "1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg";
      const GOOGLE_FORM_URL = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

      // Map your form fields to Google Form entry IDs
      const fieldMapping = {
        fullName: "entry.303847679",
        phone: "entry.1833960056",
        email: "entry.1579532468",
        department: "entry.702491016",
        collegeName: "entry.659720641",
        year: "entry.984407084",
        techEvents: "entry.856598507", // Tech events entry ID
        nonTechEvents: "entry.544681371", // Non-tech events entry ID
        foodPreference: "entry.296598486",
        transactionId: "entry.189943842",
        teamName: "entry.2092055580",
        transactionScreenshot: "entry.1870309248",
      };

      // Separate events by track
      const techEvents = formData.events
        .map((id) => eventOptions.find((e) => e.id === id))
        .filter((event) => event?.track === "Technical")
        .map((event) => event.name)
        .join(", ");

      const nonTechEvents = formData.events
        .map((id) => eventOptions.find((e) => e.id === id))
        .filter((event) => event?.track !== "Technical")
        .map((event) => event.name)
        .join(", ");

      // Create FormData for submission
      const formDataToSubmit = new FormData();

      // Add text fields
      formDataToSubmit.append(fieldMapping.fullName, formData.name);
      formDataToSubmit.append(fieldMapping.phone, formData.phone);
      formDataToSubmit.append(fieldMapping.email, formData.email);
      formDataToSubmit.append(fieldMapping.department, formData.department);
      formDataToSubmit.append(fieldMapping.collegeName, formData.collegeName);
      formDataToSubmit.append(fieldMapping.year, formData.year);
      formDataToSubmit.append(fieldMapping.techEvents, techEvents);
      formDataToSubmit.append(fieldMapping.nonTechEvents, nonTechEvents);
      formDataToSubmit.append(
        fieldMapping.foodPreference,
        formData.foodPreference
      );
      formDataToSubmit.append(
        fieldMapping.transactionId,
        formData.transactionId
      );

      // Add team name if paper presentation is selected
      if (formData.events.includes("paper-presentation")) {
        formDataToSubmit.append(fieldMapping.teamName, formData.teamName);
      }

      // Add transaction screenshot
      if (formData.transactionScreenshot) {
        formDataToSubmit.append(
          fieldMapping.transactionScreenshot,
          formData.transactionScreenshot
        );
      }

      console.log("📋 Form data prepared for submission");
      console.log("🌐 Sending to Google Forms...");

      // Submit to Google Form
      const response = await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        body: formDataToSubmit,
        mode: "no-cors",
      });

      console.log("📨 Response status:", response.status);
      console.log("✅ Form submitted successfully to Google Forms!");
      setSubmitted(true);
      setIsLoading(false);
    } catch (error) {
      console.error("🔴 Error:", error);
      setErrors({ general: error.message || "Failed to submit registration" });
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      department: "",
      collegeName: "",
      year: "",
      events: [],
      foodPreference: "",
      transactionId: "",
      teamName: "",
      paperAbstract: null,
      presentationPDF: null,
      presentationWord: null,
      transactionScreenshot: null,
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen w-screen overflow-x-hidden bg-slate-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-violet-300/15 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl opacity-40"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center px-5 py-20 sm:py-28">
          <div
            className="w-full max-w-2xl rounded-2xl bg-slate-950/60 backdrop-blur-xl p-8 sm:p-12 border shadow-2xl"
            style={{ borderColor: "rgba(6, 182, 212, 0.3)" }}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className="mb-6 flex-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-300/40 to-blue-300/40 border animate-pulse"
                style={{ borderColor: "rgba(6, 182, 212, 0.6)" }}
              >
                <span className="text-3xl">✓</span>
              </div>

              <h2 className="font-zentry text-3xl sm:text-4xl font-black text-blue-50 mb-3">
                Registration Confirmed!
              </h2>

              <p className="text-blue-100/70 font-general text-sm sm:text-base mb-8 max-w-md">
                Thank you for registering for Ozmenta&apos;26. We&apos;ve
                received your submission and will contact you shortly.
              </p>

              <div className="w-full bg-slate-900/40 rounded-xl p-6 mb-8 border border-blue-300/20">
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between pb-3 border-b border-blue-300/10">
                    <p className="text-blue-300/60 font-general text-xs uppercase">
                      Name
                    </p>
                    <p className="text-blue-50 font-general text-sm font-semibold">
                      {formData.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-blue-300/10">
                    <p className="text-blue-300/60 font-general text-xs uppercase">
                      Email
                    </p>
                    <p className="text-blue-50 font-general text-sm font-semibold">
                      {formData.email}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-blue-300/10">
                    <p className="text-blue-300/60 font-general text-xs uppercase">
                      Events
                    </p>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {formData.events.map((id) => {
                        const event = eventOptions.find((e) => e.id === id);
                        return (
                          <span
                            key={id}
                            className="px-2 py-1 text-xs font-general rounded-full border"
                            style={{
                              backgroundColor: "rgba(6, 182, 212, 0.2)",
                              color: "rgba(6, 182, 212, 0.8)",
                              borderColor: "rgba(6, 182, 212, 0.4)",
                            }}
                          >
                            {event?.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-blue-300/10">
                    <p className="text-blue-300/60 font-general text-xs uppercase">
                      Food Preference
                    </p>
                    <p className="text-blue-50 font-general text-sm font-semibold">
                      {formData.foodPreference}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-blue-300/10">
                    <p className="text-blue-300/60 font-general text-xs uppercase">
                      Transaction ID
                    </p>
                    <p className="text-blue-50 font-general text-sm font-semibold">
                      {formData.transactionId}
                    </p>
                  </div>
                  {formData.events.includes("paper-presentation") && (
                    <>
                      <div className="flex items-center justify-between pb-3 border-b border-blue-300/10">
                        <p className="text-blue-300/60 font-general text-xs uppercase">
                          Team Name
                        </p>
                        <p className="text-blue-50 font-general text-sm font-semibold">
                          {formData.teamName}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-blue-300/10">
                        <p className="text-blue-300/60 font-general text-xs uppercase">
                          Paper Abstract
                        </p>
                        <p className="text-blue-50 font-general text-sm font-semibold">
                          {formData.paperAbstract?.name || "Not uploaded"}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pb-3 border-b border-blue-300/10">
                        <p className="text-blue-300/60 font-general text-xs uppercase">
                          Presentation (PDF)
                        </p>
                        <p className="text-blue-50 font-general text-sm font-semibold">
                          {formData.presentationPDF?.name || "Not uploaded"}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-blue-300/60 font-general text-xs uppercase">
                          Presentation (Word)
                        </p>
                        <p className="text-blue-50 font-general text-sm font-semibold">
                          {formData.presentationWord?.name || "Not uploaded"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={handleReset}
                className="group relative z-20 cursor-pointer rounded-full px-6 py-2.5 text-black font-general font-semibold uppercase text-sm transition-all hover:bg-yellow-300 hover:shadow-lg flex items-center gap-2"
                style={{ backgroundColor: "#06b6d4" }}
              >
                Register Another Event
                <TiLocationArrow className="text-base group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-slate-950">
      {/* Animated Background - matching home page style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-50 animate-pulse"
          style={{ backgroundColor: "rgba(6, 182, 212, 0.2)" }}
        ></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-100/10 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 py-8 sm:py-12 px-5 sm:px-10 pt-24 sm:pt-28">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-10 sm:mb-14 text-center">
            <p
              className="font-general text-[13px] uppercase tracking-wider mb-3"
              style={{ color: "rgba(6, 182, 212, 0.8)" }}
            >
              Join the Symposium
            </p>
            <h1 className="special-font font-zentry text-4xl sm:text-5xl md:text-6xl font-black text-blue-50 mb-4 leading-tight">
              Regist<b>e</b>r for <br /> Ozm<b>e</b>nta&apos;26
            </h1>
            <p className="font-general text-blue-100/60 text-sm sm:text-base max-w-2xl mx-auto">
              Complete your details and choose your events
            </p>
          </div>

          {/* Form Card */}
          <div
            className="form-card relative rounded-2xl bg-slate-900/60 backdrop-blur-md p-6 sm:p-8 border shadow-2xl"
            style={{ borderColor: "rgba(6, 182, 212, 0.2)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="form-field">
                <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">
                  Full Name <span className="text-yellow-300">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`w-full px-3 py-2 rounded-lg bg-slate-900/60 border font-general text-sm text-blue-50 placeholder-blue-300/40 outline-none transition-all backdrop-blur-sm ${
                    errors.name
                      ? "border-red-500/40 focus:border-red-500"
                      : "border-blue-300/20 focus:bg-slate-900"
                  }`}
                  style={
                    !errors.name
                      ? { borderColor: "rgba(203, 213, 225, 0.2)" }
                      : {}
                  }
                  onFocus={(e) =>
                    !errors.name &&
                    (e.target.style.borderColor = "rgba(6, 182, 212, 0.6)")
                  }
                  onBlur={(e) =>
                    !errors.name &&
                    (e.target.style.borderColor = "rgba(203, 213, 225, 0.2)")
                  }
                />
                {errors.name && (
                  <p className="mt-1.5 font-general text-xs text-red-400">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Phone & Email Row */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                {/* Phone Field */}
                <div className="form-field">
                  <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">
                    Phone Number <span className="text-yellow-300">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    className={`w-full px-3 py-2 rounded-lg bg-slate-900/60 border font-general text-sm text-blue-50 placeholder-blue-300/40 outline-none transition-all backdrop-blur-sm ${
                      errors.phone
                        ? "border-red-500/40 focus:border-red-500"
                        : "border-blue-300/20 focus:bg-slate-900"
                    }`}
                    style={
                      !errors.phone
                        ? { borderColor: "rgba(203, 213, 225, 0.2)" }
                        : {}
                    }
                    onFocus={(e) =>
                      !errors.phone &&
                      (e.target.style.borderColor = "rgba(6, 182, 212, 0.6)")
                    }
                    onBlur={(e) =>
                      !errors.phone &&
                      (e.target.style.borderColor = "rgba(203, 213, 225, 0.2)")
                    }
                  />
                  {errors.phone && (
                    <p className="mt-1.5 font-general text-xs text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-field">
                  <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">
                    Email Address <span className="text-yellow-300">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full px-3 py-2 rounded-lg bg-slate-900/60 border font-general text-sm text-blue-50 placeholder-blue-300/40 outline-none transition-all backdrop-blur-sm ${
                      errors.email
                        ? "border-red-500/40 focus:border-red-500"
                        : "border-blue-300/20 focus:bg-slate-900"
                    }`}
                    style={
                      !errors.email
                        ? { borderColor: "rgba(203, 213, 225, 0.2)" }
                        : {}
                    }
                    onFocus={(e) =>
                      !errors.email &&
                      (e.target.style.borderColor = "rgba(6, 182, 212, 0.6)")
                    }
                    onBlur={(e) =>
                      !errors.email &&
                      (e.target.style.borderColor = "rgba(203, 213, 225, 0.2)")
                    }
                  />
                  {errors.email && (
                    <p className="mt-1.5 font-general text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Department & College Row */}
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                {/* Department Field */}
                <div className="form-field">
                  <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">
                    Department <span className="text-yellow-300">*</span>
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                    className={`w-full px-3 py-2 rounded-lg bg-slate-900/60 border font-general text-sm text-blue-50 placeholder-blue-300/40 outline-none transition-all backdrop-blur-sm ${
                      errors.department
                        ? "border-red-500/40 focus:border-red-500"
                        : "border-blue-300/20 focus:bg-slate-900"
                    }`}
                    style={
                      !errors.department
                        ? { borderColor: "rgba(203, 213, 225, 0.2)" }
                        : {}
                    }
                    onFocus={(e) =>
                      !errors.department &&
                      (e.target.style.borderColor = "rgba(6, 182, 212, 0.6)")
                    }
                    onBlur={(e) =>
                      !errors.department &&
                      (e.target.style.borderColor = "rgba(203, 213, 225, 0.2)")
                    }
                  />
                  {errors.department && (
                    <p className="mt-1.5 font-general text-xs text-red-400">
                      {errors.department}
                    </p>
                  )}
                </div>

                {/* College Name Field */}
                <div className="form-field">
                  <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">
                    College Name <span className="text-yellow-300">*</span>
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleChange}
                    placeholder="Velammal Engineering College"
                    className={`w-full px-3 py-2 rounded-lg bg-slate-900/60 border font-general text-sm text-blue-50 placeholder-blue-300/40 outline-none transition-all backdrop-blur-sm ${
                      errors.collegeName
                        ? "border-red-500/40 focus:border-red-500"
                        : "border-blue-300/20 focus:bg-slate-900"
                    }`}
                    style={
                      !errors.collegeName
                        ? { borderColor: "rgba(203, 213, 225, 0.2)" }
                        : {}
                    }
                    onFocus={(e) =>
                      !errors.collegeName &&
                      (e.target.style.borderColor = "rgba(6, 182, 212, 0.6)")
                    }
                    onBlur={(e) =>
                      !errors.collegeName &&
                      (e.target.style.borderColor = "rgba(203, 213, 225, 0.2)")
                    }
                  />
                  {errors.collegeName && (
                    <p className="mt-1.5 font-general text-xs text-red-400">
                      {errors.collegeName}
                    </p>
                  )}
                </div>
              </div>

              {/* Year Field */}
              <div className="form-field">
                <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">
                  Current Year <span className="text-yellow-300">*</span>
                </label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 rounded-lg bg-slate-900/60 border font-general text-sm text-blue-50 outline-none transition-all cursor-pointer backdrop-blur-sm ${
                    errors.year
                      ? "border-red-500/40 focus:border-red-500"
                      : "border-blue-300/20 focus:bg-slate-900"
                  }`}
                  style={
                    !errors.year
                      ? { borderColor: "rgba(203, 213, 225, 0.2)" }
                      : {}
                  }
                  onFocus={(e) =>
                    !errors.year &&
                    (e.target.style.borderColor = "rgba(6, 182, 212, 0.6)")
                  }
                  onBlur={(e) =>
                    !errors.year &&
                    (e.target.style.borderColor = "rgba(203, 213, 225, 0.2)")
                  }
                >
                  <option value="">Select Year</option>
                  <option value="I">I</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                </select>
                {errors.year && (
                  <p className="mt-1.5 font-general text-xs text-red-400">
                    {errors.year}
                  </p>
                )}
              </div>

              {/* Events Field - Categorized */}
              <div className="form-field">
                <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-4">
                  Select Events <span className="text-yellow-300">*</span>
                </label>
                <div className="space-y-4">
                  {Object.entries(eventsByTrack).map(([track, events]) => (
                    <div key={track}>
                      <h3
                        className="font-general text-xs font-bold uppercase tracking-wider mb-2.5 pl-1"
                        style={{ color: "rgba(6, 182, 212, 0.8)" }}
                      >
                        {track} Events
                      </h3>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {events.map((event) => (
                          <label
                            key={event.id}
                            className="flex items-center p-2.5 rounded-lg bg-slate-800/40 border border-blue-300/15 cursor-pointer transition-all group"
                            style={{ borderColor: "rgba(203, 213, 225, 0.15)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor =
                                "rgba(6, 182, 212, 0.4)";
                              e.currentTarget.style.backgroundColor =
                                "rgba(30, 41, 59, 0.6)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor =
                                "rgba(203, 213, 225, 0.15)";
                              e.currentTarget.style.backgroundColor =
                                "rgba(30, 41, 59, 0.4)";
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={formData.events.includes(event.id)}
                              onChange={() => handleEventChange(event.id)}
                              className="w-4 h-4 rounded bg-slate-700 border border-blue-300/30 cursor-pointer transition-colors"
                              style={{ accentColor: "#06b6d4" }}
                            />
                            <div className="ml-3 flex-1 min-w-0">
                              <p className="font-general text-sm text-blue-50 group-hover:text-blue-100 transition-colors line-clamp-1">
                                {event.name}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {errors.events && (
                  <p className="mt-2 font-general text-xs text-red-400">
                    {errors.events}
                  </p>
                )}
              </div>

              {/* Food Preference Field */}
              <div className="form-field">
                <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">
                  Food Preference <span className="text-yellow-300">*</span>
                </label>
                <div className="grid sm:grid-cols-2 gap-3 sm:gap-5">
                  <label
                    className="flex items-center p-3 rounded-lg bg-slate-800/40 border border-blue-300/15 cursor-pointer transition-all group"
                    style={{ borderColor: "rgba(203, 213, 225, 0.15)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(6, 182, 212, 0.4)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(30, 41, 59, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(203, 213, 225, 0.15)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(30, 41, 59, 0.4)";
                    }}
                  >
                    <input
                      type="radio"
                      name="foodPreference"
                      value="Veg"
                      checked={formData.foodPreference === "Veg"}
                      onChange={handleChange}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: "#06b6d4" }}
                    />
                    <span className="ml-3 font-general text-sm text-blue-50 group-hover:text-blue-100 transition-colors">
                      Veg
                    </span>
                  </label>
                  <label
                    className="flex items-center p-3 rounded-lg bg-slate-800/40 border border-blue-300/15 cursor-pointer transition-all group"
                    style={{ borderColor: "rgba(203, 213, 225, 0.15)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(6, 182, 212, 0.4)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(30, 41, 59, 0.6)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor =
                        "rgba(203, 213, 225, 0.15)";
                      e.currentTarget.style.backgroundColor =
                        "rgba(30, 41, 59, 0.4)";
                    }}
                  >
                    <input
                      type="radio"
                      name="foodPreference"
                      value="Non Veg"
                      checked={formData.foodPreference === "Non Veg"}
                      onChange={handleChange}
                      className="w-4 h-4 rounded cursor-pointer"
                      style={{ accentColor: "#06b6d4" }}
                    />
                    <span className="ml-3 font-general text-sm text-blue-50 group-hover:text-blue-100 transition-colors">
                      Non Veg
                    </span>
                  </label>
                </div>
                {errors.foodPreference && (
                  <p className="mt-1.5 font-general text-xs text-red-400">
                    {errors.foodPreference}
                  </p>
                )}
              </div>

              {/* Team Name Field - Conditional for Paper Presentation */}
              {formData.events.includes("paper-presentation") && (
                <div className="form-field">
                  <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">
                    Team Name <span className="text-yellow-300">*</span>
                  </label>
                  <input
                    type="text"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    placeholder="Enter your team name"
                    className={`w-full px-3 py-2 rounded-lg bg-slate-900/60 border font-general text-sm text-blue-50 placeholder-blue-300/40 outline-none transition-all backdrop-blur-sm ${
                      errors.teamName
                        ? "border-red-500/40 focus:border-red-500"
                        : "border-blue-300/20 focus:bg-slate-900"
                    }`}
                    style={
                      !errors.teamName
                        ? { borderColor: "rgba(203, 213, 225, 0.2)" }
                        : {}
                    }
                    onFocus={(e) =>
                      !errors.teamName &&
                      (e.target.style.borderColor = "rgba(6, 182, 212, 0.6)")
                    }
                    onBlur={(e) =>
                      !errors.teamName &&
                      (e.target.style.borderColor = "rgba(203, 213, 225, 0.2)")
                    }
                  />
                  {errors.teamName && (
                    <p className="mt-1.5 font-general text-xs text-red-400">
                      {errors.teamName}
                    </p>
                  )}
                </div>
              )}

              {/* Registration Fee QR Code - Collapsible */}
              <div className="form-field">
                <button
                  type="button"
                  onClick={() => setShowQRCode(!showQRCode)}
                  className="w-full flex items-center justify-between p-2.5 border rounded-lg bg-blue-900/40 hover:bg-blue-900/60 transition-all duration-300 group"
                  style={{ borderColor: "rgba(203, 213, 225, 0.3)" }}
                >
                  <span className="font-general text-sm font-bold text-blue-50 uppercase tracking-wider">
                    📱 Payment QR Code (Registration Fee ₹150)
                  </span>
                  <span
                    className={`text-yellow-300 text-lg transition-transform duration-300 ${
                      showQRCode ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Collapsible QR Code Section */}
                {showQRCode && (
                  <div
                    className="mt-3 p-4 border rounded-lg bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300"
                    style={{ borderColor: "rgba(203, 213, 225, 0.3)" }}
                  >
                    <p className="font-general text-xs text-blue-50 mb-3 text-center">
                      Scan the QR code below to complete your payment. After
                      payment, upload the transaction screenshot below.
                    </p>
                    <div className="flex justify-center">
                      <img
                        src="/img/registration-fee.jpeg"
                        alt="Registration Fee QR Code"
                        className="w-full max-w-xs h-auto rounded-lg border border-yellow-300/50 shadow-lg"
                      />
                    </div>
                    <p className="font-general text-xs text-yellow-300 mt-3 text-center">
                      💡 Scan this QR to pay ₹150 registration fee
                    </p>
                  </div>
                )}
              </div>

              {/* Transaction ID Field */}
              <div className="form-field">
                <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">
                  Transaction ID <span className="text-yellow-300">*</span>
                </label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  placeholder="Enter transaction ID (from payment gateway)"
                  className={`w-full px-3 py-2 rounded-lg bg-slate-900/60 border font-general text-sm text-blue-50 placeholder-blue-300/40 outline-none transition-all backdrop-blur-sm ${
                    errors.transactionId
                      ? "border-red-500/40 focus:border-red-500"
                      : "border-blue-300/20 focus:bg-slate-900"
                  }`}
                  style={
                    !errors.transactionId
                      ? { borderColor: "rgba(203, 213, 225, 0.2)" }
                      : {}
                  }
                  onFocus={(e) =>
                    !errors.transactionId &&
                    (e.target.style.borderColor = "rgba(6, 182, 212, 0.6)")
                  }
                  onBlur={(e) =>
                    !errors.transactionId &&
                    (e.target.style.borderColor = "rgba(203, 213, 225, 0.2)")
                  }
                />
                {errors.transactionId && (
                  <p className="mt-1.5 font-general text-xs text-red-400">
                    {errors.transactionId}
                  </p>
                )}
              </div>

              {/* File Upload Field */}
              <div className="form-field">
                <label className="block font-general text-xs font-bold text-blue-100 uppercase tracking-wider mb-2">
                  Transaction Screenshot (₹150){" "}
                  <span className="text-yellow-300">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className={`block px-3 py-3 rounded-lg border-2 border-dashed cursor-pointer transition-all text-center backdrop-blur-sm ${
                      errors.transactionScreenshot
                        ? "border-red-500/40 bg-red-500/5"
                        : formData.transactionScreenshot
                        ? "bg-opacity-10"
                        : "bg-slate-900/40 hover:bg-slate-900/60"
                    }`}
                    style={
                      !errors.transactionScreenshot
                        ? formData.transactionScreenshot
                          ? {
                              borderColor: "rgba(6, 182, 212, 0.6)",
                              backgroundColor: "rgba(6, 182, 212, 0.1)",
                            }
                          : { borderColor: "rgba(203, 213, 225, 0.3)" }
                        : {}
                    }
                    onMouseEnter={(e) =>
                      !errors.transactionScreenshot &&
                      !formData.transactionScreenshot &&
                      (e.currentTarget.style.borderColor =
                        "rgba(6, 182, 212, 0.5)")
                    }
                    onMouseLeave={(e) =>
                      !errors.transactionScreenshot &&
                      !formData.transactionScreenshot &&
                      (e.currentTarget.style.borderColor =
                        "rgba(203, 213, 225, 0.3)")
                    }
                  >
                    {formData.transactionScreenshot ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg">✓</span>
                        <div className="text-left">
                          <p className="font-general text-xs text-blue-50 font-semibold">
                            {formData.transactionScreenshot.name}
                          </p>
                          <p className="font-general text-xs text-blue-300/60">
                            {(
                              formData.transactionScreenshot.size / 1024
                            ).toFixed(1)}{" "}
                            KB
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="font-general text-sm text-blue-50 mb-1">
                          Click to upload
                        </p>
                        <p className="font-general text-xs text-blue-300/60">
                          PNG, JPG • Max 5MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
                {errors.transactionScreenshot && (
                  <p className="mt-1.5 font-general text-xs text-red-400">
                    {errors.transactionScreenshot}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 group relative z-20 cursor-pointer rounded-full px-6 py-2 text-black font-general font-bold uppercase text-xs transition-all hover:bg-yellow-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#06b6d4" }}
                >
                  {isLoading ? (
                    <>
                      <span
                        className="three-body"
                        style={{
                          "--uib-size": "16px",
                          "--uib-speed": "0.8s",
                          "--uib-color": "#000",
                        }}
                      >
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                        <div className="three-body__dot"></div>
                      </span>
                      Submitting
                    </>
                  ) : (
                    <>
                      Register Now
                      <TiLocationArrow className="text-base group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Info Text */}
              <p className="font-general text-xs text-blue-300/50 text-center pt-2">
                By registering, you agree to our terms and conditions.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
