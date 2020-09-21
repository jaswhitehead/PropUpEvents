var seatGeekBase= "https://api.seatgeek.com/2";
var myKey= "&client_id=MTY5MzA1NDd8MTU3MTg3NTc4Mi40NA";
var byVenues= "/venues?q=";
var byEvents= "/events?";
var byPerformers="/performers?";
var byZip= "/events?postal_code=";
var userInput="q=";


$("#submit").on("click", callEvents);

function callEvents(){

        $("#event-wrap").empty();

    var initialInput= $("#cities").val().trim();
    userInput=initialInput;
    console.log("user input: "+ userInput);

    var query= seatGeekBase+byEvents+"q="+userInput+myKey;
    
    var settings= 
        {
            url: query,
            method:"GET"
        };

    var searchSelector= $("#searchSelector").val();
    
    console.log(searchSelector, "is my search value");

    if(searchSelector==="0"){
        $.ajax(settings).then(basicResults);
    }else if (searchSelector==="1"){
        settings.url=seatGeekBase+byPerformers+"q="+userInput+myKey;
        $.ajax(settings).then(performerResults);
    }else if(searchSelector==="2"){
        settings.url=seatGeekBase+byVenues+userInput+"&city=chicago"+myKey;
        $.ajax(settings).then(venueResults);
    }else if(searchSelector==="3"){
        settings.url= seatGeekBase+byZip+userInput+myKey;
        $.ajax(settings).then(basicResults);
    };        


    function basicResults(response){
        console.log("we got to basic response function:", response);

        if (response.events.length==0){
            var sryMsg=$("<h1>").addClass("sryMsg");
            var sryMsgSub=$("<h3>").addClass("sryMsgSub");
            sryMsg.text("Sorry we couldn't find any upcoming events based on your search for '"+initialInput+"'.")
            sryMsgSub.text("Check your spelling or try changing the search parameters.");

            $("#event-wrap").append(sryMsg, sryMsgSub);

        }else{

            for (var i= 0; i<response.events.length; i++) {
            
                var newEle0= $("<div>");
                var newEle1= $("<div>");
                var newEle2= $("<div>");
                var newEle3= $("<div>");
                var newEle4=$("<div>");
                var newLink= $("<a>");
                var newImg=$("<img>");

                newEle0.addClass("headLine");
                newEle1.addClass("venueName");
                newEle2.addClass("eventLocation");
                newEle3.addClass("col-md-6");
                newEle4.addClass("eventDate");
                newEle3.id = "words" + i;
                newEle3.addClass("box");
                newLink.addClass("eventLink");

                newEle0.text(response.events[i].title);
                newEle1.text(response.events[i].venue.name);
                newEle2.text(response.events[i].venue.address);
                newEle4.text(response.events[i].datetime_local);
                newLink.attr("href", response.events[i].url);
                newLink.text("Click here to find tickets");

                newEle3.append(newEle0, newEle1, newEle2, newEle4, newLink);

                $("#event-wrap").append(newEle3);

                }
                if(response.events[i].url==""){
                    console.log("no link available");
                }else {
                    newLink.text("Click here to find tickets");
                    $(".event-wrap").append(newLink);
                }
        }   

    };

    function performerResults(response){
        console.log("we got to performer response function:", response);

        if(response.performers.length===0
            // this following tag is not working and I don't know why currently, but if made function could improve the results feedback: 
            // || response.performers[0].has_upcoming_events==false
             ){

            var sryMsg=$("<h1>").addClass("sryMsg");
            var sryMsgSub=$("<h3>").addClass("sryMsgSub");
            sryMsg.text("Sorry we couldn't find any upcoming events based on your search for '"+initialInput+"'");
            sryMsgSub.text("Check your spelling or try changing the search parameters.");

            $("#event-wrap").append(sryMsg, sryMsgSub);

        }else{
            
            for (var i= 0; i<response.performers.length; i++) {
            
            var newEle0= $("<div>");
            var newEle1= $("<div>");
            var newEle2= $("<div>");
            var newEle3= $("<div>");
            var newEle4=$("<div>");
            var newLink= $("<a>");
            var newImg=$("<img>");
            
            newEle0.addClass("headLine");
            newEle1.addClass("venueName");  
            newEle2.addClass("eventLocation");
            newEle3.addClass("col-md-6");
            newEle4.addClass("eventDate");
            newEle3.id = "words" + i;
            newEle3.addClass("box");
            newLink.addClass("eventLink");
            newLink.text("click here to see tickets");
            newImg.addClass("eventImg");
             
            newEle0.text(response.performers[i].name);
            newEle1.text(response.performers[i].location);
            newLink.attr("href", response.performers[i].url);
            newImg.attr("src", response.performers[i].images.huge);

            newEle3.append(newEle0, newEle1, newEle2, newEle4, newLink, newImg);

            $("#event-wrap").append(newEle3);

            }
        }

    };

    function venueResults(response){
        console.log("we got to the venue results function", response)

        if (response.venues.length===0){

            var sryMsg=$("<h1>").addClass("sryMsg");
            var sryMsgSub=$("<h3>").addClass("sryMsgSub");
            sryMsg.text("Sorry we couldn't find any upcoming events based on your search for '"+initialInput+"'");
            sryMsgSub.text("Check your spelling or try changing the search parameters.");
            $("#event-wrap").append(sryMsg, sryMsgSub);
        }else{
            
            for(var i=0; i<response.venues.length; i++){
                
                var newEle0= $("<div>");
                var newEle1= $("<div>");
                var newEle2= $("<div>");
                var newEle3= $("<div>");
                var newLink= $("<a>");

                newEle0.addClass("headLine");
                newEle1.addClass("venueName");
                newEle2.addClass("eventLocation");
                newEle3.addClass("col-md-6");
                newEle3.id = "words" + i;
                newEle3.addClass("box");
                newLink.addClass("eventLink");

                newEle0.text(response.venues[i].name);
                newEle1.text(response.venues[i].address);
                newEle2.text(response.venues[i].extended_address);
                newLink.attr("href", response.venues[i].url);
                newLink.text("Click for more information");

                newEle3.append(newEle0, newEle1, newEle2, newLink);

                $("#event-wrap").append(newEle3);     
            }
           
        }


    };
    

}


$("#concerts").on("click", navConcerts);
$("#arts").on("click", navArts);
$("#sports").on("click", navSports);

var navSettings= 
        {
            url: seatGeekBase+byEvents+myKey,
            method:"GET"
        };

function navConcerts(){
    $("#event-wrap").empty();
    var navTopicVal= $("#concerts").val();

    if (navTopicVal==="1"){
        navSettings.url=seatGeekBase+byEvents+"q=chicago%rap"+myKey
        console.log(navSettings.url)
        $.ajax(navSettings).then(navTopicResults)
    }else if(navTopicVal==="2"){
        navSettings.url=seatGeekBase+byEvents+"q=jazz%chicago"+myKey
        console.log(navSettings.url)
        $.ajax(navSettings).then(navTopicResults)
    }else if(navTopicVal==="3"){
        navSettings.url=seatGeekBase+byEvents+"q=rock%chicago"+myKey
        $.ajax(navSettings).then(navTopicResults)
    
    }
}

function navArts(){
    $("#event-wrap").empty();
    var navTopicVal= $("#arts").val();

    if (navTopicVal==="1"){
        navSettings.url=seatGeekBase+byEvents+"q=play%chicago"+myKey
        $.ajax(navSettings).then(navTopicResults)
    }else if(navTopicVal==="2"){
        navSettings.url=seatGeekBase+byEvents+"q=musical%chicago"+myKey
        $.ajax(navSettings).then(navTopicResults)
    }else if(navTopicVal==="3"){
        navSettings.url=seatGeekBase+byEvents+"q=circus%chicago"+myKey
        $.ajax(navSettings).then(navTopicResults)
    }
}

function navSports(){
    $("#event-wrap").empty();
    var navTopicVal= $("#sports").val();

    if (navTopicVal==="1"){
        navSettings.url=seatGeekBase+byEvents+"q=basketball%rap"+myKey
        console.log(navSettings.url)
        $.ajax(navSettings).then(navTopicResults)
    }else if(navTopicVal==="2"){
        navSettings.url=seatGeekBase+byEvents+"q=baseball%chicago"+myKey
        console.log(navSettings.url)
        $.ajax(navSettings).then(navTopicResults)
    }else if(navTopicVal==="3"){
        navSettings.url=seatGeekBase+byEvents+"q=hockey%chicago"+myKey
        console.log(navSettings.url)
        $.ajax(navSettings).then(navTopicResults)
    
    }else if(navTopicVal==="4"){
        navSettings.url=seatGeekBase+byEvents+"q=football"+myKey
        console.log(navSettings.url)
        $.ajax(navSettings).then(navTopicResults)
    }
}


function navTopicResults(response){

    $("#event-wrap").empty();

    console.log("we got to basic response function for NAVBAR:", response);

    if (response.events.length==0){
        var sryMsg=$("<h1>").addClass("sryMsg");
        sryMsg.text("Sorry we couldn't find any upcoming events for this topic")

        $("#event-wrap").append(sryMsg);

    }else{

        for (var i= 0; i<response.events.length; i++) {
        
            var newEle0= $("<div>");
            var newEle1= $("<div>");
            var newEle2= $("<div>");
            var newEle3= $("<div>");
            var newEle4=$("<div>");
            var newLink= $("<a>");
            var newImg=$("<img>");

            newEle0.addClass("headLine");
            newEle1.addClass("venueName");
            newEle2.addClass("eventLocation");
            newEle3.addClass("col-md-6");
            newEle4.addClass("eventDate");
            newEle3.id = "words" + i;
            newEle3.addClass("box");
            newLink.addClass("eventLink");

            newEle0.text(response.events[i].title);
            newEle1.text(response.events[i].venue.name);
            newEle2.text(response.events[i].venue.address);
            newEle4.text(response.events[i].datetime_local);
            newLink.attr("href", response.events[i].url);
            newLink.text("Click here to find tickets");

            newEle3.append(newEle0, newEle1, newEle2, newEle4, newLink);

            $("#event-wrap").append(newEle3);

            }
            if(response.events[i].url==""){
                console.log("no link available");
            }else {
                newLink.text("Click here to find tickets");
                $(".event-wrap").append(newLink);
            }
    }   

};