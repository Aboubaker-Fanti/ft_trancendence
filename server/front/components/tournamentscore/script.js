import { loadHTML, loadCSS, player_webSocket, socket_friend_request, accumulatedNotifications, displayNotifications} from '../../utils.js';
import { log_out_func ,login , logoutf, get_localstorage, getCookie } from '../../auth.js';
import {id_of_tournament, changeAccess} from '../profile/profile.js';
import {checkFirst} from '../home/home.js';
import { host } from '../../config.js';
// const host = "127.0.0.1";

let tournament = `https://${host}:9008/api/tournament/`;
var api = `https://${host}:9004/api/`;
let tournament_element_data;

async function TournamentScore() {
  if (!id_of_tournament){
    console.log("ksdfjksjdkfjksdjfkldjslfkj")
    window.location.hash = "/profile";
    return;
  }
  const html = await loadHTML('./components/tournamentscore/index.html');
  loadCSS('./components/tournamentscore/style.css');
  const app = document.getElementById('app');
  app.innerHTML = html;
  setHeaderContent();
  setNaveBarContent();
  await checkFirst();
  if (!socket_friend_request)
    player_webSocket();
  else
    displayNotifications(accumulatedNotifications);

console.log("hello we are from morroc ;;o ", id_of_tournament);
  const logout = document.getElementById('logout')
  
  logout.addEventListener('click', log_out_func);

  get_history_by_id();

  window.addEventListener('resize', updateContent);

}


// add-match-score
function updateContent() {
  const contentDiv = document.getElementById('content');
  const width = window.innerWidth;
if (window.location.hash === '#/tournamentScore') {
  if (width < 1235) {
    set_players_sh1(tournament_element_data);
  } else {
    set_players_sh(tournament_element_data);
  }
}
}



async function get_history_by_id() {
  const participant = {
    tournament_id: id_of_tournament,
  }
  // const data = JSON.parse(participant);
  const urlEncodedData = new URLSearchParams(participant);
  try {
    console.log('this is the token -------> ', get_localstorage('token'))
    const response = await fetch(tournament + 'get-tournament-by-id/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + get_localstorage('token'),
        'Session-ID': get_localstorage('session_id')
      },
      credentials: 'include',
      body: urlEncodedData
    });
    console.log(response);
    const jsonData = await response.json();
    console.log("here are tournament ========> ", jsonData);
    if (jsonData.message === 'tournament found'){
      tournament_element_data = jsonData.matches;
      updateContent();
    }
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // await login(jsonData.access, jsonData.refresh);
    
  } catch (error) {
    console.error('There was a problem with the fetch e here operation:', error);
  }
}


function set_players_sh(tournament_data) {
  const main_content  = document.getElementById('players_sh_content');
  console.log("here we go again=? :  ", tournament_data[0].playerOneName)
  main_content.innerHTML = `
              <div class="matches_hist">

                <div class="first_match">
                    <div class="match_n1 string">
                      <p id="player1_match1" class="player_name">${tournament_data[0].playerOneName} <span class="left_score">${tournament_data[0]?.playerOneScore}</span></p>
                        <h2>Vs</h2>
                        <p id="player2_match1" class="player_name"> ${tournament_data[0].playerTwoName}<span class="left_score">${tournament_data[0]?.playerTwoScore}</span></p>
                    </div>
                    <div class="match_n2 string">
                        <p id="player1_match2" class="player_name"> ${tournament_data[1].playerOneName}<span class="left_score">${tournament_data[1]?.playerOneScore}</span></p>
                        <h2>Vs</h2>
                        <p id="player2_match2" class="player_name"> ${tournament_data[1].playerTwoName}<span class="left_score">${tournament_data[1]?.playerTwoScore}</span></p>
                    </div>
                </div>


                <div class="center_matches">
                    <fiv class="match_2">
                        <p id="player1_match5" class="player_name topp"> ${tournament_data[4]?.playerOneName} <span class="left_score">${tournament_data[4]?.playerOneScore}</span></p>
                        <h2>Vs</h2>
                        <p id="player2_match5" class="player_name downn">  ${tournament_data[4]?.playerTwoName}<span class="left_score">${tournament_data[4]?.playerTwoScore}</span></p>

                    </fiv>
                    <fiv class="match_final">
                        <p id="player1_match7" class="player_name">${tournament_data[6]?.playerOneName}<span class="left_score">${tournament_data[6]?.playerOneScore}</span></p>
                        <h2>Vs</h2>
                        <p id="player2_match7" class="player_name ">${tournament_data[6]?.playerTwoName}<span class="left_score">${tournament_data[6]?.playerTwoScore}</span></p>

                    </fiv>
                    <fiv class="match_2">
                        <p id="player1_match6"  class="player_name topp right_p"> <span class="right_score">${tournament_data[5]?.playerOneScore}</span> ${tournament_data[5]?.playerOneName} </p>
                        <h2>Vs</h2>
                        <p id="player2_match6"  class="player_name downn right_p"><span class="right_score">${tournament_data[5]?.playerTwoScore}</span> ${tournament_data[5]?.playerTwoName}</p>

                    </fiv>
                </div>


                <div class="first_match">
                    <div class="match_n1 string">
                        <p id="player1_match3" class="player_name right_p"><span class="right_score" id="scoore">${tournament_data[2]?.playerOneScore}</span> ${tournament_data[2].playerOneName}</p>
                        <h2>Vs</h2>
                        <p id="player2_match3" class="player_name right_p"><span class="right_score">${tournament_data[2]?.playerTwoScore}</span>${tournament_data[2].playerTwoName} </p>
                    </div>
                    <div class="match_n2 string">
                        <p id="player1_match4" class="player_name right_p"><span class="right_score">${tournament_data[3]?.playerOneScore}</span>${tournament_data[3].playerOneName} </p>
                        <h2>Vs</h2>
                        <p id="player1_match4" class="player_name right_p"><span class="right_score">${tournament_data[3]?.playerTwoScore}</span>${tournament_data[3].playerTwoName} </p>
                    </div>
                </div>
            </div>
            <div class="winner_nextgame">
                <div class="winneer">
                    <h2 id="winn">Winner <i class="bi bi-trophy-fill"></i></h2>
                    <h3><i class="bi bi-trophy "></i> ${tournament_data[6]?.playerOneScore > tournament_data[6]?.playerTwoScore ? tournament_data[6]?.playerOneName : tournament_data[6]?.playerTwoName}</h3>
                    <hr id="line1">
                    <hr id="line2">
                    <hr id="line3">
                </div>
            </div>

  `
}

function set_players_sh1(tournament_data) {
  // document.querySelector('.matches_hist').style.flexDirection = 'column';
  const main_content  = document.getElementById('players_sh_content');
  main_content.innerHTML = `
   <div class="matches_hist"  style="flex-direction: column;">
            <h3 id="text-final">1/4</h3>
            <div class="first_8">
            <div class="first_match">
                <div class="match_n1 string">
                    <p id="player1_match1" class="player_name">${tournament_data[0].playerOneName} <span class="left_score">${tournament_data[0]?.playerOneScore}</span></p>
                    <h2>Vs</h2>
                    <p id="player2_match1" class="player_name">${tournament_data[0]?.playerTwoName} <span class="left_score">${tournament_data[0]?.playerTwoScore}</span></p>
                </div>
                <div class="match_n2 string">
                    <p id="player1_match2" class="player_name">${tournament_data[1]?.playerOneName}  <span class="left_score">${tournament_data[1]?.playerOneScore}</span></p>
                    <h2>Vs</h2>
                    <p id="player2_match2" class="player_name">${tournament_data[1]?.playerTwoName} <span class="left_score">${tournament_data[1]?.playerTwoScore}</span></p>
                </div>
            </div>
            <div class="first_match">
                <div class="match_n1 string">
                    <p id="player1_match3" class="player_name right_p"><span class="right_score" id="scoore">${tournament_data[2]?.playerOneScore}</span> ${tournament_data[2].playerOneName}</p>
                    <h2>Vs</h2>
                    <p id="player2_match3" class="player_name right_p"><span class="right_score">${tournament_data[2]?.playerTwoScore}</span> ${tournament_data[2].playerTwoName}</p>
                </div>
                <div class="match_n2 string">
                    <p id="player1_match4" class="player_name right_p"><span class="right_score">${tournament_data[3]?.playerOneScore}</span>${tournament_data[3].playerOneName}  </p>
                    <h2>Vs</h2>
                    <p id="player1_match4" class="player_name right_p"><span class="right_score">${tournament_data[3]?.playerTwoScore}</span>${tournament_data[3].playerTwoName} </p>
                </div>
            </div>


            </div>
            <h3 id="text-final">1/2</h3>

            <div class="center_matches">
                <fiv class="match_2">
                    <p id="player1_match5" class="player_name topp"> ${tournament_data[4]?.playerOneName} <span class="left_score">${tournament_data[4]?.playerOneScore}</span></p>
                    <h2>Vs</h2>
                    <p id="player2_match5" class="player_name downn"> ${tournament_data[4]?.playerTwoName}<span class="left_score">${tournament_data[4]?.playerTwoScore}</span></p>

                </fiv>
                <fiv class="match_2">
                    <p id="player1_match6"  class="player_name topp right_p"> <span class="right_score">${tournament_data[5]?.playerOneScore}</span> ${tournament_data[5]?.playerOneName} </p>
                    <h2>Vs</h2>
                    <p id="player2_match6"  class="player_name downn right_p"><span class="right_score">${tournament_data[5]?.playerTwoScore}</span> ${tournament_data[5]?.playerTwoName} </p>

                </fiv>
            </div>
            <h3 id="text-final">1/1</h3>

            <fiv class="match_final">
                <p id="player1_match7" class="player_name">${tournament_data[6]?.playerOneName}<span class="left_score">${tournament_data[6]?.playerOneScore}</span></p>
                <h2>Vs</h2>
                <p id="player2_match7" class="player_name ">${tournament_data[6]?.playerTwoName}<span class="left_score">${tournament_data[6]?.playerTwoScore}</span></p>

            </fiv>

        </div>
            <div class="winner_nextgame">
                <div class="winneer">
                    <h2 id="winn">Winner <i class="bi bi-trophy-fill"></i></h2>
                    <h3><i class="bi bi-trophy "></i> ${tournament_data[6]?.playerOneScore > tournament_data[6]?.playerTwoScore ? tournament_data[6]?.playerOneName : tournament_data[6]?.playerTwoName}</h3>
                    <hr id="line1">
                    <hr id="line2">
                    <hr id="line3">
                </div>
            </div>

  `
}



export function setHeaderContent() {
    const header = document.querySelector('.header');
    header.innerHTML = `
        <div class="profile">
            <div class="notification">
                <h3><i class="bi bi-bell"></i></h3>
            </div>
            <div class="text">
                <h3 id="UserName"></h3>
            </div>
            <div class="image">
                <img id="image_user" src="" alt="profile photo">
            </div>
        </div>
        <div class="notifi_btn"></div>
        <i id="butt" class="bi bi-justify"></i>
    `;

    const notific = document.querySelector('.notification');
    const notifi_display = document.querySelector('.notifi_btn');
  
    notific.addEventListener('click', function() {
      notifi_display.classList.toggle('active');
    })
  
}

export function setNaveBarContent() {
    const nav_ba = document.querySelector('.navbar');
    nav_ba.innerHTML = `
        <div class="image-text">
                <img src="../../images/login/logo.webp" alt="logo">
        </div>
        <nav class="sidebar close">
        
            <div class="menu-bar toggle">
                
                <div class="menu">
                    <ul class="menu-links">
                        <li class="nav-link"  id="homepage">
                            <a href="#/">
                                <i class='bx bx-home  icon' ></i>
                            </a>
                        </li>
                        <li class="nav-link"  id="profilepage">
                            <a href="#/profile">
                                <i class="bi bi-person icon"></i>
                            </a>
                        </li>

                    </ul>
                </div>
                <div class="bottom-content">
                    <li id="logout">
                        <a href="#">
                            <i class='bx bx-log-out  icon' ></i>
                        </a>
                    </li>
                </div>
            </div>
        </nav>
`;


const butt = document.querySelector('#butt');
const side = document.querySelector('.sidebar');

butt.addEventListener('click', function() {
  side.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  if (!side.contains(event.target) && !butt.contains(event.target)) {
    side.classList.remove('active');
  }
});

}  

export default TournamentScore;
