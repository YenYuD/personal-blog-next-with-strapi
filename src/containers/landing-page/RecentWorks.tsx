'use client';
import type { Swiper as SwiperType } from 'swiper/types';
import { cardInfo } from '@/constants/uiConfig';
import { useState } from 'react';
import Image from 'next/image';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ArrowRight, ArrowLeft, ChevronsRight, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AnimatedTitle } from '@/components/custom';
import { GitHub } from '@/components/custom/icons';

export default function RecentWorks() {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleSlideChange = (swiper: SwiperType) => {
		setActiveIndex(swiper.realIndex);
	};

	return (
		<div className="min-h-[100svh] lg:max-h-[1100px] max-small:mt-[5rem] flex flex-col justify-center">
			<div className="z-[15] h-full max-w-6xl flex flex-col lg:max-2xl:mt-[3rem] 2xl:justify-center 2xl:mt-[-3rem] ">
				<div className="flex-none">
					<AnimatedTitle title="Recent Works /" />
					<div className="mt-[1rem] lg:mt-[2rem]">
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
							{cardInfo.map((card, index) => (
								<SwiperSlide
									key={card.id}
									className="rounded-lg bg-white hover:cursor-pointer brightness-[0.7] flex flex-col items-center justify-center gap-4 p-4 relative overflow-hidden"
									style={{
										filter: index === activeIndex ? 'brightness(1)' : 'brightness(0.7)',
									}}
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
				<div className=" max-lg:flex-1 ">
					<p className="pt-[1rem] lg:mt-[2rem] text-lg uppercase lg:text-4xl flex items-center drop-shadow-md ">
						<ChevronsRight className="animate-pulse" /> {`${cardInfo[activeIndex]?.title}`}
						<span className="font-thin text-sm lg:text-sm text-primary-foreground ml-4">{`${cardInfo[activeIndex]?.year}`}</span>
					</p>
					<div className="mt-[1rem] lg:mt-[2rem]">
						<p className=" text-md  font-light lg:text-lg  text-slate-800">
							{cardInfo[activeIndex]?.description}
						</p>
						<div className="flex gap-2 mt-2">
							<a href={cardInfo[activeIndex]?.link} target="_blank" rel="noreferrer">
								<Badge
									variant="outline"
									className="font-thin text-background/60 border-background/60 hover:text-background hover:border-background cursor-pointer"
								>
									Visit
									<ArrowUpRight className="h-4 w-4 ml-1" />
								</Badge>
							</a>
							{cardInfo[activeIndex]?.repo && (
								<Badge
									variant="outline"
									className="font-thin text-background/60 border-background/60 hover:text-background hover:border-background cursor-pointer"
								>
									<a href={cardInfo[activeIndex]?.repo} target="_blank" rel="noreferrer">
										Repo
									</a>
									<GitHub className="h-4 w-4 ml-1" />
								</Badge>
							)}
						</div>
						<div className="mt-[1.2rem] lg:mt-[2rem] ">
							<p className="font-light uppercase text-background">Tech Stacks:</p>
							{cardInfo[activeIndex]?.techStack && (
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
		</div>
	);
}
