im going to make this file for erros thjat i countered during working on this full stack application
1->momgodb console.log  was printing out the text sucessfully but in real it was not connected so the this waas because while exporting the function i put the "()" by mistaken and there was no await in the async
function which was instantly calling the functions but db wasnt getting conncetd
2->i put the semicolon after "PORT" in .env file due to this it was giving major errors"permissions denied for this PORT"
3>because of type module web are using we need to put extension ".js" at the ned of the each file importing
4->i was getting errors because i was using broweserouter and create browser router 
but was using link in my main.jsx which hasn link and link requires broswerrouter which moved nav to the home page and removed the browser router ,errros were gone
5->cant use nav or home compoenents when working with createbrowserrouter->will figure it out
6->i was getting useEffect error
so what i was doing is ,i was using the axios to make the api call inside of async and async was inside of the useEffect but i was not calling the async func whicih was giving the error