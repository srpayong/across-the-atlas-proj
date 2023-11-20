'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import styles from './page.module.css';

const slides = [
  '/home/slides/india.jpeg',
  '/home/slides/hawaii2.jpeg',
  '/home/slides/ethiopia1.jpeg',
  '/home/slides/turtle.jpeg',
  '/home/slides/seychelles1.jpeg',
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length,
    );
  };
  const router = useRouter();

  return (
    <main
      className="bg-custom2
    text-primary"
    >
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[100%] overflow-hidden">
          {/* Video element */}
          <video className="w-full h-full object-cover" autoPlay muted loop>
            <source src="/mountains.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Content Overlaid on Hero Section */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${styles.animateFadeIn}`}
          >
            <div className="text-white text-opacity-70 text-center">
              <h2 className="text-4xl text-bold mb-4 animate-fadeIn">
                "A journey of a thousand miles begins with a single step."
              </h2>
              <p className="text-lg animate-fadeIn text-opacity-70">-Lao Tzu</p>
            </div>
          </div>
        </div>
      </section>

      <img
        src="/border.png"
        alt="border"
        style={{ width: '100%', height: '150px' }}
      ></img>

      <section className="relative z-20 py-20">
        <div className="relative flex items-center justify-center pt-10 h-[500px] w-full">
          <div className="border-2 border-secondary p-20 text-center w-[800px] h-[600px] flex flex-col items-center justify-center">
            <h1 className="text-6xl font-semibold mb-2 animate-fadeIn">
              Across The Atlas
            </h1>
            <br />
            <h2 className="text-3xl text-italic mb-2 animate-fadeIn">
              The world's too big to tell just one story
            </h2>
            <br />
            <br />
            <p
              className="text-2xl font-serif animate-fadeIn block text-pimary"
              style={{ animationDelay: '0.5s' }}
            >
              Across the Atlas is a unique online travel diary for travellers
              across the world. This is a community of like-minded travel
              professionals around the world who share the same passion for
              traveling the world.
            </p>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="relative z-20 max-w-[1500px] pt-8 mb-20">
        <div className="flex items-center justify-center">
          {/* Slider */}
          <div
            className="relative overflow-hidden rounded-sm"
            style={{
              padding: '20px',
              margin: '20px auto',
              height: '500px',
              width: '1200px',
              zIndex: 2,
              // boxShadow: '0 0 10px 10px gray',
              borderRadius: '5px',
            }}
          >
            <Image
              src={slides[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              layout="fill"
              objectFit="cover"
            />

            <button
              onClick={handlePrevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-20 text-gold px-4 py-2 rounded-full"
            >
              <IoIosArrowBack size={40} />
            </button>
            <button
              onClick={handleNextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-primary bg-opacity-20 text-gold px-4 py-2 rounded-full"
            >
              <IoIosArrowForward size={40} />
            </button>
          </div>
        </div>
      </section>
      <section className=" pl-20 pb-5 max-w-[700px] h-[200px]mr-auto pt-10 text-center grid grid-cols-1 md:grid-cols gap-8">
        <div>
          <h1 className="text-4xl text-primary font-bold mb-8 text-center shadow-gray">
            FAQ's
          </h1>
          <div className="collapse collapse-arrow bg-accent mb-2rem p-4">
            <input type="checkbox" id="accordion-1" />
            <label
              htmlFor="accordion-1"
              className="collapse-title text-xl font-medium  cursor-pointer text-primary"
            >
              What types of travel content are allowed?
            </label>
            <div className="collapse-content rounded-md">
              <p>
                We welcome a diverse range of travel content, including
                destination guides, travel tips, personal travel stories,
                photography, and more. However, content should adhere to our
                community guidelines.
              </p>
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 p-4 ">
          <input type="checkbox" id="accordion-2" />
          <label
            htmlFor="accordion-2"
            className="collapse-title text-xl font-medium cursor-pointer"
          >
            Can I submit my travel blog posts to the community?
          </label>
          <div className="collapse-content bg-custom1 rounded-md">
            <p>
              Absolutely! We encourage members to share their travel
              experiences. Once you're a member, you can submit your blog posts
              through the "Submit Post" section. Our community moderators will
              review and publish the posts.
            </p>
          </div>
        </div>
        <div className="collapse collapse-arrow mb-2rem p-4 bg-accent">
          <input type="checkbox" id="accordion-3" />
          <label
            htmlFor="accordion-3"
            className="collapse-title text-xl font-medium  cursor-pointer text-primary"
          >
            How can I join?
          </label>
          <div className="collapse-content rounded-md">
            <p>
              We’re always looking to add new travel bloggers to our community
              to grow it further and show more of what is out there. Your
              travels might just inspire someone else to make the first move!
              All you have to do is fill in the contact form below and we’ll be
              in touch.
            </p>
          </div>
        </div>

        <div className="absolute right-10 transform mb-10 z-0 h-[300px] w-[600px] rounded-lg mt-20">
          {/* Adjust the width as needed */}
          {/* Your video element */}
          <video
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            muted
            loop
          >
            <source src="/nexttoaccordion.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center  py-20">
        {/* Heading */}
        <h2 className="text-5xl font-bold mb-8 text-center">Featured Blogs</h2>

        {/* Cards */}
        <div className="flex justify-evenly items-center gap-10 p-8 mx-auto">
          {/* Card 1 */}
          <div className="card w-96 h-96 aspect-w-1 aspect-h-1 glass rounded-md">
            <figure>
              <img
                src="/home/coverphoto5.jpeg"
                alt="coverphoto1"
                className="w-full h-full object-cover rounded-md"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Pagoda</h2>
              <p>History buff wandering through time.</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary bg-gray-400  hover:bg-primary text-gray border-none"
                  onClick={() => router.push('/blogs/2')}
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card w-96 h-96 aspect-w-1 aspect-h-1 glass rounded-md">
            <figure>
              <img
                src="/home/coverphoto2.jpeg"
                alt="coverphoto2"
                className="w-full h-full object-cover rounded-md"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Orbitzzz</h2>
              <p>Scaling heights, conquering summits.</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary bg-gray-400  hover:bg-primary text-gray border-none"
                  onClick={() => router.push('/blogs/4')}
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card w-96 h-96 aspect-w-1 aspect-h-1 glass rounded-md">
            <figure>
              <img
                src="/home/coverphoto3.jpeg"
                alt="coverphoto3"
                className="w-full h-full object-cover rounded-md"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Airvnv</h2>
              <p>World traveler on a shoestring budget.</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary hover:bg-primary bg-gray-400 text-#3A5A6F border-none"
                  onClick={() => router.push('/blogs/1')}
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
