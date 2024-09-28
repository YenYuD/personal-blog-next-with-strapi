'use client';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import type { Swiper as SwiperType } from 'swiper/types';
import { cardInfo } from '@/constants/uiConfig';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowRight, ArrowLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function RecentWorks() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	useGSAP(() => {
		gsap.fromTo(
			containerRef.current,
			{
				x: 50,
				opacity: 0,
			},
			{
				x: 0,
				opacity: 1,
				delay: 0.1,
				duration: 0.5,
				ease: 'power1.in',
			},
		);
	});

	const handleSlideChange = (swiper: SwiperType) => {
		setActiveIndex(swiper.realIndex);
	};

	return (
		<div className="min-h-[100svh]">
			<div className="lg:max-w-6xl lg:mx-auto relative z-[15] md:translate-y-1/2">
				<div className="relative z-[15]">
					<div className="flex flex-col w-full">
						<p className="font-normal lg:font-thin">Recent Works /</p>
					</div>
					<div ref={containerRef} className="mt-[1rem] lg:mt-[2rem]">
						<Swiper
							onClick={(swiper) => {
								setActiveIndex(swiper.clickedIndex);
							}}
							onSlideChange={handleSlideChange}
							slidesPerView={1}
							centeredSlides={false}
							spaceBetween={25}
							breakpoints={{
								496: {
									slidesPerView: 2,
								},
								960: {
									slidesPerView: 3,
								},
								1024: {
									slidesPerView: 3,
								},
							}}
							effect="fade"
							navigation={{
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							}}
							modules={[Navigation]}
							className="relative"
							wrapperClass="max-h-[200px] aspect-video"
						>
							{cardInfo.map((card) => (
								<SwiperSlide
									key={card.id}
									className="rounded-lg bg-white hover:cursor-pointer flex flex-col items-center justify-center gap-4 p-4 relative overflow-hidden"
								>
									<Image src={card.imgSrc} alt={card.alt} fill className="object-cover" />
								</SwiperSlide>
							))}
						</Swiper>
					</div>
					<div className="flex gap-4 mt-[1rem]">
						<Button
							variant="outline"
							className="swiper-button-prev bg-transparent aspect-square w-[2.5rem] h-[2.5rem] rounded-full hover:bg-transparent hover:text-slate-200 px-0 border-primary-foreground"
						>
							<ArrowLeft className="hover:text-slate-200" />
						</Button>
						<Button
							variant="outline"
							className="swiper-button-next bg-transparent aspect-square w-[2.5rem] h-[2.5rem] rounded-full hover:bg-transparent hover:text-slate-200 px-0 border-primary-foreground"
						>
							<ArrowRight className="hover:text-slate-200" />
						</Button>
					</div>
				</div>
				<div className="relative z-[15]">
					<p className="mt-[1rem] lg:mt-[2rem] text-xl uppercase lg:text-4xl flex items-center drop-shadow-md ">
						<ChevronsRight className="animate-pulse" /> {`${cardInfo[activeIndex].title}`}
						<span className="font-thin text-sm lg:text-sm text-primary-foreground ml-4 self-end">{`${cardInfo[activeIndex].year}`}</span>
					</p>
					<div className="mt-[1rem] lg:mt-[2rem]">
						<p className=" text-md font-light lg:text-lg text-slate-800">
							{cardInfo[activeIndex].description}
						</p>
						<div className="mt-[1.5rem] lg:mt-[2rem]">
							<p className="font-normal uppercase">Tech Stacks:</p>
							{cardInfo[activeIndex].techStack && (
								<div className="flex gap-2 mt-2 flex-wrap">
									{cardInfo[activeIndex].techStack.map((tech) => (
										<Badge
											key={tech}
											variant="outline"
											className="font-light drop-shadow-sm bg-background/20 hover:bg-background/80 cursor-default border-none text-sm"
										>
											{tech}
										</Badge>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
			<section className="bg-gradients">
				<div className="bg-gradient-5" />
				<div className="bg-gradient-6" />
			</section>
		</div>
	);
}
