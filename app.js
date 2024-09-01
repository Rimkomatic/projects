
document.addEventListener("DOMContentLoaded" , function(){
    gsap.registerPlugin(ScrollTrigger)
    gsap.to( ".sticky" , {
        scrollTrigger : {
            trigger : ".sticky" ,
            start : "top top" , 
            end : () =>
            "+=" + (window.innerHeight +document.querySelector(".website-content").offsetHeight * 0.5),  
            // 
            scrub: 2,
            pin: true
        },
        y: 250,
        scale: 0.75,
        rotation : -15,
        ease: "power3.out"
    } )
    // gsap.to( "body" , {
    //     scrollTrigger : {
    //         trigger : ".sticky" ,
    //         start : "top top" , 
    //         end : () =>
    //         "+=" + (window.innerHeight +document.querySelector(".website-content").offsetHeight * 0.5),  
    //         // 
    //         scrub: 2,
    //         // pin: true
    //     },
    //     background: "#000" ,
    //     ease: "power3.out"
    // } )

    gsap.fromTo(
        ".website-content" , 
        {
            x: -100,
            scale:0.3,
            rotation: 15,
        },
        {
            scrollTrigger:{
                trigger : ".website-content",
                start : "top 200%", 
                end : "top 50%",
                scrub: 2,
                // markers: true
            },
            x: 0,
            scale: 1,
            rotation: 0,
            ease: "power3.out"
        }
    )

    // !====================

    const imageSources = [
        "./static/project preview image and vid/algo_vis.mp4",
        "./static/project preview image and vid/astroids.mp4",
        "./static/project preview image and vid/coffee.mp4",
        "./static/project preview image and vid/color_pallate.mp4",
        "./static/project preview image and vid/google_play_sentiment.mp4",
        "./static/project preview image and vid/Huggingface.mp4",
        "./static/project preview image and vid/IMDB_Movie.mp4",
        "./static/project preview image and vid/nasa_launch.mp4",
        "./static/project preview image and vid/Shadov_landing.mp4",
        "./static/project preview image and vid/algo_vis.mp4",
    ]

    const menuItems = document.querySelectorAll(".menu-item")

    menuItems.forEach((item)=>{
        const copyElements = item.querySelectorAll(".info, .name, .tag")

        copyElements.forEach((div)=>{
            const copy = div.querySelector("p")

            if (copy)
            {
                const duplicateCopy = document.createElement("p")
                duplicateCopy.textContent =  copy.textContent
                div.appendChild(duplicateCopy)
            }
        })
    })

    const appendImages = (src)=>{
        const preview1 = document.querySelector(".preview-img-1")
        const preview2 = document.querySelector(".preview-img-2")

        const vid1 = document.createElement("video")
        const vid2 = document.createElement("video")


        vid1.autoplay = true
        vid1.loop = true
        vid1.muted = true
        vid1.playsInline = true
        vid2.autoplay = true
        vid2.loop = true
        vid2.muted = true
        vid2.playsInline = true
        vid1.playbackRate = 1.25
        vid2.playbackRate = 1.25

        vid1.src=src
        vid1.style.clipPath = "polygon(0% 100%,100% 100%,100% 100%,0% 100%)" 
        vid2.src=src
        vid2.style.clipPath = "polygon(0% 100%,100% 100%,100% 100%,0% 100%)" 
        
        preview1.appendChild(vid1)
        preview2.appendChild(vid2)
    
        gsap.to(
            [vid1,vid2],
            {
                clipPath: "polygon(0% 100%,100% 100%,100% 0%,0% 0%)",
                duration:1,
                ease: "power3.out",
                onComplete: function(){
                    removeExtraImages(preview1)
                    removeExtraImages(preview2)
                } 
            }
            )
    }

    function removeExtraImages(cont)
    {
        while(cont.children.length > 1){
            cont.removeChild(cont.firstChild)
        }
    }

    document.querySelectorAll(".menu-item").forEach((item,index) => {
        item.addEventListener("mouseover" , ()=>{
            mouseOverAnimation(item)
            appendImages(imageSources[index])
        })

        item.addEventListener("mouseout" , ()=>{
            mouseOutAnimation(item)
        })
    })

    const mouseOverAnimation = (ele) =>{
        gsap.to(
            ele.querySelectorAll("p:nth-child(1)"),
            {
                top: "-100%",
                duration: 0.3,
            }
        )
        gsap.to(
            ele.querySelectorAll("p:nth-child(2)"),
            {
                top: "0%",
                duration: 0.3,
            }
        )
    }

    const mouseOutAnimation = (ele) =>{
        gsap.to(
            ele.querySelectorAll("p:nth-child(1)"),
            {
                top: "0%",
                duration: 0.3,
            }
        )
        gsap.to(
            ele.querySelectorAll("p:nth-child(2)"),
            {
                top: "100%",
                duration: 0.3,
            }
        )
    }

    document.querySelector(".menu").addEventListener("mouseout" , function(){
        gsap.to(
            ".preview-img video",
            {
                clipPath: "polygon(0% 0%,100% 0%, 100% 0%, 0% 0%)",
                duration:1,
                ease: "power3.out"
            }
        )
    })

    document.addEventListener("mousemove" , function(e){
        const preview = document.querySelector(".preview")

        gsap.to(
            preview,
            {
                y: e.clientY,
                x: (1.2*e.clientX),
                duration:1,
                ease: "power3.out"
            }
        )
    })
})

const wrapper = document.querySelector(".tracker")
const emoji = document.querySelector('.emoji')
const emojiFace = document.querySelector('.emoji-face')


const moveEvent = (e)=>{
    const wrapperRect = wrapper.getBoundingClientRect()

    const relX = e.clientX - (wrapperRect.left + wrapperRect.width/2)
    const relY = e.clientY - (wrapperRect.right + wrapperRect.height/2)

    const emojiMaxDisplacement = 40 ; 
    const emojiFaceMaxDisplacement = 0 ;
    
    const displacementX = (relX / wrapperRect.width) * emojiMaxDisplacement
    const displacementY = (relY / wrapperRect.height) * emojiMaxDisplacement

    const emojiFaceDisplacementX = (relX/wrapperRect.width) * emojiFaceMaxDisplacement
    const emojiFaceDisplacementY = (relY/wrapperRect.height) * emojiFaceMaxDisplacement


    gsap.to(
        emoji ,
        {
            x: displacementX,
            y: -displacementY,
            ease: "power3.out",
            duration: 0.35,
        }
    )

    gsap.to(
        emojiFace ,
        {
            x: emojiFaceDisplacementX,
            y: -emojiFaceDisplacementY,
            ease: "power3.out",
            duration: 0.35,
        }
    )

}

const leaveEvent = () => {
    gsap.to([emoji , emojiFace], {
        x:0,
        y:0,
        duration: 1,
        ease: "power3.out"
    })
}


// wrapper.addEventListener("mousemove" , moveEvent)
// wrapper.addEventListener("mouseleave" , leaveEvent)




// !-------------------------------------------------------------

const imageSources = [
    "./static/project preview image and vid/algo_vis.mp4",
    "./static/project preview image and vid/astroids.mp4",
    "./static/project preview image and vid/coffee.mp4",
    "./static/project preview image and vid/color_pallate.mp4",
    "./static/project preview image and vid/google_play_sentiment.mp4",
    "./static/project preview image and vid/Huggingface.mp4",
    "./static/project preview image and vid/IMDB_Movie.mp4",
    "./static/project preview image and vid/nasa_launch.mp4",
    "./static/project preview image and vid/Shadov_landing.mp4",
    // "./static/project preview image and vid/algo_vis.mp4",
]

const projects = [
    {
        name: "Sorting Algorithm Visualizer",
        desc: "An interactive tool that visualizes various sorting algorithms, such as Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort. Users can observe the sorting process in real-time, adjusting parameters like array size and sorting speed to better understand the algorithms' workings.",
        tech : ['html5.svg' , "css3.svg" , "javascript.svg"],
        sourceCode : "https://github.com/Rimkomatic/SortingAlgoVisualizer", 
        projectUrl : "https://rimkomatic.github.io/SortingAlgoVisualizer/" 
    },
    {
        name: "Asteroids",
        desc: "A JavaScript-based game inspired by the classic arcade game 'Asteroids'. Players navigate a spaceship to destroy asteroids while avoiding collisions, offering a fun way to explore object-oriented programming concepts.",
        tech : ['html5.svg' , "css3.svg" , "javascript.svg"],
        sourceCode : "https://github.com/Rimkomatic/astroid", 
        projectUrl : "https://rimkomatic.github.io/astroid/" 
    },
    {
        name: "Coffee Search Engine",
        desc: "A search engine tailored for queries, built using the LAMP stack. It provides search results for various querries from the database within it",
        tech : ['archlinux.svg' , "apache.svg" , "mysql.svg" , "php.svg"],
        sourceCode : "https://github.com/Rimkomatic/CoffeeSearchEngine", 
        projectUrl : "https://coffee-search-engine.000webhostapp.com/" 
    },
    {
        name: "Colour Palette Generator",
        desc: "A web-based tool for generating color palettes, allowing users to create and customize color schemes for their projects. It offers features like palette preview, hex color codes, and saving options.",
        tech : ['html5.svg' , "css3.svg" , "javascript.svg"],
        sourceCode : "https://github.com/Rimkomatic/color-picker", 
        projectUrl : "https://rimkomatic.github.io/color-picker/" 
    },
    {
        name: "Play store Sentiment Analysis",
        desc: "A data science project analyzing sentiment from Google Play Store reviews. It uses machine learning to classify reviews as positive, negative, or neutral, providing insights into user feedback.",
        tech : ['python.svg' , "numpy.svg" , "pandas.svg" , "matplotlib.svg"],
        sourceCode : "https://github.com/Rimkomatic/Google-Play-Sentiment-Analysis", 
        // projectUrl : "" 
    },
    {
        name: "Using Hugging Face models",
        desc: "This project demonstrates the use of Hugging Face's NLP models for various text-processing tasks. It includes examples of sentiment analysis, text classification, and more, leveraging pre-trained transformers.",
        
        tech : ['python.svg' , "numpy.svg" , "pandas.svg" , "matplotlib.svg"],
        sourceCode : "https://github.com/Rimkomatic/NLP_HuggingFace", 
        projectUrl : "" 
    },
    {
        name: "IMDB Movie Sentiment Analysis",
        desc: "A sentiment analysis project focusing on IMDB movie reviews. It utilizes machine learning models to predict sentiment, providing an overview of public opinion on different movies.",
        tech : ['python.svg' , "numpy.svg" , "pandas.svg" , "matplotlib.svg"],
        sourceCode : "https://github.com/Rimkomatic/IMDB-Movie-Sentiment-Analysis", 
        projectUrl : "" 
    },
    {
        name: "Launch System Dashboard",
        desc: "A full-stack MERN application simulating a NASA launch system dashboard. It allows users to schedule and monitor space launches, with a focus on real-time data visualization and user interaction.",
        tech : ['mongodb.svg' , "express.svg" , "react.svg" , "node.svg"],
        sourceCode : "https://github.com/Rimkomatic/NasaLaunchSystem", 
        projectUrl : "https://nasa-launch-system.vercel.app/" 
    },
    {
        name: "Landing Page Design",
        desc: "A sleek and responsive landing page template designed to showcase modern web design techniques. It includes sections for services, portfolio, and contact information, suitable for small businesses or personal portfolios.",
        tech : ['html.svg', "css.svg" , "express.svg" , "javascript.svg" , "node.svg"],
        sourceCode : "https://github.com/Rimkomatic/ShaDovInc", 
        projectUrl : "https://shadov-inc.vercel.app/" 
    },
]

const removeScroll = (e)=>{
    e.preventDefault()
}

const projectInfo = document.querySelector('.project-info-container')

document.getElementById('close-btn').addEventListener("click" , ()=>{
    projectInfo.style.display = "none"
})

const menuItems = Array.from(document.querySelectorAll(".menu-item"))

menuItems.forEach( (item,idx)=>{
    item.addEventListener("click" , ()=>{
        changeInfo(idx)
        projectInfo.style.display = "flex"
    })
} )

console.log(projectInfo.childNodes[5].childNodes)

function changeInfo(idx)
{
    childs = projectInfo.childNodes

    childs[3].innerText = projects[idx].name
    dsc = document.querySelector("#description>span")
    dsc.innerText = projects[idx].desc

    vid = document.querySelector(".vid-cntnr>video")
    vid.src = imageSources[idx]

    techStack = document.querySelector(".techstack")
    techStack.innerHTML = ""
    projects[idx].tech.forEach( t =>{
        image = document.createElement("img")
        image.src = "./static/tech image/" + t
        techStack.appendChild(image)
    } )

    viewProject = document.getElementById("viewProject")
    srcCode = document.getElementById("srcCode")

    
    srcCode.addEventListener("click" , ()=>{
        window.open(projects[idx].sourceCode)
    })

}