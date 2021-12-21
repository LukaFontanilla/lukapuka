import React from 'react';
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {DarkMode} from 'use-dark-mode'

interface FollowMeProps {
  darkMode: DarkMode
}

export const FollowMe: React.FC<FollowMeProps> = ({darkMode}) => {
    return (
        <>
        <p className={styles.description2}>Follow Me 👇🏽</p>
        <div style={{maxHeight:'2rem',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center', alignContent:'space-evenly'}}>
          <a href="https://github.com/LukaFontanilla" >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            // fill="none"
            viewBox="0 0 15 15"
          >
            <path
              fill={darkMode.value ? "white" : "black"}
              fillRule="evenodd"
              d="M7.5.85a6.65 6.65 0 00-2.102 12.96c.332.061.454-.144.454-.32 0-.159-.006-.576-.01-1.131-1.849.401-2.24-.892-2.24-.892-.302-.768-.738-.973-.738-.973-.604-.412.046-.404.046-.404.667.047 1.018.685 1.018.685.594 1.017 1.557.723 1.936.553.06-.43.232-.723.422-.889-1.477-.168-3.029-.738-3.029-3.287 0-.726.26-1.319.685-1.784-.069-.168-.297-.844.065-1.76 0 0 .558-.179 1.828.681.53-.147 1.1-.22 1.665-.223a6.394 6.394 0 011.665.223c1.27-.86 1.827-.68 1.827-.68.363.915.135 1.59.066 1.759.427.465.684 1.058.684 1.784 0 2.555-1.555 3.117-3.036 3.282.238.205.45.611.45 1.232 0 .888-.007 1.605-.007 1.823 0 .178.12.385.457.32A6.652 6.652 0 007.499.85z"
              clipRule="evenodd"
            />
          </svg>
          &nbsp;<span className="iconText"><b>Github</b></span>
          </a>
          &nbsp;&nbsp;
          <svg 
            xmlns="http://www.w3.org/2000/svg"
            width={69}
            height={69}
            fill="none"
            viewBox="-7.4597064093870245 -0.003996440313930094 737.5253755220347 195.65948684178153"
          >
          <path d="M58.49 0a16.6 16.6 0 0 0-13.77 25.86l7.09-7.08a6.88 6.88 0 0 1-.35-2.19 7 7 0 1 1 7 7 6.87 6.87 0 0 1-2.18-.35l-7.08 7.08A16.59 16.59 0 1 0 58.49 0z" fill="#34a853"/>
          <path d="M51.89 48.35a25.79 25.79 0 0 0-5.17-15.54L37.52 42A13.19 13.19 0 0 1 35 57.92l5 12.22a25.93 25.93 0 0 0 11.89-21.79z" fill="#fbbc04"/>
          <path d="M26.18 61.54h-.24a13.2 13.2 0 1 1 7.25-24.23l9.11-9.11a25.94 25.94 0 1 0-16.36 46.09 26.53 26.53 0 0 0 5.24-.52z" fill="#ea4335"/>
          <path d="M58.84 72.11a58.87 58.87 0 0 0-17 2.49l7.29 17.81a40.19 40.19 0 0 1 9.7-1.18 39.71 39.71 0 1 1-28.09 11.63 40.12 40.12 0 0 1 9.47-7L33 78.1a58.87 58.87 0 1 0 25.89-6z" fill="#4285f4"/>
          <g fill={darkMode.value ? "white" : "black"}>
            <path d="M174.72 24.34h16.55v124.93h60.93V165h-77.48zM276.19 158.23a47.42 47.42 0 0 1-17.66-18.51 53.43 53.43 0 0 1-6.33-25.88A53.43 53.43 0 0 1 258.53 88a47.42 47.42 0 0 1 17.66-18.51 51.17 51.17 0 0 1 51 0A47.56 47.56 0 0 1 344.86 88a53.54 53.54 0 0 1 6.33 25.88 53.54 53.54 0 0 1-6.33 25.88 47.56 47.56 0 0 1-17.66 18.51 51.17 51.17 0 0 1-51 0zm42-12.18a32.79 32.79 0 0 0 12.31-12.75 39.31 39.31 0 0 0 4.63-19.46 39.34 39.34 0 0 0-4.63-19.46 32.79 32.79 0 0 0-12.28-12.75 32.37 32.37 0 0 0-16.53-4.44 32.84 32.84 0 0 0-29 17.19 39.44 39.44 0 0 0-4.62 19.46 39.42 39.42 0 0 0 4.62 19.46 33 33 0 0 0 45.53 12.75zM383.77 158.23a47.56 47.56 0 0 1-17.66-18.51 53.54 53.54 0 0 1-6.33-25.88A53.54 53.54 0 0 1 366.11 88a47.56 47.56 0 0 1 17.66-18.51 51.17 51.17 0 0 1 51 0A47.49 47.49 0 0 1 452.44 88a53.54 53.54 0 0 1 6.33 25.88 53.54 53.54 0 0 1-6.33 25.88 47.49 47.49 0 0 1-17.66 18.51 51.17 51.17 0 0 1-51 0zm42-12.18a32.86 32.86 0 0 0 12.28-12.75 39.42 39.42 0 0 0 4.63-19.46 39.45 39.45 0 0 0-4.63-19.46 32.86 32.86 0 0 0-12.28-12.75 32.37 32.37 0 0 0-16.53-4.44 32.92 32.92 0 0 0-16.63 4.44 32.59 32.59 0 0 0-12.37 12.75 39.34 39.34 0 0 0-4.63 19.46 39.31 39.31 0 0 0 4.63 19.46 32.59 32.59 0 0 0 12.37 12.75 32.92 32.92 0 0 0 16.63 4.44 32.37 32.37 0 0 0 16.57-4.44zM470.66 24.34h16.54v88.92L537 62.67h21v.78l-42 42.41 40.1 58.4v.74h-19.84l-31.93-47.7-17.13 17.17V165h-16.54z"/>
            <path d="M577.45 158.42a45.88 45.88 0 0 1-17.1-18.23 55.12 55.12 0 0 1-6.13-26.19A57.48 57.48 0 0 1 560 88.43a46.28 46.28 0 0 1 16.43-18.8 43.74 43.74 0 0 1 24.47-7q14.16 0 24.56 6.33a42.1 42.1 0 0 1 16 17.48A56.33 56.33 0 0 1 647 112a33.68 33.68 0 0 1-.38 4.91h-76.35q.57 11 5.29 18.52a30.89 30.89 0 0 0 12 11.33 32.56 32.56 0 0 0 15.21 3.78q18.88 0 28.52-17.38l13.6 6.61a47.9 47.9 0 0 1-16.81 18.42Q617.31 165 602.2 165a46.92 46.92 0 0 1-24.75-6.58zM630 103.64a31.32 31.32 0 0 0-3.4-12.09 26.08 26.08 0 0 0-9.45-10.2q-6.42-4.16-16.24-4.16a27.52 27.52 0 0 0-19.27 7.27q-7.93 7.28-10.39 19.18zM657.68 62.69h15.76v19h.78q2.92-8.18 11.29-13.63A31.66 31.66 0 0 1 703 62.64a28.83 28.83 0 0 1 11.68 2.15V82.5a31 31 0 0 0-14-3.12 23.07 23.07 0 0 0-13.24 4.1 29.53 29.53 0 0 0-9.64 11 31.92 31.92 0 0 0-3.6 14.93V165h-16.52z"/>
          </g>
          </svg>
        </div>
        </>
    );
};

export default FollowMe;