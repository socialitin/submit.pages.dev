fetch('d1-tn-hosts.socialitin.workers.dev')
.then(response => response.text())
.then(data => {
console.log(data);
return data;
})
.catch(error => {
console.error('There was an error!', error);
});
