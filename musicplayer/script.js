const audio = document.getElementById ("audio")
const playBtn = document.getElementById ("play");
const nextBtn = document.getElementById ("next");
const revBtn = document.getElementById ("prev");
const judul = document.getElementById ("Judul");
const artist = document.getElementById ("artist");
const cover = document.getElementById ("cover");
const playicon = document.getElementById ("playbtn");
const currentTime = document.getElementById ("duration");
const duration = document.getElementById ("durasi-gerak");

let current = 0;
let playter = "";
let total = 3;

// XMLHTTP digunakan untuk mengambil data dari file
// lalu di kirim ke 'init_player' itu bisa di ubah.
let playlist_load = () => {

  const xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    init_player( this.responseText ) ;
  }
  xhttp.open("GET", "playlist.json", true);
  xhttp.send();
}


// setelah data di muat di dalam init_player, init_player menyiapkan data dan di simpan di playter
let init_player = ( data ) => {
   let mirplay = JSON.parse(data)
   total = mirplay.length;
   document.getElementById('audio').src = mirplay[0].src;
   document.getElementById('Judul').innerHTML = mirplay[0].title;
   document.getElementById('artist').innerHTML = mirplay[0].artist;
   document.getElementById ('cover').src = mirplay[0].cover;
console.log(data)
   playter = mirplay;
}

playlist_load();

//addevenetlistner di gunakan untuk memfungsikan playBtn
//if audio play maka tombol pause, else jika audio pause tombol menjadi play
playBtn.addEventListener('click', () =>{
 if (audio.paused) {
        audio.play();
        playicon.src = "assets/icon/pause.svg";
      } else {
        audio.pause();
        playicon.src = "assets/icon/play.svg";
        }
})


// membuat function loadsong agar semua event listener membutuhkan index tinggal menggunakan 1 syntax
function loadSong(index) {
   document.getElementById('audio').src = playter[index].src;
   document.getElementById('Judul').innerHTML = playter[index].title;
   document.getElementById('artist').innerHTML = playter[index].artist;
   document.getElementById ('cover').src = playter[index].cover;
}

// membuat prevbtn dengan perkurangan
revBtn.addEventListener('click', () => {
  current = ( current - 1 + playter.length ) % playter.length
  loadSong(current);
   audio.play();
})

// membuat tombool next dengan pertambahan
nextBtn.addEventListener('click', () => {
  current = ( current + 1 ) % playter.length
  loadSong(current);
   audio.play();
})

//digunakan untuk membuat durasi lagu
audio.addEventListener("loadedmetadata", () => {
  duration.innerHTML = formatTime(audio.duration);
});

// digunakan unutuk membuat current time
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

//di gunakan untuk membuat progressbar berjalan ketika lagu di play
audio.addEventListener("timeupdate", () => {
  currentTime.innerHTML = formatTime(audio.currentTime)
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
})

let changeplaylist = Array.prototype.slice.call(document.querySelectorAll('.item, .songs.container li h4'));

changeplaylist.forEach((item) => {
  item.addEventListener('click', () => {
    // ambil index dari data-music
    const index = item.dataset.music;

    if (index !== undefined) {
      document.getElementById('audio').src = playter[index].src;
      document.getElementById('Judul').innerHTML = playter[index].title;
      document.getElementById('artist').innerHTML = playter[index].artist;
      document.getElementById('cover').src = playter[index].cover;
      audio.play();
    }

    // hapus highlight sebelumnya
    changeplaylist.forEach(el => el.classList.remove("active"));

    // tambahkan highlight ke item yang diklik
    item.classList.add("active");
  });
})

audio.onplaying = () => {
  playBtn.innerHTML = '<img src="assets/icon/pause.svg">';
};

audio.onpause = () => {
  playBtn.innerHTML = '<img src="assets/icon/play.svg">';
};


