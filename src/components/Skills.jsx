// src/components/Skills.jsx
import { useState } from "react";
import Galaxy from "./Galaxy";

import swift from "../assets/icons/swiftLogo.png";
import swiftui from "../assets/icons/swiftUI.png";
import swiftData from "../assets/icons/swiftData.png";
import Xcode from "../assets/icons/Xcode.png";
import XCTest from "../assets/icons/XCTest.png";
import react from "../assets/icons/react.png";
import html from "../assets/icons/html.png";
import css from "../assets/icons/css.png";
import jupyterNotebook from "../assets/icons/jupyterNotebook.png";
import Python from "../assets/icons/python.png";
import javaScript from "../assets/icons/javascript.png";

const skillsData = {
  "Galaxia iOS 📲": [
    { name: "Swift", icon: swift },
    { name: "SwiftUI", icon: swiftui },
    { name: "SwiftData", icon: swiftData },
    { name: "XCTest", icon: XCTest },
    { name: "Xcode", icon: Xcode },
  ],
  "Galaxia Web 🌐": [
    { name: "HTML", icon: html },
    { name: "CSS", icon: css },
    { name: "React", icon: react },
    { name: "JavaScript", icon: javaScript },
    { name: "Python", icon: Python },
  ],
  "Galaxia IA 🤖": [
    { name: "Jupyter Notebook", icon: jupyterNotebook },
    { name: "Python", icon: Python }
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
          <span className="text-zinc-800 dark:text-gray-200">
            Mostrar etiquetas
          </span>
        </label>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-center">
        {Object.entries(skillsData).map(([galaxyName, skills]) => (
          <Galaxy
            key={galaxyName}
            title={galaxyName}
            skills={skills}
            showLabels={showLabels}
          />
        ))}
      </div>
    </section>
  );
}
