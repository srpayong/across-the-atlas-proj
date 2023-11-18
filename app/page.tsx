'use client';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ScrollButton from './components/ScrollButton';
import styles from './page.module.css';

const slides = [
  '/home/coverphoto1.jpeg',
  '/home/coverphoto2.jpeg',
  '/home/coverphoto3.jpeg',
  '/home/coverphoto4.jpeg',
  '/home/coverphoto5.jpeg',
  '/home/coverphoto6.jpeg',
  '/home/coverphoto7.jpeg',
  '/home/coverphoto8.jpeg',
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
            <source src="/nature.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Content Overlaid on Hero Section */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${styles.animateFadeIn}`}
          >
            <div className="text-primary text-center">
              <h1 className="text-4xl font-bold mb-4 animate-fadeIn">
                Your Heroic Title
              </h1>
              <p className="text-lg animate-fadeIn text-primary">
                A brief description of your hero section.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 py-20">
        <div className="relative flex items-center justify-center pt-10 h-[500px] w-full">
          <div className="border-2 border-secondary text-center p-44">
            <h1 className="text-4xl font-semibold mb-2 animate-fadeIn">
              Lorem Ipsum
            </h1>
            <p
              className="text-1.5rem font-serif animate-fadeIn block text-custom1"
              style={{ animationDelay: '0.5s' }}
            >
              Hello hello
            </p>
          </div>
        </div>
      </section>

      {/* Slider Section */}
      <section className="relative z-20 max-w-[1500px] pt-8 mb-20">
        <div className="flex items-center justify-center">
          {/* Slider */}
          <div
            className="relative overflow-hidden rounded-md"
            style={{
              padding: '20px',
              margin: '20px auto',
              height: '400px',
              width: '1000px',
              zIndex: 2,
              // boxShadow: '0 0 10px 10px gray',
              borderRadius: '10px',
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
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-20 text-gold px-4 py-2 rounded-full"
            >
              <IoIosArrowForward size={40} />
            </button>
          </div>
        </div>
      </section>
      <section className="mb-20 pb-20 max-w-[700px] mx-auto pt-20">
        <h1 className="text-4xl text-primary font-bold mb-8 shadow-gray">
          Your Centered Heading
        </h1>
        <div className="collapse collapse-arrow bg-base-200 mb-2rem p-4">
          <input type="checkbox" id="accordion-1" />
          <label
            htmlFor="accordion-1"
            className="collapse-title text-xl font-medium cursor-pointer bg-custom1 text-primary"
          >
            Click to open this one and close others
          </label>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 p-4 ">
          <input type="checkbox" id="accordion-2" />
          <label
            htmlFor="accordion-2"
            className="collapse-title text-xl font-medium cursor-pointer"
          >
            Click to open this one and close others
          </label>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 p-4">
          <input type="checkbox" id="accordion-3" />
          <label
            htmlFor="accordion-3"
            className="collapse-title text-xl font-medium cursor-pointer"
          >
            Click to open this one and close others
          </label>
          <div className="collapse-content">
            <p>hello</p>
          </div>
        </div>
      </section>

      <section
        className="flex justify-evenly items-center mt-20 mb-20 py-20"
        style={{ height: '300px' }}
      >
        {/* Card 1 */}
        <div className="card w-96 h-96 aspect-w-1 aspect-h-1 glass">
          <figure>
            <img
              src="/home/coverphoto1.jpeg"
              alt="coverphoto1"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Card 1</h2>
            <p>Description for Card 1.</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => router.push('/blogs')}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card w-96 h-96 aspect-w-1 aspect-h-1 glass">
          <figure>
            <img
              src="/home/coverphoto2.jpeg"
              alt="coverphoto2"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Card 2</h2>
            <p>Description for Card 2.</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => router.push('/trips')}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card w-96 h-96 aspect-w-1 aspect-h-1 glass">
          <figure>
            <img
              src="/home/coverphoto3.jpeg"
              alt="coverphoto3"
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Card 3</h2>
            <p>Description for Card 3.</p>
            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                onClick={() => router.push('/home')}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
