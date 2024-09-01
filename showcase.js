gsap.registerPlugin(ScrollTrigger)

const images = Array.from(document.querySelectorAll(".img video"))

// console.log(images)

function addImageScaleAnimation(){
    gsap.utils.toArray("section").forEach((section , index) => {
        const image = images[index]
        // console.log(image)
        const startCondtion = index === 0 ? "top top" : "bottom bottom"

        gsap.to(
            image,
            {
                scrollTrigger : {
                    trigger : section ,
                    start : startCondtion,
                    end: ()=>{
                        const viewportHeight = window.innerHeight
                        const sectionBottom = section.offsetTop + section.offsetHeight
                        const additionalDistance = viewportHeight * 0.5
                        const endValue = sectionBottom - viewportHeight + additionalDistance

                        return `+=${endValue}`
                    } ,
                    scrub: 1
                },
                // scale: 3,
                ease: "none"
            }
        )
    })
}

addImageScaleAnimation()

function animateClipPath(
    sectionId,
    previewId,
    startClipPath,
    endClipPath,
    start = "top center",
    end = "bottom top"
){
    let section = document.querySelector(sectionId)
    let preview = document.querySelector(previewId)

    ScrollTrigger.create({
        trigger: section,
        start: start,
        end: end,
        onEnter : () => {
            gsap.to(preview , {
                scrollTrigger : {
                    trigger : section,
                    start: start,
                    end: end,
                    scrub: 0.125
                },
                clipPath: endClipPath,
                ease : "none"
            })
        }
    })
}

const totalSection = 7

animateClipPath(
    '#section1',
    '#section1-preview',
    "polygon(0% 100%,100% 100%,100% 100%,0% 100%)",
    "polygon(0% 0%,100% 0%,100% 100%,0% 100%)"
)


for(let i = 2 ; i<=totalSection ; i++)
{
    let currentSection = `#section${i}`
    let prevPreview = `#section${i-1}-preview`

    let currentPreview = `#section${i}-preview`

    animateClipPath(
        currentSection,
        prevPreview,
        "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
        "polygon(0% 0%,100% 0%,100% 0%,0% 0%)",
        "top bottom",
        "center center"

    )
    
    if(i<totalSection)
    {
        animateClipPath(
            currentSection,
            prevPreview,
            "polygon(0% 100%,100% 100%,100% 100%,0% 100%)",
            "polygon(0% 0%,100% 0%,100% 100%,0% 100%)",
            "center center",
            "bottom top"
        )
    }
}

// const cover = document.querySelector(".cover")
// cover.addEventListener("click" , ()=>{
//     console.log("clicked")
// })
// document.addEventListener('scroll', function(event) {
//     console.log("ok")
//     // Prevent default scroll behavior
//     event.preventDefault();
//     // Calculate the amount to scroll
//     var scrollDelta = event.deltaY || event.detail || (-event.wheelDelta);
//     // Manually scroll the page
//     document.scrollBy(0, scrollDelta);
// });