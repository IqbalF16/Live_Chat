const socket = io('http://localhost:5000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

var nama = prompt('What is your name?')
keterangan('You joined')
if( nama == "null" || nama == ""){
  nama = "anonim"
}
socket.emit('new-user', nama)

socket.on('chat-message', data => {
  messageIn(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
  keterangan(`${name} has joined the chat`)
})

socket.on('user-disconnected', name => {
  keterangan(`${name} leave chat`)
})

//Ketika diklik submit akan memproses
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  myMessage(`${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})
//tampilan untuk message keluar
function myMessage(message) {
  const messageElement = '<div class="chat-box my-chat-box">' +
  '<div class="chat my-chat"> ' + message + ' </div>' +
  '<div class="separator"></div>' +
  '</div>';
  messageContainer.innerHTML += (messageElement)
}
//tampilan untuk message masuk
function messageIn(message){
  const messageElement = '<div class="chat-box others-chat-box">' +
  '<div class="chat others-chat"> ' + message + ' </div>' +
  '<div class="separator"></div>' +
  '</div>';
  messageContainer.innerHTML += (messageElement)
}
//tampilan untuk keterangan user
function keterangan(message){
  const messageElement = '<div class="keterangan">'+ message +'</div>'

  messageContainer.innerHTML += (messageElement)

}