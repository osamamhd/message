const list = document.querySelector('ul');
const form = document.querySelector('form');
const button = document.querySelector('button');

// post message 
form.addEventListener('submit', e => {
    e.preventDefault();

    const now = new Date();
    const message = {
        body: form.message.value, 
        name: form.name.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    }

    db.collection('messages').add(message).then(() => {
        console.log('message added')
    }).catch(err => {
        console.log(err)
    })
})