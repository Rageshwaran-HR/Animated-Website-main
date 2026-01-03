import { useRef } from 'react'
import AnimatedTitle from './AnimatedTitle'
import gsap from 'gsap';
import RoundedCorners from './RoundedCorners';
import Button from './Button';

const Story = () => {
  const frameRef = useRef(null);

  const handleMouseLeave = () => {
    const element = frameRef.current;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: "power1.inOut"
    })
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut"
    })
  };

  return (
    <section id='story' className='min-h-dvh w-screen bg-slate-950 text-blue-50 overflow-y-hidden'>
      <div className='flex size-full flex-col items-center py-10 pb-24'>
        <p className='font-general text-sm uppercase md:text-[15px]'>The Future of Technology</p>

        <div className='relative size-full'>
          <AnimatedTitle
            title="Sh<b>a</b>ping the f<b>u</b>ture <br /> of comp<b>u</b>ting"
            sectionId="#story"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className='story-img-container'>
            <div className='story-img-mask'>
              <div className='story-img-content'>
                <div className='relative h-full w-full'>
                <img
                  ref={frameRef}
                  src="/img/entrance.png"
                  alt="entrance"
                  className='h-full w-full object-cover md:h-auto md:w-auto md:object-contain'
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                />
                <div className='pointer-events-none absolute inset-x-0 bottom-0 md:hidden'>
                  <div className='bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent px-5 pb-5 pt-10'>
                    <p className='font-general text-[10px] uppercase tracking-widest text-blue-300'>
                      National Level Symposium
                    </p>
                    <p className='mt-1 font-circular-web text-sm text-blue-50/85'>
                      Velammal Engineering College · Ozmenta&apos;26
                    </p>
                  </div>
                </div>
                </div>
              </div>
            </div>

            <RoundedCorners />
          </div>
        </div>
        
        <div className='mt-10 md:-mt-40 flex w-full justify-center lg:-mt-80 md:me-44 md:justify-end'>
          <div className='flex h-full w-fit flex-col items-center md:items-start'>
            <p className='mt-3 max-w-sm text-center font-circular-web text-violet-50 md:text-start px-3'>
              Join us in exploring groundbreaking research, connecting with industry leaders, and discovering the innovations that will define tomorrow&apos;s computing landscape.
            </p>

            <Button 
              id="realm-button"
              title="Learn More"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Story