import React, { useEffect, useState } from "react"


var nextLaunchDate
var changeOverToLiveStreamDate
var changeOverToLiveStreamHoursBeforeLaunch = 1

function pullSpaceXAPI() {

  fetch("https://api.spacexdata.com/v3/launches/next")
	.then(response => response.json())
	.then((jsonData) => {

		// jsonData is parsed json object received from url
    console.log(jsonData)
    // update the launch datetime
    nextLaunchDate = new Date(jsonData.launch_date_local)
    // change the mission name text
    document.getElementById("mission").getElementsByTagName("h1")[0].innerHTML = jsonData.mission_name
    // update the mission patch & fade it in
    document.getElementById('mission-patch').setAttribute("style","background-image:url('" + jsonData.links.mission_patch + "')")
    document.getElementById('mission-patch').classList.add("fadeIn")
    // update background to live stream if close to launch time
    changeOverToLiveStreamDate = new Date(nextLaunchDate.getTime() + (changeOverToLiveStreamHoursBeforeLaunch * 60 * 60 * 1000) )
    //console.log(nextLaunchDate)
    //console.log(changeOverToLiveStreamDate) 
    
	})
	.catch((error) => {
		// handle your errors here
	  console.error(error)
  })
}

pullSpaceXAPI()

function Countdown() {
  
  const calculateTimeLeft = () => {
    const difference = +nextLaunchDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        D: Math.floor(difference / (1000 * 60 * 60 * 24)),
        H: Math.floor((difference / (1000 * 60 * 60)) % 24),
        M: Math.floor((difference / 1000 / 60) % 60),
        S: Math.floor((difference / 1000) % 60)
      };
    }

    // If the time is less than 3 hours switch to the live stream in the background
    if(timeLeft.H < 3) {
      console.log("LESS THAN 3 HRS")
    }

    // If the time is less than 1 hour, adjust the graphics overlay for fullscreen video
    if(timeLeft.H == 1) {}
      console.log("LESS THAN 1 HR")
      console.log(timeLeft.H)
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach(interval => {

    // If there are 0 days, don't show the days
  	if(interval==="days" && !timeLeft[interval]) {
  		return;
  	}

    // If there's only a day left change the title to "day" so it doesn't read "days"
    if(interval==="days" && timeLeft[interval] === 1) {
      interval = "day"; 
      timeLeft[interval] = 1;
    }

    // Add a leading zero if in the 10s
    if(timeLeft[interval] < 10 ) timeLeft[interval] = "0"+timeLeft[interval]

    timerComponents.push(
      <h2>{timeLeft[interval]}<span>{interval}</span> </h2> 
    );

  });

  return (
  	<div id="countdown">
      {/*<img id="spacex" src="./SpaceX.svg"/>*/}
      <div id="spacex">
        <svg  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="-80 0 426 50">
          <defs>
          <filter id="white-glow">
                <feFlood result="flood" flood-color="#000000" flood-opacity="0.1"></feFlood>
                <feComposite in="flood" result="mask" in2="SourceGraphic" operator="in"></feComposite>
                <feMorphology in="mask" result="dilated" operator="dilate" radius="1"></feMorphology>
                <feGaussianBlur in="dilated" result="blurred" stdDeviation="2"></feGaussianBlur>
                <feMerge>
                    <feMergeNode in="blurred"></feMergeNode>
                    <feMergeNode in="SourceGraphic"></feMergeNode>
                </feMerge>
            </filter>
          </defs>
          <g>
            <path filter="url(#white-glow)" fill="#fff" d="M77.292,15.094H49.249l-1.039,0.777v24.947h7.763v-9.355l0.741-0.664h20.579   c5.196,0,7.632-1.398,7.632-4.985v-5.728C84.924,16.493,82.489,15.094,77.292,15.094 M77.292,24.317   c0,1.69-1.118,2.041-3.554,2.041H56.799l-0.827-0.804V20.21l0.741-0.678h17.025c2.436,0,3.554,0.347,3.554,2.045V24.317z"/>
            <polyline filter="url(#white-glow)" fill="#fff" points="99.081,19.813 105.761,29.6 105.391,30.548 90.618,30.548 86.847,35.187 108.837,35.187 110.361,36.115 113.775,40.824 122.659,40.824 103.186,14.775"/>
            <polyline filter="url(#white-glow)" fill="#fff" points="187.418,35.757 187.418,28.833 188.217,28.143 203.079,28.143 203.079,23.734 179.524,23.734 179.524,40.823 214.27,40.823 214.27,36.435 188.252,36.435"/>
            <rect filter="url(#white-glow)" x="179.524" y="15.094" fill="#fff" width="35.113" height="4.848"/>
            <path filter="url(#white-glow)" fill="#fff" d="M140.361,19.685h28.288c-0.436-3.597-2.668-4.595-8.33-4.595H140.06c-6.389,0-8.427,1.247-8.427,6.082   v13.565c0,4.84,2.038,6.087,8.427,6.087h20.259c5.745,0,7.945-1.079,8.095-4.81h-28.053l-0.832-0.783V20.209"/>
            <path filter="url(#white-glow)" fill="#fff" d="M29.333,25.118H8.754l-0.606-0.667v-4.402l0.603-0.466h27.742l0.379-0.927   c-0.945-2.431-3.392-3.565-7.936-3.565H9.665c-6.385,0-8.426,1.247-8.426,6.082v2.844c0,4.841,2.041,6.086,8.426,6.086h20.533   l0.645,0.566v4.602l-0.526,0.718H6.83v-0.022H0.678c0,0-0.704,0.353-0.677,0.518c0.525,3.382,2.829,4.34,8.345,4.34h20.987   c6.384,0,8.486-1.247,8.486-6.087v-3.543C37.819,26.363,35.717,25.118,29.333,25.118"/>
            <path filter="url(#white-glow)" fill="#fff" d="M236.725,14.988h-11.551l-0.627,1.193l12.828,9.351c2.43-1.407,5.074-2.833,7.95-4.24"/>
            <path filter="url(#white-glow)" fill="#fff" d="M247.075,32.603l11.275,8.222h11.692l0.484-1.089L253.69,27.413   C251.454,29.054,249.245,30.787,247.075,32.603"/>
            <path filter="url(#white-glow)" fill="#fff" d="M235.006,40.806h-10.451l-0.883-1.383C230.778,32.562,262.56,3.151,331.644,0   C331.644,0,273.658,1.956,235.006,40.806"/>
          </g>
        </svg>
      </div>
      
	    <div id="timer">
	      {timerComponents.length ? timerComponents : <span></span>}
	    </div>

      <div id="mission">
        <h1>??</h1>
      </div>
      
    </div>
  );
}

export default Countdown;
