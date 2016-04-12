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
