import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const slides = [
	{
		id: 'maksubah-premium-hero',
		title: 'Maksubah Premium',
		description:
			'Kelezatan Maksubah kualitas premium dengan rasa otentik dan tekstur lembut. Sempurna untuk momen spesial Anda.',
		imageName: 'maksubah-premium',
		imageAlt: 'Kue Maksubah Premium yang lezat',
		buttonText: 'Pesan Sekarang',
		bgColor: 'bg-yellow-100',
		textColor: 'text-yellow-800',
		buttonColor: 'bg-orange-500 hover:bg-orange-600',
		productId: 'maksubah-premium',
	},
	{
		id: 'lapis-legit-original-hero',
		title: 'Lapis Legit Original',
		description:
			'Nikmati Lapis Legit Original kami, dibuat dengan resep tradisional dan bahan-bahan pilihan terbaik.',
		imageName: 'lapis-legit-original',
		imageAlt: 'Kue Lapis Legit Original yang menggoda selera',
		buttonText: 'Coba Sekarang',
		bgColor: 'bg-green-100',
		textColor: 'text-green-800',
		buttonColor: 'bg-green-500 hover:bg-green-600',
		productId: 'lapis-legit-original-premium',
	},
	{
		id: 'engkak-duren-middle-hero',
		title: 'Engkak Duren Middle',
		description:
			'Perpaduan unik rasa Engkak dengan aroma durian yang khas. Pilihan tepat untuk pecinta durian.',
		imageName: 'engkak-duren',
		imageAlt: 'Kue Engkak Duren yang harum',
		buttonText: 'Lihat Detail',
		bgColor: 'bg-purple-100',
		textColor: 'text-purple-800',
		buttonColor: 'bg-purple-500 hover:bg-purple-600',
		productId: 'engkak-duren-middle',
	},
	{
		id: 'lapan-jam-keju-premium-hero',
		title: 'Lapan Jam Keju Premium',
		description:
			'Kue Lapan Jam dengan sentuhan keju premium, memberikan pengalaman rasa yang mewah dan tak terlupakan.',
		imageName: 'lapan-jam-keju',
		imageAlt: 'Kue Lapan Jam Keju Premium yang istimewa',
		buttonText: 'Pesan Sekarang',
		bgColor: 'bg-pink-100',
		textColor: 'text-pink-800',
		buttonColor: 'bg-pink-500 hover:bg-pink-600',
		productId: 'lapan-jam-keju-premium',
	},
];

const HeroSection = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const navigate = useNavigate();

	const nextSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
	};

	useEffect(() => {
		const timer = setTimeout(nextSlide, 5000);
		return () => clearTimeout(timer);
	}, [currentIndex]);

	const currentSlide = slides[currentIndex];

	const handleOrderNow = (productId) => {
		navigate(`/product/${productId}`);
	};

	// Tambahkan fungsi scroll ke menu
	const handleScrollToMenu = () => {
		const menuSection = document.getElementById('menu');
		if (menuSection) {
			menuSection.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section
			id="hero"
			className={`relative w-full h-[calc(100vh-80px)] md:h-[550px] overflow-hidden ${currentSlide.bgColor}`}
		>
			<AnimatePresence initial={false} custom={currentIndex}>
				<motion.div
					key={currentSlide.id}
					custom={currentIndex}
					initial={{ opacity: 0, x: 300 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -300 }}
					transition={{ duration: 0.5 }}
					className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between p-8 md:p-16"
				>
					<div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 z-10">
						<motion.h1
							className={`text-4xl md:text-5xl font-bold ${currentSlide.textColor} mb-4`}
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.2, duration: 0.5 }}
						>
							{currentSlide.title}
						</motion.h1>
						<motion.p
							className="text-lg md:text-xl mb-6 text-gray-700"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.5 }}
						>
							{currentSlide.description}
						</motion.p>
						<div className="flex flex-col md:flex-row gap-3 md:gap-6">
							<Button
								className={`${currentSlide.buttonColor} px-6 py-3 text-lg font-semibold rounded-lg shadow-lg`}
								onClick={() => handleOrderNow(currentSlide.productId)}
							>
								{currentSlide.buttonText}
							</Button>
							<Button
								variant="outline"
								className="px-6 py-3 text-lg font-semibold rounded-lg shadow-lg border-orange-500 text-orange-500 hover:bg-orange-50"
								onClick={handleScrollToMenu}
							>
								Lihat Menu
							</Button>
						</div>
					</div>
					<div className="md:w-1/2 flex justify-center items-center z-0">
						<motion.div
							className="w-full max-w-md h-64 md:h-80 bg-white rounded-lg shadow-xl overflow-hidden"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.3, duration: 0.5 }}
							whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }}
							whileTap={{ scale: 0.98 }}
							style={{ perspective: 1200 }}
							onMouseMove={e => {
								const card = e.currentTarget;
								const rect = card.getBoundingClientRect();
								const x = e.clientX - rect.left;
								const y = e.clientY - rect.top;
								const rotateY = ((x / rect.width) - 0.5) * 18;
								const rotateX = ((y / rect.height) - 0.5) * -18;
								card.style.transform = `scale(1.04) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
							}}
							onMouseLeave={e => {
								e.currentTarget.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)';
							}}
						>
							<img
								alt={currentSlide.imageAlt}
								className="w-full h-full object-cover"
								src="https://images.unsplash.com/photo-1675023112817-52b789fd2ef0"
							/>
						</motion.div>
					</div>
				</motion.div>
			</AnimatePresence>

			<button
				onClick={prevSlide}
				className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md hover:shadow-lg transition-all z-20"
				aria-label="Previous slide"
			>
				<ChevronLeft size={24} />
			</button>
			<button
				onClick={nextSlide}
				className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-700 p-2 rounded-full shadow-md hover:shadow-lg transition-all z-20"
				aria-label="Next slide"
			>
				<ChevronRight size={24} />
			</button>

			<div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
				{slides.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentIndex(index)}
						className={`w-3 h-3 rounded-full ${
							currentIndex === index
								? 'bg-orange-500 scale-125'
								: 'bg-gray-300 hover:bg-gray-400'
						} transition-all`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</section>
	);
};

export default HeroSection;