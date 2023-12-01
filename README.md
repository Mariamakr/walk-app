# 9 front-end:
node.js - npm
npx create-react-app
cd project_name
npm start

erase React app logo 
and applied css for that

# 10 create the basic front end views:

create the header apply the desired css
create the Place list and Place details with react hooks


# 11 Fetch data from the api:


Do do that i have to use useEffect hook from react

now in order not to have that error related to CORS i go back to py charm and i do:
pip install django-cors-headers
and then go to settings. py and put the corsheaders to app settings and to middleware

# 12 Create components:

place-list.js
return the city
place-details.js
return the city and the location

create rating
download font awesome for react
aply the specific icon 
adjust the code so is functional

make a rating (request from the api)
use hook useState to color the stars i want by hovering on them 

# 13 Make rating functional:

i use fetch data the same way i use for get the data but i use method post 
i change the url and make it dynamic so it will store an id to the api
and also i create a body in which i use JSON.stringify

# 14 make the form for updating creating a new place from the front end:
create place-form.js
insert edit and delete button from font aswome
create an update button
use the null for hacking the displayed output when clicked

# 15 api-services:
create a service to put all the fetch data all together. (store the api services)
created based on the class.

each function i make i go to api-services.py to root it with my api 
update, create, delete

# 16 Create a login page:

So i want to change the displayed app not to come up as the first thing someone see

I will use router 

npm install react-router-dom

after the installation i change the index.js

then create the input for username and password a s created before for the location and city

create the loginClicked

in the response i can use the token and then to use cookies to store the credentials for a next login


# 17. I create a console.log for the token i have when i try to login and i connect the button with the /places page.

to use cookies i install
npm install reatc-cookie

use cookies now to store token

fix the bug where it redirects me immediatly to the /.places page:
To log in again we have to go to inspect -> application and delete the token from the resaults

# 18. Create a ternary operator for login or register and create the buttons and functions

i create a log out function with the same logic

i use fontawsome for the icon and then i delete the token onClick of the icon to return back to the starting point

 





