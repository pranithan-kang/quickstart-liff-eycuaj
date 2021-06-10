// Import stylesheets
import './style.css';

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const profilePicture = document.getElementById('profilePicture');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app
  liff.init({ liffId: '1656090834-NJa1VEDB' });

  let osInfoTextElem = document.querySelector('#osInfo');
  osInfoTextElem.textContent = JSON.stringify(liff);

  let osInfo = liff.getOS();
  switch (osInfo) {
    case 'android':
      body.style.background = '#d1f5d3';
      break;
    case 'ios':
      body.style.background = '#eeeeee';
      break;
    case 'web':
      body.style.background = '#110fee';
      break;
  }
}

async function getProfile() {
  let profile = liff.getProfile();
  profilePicture.src = profile.pictureUrl;
  userId.innerHTML = `<b>User Id:</b> ${profile.userId}`;
  statusMessage.innerHTML = `<b>Status Message:</b> ${profile.statusMessage}`;
  displayName.innerHTML = `<b>Display Name:</b> ${profile.displayName}`;
}

main();
