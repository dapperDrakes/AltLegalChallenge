Alt Legal Code Challenge
===

Our service is a REST API. For web, we have a JS SDK designed to work with React as a view layer. Express is used to allow privileged communication, handle implementation-specific caching, respond to bot traffic like Google, and handle non-app content (homepage, landing pages, etc).

Much of our work is highly specific to the legal domain. So we'd like you to do something more generic, but that has direct technical similarities to the work for this position.

# Hashtag Watchlists (your task)
Your app should let the user set up hashtag watchlists. The user enters a hashtag (which may be autocompleted from trending hashtags in the US). Then a container is created on the screen showing the latest tweets with that hashtag. The tweets should be limited to English.

## Design
There is a comp included to show you how it should look in general. We also want to see how you approach design when given less than 100% spec coverage. Presentation of the tweets, design of any options, and how the autocomplete works (if implemented) are left to you.

##### Typefaces
We use Montserrat for titles and Lato for copy. Both are Google Fonts.
 - Montserrat: https://fonts.google.com/specimen/Montserrat
 - Lato: https://fonts.google.com/specimen/Lato

##### Logos
Copies of the logo are in the /img folder for the two sizes in the comp.

##### Colors
Text (normal): 	#333A39
Text (med): 	#605E5E
Text (light): 	#979797
Lines: 			#9C9C9C
Brand Green: 	#008B78
Blue: 			#137ABE
Red: 			#BE1413

## Third Party Libraries
You may include any third party software you like. Please be ready to tell us how you decided on it and what you did to integrate it.

##### Required
 - Users can create watchlists.
 - Users can remove watchlists.
 - Users are limited to 3 watchlists.
 - Watchlists update gracefully
 - Watchlists (which hashtags are being monitored, along with any settings, but not the actual tweets) are persisted one way or another. Local storage or a db are fine.

##### Bonus
 - Users can set the number of tweets per watchlist (default is 5)
 - Users can toggle the safe content filter
 - Users can toggle the attitude filters (positive, negative, or both)
 - The page looks "on-brand" for Alt Legal.
 - Hashtags are auto-completed from the trends/place api endpoint (https://dev.twitter.com/rest/reference/get/trends/place) for the US.
 - Users can sign in through twitter (if this is not done, you may hardcode auth tokens or persist them).

##### Notes
 - The `Dev Test Comp.sketch` file in the /comps folder is a Sketch binary file. You don't need to open it. It is included in case you have Sketch and prefer to use it in your workflow.