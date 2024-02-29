fetch('d1-tn-hosts.socialitin.workers.dev')
.then(response => response.json())
.then(data => {
console.log(data);
return data;
})
.catch(error => {
console.error('There was an error!', error);
});
