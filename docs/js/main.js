/* global Adawarp: false,
          initDeviceManager: false */

let conn, call, localStream, peer = new Adawarp();
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

window.addEventListener('DOMContentLoaded', function() {

  peer.on('open', function(info) {
    document.getElementById('my_id').textContent = info.id;
  });
  peer.login();

  initAdawarpButton();
  initDeviceManager(deviceStateChangeRequestHandler);
  initLocalVideo();
});

function deviceStateChangeRequestHandler(request) {
  if (call) {
    call.send(JSON.stringify(request));
  }
}

function initAdawarpButton() {
  const startCallButton = document.getElementById('start_call_button');
  if (startCallButton) {
    startCallButton.onclick = startCall;
  }
  const endCallButton = document.getElementById('end_call_button');
  if (endCallButton) {
    endCallButton.onclick = endCall;
  }
}

peer.on('connection', function(_conn) {
  conn = _conn;
  document.getElementById('partner_id').textContent = conn.peer;
  conn.on('data', function(data) {
    document.getElementById('receive_message').textContent = data;
  });
});

peer.on('call', function(_call) {
  if (!localStream) {
    alert('permit user media');
    return;
  }
  call = _call;
  document.getElementById('partner_id').innerHTML = call.peer;
  call.on('stream', function(stream) {
    const url = URL.createObjectURL(stream);
    document.getElementById('remote_video').src = url;
  });
  call.answer(localStream);

});

function startCall() {
  let partnerId = document.getElementById('partner-id-input').value;
  if (!partnerId) {
    alert('type your partner id');
    return;
  }

  if (!localStream) {
    alert('permit user media');
    return;
  }

  call = peer.call(partnerId, localStream);
  call.on('stream', function(stream) {
    document.getElementById('partner_id').innerHTML = partnerId;
    const url = URL.createObjectURL(stream);
    document.getElementById('remote_video').src = url;
  });
}

function endCall() {
  if (conn) {
    conn.close();
    conn = null;
  }
  if (call) {
    call.close();
    call = null;
  }
}

function initLocalVideo() {
  navigator.getUserMedia({audio: true, video: true}, function(stream) {
    localStream = stream;
    document.getElementById('local_video').src = URL.createObjectURL(stream);
  }, function() {
    alert('Error!');
  });
}
