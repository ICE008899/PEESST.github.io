const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const giftBox = document.getElementById("giftBox");
const balloonArea = document.getElementById("balloons");
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");
const message = document.getElementById("gradMessage");
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
let confettiPieces = [];
let alreadyOpened = false;
let currentIndex = 0;
const slideWidth = slides[0].getBoundingClientRect().width + 20; // รวม margin
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    track.appendChild(clone);
});
giftBox.addEventListener("click", () => {
    if(alreadyOpened) return;
    alreadyOpened = true;

    const sound = document.getElementById("gradSound");
    sound.currentTime = 0;
    sound.play();

    giftBox.classList.add("shake");

    setTimeout(() => {
        giftBox.classList.remove("shake");
        giftBox.classList.add("open");

        releaseBalloons();
        releaseCaps();
        launchConfetti();

        message.style.opacity = "1";

        setTimeout(() => {
            page1.style.display = "none";
            page2.style.display = "block";

            // เล่นวิดีโออัตโนมัติ
            const gradVideo = document.getElementById("gradVideo");
            if(gradVideo){
                gradVideo.currentTime = 0;
                gradVideo.play().catch(e => console.log("Autoplay failed:", e));
            }

            launchConfetti2();
        }, 5000);

    }, 400);
});

function releaseBalloons() {
    const colors = ["#000","#d4a017"];
    const boxRect = giftBox.getBoundingClientRect();

    for(let i=0;i<18;i++){
        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        const size = Math.random()*18+28;
        balloon.style.width = size+"px";
        balloon.style.height = size*1.4+"px";
        balloon.style.left = boxRect.left + boxRect.width/2 + (Math.random()*40-20) + "px";
        balloon.style.top = boxRect.top + boxRect.height/2 + "px";
        balloon.style.background = colors[Math.floor(Math.random()*colors.length)];
        balloonArea.appendChild(balloon);

        balloon.animate([
            { transform:`translateY(0px)` },
            { transform:`translateY(-600px)`, opacity:0 }
        ], { duration:4000 + Math.random()*2000, easing:'ease-out' });

        setTimeout(()=>balloon.remove(),6000);
    }
}

function releaseCaps() {
    for(let i=0;i<5;i++){
        const cap = document.createElement("div");
        cap.classList.add("cap");
        cap.innerHTML="🎓";
        const boxRect = giftBox.getBoundingClientRect();
        cap.style.left = boxRect.left + (Math.random()*40) + "px";
        cap.style.top = boxRect.top + "px";
        cap.style.fontSize=(Math.random()*10+28)+"px";
        balloonArea.appendChild(cap);

        cap.animate([
            { transform:`translateY(0px)` },
            { transform:`translateY(-600px)` }
        ], { duration:4000 + Math.random()*2000, easing:'ease-out' });

        setTimeout(()=>cap.remove(),6000);
    }
}

function launchConfetti(){
    confettiPieces=[];
    for(let i=0;i<150;i++){
        confettiPieces.push({
            x: window.innerWidth/2,
            y: window.innerHeight/2+40,
            size: Math.random()*8+4,
            angle: Math.random()*Math.PI*2,
            speed: Math.random()*5+2,
            color:["#ffd700","#ffea8a","#c9a100"][Math.floor(Math.random()*3)]
        });
    }
    animateConfetti();
}

function animateConfetti(){
    ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    confettiPieces.forEach(p=>{
        p.x+=Math.cos(p.angle)*p.speed;
        p.y+=Math.sin(p.angle)*p.speed+1;
        p.angle+=0.02;
        ctx.fillStyle=p.color;
        ctx.fillRect(p.x,p.y,p.size,p.size);
    });
    if(confettiPieces.some(p=>p.y<window.innerHeight)){
        requestAnimationFrame(animateConfetti);
    }
}

function launchConfetti2(){
    const canvas2 = document.getElementById("confetti2");
    const ctx2 = canvas2.getContext("2d");
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;

    let pieces = [];
    for(let i=0;i<150;i++){
        pieces.push({
            x: Math.random()*window.innerWidth,
            y: Math.random()*window.innerHeight,
            size: Math.random()*8+4,
            angle: Math.random()*Math.PI*2,
            speed: Math.random()*5+2,
            color:["#ffd700","#ffea8a","#c9a100"][Math.floor(Math.random()*3)]
        });
    }

    function animate(){
        ctx2.clearRect(0,0,canvas2.width,canvas2.height);
        pieces.forEach(p=>{
            p.x+=Math.cos(p.angle)*p.speed;
            p.y+=Math.sin(p.angle)*p.speed+1;
            p.angle+=0.02;
            ctx2.fillStyle=p.color;
            ctx2.fillRect(p.x,p.y,p.size,p.size);
        });
        requestAnimationFrame(animate);
    }
    animate();
}