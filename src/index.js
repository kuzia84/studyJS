"use strict";

import "@babel/polyfill";
import "nodelist-foreach-polyfill";
import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";
import polyfill from "cross-browser-polyfill";
polyfill();

import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import togglePopup from "./modules/togglePopup";
import scrollScreen from "./modules/scrollScreen";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import SliderCarousel from "./modules/slider2";
import changeTeamImg from "./modules/changeTeamImg";
import calcValidation from "./modules/calcValidation";
import calc from "./modules/calc";
import sendForm from "./modules/sendForm";

// Timer
countTimer("23 november 2020");
//Menu
toggleMenu();
//TogglePopup
togglePopup();
//ScrollScreen
scrollScreen();
//Tabs
tabs();
//Slider
// slider();
const carousel = new SliderCarousel({
  main: ".portfolio-wrapper",
  wrap: ".portfolio-content",
  prev: "#arrow-left",
  next: "#arrow-right",
  slidesToShow: 1,
  infinity: true,
});
carousel.init();
//Team
changeTeamImg();
//Calc
calcValidation();
calc(100);
//Send ajax from
sendForm("form1");
sendForm("form2");
sendForm("form3");
