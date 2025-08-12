import { useState } from "react";
import Galaxy from "./Galaxy";
import swift from "../assets/icons/swiftLogo.png";
import swiftui from "../assets/icons/swiftUI.png";
import swiftData from "../assets/icons/swiftData.png";
import xcode from "../assets/icons/xcode.png";
import xctest from "../assets/icons/xctest.png";
import react from "../assets/icons/react.png";
import html from "../assets/icons/html.png";
import css from "../assets/icons/css.png";
import jupyterNotebook from "../assets/icons/jupyterNotebook.png";
import python from "../assets/icons/python.png";
import javaScript from "../assets/icons/javascript.png";


const PATHS = {
 
"Galaxia iOS 📲": "M155 390 L155 335 L125 300 L195 250 L145 205 L205 150 L165 110",

  
  "Galaxia Web 🌐":
    "M200 140 C310 140, 310 260, 200 260 C90 260, 90 380, 200 380 C310 380, 310 260, 200 260 C90 260, 90 140, 200 140",

 
  "Galaxia IA 🤖": "M80 160 L230 110 L275 185 L235 270 L135 240 L100 310 L70 240 Z",
};


const skillsData = {
  "Galaxia iOS 📲": [
  { name: "Swift",     icon: swift,     offset: 5,  speed: 24, reverse: false, size: 44 },
  { name: "SwiftUI",   icon: swiftui,   offset: 28, speed: 24, reverse: false, size: 44 },
  { name: "SwiftData", icon: swiftData, offset: 52, speed: 24, reverse: false, size: 44 },
  { name: "XCTest",    icon: xctest,    offset: 72, speed: 24, reverse: false, size: 44 },
  { name: "Xcode",     icon: xcode,     offset: 92, speed: 24, reverse: false, size: 44 },
],
  "Galaxia Web 🌐": [
    { name: "HTML",       icon: html,        offset: 5,  speed: 21 },
    { name: "CSS",        icon: css,         offset: 18, speed: 23 },
    { name: "React",      icon: react,       offset: 43, speed: 25, reverse: true },
    { name: "JavaScript", icon: javaScript,  offset: 62, speed: 22 },
    { name: "Python",     icon: python,      offset: 86, speed: 24, reverse: true },
  ],
  "Galaxia IA 🤖": [
    { name: "Python",           icon: python,           offset: 12, speed: 22 },
    { name: "Jupyter Notebook", icon: jupyterNotebook,  offset: 62, speed: 24, reverse: true },
  ],
};

export default function Skills() {
  const [showLabels, setShowLabels] = useState(true);

  return (
    <section className="w-full px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-blue-300 text-blue-700">
        Universo del Desarrollo
      </h2>

      <div className="mb-6 text-center">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showLabels}
            onChange={() => setShowLabels(!showLabels)}
            className="form-checkbox"
          />
          <span className="text-zinc-800 dark:text-gray-200">Mostrar etiquetas</span>
        </label>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-center">
        {Object.entries(skillsData).map(([galaxyName, skills]) => (
          <Galaxy
            key={galaxyName}
            title={galaxyName}
            skills={skills}
            showLabels={showLabels}
            pathD={PATHS[galaxyName]}
          />
        ))}
      </div>
    </section>
  );
}
