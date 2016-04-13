# Website Performance Optimization Project
Project 5 of Udacity's Front-End Web Development nanodegree. This project was designed to teach website optimization by obtaining a score greater than 90 on PageSpeed Insights and achieving greater than 60 Frames Per Second (FPS).

The following steps were taken to improve performance:
* Install Gulp to:
  * Concatenate JavaScript and CSS
  * Minify JavaScript and CSS
  * In-line CSS in all of the HTML files
  * Use both Ngrok and Browser Sync to create a local instance of the website
  * And to use psi to automatically start Ngrok and Browser Sync with one command

* Index.html
  * Moved the orientation: portrait CSS to it's own CSS file and added the 'media' tag to the HTML link
  * Added a 'print' media tag to the print CSS file link to prevent render blocking
  * Added 'async' to the JavaScript scripts to prevent the scripts from render blocking
  * All images were resized and optimized using Adobe Photoshop

* Pizza.html
  * Merged some of the switches to reduce the amount of calculations and total size
  * Removed all calculations which give constant values outside of for loops
  * Used transform CSS and reduced the total number of moving pizzas in pizza.html
  * Added requestAnimationFrame to help reduce paint and render time

### How to check optimization

* Index.html:
  * Go to Google's [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) page
  * Enter the [mobile-portfolio](http://miguelt89.github.io/mobile-optimization/) URL
  * Select 'analyze'
* Pizza.html:
  * Go to the [pizzas](http://miguelt89.github.io/mobile-optimization/views/pizza.html) page
  * Open dev tools (assuming Google Chrome and Window's OS, select f12)
  * Select 'Console'
    * The console window will display the amount of time it takes to generate 10 frames and how long it takes for the pizza sizes to change.
    * Scroll down until you see the size slider and select a size of pizza. The console window will log a value of <5ms.
  * Select 'Timeline'
    * To see the framerate at which the moving pizzas slide click on the timeline window and press ctrl + E to start recording and scroll up and/or down.
    * When you have finished scrolling, select CTRL + E to stop recording and look at the timeline
    * FPS should be at or near the top of the bar