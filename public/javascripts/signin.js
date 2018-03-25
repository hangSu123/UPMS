


if(hs.isEmpty(localStorage.getItem('userId'))){
    hs.redirect('/');
}else{
    hs.text(hs.getId('userId'),localStorage.getItem('username'));
}


hs.click(hs.getId('logout'),function(){
    hs.toast('red',2,'Logging out....');
    localStorage.clear('userId');
    localStorage.clear('username');
    setTimeout( () => {
        hs.redirect('/');
    }, 2000);
})