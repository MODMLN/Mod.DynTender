import React from "react";
const ScreenSizeDetector = require('screen-size-detector');


export default function displayOptionsSection(){
    const screen = new ScreenSizeDetector(); // Default options
    console.log(screen.width); // Then use screen anywhere in your project
    return(<></>)
}