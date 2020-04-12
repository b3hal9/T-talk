var socketio = io.connect('http://localhost:5000');


const message = document.getElementById('message')
const handle = document.getElementById('handle')
const btn = document.getElementById('send')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')



btn.addEventListener('click',()=>{
    socketio.emit('chat',{
        message: message.value,
        handle:handle.value
    })
})

message.addEventListener('keypress',()=>{
    socketio.emit('typing', handle.value)
})


socketio.on('chat',(data)=>{
    feedback.innerHTML = '';
    message.value = '';
    message.focus();
    output.innerHTML += '<p><strong>' + data.handle+ ':</strong>'+data.message+'</p>'
    
})

socketio.on('typing',data=>feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`)





socketio.on('disconnected',()=>{
    let name = handle.value
    output.innerHTML += `<p><em>${name} has left the chat.`
})