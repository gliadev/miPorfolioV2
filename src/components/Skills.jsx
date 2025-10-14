import { useState } from "react";
import Galaxy from "./Galaxy";

import swift from "../assets/icons/swiftLogo.png";
import swiftui from "../assets/icons/swiftUI.png";
import swiftData from "../assets/icons/swiftData.png";
import xcode from "../assets/icons/xcode.png";
import xctest from "../assets/icons/communityIcon_5f68req80eq61-removebg-preview.png";
import reactLogo from "../assets/icons/react.png";
import html from "../assets/icons/html.png";
import css from "../assets/icons/css.png";
import jupyterNotebook from "../assets/icons/jupyterNotebook.png";
import python from "../assets/icons/python.png";
import javascriptLogo from "../assets/icons/javascript.png";

const PATHS = {
  "Galaxia iOS 📲":
    "M80 140 Q80 100 120 100 H180 Q220 100 220 140 V310 Q220 350 180 350 H120 Q80 350 80 310 Z",
  "Galaxia Web 🌐":
    "M80 225 C80 155 160 155 160 225 C160 295 80 295 80 225 M160 225 C160 155 240 155 240 225 C240 295 160 295 160 225",
  "Galaxia IA 🤖":
    "M83 220 C83 180 123 170 143 190 C153 165 198 165 218 190 C253 190 263 230 243 250 C253 280 233 305 203 295 C193 315 158 315 148 295 C128 315 98 305 93 280 C73 270 73 240 83 220 Z",
};

const skillsData = {
  "Galaxia iOS 📲": [
    { name: "Swift",     icon: swift,     offset: 0 },
    { name: "SwiftUI",   icon: swiftui,   offset: 20 },
    { name: "SwiftData", icon: swiftData, offset: 40 },
    { name: "XCTest",    icon: xctest,    offset: 60 },
    { name: "Xcode",     icon: xcode,     offset: 80 },
  ],
  "Galaxia Web 🌐": [
    { name: "HTML",       icon: html,           offset: 0 },
    { name: "CSS",        icon: css,            offset: 25 },
    { name: "JavaScript", icon: javascriptLogo, offset: 50 },
    { name: "React",      icon: reactLogo,      offset: 75 },
  ],
  "Galaxia IA 🤖": [
    { name: "Python",   icon: python,          offset: 0 },
    { name: "Jupyter",  icon: jupyterNotebook, offset: 50 },
  ],
};

export default function Skills() {
  const [showLabels, setShowLabels] = useState(true);
  return (
    <section className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-blue-300 text-blue-700">
        Universo del Desarrollo
      </h2>


      <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-center">
        {Object.entries(skillsData).map(([galaxyName, skills]) => (
          <Galaxy
            key={galaxyName}
    title={galaxyName}
    skills={skills}
    showLabels={showLabels}
    pathD={PATHS[galaxyName]}
    lockSpacing
    orbitSpeed={20}
    rotateWithPath={false}
          />
        ))}
      </div>
    </section>
  );
}
