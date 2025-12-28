import gsap from 'gsap';
import React, { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title, containerClass, align = 'center', lineClassName = '' }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const titleAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "100 bottom",
                    end: "center bottom",
                    toggleActions: "play none none reverse"
                }
            });

            titleAnimation.to(".animated-word", {
                opacity: 1,
                transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
                ease: "power2.inOut",
                stagger: 0.02
            })
        }, containerRef);

        return () => ctx.revert();

    }, [])

    return (
        <div
            className={`animated-title ${containerClass}`}
            ref={containerRef}
        >
            {
                title.split("<br />").map((line, index) => (
                    <div
                        key={index}
                        className={`flex max-w-full flex-wrap gap-2 md:gap-3 ${
                            align === 'start' ? 'justify-start' : 'justify-center'
                        } ${align === 'start' ? 'px-0' : 'px-10'} ${lineClassName}`}
                    >
                        {
                            line.split(" ").map((word, i) => (
                                <span key={i} className='animated-word' dangerouslySetInnerHTML={{ __html: word }} />
                            ))
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default AnimatedTitle