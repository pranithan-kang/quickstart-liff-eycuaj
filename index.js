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
  await liff.init({ liffId: '1656090834-NJa1VEDB' });

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

  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnShare.style.display = 'block';
      btnLogOut.style.display = 'block';
      await getProfile();
    } else {
      btnLogIn.style.display = 'block';
    }
  } else {
    btnShare.style.display = 'block';
    btnSend.style.display = 'block';
    await getProfile();
  }
}

async function getProfile() {
  let profile = await liff.getProfile();
  profilePicture.src = profile.pictureUrl;
  userId.innerHTML = `<b>User Id:</b> ${profile.userId}`;
  statusMessage.innerHTML = `<b>Status Message:</b> ${profile.statusMessage}`;
  displayName.innerHTML = `<b>Display Name:</b> ${profile.displayName}`;
  email.innerHTML = `<b>Email:</b> ${liff.getDecodedIDToken().email}`;
}

async function shareMsg() {
  await liff.shareTargetPicker([
    {
      type: 'image',
      originalContentUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg',
      previewImageUrl: 'https://d.line-scdn.net/stf/line-lp/2016_en_02.jpg'
    }
  ]);
}

async function sendMsg() {
  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'text',
        text: 'This message was sent by sendMessages()'
      }
    ]);
    alert('Message sent');
  }
}

btnShare.onclick = async () => {
  await shareMsg();
};

btnSend.onclick = async () => {
  await sendMsg();
};

btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};

main();
