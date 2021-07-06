const list = document.querySelector('ul');
const form = document.querySelector('form');
const button = document.querySelector('button');

// add message

const addMessage = (message, id) => {
    let time = dateFns.distanceInWordsToNow(
        message.created_at.toDate(),
        { addSuffix: true }
    );
    let html = `
        <li data-id="${id}" class="border border-gray-600 outline-none focus:outline-none rounded p-2 my-2">
            <div class="flex justify-between border-b border-gray-400 font-medium">
                <p>${message.name}</p>
                <p>${time}</p>
                
            </div>
            <div>
                <p class="py-1 word-break">${message.body}</p>
            </div>
        </li>
    `
    list.innerHTML += html;
}


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
        form.reset();
    }).catch(err => {
        console.log(err)
    })
})

// get messages
const getMessages = db.collection('messages').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        const doc = change.doc;
        if(change.type === 'added'){
            addMessage(doc.data(), doc.id);
        }
    })
})