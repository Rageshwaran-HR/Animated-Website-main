import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="" />
  </div>
);

const Contact = () => {
  return (
    <div id="register" className="my-20 min-h-96 w-screen px-5 sm:px-10">
      <div className="relative rounded-lg bg-slate-950 py-16 sm:py-24 text-blue-50">
        <div className="absolute -left-10 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-10 lg:w-96">
          <ImageClipBox
            clipClass="contact-clip-path-1"
            src="/img/contact-1.webp"
          />
          <ImageClipBox
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
            src="/img/contact-2.webp"
          />
        </div>

        <div className="absolute -top-40 left-5 hidden w-60 sm:block sm:top-1/2 sm:left-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordmann.png"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center relative z-20">
          <p className="font-general text-[15px] uppercase">
            Join Ozmenta&apos;26
          </p>

          <p className="special-font mt-8 w-full font-zentry text-4xl leading-[0.95] sm:text-5xl md:text-[6rem] z-10">
            Let&apos;s sh<b>a</b>pe the <br /> f<b>u</b>ture of <br /> comp
            <b>u</b>ting toge<b>t</b>her
          </p>

          <Button 
          title="Register Now" 
          containerClass="mt-10 cursor-pointer pointer-events-auto" 
          onClick={() => {
            console.log('Button clicked!');
            const url = 'https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195';
            window.location.href = url;
          }
          }/>
        </div>
      </div>
    </div>
  );
};

export default Contact;
